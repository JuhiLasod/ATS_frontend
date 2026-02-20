import React, { useEffect, useState } from "react";

function GenerateBill() {
    const [formData, setFormData] = useState({
        "customerName": "",
        "customerMobile": "",
        "customerLocation": "",
        "products": {
            "itemId": "",
            "qty": "",
            "price": ""
        }
    })
    const [companies, setCompanies] = useState([]);
    const [customerName, setCustomerName] = useState([]);
    const [customerMobile, setCustomerMobile] = useState([]);
    const [customerLocation, setCustomerLocation] = useState([]);
    const [rows, setRows] = useState([
        {
            companyId: "",
            itemId: "",
            items: [],
            qty: "",
            price: ""
        }
    ]);
    useEffect(() => {
        getCompanies();
    }, []);

    const addRow = () => {
        setRows([
            ...rows,
            {
                companyId: "",
                itemId: "",
                items: [],
                qty: "",
                price: ""
            }
        ]);
    };

    const getCompanies = async () => {
        fetch("http://localhost:3015/api/getCompany", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({})
        })
            .then((res) => res.json())
            .then((response) => {
                console.log(response);
                setCompanies(response.data);
            })
            .catch((err) => console.log(err));

    };

    const handleCompanyChange = async (index, companyId) => {
        const updatedRows = [...rows];
        updatedRows[index].companyId = companyId;
        updatedRows[index].itemId = "";
        updatedRows[index].price = "";

        fetch("http://localhost:3015/api/getItem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ data: { id: companyId } })
        })
            .then((res) => res.json())
            .then((response) => {
                console.log(response.data);
                const itemsData = response.data;

                setRows(prevRows =>
                    prevRows.map((row, i) =>
                        i === index
                            ? {
                                ...row,
                                companyId,
                                itemId: "",
                                price: "",
                                items: itemsData
                            }
                            : row
                    )
                );
            })
            .catch((err) => console.log(err));


        setRows(updatedRows);
    };

    const handleItemChange = (index, itemId) => {
        const updatedRows = [...rows];
        updatedRows[index].itemId = itemId;

        const selectedItem = updatedRows[index].items.find(
            (item) => item.id == itemId
        );

        updatedRows[index].price = selectedItem?.price || "";
        setRows(updatedRows);
    };

    const handleChange = (index, field, value) => {
        const updatedRows = [...rows];
        updatedRows[index][field] = value;
        setRows(updatedRows);
    };


    const handleSubmit = () => {
        const payload = {
            data:{
                customerName,
                customerLocation,
                customerMobile,
                items:
                    rows.map(({ items, companyId, ...rest }) => ({
                    ...rest,
                    itemId: Number(rest.itemId),   // optional type fix
                    qty: Number(rest.qty),
                    price: Number(rest.price)
                    }))
                }   
        }
        console.log(payload);
        fetch("http://localhost:3015/api/generate-bill", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
            .then((res) => res.json())
            .then((response) => {
                console.log(response);
            })
            .catch((err) => console.log(err));
    }

    return (
        <div>
            <div>
                <label>Customer Name</label>
                <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                />
                <label>Customer Address</label>
                <input
                    type="text"
                    value={customerLocation}
                    onChange={(e) => setCustomerLocation(e.target.value)}
                />
                <label>Customer Mobile No.</label>
                <input
                    type="text"
                    value={customerMobile}
                    onChange={(e) => setCustomerMobile(e.target.value)}
                />
            </div>
            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Item</th>
                        <th>Qty</th>
                        <th>Price</th>
                    </tr>
                </thead>

                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            {/* Company Dropdown */}
                            <td>
                                <select
                                    value={row.companyId}
                                    onChange={(e) =>
                                        handleCompanyChange(index, e.target.value)
                                    }
                                >
                                    <option value="">Select Company</option>
                                    {companies.map((comp) => (
                                        <option key={comp.id} value={comp.id}>
                                            {comp.name}
                                        </option>
                                    ))}
                                </select>
                            </td>

                            {/* Item Dropdown */}
                            <td>
                                <select
                                    value={row.itemId}
                                    onChange={(e) =>
                                        handleItemChange(index, e.target.value)
                                    }
                                >
                                    <option value="">Select Item</option>
                                    {row.items.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </td>

                            {/* Qty */}
                            <td>
                                <input
                                    type="number"
                                    value={row.qty}
                                    onChange={(e) =>
                                        handleChange(index, "qty", e.target.value)
                                    }
                                />
                            </td>

                            {/* Price */}
                            <td>
                                <input
                                    type="number"
                                    value={row.price}
                                    onChange={(e) =>
                                        handleChange(index, "price", e.target.value)
                                    }
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <br />

            {/* Add Item Button */}
            <button onClick={addRow}>+ Add Item</button>
            <button onClick={handleSubmit}>generate</button>
        </div>
    )
}
export default GenerateBill
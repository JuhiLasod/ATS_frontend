import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./GenerateBill.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import CustomerBill from "../customerBill/CustomerBill";

function GenerateBill() {
    const navigate = useNavigate();

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

    const deleteRow = (indexToDelete) => {
        setRows(rows.filter((_, index) => index !== indexToDelete));
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
            .catch((err) => {
                toast.error("Database error. ");
                console.log(err)
            });

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
            .catch((err) => {
                toast.error("Database error. ");
                console.log(err)
            });


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
            data: {
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
                toast.success("Bill Generated Successfully. ");
                console.log("generated bill id is", response.data[0].billId);
                const billId = response.data[0].billId
                navigate(`/bill/${billId}`);
            })
            .catch((err) => {
                console.log(err)
                toast.error("Bill Creation Failed. ");
            })
    }

    return (
        <div >
            <div className="billing-header">
                <h1>
                    Billing
                </h1>
                <button className="light-button" onClick={() => navigate("/")}>
                    Go to Menu
                </button>
            </div>
            <div className="billing-upper-div">
                <div className="upper-form">
                    <div className="billing-inner-div">
                        <label className="field-name">Customer Name-</label>
                        <input
                            className="input-box"
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                        />
                    </div>
                    <div className="billing-inner-div">
                        <label className="field-name">Customer Address-</label>
                        <input
                            className="input-box"
                            type="text"
                            value={customerLocation}
                            onChange={(e) => setCustomerLocation(e.target.value)}
                        />
                    </div>
                    <div className="billing-inner-div">
                        <label className="field-name">Customer Mobile No.-</label>
                        <input
                            className="input-box"
                            type="text"
                            value={customerMobile}
                            onChange={(e) => setCustomerMobile(e.target.value)}
                        />
                    </div>
                </div>
                <table
                    className="billing-table"
                    style={{ borderCollapse: "collapse", width: "100%", tableLayout: "fixed" }}>
                    <colgroup>
                        <col style={{ width: "4%" }} />
                        <col style={{ width: "8%" }} />   {/* S.No */}
                        <col style={{ width: "28%" }} />  {/* Company */}
                        <col style={{ width: "28%" }} />  {/* Item */}
                        <col style={{ width: "16%" }} />  {/* Qty */}
                        <col style={{ width: "16%" }} />  {/* Price */}
                    </colgroup>
                    <thead>
                        <tr>
                            <th></th>
                            <th>S.No</th>
                            <th>Company</th>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Price</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={index} style={{ textAlign: "center" }}>
                                <td
                                className="delete-cell"
                                    onClick={() => deleteRow(index)}
                                    style={{ cursor: "pointer" }}
                                >

                                    <FontAwesomeIcon icon={faTrash} />

                                </td>
                                <td>
                                    {index + 1}

                                </td>


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
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <button className="button" onClick={addRow}>Add Item</button>
                    <button className="button" onClick={handleSubmit}>Generate Bill</button>
                </div>
            </div>
        </div>
    )
}
export default GenerateBill
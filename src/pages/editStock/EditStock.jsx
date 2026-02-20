import React, { useEffect, useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import { MdCheck } from "react-icons/md";
import "./EditStock.css"
import { useNavigate } from "react-router-dom";

function EditStock() {
const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({});

    const fetchItems = () => {
        fetch("http://localhost:3015/api/getItem", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: { id: "0" } })
        })
            .then((res) => res.json())
            .then((response) => {
                setItems(response.data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchItems();
    }, []);

    // ✅ Edit Click
    const handleEdit = (item) => {
        setEditId(item.id);
        console.log("item is", item);
        // Flatten company name for easy editing
        setEditData({
            compId: item.compId,
            compName: item.company?.name || "",
            id: item.id,
            itemName: item.name,
            qty: item.qty,
            price: item.price,
            gstPrice: item.gstPrice
        });
    };

    // ✅ Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setEditData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        const payload = {
            data: {
                ...editData,
            }
        };

        fetch("http://localhost:3015/api/editItemDetails", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })
            .then((res) => res.json())
            .then(() => {
                const updatedItems = items.map((item) =>
                    item.id === editId
                        ? {
                            ...item,
                            name: editData.itemName,
                            qty: editData.qty,
                            price: editData.price,
                            gstPrice: editData.gstPrice,
                            compId: editData.compId,
                            company: { ...item.company, name: editData.compName }
                        }
                        : item
                );

                setItems(updatedItems);
                setEditId(null);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div >
            <div className="editItemsHeader">
                <h1>Stock Items</h1>
                <button className="light-button" onClick={()=>navigate("/")}>
                    Go to Menu
                </button>
            </div>
<div>
            <table
                border="1"
                cellPadding="10"
                style={{ borderCollapse: "collapse", width: "100%" ,tableLayout: "fixed"}}
            >
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Action</th>
                        <th>Company</th>
                        <th>Items</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>GST Price</th>
                    </tr>
                </thead>

                <tbody>
                    {items.length > 0 ? (
                        items.map((item, index) => (
                            <tr key={item.id} style={{backgroundColor: editId === item.id ? "rgb(255, 236, 236)" : "white"}}>
                                <td style={{ textAlign: "center" }}>{index + 1}</td>

                                <td style={{ textAlign: "center" }}>
                                    {editId === item.id ? (
                                        <div
                                            style={{ cursor: "pointer", color: "green", fontSize: "2vw"}}
                                            onClick={handleSave}
                                        >☑</div>
                                    ) : (
                                        <FaEdit
                                            style={{ cursor: "pointer", color: "rgb(155, 30, 30)" }}
                                            onClick={() => handleEdit(item)}
                                        />
                                    )}
                                </td>

                                <td style={{ textAlign: "center" }}>
                                    {editId === item.id ? (
                                        <input
                                            type="text"
                                            name="compName"
                                            value={editData.compName}
                                            onChange={handleChange}
                                            style={{
                                                border: "none",
                                                outline: "none",
                                                background: "transparent",
                                                textAlign: "center",
                                                width: "100%"
                                            }}
                                        />
                                    ) : (
                                        item.company?.name
                                    )}
                                </td>

                                <td style={{ textAlign: "center" }}>
                                    {editId === item.id ? (
                                        <input
                                            type="text"
                                            name="itemName"
                                            value={editData.itemName}
                                            onChange={handleChange}
                                            style={{
                                                border: "none",
                                                outline: "none",
                                                background: "transparent",
                                                textAlign: "center",
                                                width: "100%"
                                            }}
                                        />
                                    ) : (
                                        item.name
                                    )}
                                </td>

                                <td style={{ textAlign: "center" }}>
                                    {editId === item.id ? (
                                        <input
                                            type="number"
                                            name="qty"
                                            value={editData.qty}
                                            onChange={handleChange}
                                            style={{
                                                border: "none",
                                                outline: "none",
                                                background: "transparent",
                                                textAlign: "center",
                                                width: "100%"
                                            }}
                                        />
                                    ) : (
                                        item.qty
                                    )}
                                </td>

                                <td style={{ textAlign: "center" }}>
                                    {editId === item.id ? (
                                        <input
                                            type="number"
                                            name="price"
                                            value={editData.price}
                                            onChange={handleChange}
                                            style={{
                                                border: "none",
                                                outline: "none",
                                                background: "transparent",
                                                textAlign: "center",
                                                width: "100%"
                                            }}
                                        />
                                    ) : (
                                        item.price
                                    )}
                                </td>

                                <td style={{ textAlign: "center" }}>
                                    {editId === item.id ? (
                                        <input
                                            type="number"
                                            name="gstPrice"
                                            value={editData.gstPrice}
                                            onChange={handleChange}
                                            style={{
                                                border: "none",
                                                outline: "none",
                                                background: "transparent",
                                                textAlign: "center",
                                                width: "100%"
                                            }}
                                        />
                                    ) : (
                                        item.gstPrice
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" style={{ textAlign: "center" }}>
                                No Data Found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default EditStock;

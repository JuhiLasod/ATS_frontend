import React, { useEffect, useState } from "react";
import "./AddItem.css"
import { useNavigate } from "react-router-dom";

function AddItem() {
    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState("");
    const [newCompany, setNewCompany] = useState("");
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState("");
    const [newItem, setNewItem] = useState("");
    const [avlQty, setAvlQty] = useState("");
    const [avlPrice, setAvlPrice] = useState("");
    const [avlGstPrice, setAvlGstPrice] = useState("");

    const [formData, setFormData] = useState({
        qty: "",
        price: "",
        gstPrice: "",
    });

    const fetchCompanies = async () => {
        fetch("http://localhost:3015/api/getCompany", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({}) // send empty body if required
        })
            .then((res) => res.json())
            .then((response) => {
                console.log(response);
                setCompanies(response.data);
            })
            .catch((err) => console.log(err));
    }
    const fetchItemDetails = () => {
        fetch("http://localhost:3015/api/getSpecificItem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ data: { id: selectedItem } })
        })
            .then((res) => res.json())
            .then((response) => {
                console.log(response);
                console.log(response.data.qty,
                    response.data.price,
                    response.data.gstPrice);
                setAvlQty(response.data.qty);
                setAvlPrice(response.data.price);
                setAvlGstPrice(response.data.gstPrice);
                console.log(avlQty,
                    avlPrice,
                    avlGstPrice);
            })
            .catch((err) => console.log(err));
    }
    useEffect(() => {
        fetchCompanies();
    }, []);

    useEffect(() => {
        if (selectedItem === "" || selectedItem === "0")
            return;
        fetchItemDetails();
    }, [selectedItem])

    const handleCompChange = (e) => {
        setSelectedCompany(e.target.value);
        fetch("http://localhost:3015/api/getItem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ data: { id: e.target.value } })
        })
            .then((res) => res.json())
            .then((response) => {
                console.log(response);
                setItems(response.data);
            })
            .catch((err) => console.log(err));
    }
    // Handle input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    // Handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("new item name is", newItem)
        const payload = {
            data: {
                compId: selectedCompany,
                compName: newCompany,
                itemName: newItem,
                id: selectedItem,
                ...formData,
            }
        };

        console.log("Submitting:", payload);
        fetch("http://localhost:3015/api/addEditItem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
            .then((res) => res.json())
            .then((response) => {
                console.log(response);
                setItems(response.data);
            })
            .catch((err) => console.log(err));



    };

    return (
        <div >
            <div className="addItemHeader"><h1>Add Item</h1></div>
            <div className="addItemForm">
                <form onSubmit={handleSubmit}>

                    {/* Company Dropdown */}
                    <div className="addItemField">
                        <label>Company Name</label>
                        <br/>
                        <select
                            className="input-box"
                            value={selectedCompany}
                            name="companyId"
                            onChange={(e) => handleCompChange(e)}
                            required
                        >
                            <option value="">Select Company</option>

                            {Array.isArray(companies) &&
                                companies.map((company) => (
                                    <option key={company.id} value={company.id}>
                                        {company.name}
                                    </option>
                                ))}

                            <option value="0">Other</option>
                        </select>
                    

                    {selectedCompany === "0" && (
                        <>
                            <label className="addItemField">New Company Name:</label>
                            <input
                                type="text"
                                className="input-box"
                                value={newCompany}
                                onChange={(e) => setNewCompany(e.target.value)}
                                required
                            />
                        </>
                    )}
                    </div>

                    {/* Item Name */}
                    <div className="addItemField">
                        <label >Item Name</label>
                        <br/>
                        <select
                            className="input-box"
                            value={selectedItem}
                            name="itemId"
                            onChange={(e) => setSelectedItem(e.target.value)}
                            required
                        >
                            <option value="">Select Item</option>

                            {Array.isArray(items) &&
                                items.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}

                            <option value="0">Other</option>
                        </select>
                    

                    {/* Show Input If Other Selected */}
                    {selectedItem === "0" && (
                        <>
                            <label className="addItemField">New Item Name</label>
                            <input
                                className="input-box"
                                type="text"
                                value={newItem}
                                onChange={(e) => setNewItem(e.target.value)}
                                required
                            />
                        </>
                    )}
                    </div>

                    {/* Quantity */}
                    {(selectedItem !== "0" && selectedItem !== "") &&
                        <div className="addItemDisplay">
                            Available Stock- {avlQty}
                        </div>
                    }
                    <div className="addItemField">
                        <label>New Stock</label>
                        <br />
                        <input
                            className="input-box"
                            type="string"
                            name="qty"
                            value={formData.qty}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Price */}
                    {(selectedItem !== "0" && selectedItem !== "") &&
                        <div className="addItemDisplay">
                            Current Price- {avlPrice}
                        </div>
                    }
                    <div className="addItemField">
                        <label>New Price</label>
                        <br />
                        <input
                            className="input-box"
                            type="string"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* GST Price */}
                    {(selectedItem !== "0" && selectedItem !== "") &&
                        <div className="addItemDisplay">
                            Current GST  Price- {avlGstPrice}
                        </div>
                    }
                    <div className="addItemField">
                        <label>New GST Price</label>
                        <br />
                        <input
                            className="input-box"
                            type="string"
                            name="gstPrice"
                            value={formData.gstPrice}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button className="button" type="submit">Save</button>
                    <button className="button" type="submit" onClick={()=>navigate("/")}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default AddItem;

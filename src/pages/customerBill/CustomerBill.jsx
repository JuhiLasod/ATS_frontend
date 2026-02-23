import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { toWords } from "number-to-words";

import "./CustomerBill.css"

function CustomerBill() {
    const { billId } = useParams();
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState("");
    const [totalInWords, setTotalInWords] = useState("");

    useEffect(() => {
        fetchBill()
    }, [billId]);

    const fetchBill = () => {
        fetch(`http://localhost:3015/api/bill/${billId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({})
        })
            .then((res) => res.json())
            .then((response) => {
                console.log(response);
                const formattedItems = response.data.map((data) => {
                    const qty = Number(data.qty);
                    const price = Number(data.price);

                    return {
                        itemName: data.item.name,
                        companyName: data.item.company.name,
                        qty: qty,
                        price: price,
                        amount: qty * price
                    };
                });
                const calculatedTotal = formattedItems.reduce(
                    (sum, item) => sum + item.amount,
                    0
                );
                setItems(formattedItems);
                setTotal(calculatedTotal);
                setTotalInWords(
                    (
                        toWords(calculatedTotal) + " Rupees Only"
                    ).toUpperCase()
                );

                // setTotalInWords(
                //     toWords(calculatedTotal).replace(/^\w/, c => c.toUpperCase()) +
                //     " Rupees Only"
                // );
                console.log("yayy", items)
                console.log(total)
            })
            .catch((err) => {
                console.log(err)
                toast.error("Could not view Bill. ");
            })
    }
    return (
        <div className="invoice-container">
            <div className="invoice-header">
                <h1 className="brand-name">
                    Aadinath Tiles and Sanitary
                </h1>
                <div className="details-brand">
                    <div>
                        location, city
                        <br />
                        landmark
                        <br />
                        pincode
                    </div>
                    <div>
                        +91-9827049544
                        <br />
                        +91-8770625551
                    </div>
                </div>

            </div>
            <div className="tagline">Your Tagline here</div>
            <div className="break-line"></div>
            <div className="invoice-table-div-outer">


                <table
                    style={{
                        width: "95%",
                        borderCollapse: "collapse",
                        tableLayout: "fixed",
                        // border: "2px solid black",
                        marginTop: "10px"
                    }}
                >
                    <thead>
                        <tr>
                            <th
                                colSpan="2"
                                style={{
                                    border: "1px solid black",
                                    padding: "6px",
                                    textAlign: "center"
                                }}
                            >
                                sdfgh
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            {/* LEFT SIDE */}
                            <td
                                style={{
                                    width: "50%",
                                    padding: 0,
                                    verticalAlign: "top",
                                    borderRight: "1px solid black",
                                    borderLeft: "1px solid black"
                                }}
                            >
                                <table
                                    style={{
                                        width: "100%",
                                        borderCollapse: "collapse"
                                    }}
                                >
                                    <thead>
                                        <tr>
                                            <th
                                                style={{
                                                    borderBottom: "1px solid black",
                                                    padding: "3px"
                                                }}
                                            >
                                                Customer Details
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style={{ padding: "3px" }}>Name: </td>
                                        </tr>
                                        <tr>
                                            <td style={{ padding: "3px" }}>Mobile: </td>
                                        </tr>
                                        <tr>
                                            <td style={{ padding: "3px" }}>Address: </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>

                            {/* RIGHT SIDE */}
                            <td
                                style={{
                                    width: "50%",
                                    padding: 0,
                                    verticalAlign: "top",
                                    borderRight: "1px solid black"
                                }}
                            >
                                <table
                                    style={{
                                        width: "100%",
                                        borderCollapse: "collapse"
                                    }}
                                >
                                    <thead>
                                        <tr>
                                            <th
                                                style={{
                                                    borderBottom: "1px solid black",
                                                    padding: "3px"
                                                }}
                                            >
                                                Customer Details
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style={{ padding: "3px" }}>Name: ABC</td>
                                        </tr>
                                        <tr>
                                            <td style={{ padding: "3px" }}>Mobile: 9999999999</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ height: "20px", borderTop: "1px solid black" }}></td>
                        </tr>
                        {/* ITEMS HEADER */}
                        <tr>
                            <td colSpan="2" style={{ padding: 0 }}>
                                <table
                                    style={{
                                        width: "100%",
                                        borderCollapse: "collapse"
                                    }}
                                >
                                    <thead>
                                        <tr>
                                            <th style={{ border: "1px solid black", padding: "6px", width: "8%" }}>S.No</th>
                                            <th style={{ border: "1px solid black", padding: "6px" }}>Item</th>
                                            <th style={{ border: "1px solid black", padding: "6px", width: "15%" }}>Qty</th>
                                            <th style={{ border: "1px solid black", padding: "6px", width: "20%" }}>Price</th>
                                            <th style={{ border: "1px solid black", padding: "6px", width: "20%" }}>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item, index) => {
                                            const amount = item.qty * item.price;

                                            return (
                                                <tr key={item.id}>
                                                    <td
                                                        style={{
                                                            border: "1px solid black",
                                                            padding: "6px",
                                                            textAlign: "center"
                                                        }}
                                                    >
                                                        {index + 1}
                                                    </td>
                                                    <td style={{ border: "1px solid black", padding: "6px" }}>
                                                        {item.itemName}
                                                    </td>

                                                    <td
                                                        style={{
                                                            border: "1px solid black",
                                                            padding: "6px",
                                                            textAlign: "center"
                                                        }}
                                                    >
                                                        {item.qty}
                                                    </td>

                                                    <td
                                                        style={{
                                                            border: "1px solid black",
                                                            padding: "6px",
                                                            textAlign: "center"
                                                        }}
                                                    >
                                                        ₹{item.price}
                                                    </td>

                                                    <td
                                                        style={{
                                                            border: "1px solid black",
                                                            padding: "6px",
                                                            textAlign: "right"
                                                        }}
                                                    >
                                                        ₹{amount}
                                                    </td>
                                                </tr>
                                            );
                                        })}

                                        {/* TOTAL ROW */}
                                        <tr style={{height: "50px"}}>
                                            <td
                                                // colSpan="4"
                                                style={{
                                                    border: "1px solid black",
                                                    padding: "6px",
                                                    textAlign: "right",
                                                    fontWeight: "bold",
                                                    fontSize: "20px"
                                                }}
                                            >
                                                Total
                                            </td>

                                            <td colSpan="3" style={{
                                                border: "1px solid black",
                                                padding: "6px",
                                                textAlign: "center",
                                                fontSize: "15px"
                                            }}>
                                                {totalInWords}
                                            </td>


                                            <td style={{
                                                border: "1px solid black",
                                                padding: "6px",
                                                textAlign: "right",
                                                fontWeight: "bold",
                                                fontSize: "25px"
                                            }}>₹{total}</td>
                                        </tr>

                                    </tbody>

                                </table>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default CustomerBill;
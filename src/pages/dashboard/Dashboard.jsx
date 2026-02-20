import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard(){
    const navigate = useNavigate()
    return(
        <return>
            <div className="dashboard-header">
                <h1>
                    Adinath Tiles and sanitary
                </h1>
                
            </div>

            <button className="button" onClick={()=>{navigate("/add-item")}}>Add Item</button>
            <button className="button" onClick={()=>{navigate("/edit-stock")}}>Edit Stock</button>
            <button className="button" onClick={()=>{navigate("/generate-bill")}}>Generate Bill</button>
        </return>
    )
}

export default Dashboard
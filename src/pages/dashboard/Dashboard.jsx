import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard(){
    const navigate = useNavigate()
    return(
        <return>
            <button className="button" onClick={()=>{navigate("/add-item")}}>Add Item</button>
            <button className="button" onClick={()=>{navigate("/add-item")}}>Edit Stock</button>
        </return>
    )
}

export default Dashboard
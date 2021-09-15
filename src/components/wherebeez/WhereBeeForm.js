import React, { useState } from "react";

export const WhereBeeForm = () => {
    const [item, createItem] = useState([])
    const [whereBee, setWhereBee] = useState([]) // 

    const createWhereBee = (event) => {
        event.preventDefault()
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }
        
        const newItem = {
            name: item.name,
            description: item.description
        }
        fetch("http://localhost:8088/items", fetchOptions)
        
        
    }

// Need to create item AND WhereBee at the same time, so updating 2 states (see Kennels)
// 

return (
    <>
    <h2>Out of the BuzzeeBrain, into the WhereBee</h2>

    <form>
        <fieldset>
            <label htmlFor="item">Item/Document</label>
            <input type="text" id="item"/>
        </fieldset>
        <fieldset>
            <label htmlFor="description">Description</label>
            <input/>
        </fieldset>
        <fieldset>
            <label htmlFor="where">Where is it?</label>
            <input/>
        </fieldset>
    </form>
    </>
)
}
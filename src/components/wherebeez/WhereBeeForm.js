import React, { useState } from "react";

export const WhereBeeForm = () => {
    const [allItems, setAllItems] = useState([])
    const [item, updateItem] = useState({
        name: "",
        description: ""
    })
    const [whereBee, updateWhereBee] = useState({
        whereIs: ""
    }) // 


    const fetchAllItems = () => {
        fetch("http://localhost:8088/items")
        .then(res => res.json())
    }

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
        fetch("http://localhost:8088/items", fetchOptions, {body: JSON.stringify(newItem)})
        .then(fetchAllItems)
        .then((data) => setAllItems(data) )
        
    }

// Need to create item AND WhereBee at the same time, so updating 2 states, with the item state 
// having to interact with the WhereBee state
// fetch promise chaining? async/await?


// functions below to invoke onChange
const itemConstructor = (propertyToModify, newValue) => {
    const copy = { ...item }
    copy[propertyToModify] = newValue
    updateItem(copy)
}

const whereBeeConstructor = (propertyToModify, newValue) => {
    const copy = { ...whereBee}
    copy[propertyToModify] = newValue
    updateWhereBee(copy)
}
return (
    <>
    <h2>Out of the BuzzeeBrain, into the WhereBee</h2>

    <form>
        <fieldset>
            <label htmlFor="item">Item/Document</label>
            <input  type="text" 
                    id="item" 
                    required autoFocus
                    onChange={(event) => itemConstructor("name", event.target.value)}/>
        </fieldset>
        <fieldset>
            <label htmlFor="description">Description</label>
            <input  type="text"
                    id="description"
                    required
                    onChange={(event) => itemConstructor("description", event.target.value)}/>
        </fieldset>
        <fieldset>
            <label htmlFor="where">Where is it?</label>
            <input  type="text"
                    id="location"
                    required
                    onChange={(event) => whereBeeConstructor("whereIs", event.target.value)}/>
        </fieldset>
    </form>
    </>
)
}
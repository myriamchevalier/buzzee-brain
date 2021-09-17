import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const WhereBeeForm = () => {
    const [allItems, setAllItems] = useState([])
    const [item, updateItem] = useState({
        name: "",
        description: ""
    })
    const [whereBee, updateWhereBee] = useState({
        whereIs: ""
    })
    const history = useHistory()
    const currentUser = parseInt(localStorage.getItem("buzzeebrain_user"))


    const fetchAllItems = () => {
        fetch("http://localhost:8088/items")
        .then(res => res.json())
        .then(
            (data) => {
                setAllItems(data)
            }
        )
    }

    useEffect( () => {
        fetchAllItems()
    },
    []
    )

    const createWhereBee = (event) => {
        event.preventDefault()
        const newItem = {
            name: item.name,
            description: item.description
        }
        const fetchOptionsItem = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newItem)
        }
        
        fetch("http://localhost:8088/items", fetchOptionsItem)
        .then(fetchAllItems)
        .then(() => {
            const lastIndex = allItems.length
            const whereBeeItemId = lastIndex + 1

            const date = () => {
                let today = new Date();
                let dd = String(today.getDate()).padStart(2, '0');
                let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                let yyyy = today.getFullYear();

                today = `${mm}/${dd}/${yyyy}`;
                return today
            }
            const newWhereBee = {
                itemId: whereBeeItemId,
                userId: currentUser,
                whereIs: whereBee.whereIs,
                lastUpdated: date()
            }
            const fetchOptionsWhereBee = {
                method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newWhereBee)
            }
            fetch("http://localhost:8088/whereBeez", fetchOptionsWhereBee)
            .then(res => res.json())
            .then(() => {
                history.push("/wherebeez")
            })

        })
        
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
    <button onClick={createWhereBee}>Submit</button>
    </>
)
}
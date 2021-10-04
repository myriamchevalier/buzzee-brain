import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import './WhereBeeForm.css'

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

    useEffect(() => {
        fetchAllItems()
    },
        []
    )

    //~~~~invoked on Submit~~~~//
    //~~This function first creates an item, then fetches all items to grab the itemId,
    //~~ then creates the WhereBee with that information.
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
                    let hours = today.getHours();
                    let minutes = today.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2})
                    let seconds = today.getSeconds().toLocaleString('en-US', {minimumIntegerDigits: 2})

                    today = `${mm}/${dd}/${yyyy}, ${hours}:${minutes}:${seconds}`;
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

    // functions below to invoke onChange
    const itemConstructor = (propertyToModify, newValue) => {
        const copy = { ...item }
        copy[propertyToModify] = newValue
        updateItem(copy)
    }

    const whereBeeConstructor = (propertyToModify, newValue) => {
        const copy = { ...whereBee }
        copy[propertyToModify] = newValue
        updateWhereBee(copy)
    }
    return (
        <>
        <section className="bg-img">
            <h2 className="form__title">Out of the BuzzeeBrain, into the WhereBee</h2>
            <section className="form__placement">   
            <Form style={{width: '500px', marginLeft: '1rem'}}> 
                <Form.Group>
                    <Form.Label htmlFor="item">Item/Document</Form.Label>
                    <Form.Control type="text"
                        id="item"
                        required autoFocus
                        onChange={(event) => itemConstructor("name", event.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="description">Description</Form.Label>
                    <Form.Control as="textarea" rows={3}
                        id="description"
                        required
                        onChange={(event) => itemConstructor("description", event.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="where">Where is it?</Form.Label>
                    <Form.Control as="textarea" rows={3}
                        id="location"
                        required
                        onChange={(event) => whereBeeConstructor("whereIs", event.target.value)} />
                </Form.Group>
            </Form>
            <Button style={{backgroundColor:'#D389FB', borderColor:'#D389FB', color:'black', margin: '1rem'}}onClick={createWhereBee}>Submit</Button>
            </section>
            </section>
        </>
    )
}
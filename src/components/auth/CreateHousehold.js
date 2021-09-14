import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"

export const CreateHousehold = () => {
    const [household, createHousehold] = useState([])
    const history = useHistory()

    const saveHousehold = (event) => {
        event.preventDefault()
        const newHousehold = {
            name: household.name
        }
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newHousehold)
        }
        fetch("  http://localhost:8088/households", fetchOptions)
            .then(res => res.json())
            .then(
                () => history.push("/register")
            )
    }

    return (
        <>
            <h2>Create your household</h2>
            <form>
                <fieldset>
                    <label htmlFor="household">Household: </label>
                    <input type="text" placeholder="Type household name"
                        onChange={(event) => {
                            const copy = { ...household }
                            copy.name = event.target.value
                            createHousehold(copy)
                        }} />

                </fieldset>
            </form>

            <button onClick={saveHousehold}>Submit</button>

            <Link to="/register">
                <button>Cancel</button>
            </Link>
        </>
    )
}
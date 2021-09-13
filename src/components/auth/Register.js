import React, { useEffect, useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const [households, setHouseholds] = useState([])  //state needed to iterate through existing households
   // const [household, createHousehold] = useState({ name: "" }) //state to create new household
    const [user, setUser] = useState({})
    const conflictDialog = useRef()

    const history = useHistory()

    useEffect(
        () => {
            fetch("http://localhost:8088/households")
                .then(res => res.json())
                .then(
                    (data) => {
                        setHouseholds(data)
                    }
                )
            },
        []
    )

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(user => !!user.length)
    }
    const handleRegister = (e) => {
        e.preventDefault()
        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    fetch("http://localhost:8088/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(user)
                    })
                        .then(res => res.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("buzzeebrain_user", createdUser.id)
                                history.push("/")
                            }
                        })
                }
                else {
                    conflictDialog.current.showModal()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = { ...user }
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
        <dialog className="dialog dialog--password" ref={conflictDialog}>
            <div>Account with that email address already exists</div>
            <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
        </dialog>
            <form>
                <h1>Please Register for BuzzeeBrain</h1>
                <h2>Select or create your household</h2>

                <fieldset>
                    <label htmlFor="household--select">
                        <select onChange={updateUser}
                        id="householdId" className="form-control"
                        required >
                        <option>Select a household</option>
                            {households.map((household) => {
                               return <option key={`household--${household.id}`}>{household.name}</option>
                                })}
                        </select>
                    </label>
                    <Link to="/createhousehold"><button>Create new household</button></Link>
                </fieldset>
            </form>

            <form className="form--login" onSubmit={handleRegister}>
                <fieldset>
                    <label htmlFor="name"> Full Name </label>
                    <input onChange={updateUser}
                        type="text" id="name" className="form-control"
                        placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateUser} type="email" id="email" className="form-control" placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}


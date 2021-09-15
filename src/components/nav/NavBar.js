import React from "react"
import { Link } from "react-router-dom"
import './NavBar.css'

export const NavBar = () => {
    return (
        <>
            <ul className="navbar">
                <li className="navbar__item">
                    <Link className="navbar__link" to="/">Home</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/wherebeez">WhereBeez</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="#"
                        onClick={
                            () => {
                                localStorage.removeItem("buzzeebrain_user")
                            }
                        }>Logout</Link>
                </li>
            </ul>
        </>
    )
}
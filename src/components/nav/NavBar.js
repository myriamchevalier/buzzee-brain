import React from "react"
import { Link } from "react-router-dom"
import './NavBar.css'

export const NavBar = () => {
    return (
        <>
            <ul className="navbar__override">
                <div className="navbar__item">
                    <li>
                        <Link className="navbar__link" to="/">Home</Link>
                    </li>
                </div>
                <div className="navbar__item">
                    <li>
                        <Link className="navbar__link" to="/wherebeez">WhereBeez</Link>
                    </li>
                </div>
                <div className="navbar__item">
                    <li>
                        <Link className="navbar__link" to="#"
                            onClick={
                                () => {
                                    localStorage.removeItem("buzzeebrain_user")
                                }
                            }>Logout</Link>
                    </li>
                </div>
            </ul>
        </>
    )
}
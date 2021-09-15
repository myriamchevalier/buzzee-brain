import React from "react"
import { Link } from "react-router-dom";
import './LandingPage.css';


export const LandingPage = () => {


    return (
        <>
        <h1>My BuzzeeHive</h1>

        <div className="landing__description">Track your important items/documents and free your BuzzeeBrain</div>

        <section>
            <h4>I have x WhereBeez</h4>

            <Link to="./wherebeez"><div className="landing__view">View all Chevalier Household's WhereBeez</div></Link>

            <Link to="./wherebeez/create"><div className="landing__create">Create New WhereBee</div></Link>

        </section>
        </>
    )
}
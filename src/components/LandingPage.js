import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import './LandingPage.css';
import beehive from './images/Beehive.png';



export const LandingPage = () => {
    const [whereBeez, setWhereBeez] = useState([])
    const [userHouseholds, setUserHouseholds] = useState([])
    const currentUser = parseInt(localStorage.getItem("buzzeebrain_user"))

    //~~~~~HTTP requests for fetching data and setting state~~~~~~~~//
    useEffect(
        () => {
            fetch("http://localhost:8088/users?_expand=household")
                .then(res => res.json())
                .then((data) => setUserHouseholds(data))
        },
        []
    )
    useEffect(
        () => {
            fetch("http://localhost:8088/whereBeez?_expand=user&_expand=item&_sort=lastUpdated&_order=desc")
                .then(res => res.json())
                .then(
                    (data) => setWhereBeez(data))
        },
        []
    )

    //~~~~Code to build array containing only the last update of a given item~~~~//
    //~~~~Used here to get the length of the array of a given user's WBz~~~~//
    const uniqueWhereBeez = []

    whereBeez.forEach((wb) => {
        const hasWhereBee = uniqueWhereBeez.find((uniqueWhereBee) => (
            uniqueWhereBee.itemId === wb.itemId
        ));

        if (!hasWhereBee) {
            uniqueWhereBeez.push(wb)
            return uniqueWhereBeez;
        }
    })

    const whereBeezByUser = uniqueWhereBeez.filter((wb) => {
        return wb.userId === currentUser
    })

    const foundUserHousehold = userHouseholds.find((userHousehold) => {
        return userHousehold.id === currentUser
    })


    return (
        <>
            <h1 className="landing__title">{foundUserHousehold?.name}'s BuzzeeHive</h1>

            <h3 className="landing__numbers">I have {whereBeezByUser.length} WhereBeez</h3>

            <section className="landing__options">

                <Link to="./wherebeez" className="landing__view" >
                    <div className="card bg-white border border-white" style={{width:'300px'}}>
                        <img src={beehive} className="card-img" alt="beehive" />
                        <div className="card-img-overlay">
                            <h5 className="card-title">View all {foundUserHousehold?.household?.name}'s WhereBeez</h5>
                        </div>
                    </div>
        
                </Link>
                <Link to="./wherebeez/create">
                <div className="card bg-white border border-white" style={{width:'300px'}}>
                        <img src={beehive} className="card-img" alt="beehive" />
                        <div className="card-img-overlay">
                            <h5 className="card-title">Create New WhereBee</h5>
                        </div>
                    </div>

                </Link>

            </section>
        </>
    )
}


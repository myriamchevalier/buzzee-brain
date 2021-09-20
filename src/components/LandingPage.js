import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import './LandingPage.css';


export const LandingPage = () => {
    const [whereBeez, setWhereBeez] = useState([])
    const [userHouseholds, setUserHouseholds] = useState([])
    const currentUser = parseInt(localStorage.getItem("buzzeebrain_user"))

    //~~~~~HTTP requests for fetching data and setting state~~~~~~~~//
    useEffect(
        () => {
            fetch("http://localhost:8088/users?_expand=household")
            .then(res => res.json())
            .then( (data) => setUserHouseholds(data))
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
        return wb.userId === currentUser})

    const foundUserHousehold = userHouseholds.find((userHousehold) => {
        return userHousehold.id === currentUser
    })


    return (
        <>
        <h1>My BuzzeeHive</h1>

        <div className="landing__description">Track your important items/documents and free your BuzzeeBrain</div>

        <section>
            <h4>I have {whereBeezByUser.length} WhereBeez</h4>
            <section>
            <Link to="./wherebeez"><div className="landing__view">View all {foundUserHousehold?.household?.name}'s WhereBeez</div></Link>
            <Link to="./wherebeez/create"><div className="landing__create">Create New WhereBee</div></Link>

            </section>
        </section>
        </>
    )
}
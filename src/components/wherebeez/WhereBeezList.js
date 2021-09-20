import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { WhereBee } from "./WhereBee"
import './WhereBeezList.css'

export const WhereBeezList = () => {
    const [whereBeez, setWhereBeez] = useState([])
    const [viewAll, setViewAll] = useState(true)  // state variable for toggling view
    const [user, setUser] = useState({})
    const currentUser = parseInt(localStorage.getItem("buzzeebrain_user"))

    //~~~~~Fetching and setting state for WBz and users~~~~~~//
    const whereBeezFetcher = () => {
        fetch("http://localhost:8088/whereBeez?_expand=user&_expand=item&_sort=lastUpdated&_order=desc")
            .then(res => res.json())
            .then((data) => setWhereBeez(data)
            )
        }

    useEffect(() => whereBeezFetcher(),[])

    useEffect(
        () => {
            fetch(`http://localhost:8088/users/${currentUser}`)
                .then(res => res.json())
                .then((data) => setUser(data))
            },
        []
    )

    //~~~~Code to build array containing only the last update of a given item~~~~//
    //~~Works because HTTP request is sorted by desc order, by lastUpdated~~//
    const uniqueWhereBeez = []
    
    whereBeez.forEach((wb) => {
        const hasWhereBee = uniqueWhereBeez.find((uniqueWhereBee) => {
            return uniqueWhereBee.itemId === wb.itemId}
            );
            
            if (!hasWhereBee) {
                uniqueWhereBeez.push(wb)
                return uniqueWhereBeez;
            }
        })
    
    //~~~~Code to build array containing only specified household's WBz~~~~//
    const currentHousehold = user?.householdId
    const householdWhereBeez = uniqueWhereBeez.filter((uniqueWB) => {
        return currentHousehold === uniqueWB?.user?.householdId
    })

    //~~~~Array containing only user's WBz~~~~//
    const filteredWhereBeez = uniqueWhereBeez.filter((wb) => {
        return currentUser === wb.userId
    })

    //~~~~~variables for storing JSX to be rendered depending on viewing state~~~~~//
    const displayAll = (
        <section className="list">
            <div className="whereBeez">
                {
                    householdWhereBeez  .map(wb => <WhereBee key={wb.id} whereBee={wb} fetchWhereBeez={whereBeezFetcher} />)
                } 
            </div>
        </section>
    )

    const displayMine = (
        <section className="list">
            <div className="whereBeez">
                {
                    filteredWhereBeez.map(wb => <WhereBee key={wb.id} whereBee={wb} fetchWhereBeez={whereBeezFetcher} />)
                }
            </div>
        </section>
    )


    //~~~~~~~What the export function ultimately returns~~~~~//
    return (
        <>
            <h1>WhereBeez</h1>
            <section className="toggle--view">
                <input type="radio" name="viewChange" onChange={() => { setViewAll(false) }} /> Show My WhereBeez Only
                <input type="radio" name="viewChange" onChange={() => { setViewAll(true) }} /> Show All WhereBeez

                <Link to="/wherebeez/create"><div>Create New WhereBee</div></Link>
            </section>

            {viewAll ? displayAll : displayMine}

        </>
    )
}



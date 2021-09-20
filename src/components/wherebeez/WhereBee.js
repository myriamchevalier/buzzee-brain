import React, { useState } from "react";
import { unstable_concurrentAct } from "react-dom/test-utils";
import { useHistory } from "react-router-dom";
import './WhereBee.css';


export const WhereBee = ({ whereBee, fetchWhereBeez }) => {

    const [enableUpdate, setEnableUpdate] = useState(false)  //State for different views (update vs save or cancel update)

    const [whereBeeLocation, updateLocation] = useState({
        whereIs: ""
    }) //use this to track state of location
    const currentUser = parseInt(localStorage.getItem("buzzeebrain_user"))


    //~~~~function invoked at Save button~~~~//
    //~~~POSTs new whereBee with updated location and timestamp~~~~//
    const updateWherebee = () => {
        const date = () => {
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();
            let hours = today.getHours();
            let minutes = today.getMinutes()
            let seconds = today.getSeconds()

            today = `${mm}/${dd}/${yyyy}, ${hours}:${minutes}:${seconds}` ;
            return today;
        }
        const newWhereBee = {
            itemId: whereBee.itemId,
            userId: whereBee.userId,
            whereIs: whereBeeLocation.whereIs,
            lastUpdated: date()
        }
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newWhereBee)
        }

        fetch("http://localhost:8088/whereBeez", fetchOptions)
        .then(res => res.json())
        .then(fetchWhereBeez)
    }

    //~~~~function invoked on Delete~~~~//
    const deleteWhereBee = (id) => {
        fetch(`http://localhost:8088/wherebeez/${id}`, {
            method: "DELETE"
        })
        .then(fetchWhereBeez)
    }

    //~~~JSX to be rendered in different views~~~//
    const regularLocationDiv = (
        <div className="wherebee__where">
            <p>Location: </p>
            <p>{whereBee?.whereIs}</p>
        </div>
    )

    const updateLocationDiv = (
        <div className="wherebee__where">
            <p>Location: </p>
            <input type="text" placeholder={whereBee?.whereIs} 
                    onChange={(event) => {
                        const copy = { ...whereBeeLocation }
                        copy.whereIs = event.target.value
                        updateLocation(copy)
                    }}/>
        </div>
    )
    
    const updateButtonsOptions = (
        <div>
            <button onClick={updateWherebee}>Save</button>
            <button onClick={() => setEnableUpdate(false)}>Cancel</button>
        </div>
    )

    return (
        <>
            <article className="wherebee--card">
                <div className="wherebee__item">
                    <p>Item/Doc:</p>
                    <p>{whereBee?.item?.name}</p>
                </div>
                <div className="wherebee__description">
                    <p>Description: </p>
                    <p>{whereBee?.item?.description}</p>
                </div>
                <div className="wherebee__owner">
                    <p>Owner: </p>
                    <p>{whereBee?.user?.name}</p>
                </div>
                    {enableUpdate ? updateLocationDiv : regularLocationDiv}
                <div className="wherebee__updated">
                    <p>Last Updated:</p>
                    <p>{whereBee.lastUpdated}</p>
                </div>
                
                <div>
                    {enableUpdate ? updateButtonsOptions :
                    <button onClick={() => setEnableUpdate(true)}>Update</button>}
                </div>
                <div>
                    {currentUser === whereBee.userId ? 
                    <button onClick={() => {deleteWhereBee(whereBee.id)}}>Delete</button> : ""} 
                </div>
            </article>
        </>
    )
}
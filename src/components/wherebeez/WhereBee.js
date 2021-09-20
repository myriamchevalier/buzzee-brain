import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import './WhereBee.css';


export const WhereBee = ({ whereBee, fetchWhereBeez }) => {
    
    const [enableUpdate, setEnableUpdate] = useState(false)
    const [whereBeeLocation, updateLocation] = useState({
        whereIs: ""
    }) //use this to track state of location



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
            </article>
        </>
    )
}
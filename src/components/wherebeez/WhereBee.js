import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './WhereBee.css';


//Route for ind wherebee
//Iterate through array of wherebeez to get info
export const WhereBee = ({whereBee, updateWhereBeez}) => {
    const { whereBeeId } = useParams



    return (
        <>
        {
        whereBeeId ?
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
               <div className="wherebee__where">
                   <p>WhereBee? </p>
                   <p>{whereBee?.whereIs}</p>
               </div>
               <div className="wherebee__updated">
                   <p>Last updated:</p>
                   <p>{whereBee?.lastUpdated} </p>
               </div>
           </article>
           : 
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
           <div className="wherebee__where">
               <p>WhereBee? </p>
               <p>{whereBee?.whereIs}</p>
           </div>
           <div className="wherebee__updated">
               <p>Last updated:</p>
               <p>{whereBee?.lastUpdated} </p>
           </div>
       </article>

        }
        </>
    )
}
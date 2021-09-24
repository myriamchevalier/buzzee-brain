import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { CardGroup, FormGroup, Input, Label } from "reactstrap"
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
       
                <CardGroup className="list">
                {
                    householdWhereBeez  .map(wb => <WhereBee key={wb.id} whereBee={wb} fetchWhereBeez={whereBeezFetcher} />)
                } 
                </CardGroup>
            
       
    )

    const displayMine = (
        <CardGroup className="list">
                {
                    filteredWhereBeez.map(wb => <WhereBee key={wb.id} whereBee={wb} fetchWhereBeez={whereBeezFetcher} />)
                }
        </CardGroup>
    )


    //~~~~~~~What the export function ultimately returns~~~~~//
    return (
        <>
            <h1 className="wherebeez__title">WhereBeez</h1>
            <FormGroup className="view">
                <Label>
                <Input type="radio" name="viewChange" onChange={() => { setViewAll(false) }} /> Show My WhereBeez Only
                </Label>
                <Label>
                <Input type="radio" name="viewChange" onChange={() => { setViewAll(true) }} /> Show All WhereBeez
                </Label>
            </FormGroup>
                <Link to="/wherebeez/create" className="create__link" ><div className="create__div">Create New WhereBee</div></Link>

            {viewAll ? displayAll : displayMine}

        </>
    )
}



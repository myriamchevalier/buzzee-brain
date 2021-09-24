import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button, CardDeck, ButtonGroup, CardGroup, Input } from "reactstrap";
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
            let minutes = today.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2 })
            let seconds = today.getSeconds().toLocaleString('en-US', { minimumIntegerDigits: 2 })

            today = `${mm}/${dd}/${yyyy}, ${hours}:${minutes}:${seconds}`;
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
    const regularLocationDiv = <CardText>Location: {whereBee?.whereIs}</CardText>

    const updateLocationDiv = (
        <Input type="text" placeholder={whereBee?.whereIs}
            onChange={(event) => {
                const copy = { ...whereBeeLocation }
                copy.whereIs = event.target.value
                updateLocation(copy)
            }} />
    )

    const updateButtonsOptions = (
        <CardText>
            <Button onClick={updateWherebee}>Save</Button>
            <Button onClick={() => setEnableUpdate(false)}>Cancel</Button>
        </CardText>
    )

    return (
        <>
            <div>
                <Card className="wherebee__card" >
                    <CardImg top
                        width="100%"
                        src="https://clipartspub.com/images/bee-clipart-transparent-background-9.png"
                        alt="Flying bee" />

                    <CardTitle className="whereBee__title">WhereBee That Thing?</CardTitle>
                    <CardBody>
                        <CardSubtitle className="item__name">{whereBee?.item?.name}</CardSubtitle>
                        <CardText>{whereBee?.item?.description}</CardText>
                        <CardText>Owner: {whereBee?.user?.name}</CardText>
                        <CardGroup>{enableUpdate ? updateLocationDiv : regularLocationDiv} </CardGroup>
                        <CardText className="item__update">
                        <small className="text-muted">Last updated on {whereBee.lastUpdated}</small>
                        </CardText>
                        
                        <CardText className="buttons">{enableUpdate ? updateButtonsOptions :
                            <Button className="button" 
                            onClick={() => setEnableUpdate(true)}>Update</Button>}
                        {currentUser === whereBee.userId ?
                            <Button className="button" onClick={() => { deleteWhereBee(whereBee.id) }}>Delete</Button> : ""} 
                        </CardText>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}
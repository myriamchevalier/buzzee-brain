
import React, { useState } from "react";
import { Card, Button, ButtonToolbar, ButtonGroup } from "react-bootstrap";
import './WhereBee.css';


export const WhereBee = ({ whereBee, fetchWhereBeez }) => {

    const [enableUpdate, setEnableUpdate] = useState(false)
    const [whereBeeLocation, updateLocation] = useState({
        whereIs: ""
    }) //use this to track state of location
    const currentUser = parseInt(localStorage.getItem("buzzeebrain_user"))



    const updateWherebee = () => {
        const date = () => {
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();
            let hours = today.getHours();
            let minutes = today.getMinutes()
            let seconds = today.getSeconds()

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

    const deleteWhereBee = (id) => {
        fetch(`http://localhost:8088/items/${whereBee.itemId}`, {
            method: "DELETE"
        })
            .then(fetchWhereBeez)
    }


    const regularLocationDiv = (
        <Card.Text>
            Location:
            {whereBee?.whereIs}
        </Card.Text>
    )
    const updateLocationDiv = (
        <Card.Text>
            Location:
            <input type="text" placeholder={whereBee?.whereIs}
                onChange={(event) => {
                    const copy = { ...whereBeeLocation }
                    copy.whereIs = event.target.value
                    updateLocation(copy)
                }} />
        </Card.Text>
    )
    const updateButtonsOptions = (
       <>
            <Button style={{backgroundColor:'#FDC500', borderColor:'#FDC500', color:'black'}}
            onClick={updateWherebee}>Save</Button>
            <Button style={{backgroundColor:'#5C0099', borderColor:'#5C0099', color:'white'}}
            onClick={() => setEnableUpdate(false)}>Cancel</Button>
        </>
    )

    return (
        <>
            <Card  style={{ width: '18rem', bordercolor:'#FDC500' }}>
                <Card.Img variant="top" src="https://clipartspub.com/images/bee-clipart-transparent-background-9.png" />
                <Card.Body style={{backgroundColor:'rgb(255, 213, 0, 0.55)'}}>
                    <Card.Title style={{ fontSize: '1.5rem' }}>WhereBee That Thing?</Card.Title>
                    <Card.Title>{whereBee?.item?.name}</Card.Title>
                    <Card.Subtitle style={{ color: 'black' }}>{whereBee?.item?.description}</Card.Subtitle>
                    <Card.Text style={{marginTop: '1rem'}}>
                        Owner: {whereBee?.user?.name}
                    </Card.Text>

                    {enableUpdate ? updateLocationDiv : regularLocationDiv}

                    <Card.Text>
                        Last updated: {whereBee.lastUpdated}
                    </Card.Text>
                    <ButtonToolbar>
                    {enableUpdate ? updateButtonsOptions :
                        <Button style={{backgroundColor:'#FDC500', borderColor:'#FDC500', color:'black'}}
                        onClick={() => setEnableUpdate(true)}>Update</Button>}


                    {currentUser === whereBee.userId && !enableUpdate ?
                        <Button style={{backgroundColor:'#D389FB', borderColor:'#D389FB', color:'black'}}
                        onClick={() => { deleteWhereBee(whereBee.id) }}>Delete</Button> : ""}
                    </ButtonToolbar>
                </Card.Body>
            </Card>

        </>
    )
}

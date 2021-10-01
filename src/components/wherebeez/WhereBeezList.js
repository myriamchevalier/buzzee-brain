import React, { useEffect, useState } from "react"
import { InputGroup } from "react-bootstrap"
import { Link } from "react-router-dom"
import { WhereBee } from "./WhereBee"
import './WhereBeezList.css'

export const WhereBeezList = () => {
    const [whereBeez, setWhereBeez] = useState([])
    const [viewAll, setViewAll] = useState(true)  // state variable for toggling view
    const [user, setUser] = useState({})
    const currentUser = parseInt(localStorage.getItem("buzzeebrain_user"))


    const whereBeezFetcher = () => {
        fetch("http://localhost:8088/whereBeez?_expand=user&_expand=item&_sort=lastUpdated&_order=desc")
            .then(res => res.json())
            .then(
                (data) => {
                    setWhereBeez(data)
                }
            )
    }

    useEffect(
        () => {
            whereBeezFetcher()
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/users/${currentUser}`)
                .then(res => res.json())
                .then((data) => setUser(data))
        },
        []
    )

    const uniqueWhereBeez = []

    whereBeez.forEach((wb) => {
        const hasWhereBee = uniqueWhereBeez.find((uniqueWhereBee) => {
            return uniqueWhereBee.itemId === wb.itemId
        }
        );

        if (!hasWhereBee) {
            uniqueWhereBeez.push(wb)
            return uniqueWhereBeez;
        }
    })

    const currentHousehold = user?.householdId
    const householdWhereBeez = uniqueWhereBeez.filter((uniqueWB) => {
        return currentHousehold === uniqueWB?.user?.householdId
    })



    const filteredWhereBeez = uniqueWhereBeez.filter((wb) => {
        return currentUser === wb.userId
    })

    const displayAll = (
        <section className="list">
            <div className="whereBeez">
                {
                    householdWhereBeez.map(wb => <WhereBee key={wb.id} whereBee={wb} fetchWhereBeez={whereBeezFetcher} />)
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

    return (
        <>
            <h1 className="title">WhereBeez</h1>
            <section className="toggle__view">
                <InputGroup>
                    <InputGroup.Radio label="Show My WhereBeez Only" name="viewChange" onChange={() => { setViewAll(false) }} />
                    <InputGroup.Text>Show My WhereBeez Only</InputGroup.Text>
                </InputGroup>
                <InputGroup>
                    <InputGroup.Radio label="Show All WhereBeez " tname="viewChange" onChange={() => { setViewAll(true) }} />
                    <InputGroup.Text>Show All WhereBeez</InputGroup.Text>
                </InputGroup>

            </section>
            <Link to="/wherebeez/create"><div>Create New WhereBee</div></Link>

            {viewAll ? displayAll : displayMine}

        </>
    )
}



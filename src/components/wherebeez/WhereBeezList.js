import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { WhereBee } from "./WhereBee"
import './WhereBeezList.css'

export const WhereBeezList = () =>{
    const [whereBeez, setWhereBeez] = useState([])
    const [viewAll, setViewAll] = useState(true)   // state variable for toggling view
    
    const currentUser = parseInt(localStorage.getItem("buzzeebrain_user"))

    useEffect(
        () => {
            fetch("http://localhost:8088/whereBeez?_expand=user&_expand=item")
            .then(res => res.json())
            .then(
                (data) => {
                    setWhereBeez(data)
                }
            )
        },
        []
    )

    const filteredWhereBeez = whereBeez.filter((wb) => {
        return currentUser === wb.userId
    })
    
    const displayAll = (
        <section className="list">
            <div className="whereBeez">
            {
                whereBeez.map(wb => <WhereBee key={wb.id} whereBee={wb} updateWhereBeez= {setWhereBeez} />)
            }
            </div>
        </section>
    )

    const displayMine = (
        <section className="list">
            <div className="whereBeez">
            {
                filteredWhereBeez.map(wb => <WhereBee key={wb.id} whereBee={wb} updateWhereBeez= {setWhereBeez} />)
            }
            </div>
        </section>
    )
    
    return (
        <>
            <h1>WhereBeez</h1>
                <section className="toggle--view">
                    <input type="radio" name="viewChange" onChange={() => {setViewAll(false)}}/> Show My WhereBeez Only
                    <input type="radio" name="viewChange" onChange={() => {setViewAll(true)}}/> Show All WhereBeez

                <Link to="/wherebeez/create"><div>Create New WhereBee</div></Link>
                </section>

                {viewAll ? displayAll : displayMine}

        </>
    )
}



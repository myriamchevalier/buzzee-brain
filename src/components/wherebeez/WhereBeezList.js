import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { WhereBee } from "./WhereBee"
import './WhereBeezList.css'

export const WhereBeezList = () =>{
    const [whereBeez, setWhereBeez] = useState([])
    const [viewAll, setViewAll] = useState(true)  // state variable for toggling view
    
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

    //conditional ? 


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



    

    const filteredWhereBeez = uniqueWhereBeez.filter((wb) => {
        return currentUser === wb.userId
    })
    
    const displayAll = (
        <section className="list">
            <div className="whereBeez">
            {
                uniqueWhereBeez.map(wb => <WhereBee key={wb.id} whereBee={wb} fetchWhereBeez= {whereBeezFetcher} />)
            }
            </div>
        </section>
    )

    const displayMine = (
        <section className="list">
            <div className="whereBeez">
            {
                filteredWhereBeez.map(wb => <WhereBee key={wb.id} whereBee={wb} fetchWhereBeez= {whereBeezFetcher} />)
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



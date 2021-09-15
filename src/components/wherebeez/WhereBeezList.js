import React, { useEffect, useState } from "react"
import { WhereBee } from "./WhereBee"
import './WhereBeezList.css'

export const WhereBeezList = () =>{
    const [whereBeez, setWhereBeez] = useState([])

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

    return (
        <>
            <section className="list">
               
                <div className="whereBeez">
                {
                    whereBeez.map(wb => <WhereBee key={wb.id} whereBee={wb} updateWhereBeez= {setWhereBeez} />)
                }
                </div>
        
            </section>
        </>
    )
}
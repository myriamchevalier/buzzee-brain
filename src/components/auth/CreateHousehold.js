import React, { useState } from "react"

export const CreateHousehold = () => {
    const [household, createHousehold] = useState([])

    return (
        <>
            <h2>Create your household</h2>
            <form>
                <fieldset>
                    <label>
                    <input type="text" placeholder="household name"/>
                    </label>
                </fieldset>
            </form>        
        </>
    )
}
import React from "react"
import { Route } from "react-router-dom"
import { LandingPage } from "./LandingPage"
import { WhereBeeForm } from "./wherebeez/WhereBeeForm"


export const ApplicationViews = () => {
    return (
        <>
        <Route exact path="/">
            <LandingPage />
        </Route>  
        <Route path="/wherebeez/create">
            <WhereBeeForm />
        </Route>  

        </>
    )
}
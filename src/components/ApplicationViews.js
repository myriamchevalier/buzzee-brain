import React from "react"
import { Route } from "react-router-dom"
import { LandingPage } from "./LandingPage"
import { WhereBee } from "./wherebeez/WhereBee"
import { WhereBeeForm } from "./wherebeez/WhereBeeForm"
import { WhereBeezList } from "./wherebeez/WhereBeezList"


export const ApplicationViews = () => {
    return (
        <>
        <Route exact path="/">
            <LandingPage />
        </Route>  
        <Route path="/wherebeez/create">
            <WhereBeeForm />
        </Route>  
        <Route path="/wherebeez/:whereBeeId(\d+)">
            <WhereBee />
        </Route>
        <Route exact path="/wherebeez">
            <WhereBeezList />
        </Route>

        </>
    )
}
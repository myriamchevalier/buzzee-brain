import React from "react"
import { Route } from "react-router-dom"
import { LandingPage } from "./LandingPage"


export const ApplicationViews = () => {
    return (
        <>
          <Route path="/">
                <LandingPage />
            </Route>  
        </>
    )
}
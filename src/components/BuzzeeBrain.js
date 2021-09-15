import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
// import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { CreateHousehold } from "./auth/CreateHousehold";
import './BuzzeeBrain.css';


export const BuzzeeBrain = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("buzzeebrain_user")) {
          return (
            <>
              {/* <NavBar /> */}
              <ApplicationViews />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/register/createhousehold">
        <CreateHousehold />
    </Route>
    <Route path="/login">
      <Login />
    </Route>
    <Route exact path="/register">
      <Register />
    </Route>
    
  </>
);

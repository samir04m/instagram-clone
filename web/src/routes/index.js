import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Main from "../pages/Main";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const Routes = () => {
    return (
        <BrowserRouter>

            <ToastContainer
                position="top-center"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable
                pauseOnHover
            />
            
            <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/signup" component={SignUp} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
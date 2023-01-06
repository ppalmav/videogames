import React from "react";
import NavBar from "../NavBar/NavBar";
import notFound from '../../img/notfound.gif'
// import { NavLink } from "react-router-dom";
import './error404.css'

export default function Error404(){
    return(
        <>
        <NavBar/>
        <div className="div-error">
            <h2 className="title-error"> OOPS! Page not found (404), look up the menu and CHOOSE YOUR DESTINY! 
                </h2>
            <img className="notfound" src={notFound} alt=""></img>
        </div>
        </>
    )
}
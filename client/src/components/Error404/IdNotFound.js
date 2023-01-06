import React from "react";
import NavBar from "../NavBar/NavBar";
import notFound from '../../img/notfound.gif'

export default function IdNotFound({errorName}){

    return(
        <>
        <NavBar/>
        <div className="div-error">
            <h2 className="title-error"> ERROR: {errorName} look up the menu and CHOOSE YOUR DESTINY! 
                </h2>
            <img className="notfound" src={notFound} alt=""></img>
        </div>
        </>
    )
}
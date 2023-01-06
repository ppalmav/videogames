import React from 'react'
import './NavBar.css'
import { NavLink } from 'react-router-dom'

function NavBar() {
    return (
        <div className="nav-btns">
            
                <NavLink to="/"><button><strong>Landing</strong></button></NavLink>
                <NavLink to="/home"><button><strong>Home</strong></button></NavLink>
                {/* <NavLink to="/videogames"><button><strong>Videogames</strong></button></NavLink> */}
                <NavLink to="/newgame"><button><strong>New Game</strong></button></NavLink>
           
        </div>
    )
}

export default NavBar
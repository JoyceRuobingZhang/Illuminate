import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
import logo from './logo.png'

export const NavBar = () => {
    return (
        <div className="nav_container">
            <img src={logo} alt="illuminate logo" width="250"/>
            <ul className="navbar">
                <li className="navbar__item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>

                <li className="navbar__item">
                    <Link className="nav-link" to="/games">Games</Link>
                </li>
            
                <li className="navbar__item">
                    <Link className="nav-link" to="/events">Events</Link>
                </li>
                
                <li className="navbar__item">
                    <Link className="nav-link" to="/profile">Your Profile</Link>
                </li>
                {
                (localStorage.getItem("lu_token") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("lu_token")
                                history.push({ pathname: "/" })
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
                }        
            </ul>
        </div>
    )
}

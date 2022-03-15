import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"
import logo from './logo.png'

export const NavBar = () => {
    const history = useHistory()
    return (
        <div className="nav_container">
            <img src={logo} alt="illuminate logo" className="logo_nav"/>

            <ul className="navbar">
                <li className="navbar__item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>

                <li className="navbar__item">
                    <Link className="nav-link" to="/services">Services</Link>
                </li>
            
                <li className="navbar__item">
                    <Link className="nav-link" to="/events">Events</Link>
                </li>

                <li className="navbar__item">
                    <Link className="nav-link" to="/posts">Posts</Link>
                </li>
                
                {/* <li className="navbar__item">
                    <Link className="nav-link" to="/profile">Your Profile</Link>
                </li> */}
                {
                (localStorage.getItem("illuminate_token") !== null) ?
                    <li className="navbar__item">
                        <button className="nav-link btn"
                            onClick={() => {
                                localStorage.removeItem("illuminate_token")
                                localStorage.removeItem("illuminate_login_appuser")
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

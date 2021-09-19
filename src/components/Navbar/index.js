import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="nav-styles">
            <NavLink
                activeClassName="link-active"
                className="link"
                to="/dashboard"
            >
                Home
            </NavLink>
            <NavLink
                activeClassName="link-active"
                className="link"
                to="/progress"
            >
                Progress
            </NavLink>
            <NavLink
                activeClassName="link-active"
                className="link"
                to="/live-stuff"
            >
                Live Stuff
            </NavLink>
            <NavLink
                activeClassName="link-active"
                className="link"
                to="/analytics"
            >
                Analytics
            </NavLink>
        </nav>
    )
}

export default Navbar

import React from 'react'
import { NavLink } from 'react-router-dom'
import { navConstants } from 'constants/navigationConstants'

function Navbar() {
    const navigationComponent = navConstants.map((ele) => (
        <NavLink
            key={ele.route}
            activeClassName="link-active"
            className="link"
            to={ele.route}
        >
            {ele.tab_name}
        </NavLink>
    ))
    return <nav className="nav-styles">{navigationComponent}</nav>
}

export default Navbar

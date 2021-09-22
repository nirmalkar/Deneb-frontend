import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { navConstants } from 'constants/navigationConstants'
import { AuthContext } from 'contexts/AuthContext'
import Button from 'components/DesignSystem/Button'

function Navbar() {
    const { logoutUser } = useContext(AuthContext)
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
    return (
        <nav className="nav-styles">
            {navigationComponent}
            <div className="nav-logout">
                <Button onClick={() => logoutUser()}>Logout</Button>
            </div>
        </nav>
    )
}

export default Navbar

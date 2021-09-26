import React, { useEffect, useContext } from 'react'

import { AuthContext } from 'contexts/AuthContext'
import Navbar from 'components/Navbar'

function Dashboard() {
    const { checkUserAuthorization } = useContext(AuthContext)

    useEffect(() => {
        checkUserAuthorization()
        return () => {}
    }, [])

    return (
        <>
            <Navbar />
        </>
    )
}

export default Dashboard

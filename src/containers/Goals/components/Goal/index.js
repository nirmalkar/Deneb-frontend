import React, { useContext, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { GoalsContext } from 'contexts/GoalsContext'
// import Card from 'components/DesignSystem/Card'
// import { Col, Row } from 'antd'
import Navbar from 'components/Navbar'
import { AuthContext } from 'contexts/AuthContext'
import { Col, Row } from 'antd'

const Goal = React.memo((props) => {
    const { match } = props
    const { fetchGoals, goals } = useContext(GoalsContext)
    const userId = localStorage.getItem('id')
    const id = match.params.id
    const { checkUserAuthorization } = useContext(AuthContext)

    useEffect(() => {
        async function fetchData(userId) {
            checkUserAuthorization()
            fetchGoals({ userId })
        }
        if (userId && fetchGoals && !goals.length) {
            fetchData(userId)
        }
    }, [])

    const goalObj = goals?.find((ele) => ele._id === id)
    const goal = goalObj?.goal
    console.log(goal)
    const goalComponent = (
        <Row justify="center">
            <Col md={18}>
                <div className="m-5">
                    <h2>{goal?.title.toUpperCase()}</h2>
                </div>
            </Col>
        </Row>
    )
    return (
        <>
            <Navbar />
            {goalComponent}
        </>
    )
})

Goal.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string,
        }).isRequired,
    }).isRequired,
}
export default Goal

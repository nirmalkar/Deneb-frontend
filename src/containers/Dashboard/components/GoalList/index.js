import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { GoalsContext } from 'contexts/GoalsContext'
import Card from 'components/DesignSystem/Card'
import { Col, Row } from 'antd'

const GoalList = React.memo(() => {
    const { fetchGoals, goals } = useContext(GoalsContext)
    const userId = localStorage.getItem('id')

    useEffect(() => {
        async function getGoals(userId) {
            fetchGoals({ userId })
        }
        if (userId && fetchGoals) {
            getGoals(userId)
        }
    }, [])

    const listGoalsComponent = goals.map((ele) => (
        <div key={ele._id} className="my-2">
            <Card>
                <Link to={`/${ele._id}`}>{ele?.goal?.title}</Link>
            </Card>
        </div>
    ))

    return (
        <Row justify="center" className="mt-5">
            <Col sm={22} md={18} lg={12}>
                {listGoalsComponent}
            </Col>
        </Row>
    )
})

export default GoalList

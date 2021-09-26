import React, { useEffect, useState, useContext } from 'react'
import Button from 'components/DesignSystem/Button'

import { AuthContext } from 'contexts/AuthContext'
import Navbar from 'components/Navbar'
import CreateGoalModal from 'components/CreateGoalModal'
import { GoalsProvider } from 'contexts/GoalsContext'
import GoalList from './components/GoalList'

function Dashboard() {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const { checkUserAuthorization } = useContext(AuthContext)

    useEffect(() => {
        checkUserAuthorization()
        return () => {}
    }, [])

    const onCancel = () => {
        setIsModalVisible(!isModalVisible)
    }
    const onCreateGoalOk = () => {
        setIsModalVisible(!isModalVisible)
    }

    return (
        <GoalsProvider>
            <Navbar />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '2rem',
                }}
            >
                <Button
                    onClick={() => setIsModalVisible(!isModalVisible)}
                    type="primary"
                >
                    Create Goal
                </Button>
            </div>
            <GoalList />
            <CreateGoalModal
                setIsModalVisible={setIsModalVisible}
                isModalVisible={isModalVisible}
                onCreateGoalOk={onCreateGoalOk}
                onCancel={onCancel}
            />
        </GoalsProvider>
    )
}

export default Dashboard

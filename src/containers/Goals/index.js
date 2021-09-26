import React, { useEffect, useState, useContext } from 'react'
import Button from 'components/DesignSystem/Button'

import { AuthContext } from 'contexts/AuthContext'
import Navbar from 'components/Navbar'
import CreateGoalModal from 'components/CreateGoalModal'
import GoalList from '../Goals/components/GoalList'

function Goals() {
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
        <>
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
        </>
    )
}

export default Goals

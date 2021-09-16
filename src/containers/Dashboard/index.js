import React, { useEffect, useState, useContext } from 'react'
import { Button } from 'antd'

import Modal from 'components/modal'
import { AuthContext } from 'contexts/AuthContext'

function Dashboard() {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const { checkUserAuthorization, logoutUser } = useContext(AuthContext)

    useEffect(() => {
        checkUserAuthorization()
    }, [])

    const onCancel = () => {
        setIsModalVisible(!isModalVisible)
    }
    const onCreateGoalOk = () => {
        setIsModalVisible(!isModalVisible)
    }
    return (
        <div>
            <Modal
                visible={isModalVisible}
                onOk={onCreateGoalOk}
                onCancel={onCancel}
            >
                asdfs
            </Modal>
            <Button
                onClick={() => setIsModalVisible(!isModalVisible)}
                type="primary"
            >
                Create goal
            </Button>
            <Button onClick={() => logoutUser()}>Logout</Button>
        </div>
    )
}

export default Dashboard

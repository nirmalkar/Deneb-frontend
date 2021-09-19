import React, { useEffect, useState, useContext } from 'react'
import { Button } from 'antd'

import Modal from 'components/modal'
import { AuthContext } from 'contexts/AuthContext'
import Input from 'components/Input'
import Navbar from 'components/Navbar'

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
        <>
            <Navbar />
            <Modal
                visible={isModalVisible}
                onOk={onCreateGoalOk}
                onCancel={onCancel}
            >
                <Input />
            </Modal>
            <Button
                onClick={() => setIsModalVisible(!isModalVisible)}
                type="primary"
            >
                Create Goal
            </Button>
            <Button onClick={() => logoutUser()}>Logout</Button>
        </>
    )
}

export default Dashboard

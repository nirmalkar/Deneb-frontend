import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import Modal from 'components/modal'

function Dashboard() {
    const [goals, setGoals] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false)
    const history = useHistory()
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('user_id')
    console.log(goals)
    useEffect(() => {
        const fetchGoals = async () => {
            if (token) {
                try {
                    const goals = await axios.get(
                        `https://lyftrac.herokuapp.com/api/goals/${userId}`,
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    )
                    setGoals(goals.data)
                } catch (e) {
                    console.log(e)
                }
            } else {
                history.push('/')
            }
        }
        fetchGoals()
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
        </div>
    )
}

export default Dashboard

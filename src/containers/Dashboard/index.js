import React, { useEffect, useState, useContext } from 'react'
import { Form, Button, message } from 'antd'
import { v4 as uuid } from 'uuid'

import Modal from 'components/modal'
import { AuthContext } from 'contexts/AuthContext'
import { Input } from 'components/Input'
import Navbar from 'components/Navbar'
import { Select, Options } from 'components/Select'
import { typeList } from 'constants/goalConstants'
import axios from 'axios'
import { BASE_URL, getAuthHeaders } from 'constants/authConstants'

const initialGoalState = {
    user_id: '',
    title: '',
    type: 'Monthly',
    image: '',
    children: [],
    progress: {
        progress: 0,
        startsAt: 0,
        target: 100,
    },
    isCompleted: false,
}

function Dashboard() {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const { checkUserAuthorization, logoutUser, user } = useContext(AuthContext)
    const [goal, setGoal] = useState(initialGoalState)

    useEffect(() => {
        checkUserAuthorization()
    }, [])

    const onCancel = () => {
        setIsModalVisible(!isModalVisible)
    }
    const onCreateGoalOk = () => {
        setIsModalVisible(!isModalVisible)
    }
    const submitGoal = async (goal) => {
        if (!goal.title) return message.error('Please enter title')
        goal.user_id = user._id
        const token = localStorage.getItem('token')
        try {
            axios.post(`${BASE_URL}/goals`, { goal }, getAuthHeaders(token))
        } catch (err) {
            console.log(err)
        }
    }
    const handleFromData = (e, name) => {
        if (name) {
            setGoal({
                ...goal,
                [name]: e,
            })
        } else if (e.target.name === 'progress') {
            setGoal({
                ...goal,
                progress: {
                    ...goal.progress,
                    progress: parseInt(e.target.value),
                },
            })
        } else {
            setGoal({
                ...goal,
                [e.target.name]: e.target.value,
            })
        }
    }
    const goalTypeOptions = typeList.map((ele) => (
        <Options key={ele.type} value={ele.type}>
            {ele.type}
        </Options>
    ))
    const addChildren = () => {
        setGoal({
            ...goal,
            children: [
                ...goal.children,
                {
                    cid: uuid(),
                    title: '',
                    progress: {
                        progress: 0,
                        startsAt: 0,
                        target: 100,
                    },
                },
            ],
        })
    }
    const handleChildrenInput = (e, id) => {
        const indexOfChildren = goal.children.findIndex((a) => a.cid === id)
        const updatedChildren = goal.children
        updatedChildren[indexOfChildren].title = e.target.value
        setGoal({
            ...goal,
            children: updatedChildren,
        })
    }
    const keyResultInput = goal.children.map((ele) => {
        const id = ele.cid
        return (
            <>
                <Form.Item
                    key={id}
                    label="Key Result"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Goal`s progress!',
                        },
                    ]}
                >
                    <Input
                        name="progress"
                        onChange={(e) => handleChildrenInput(e, id)}
                    />
                </Form.Item>
            </>
        )
    })

    return (
        <>
            <Navbar />
            <Modal
                visible={isModalVisible}
                onOk={onCreateGoalOk}
                onCancel={onCancel}
                footer={null}
            >
                <Form
                    onFinish={() => submitGoal(goal)}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Form.Item
                        label="Title"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Goal`s Title!',
                            },
                        ]}
                    >
                        <Input
                            value={goal.title}
                            name="title"
                            onChange={(e) => handleFromData(e)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Type"
                        rules={[
                            {
                                required: true,
                                message: 'Please select goal type!',
                            },
                        ]}
                    >
                        <Select
                            name="type"
                            style={{ width: 200 }}
                            onChange={(e) => handleFromData(e, 'type')}
                            defaultValue={goal.type}
                        >
                            {goalTypeOptions}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Progress"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Goal`s progress!',
                            },
                        ]}
                    >
                        <Input
                            defaultValue={goal.progress.progress}
                            name="progress"
                            onChange={(e) => handleFromData(e)}
                        />
                    </Form.Item>
                    {keyResultInput}
                    <Button onClick={() => addChildren()}>
                        Add KeyResults
                    </Button>
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <Button
                            onClick={() => setIsModalVisible(!isModalVisible)}
                        >
                            Cancel
                        </Button>
                        &nbsp;&nbsp;
                        <Button htmlType="submit" type="primary">
                            Ok
                        </Button>
                    </div>
                </Form>
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

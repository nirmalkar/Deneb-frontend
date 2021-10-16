import React, { useContext, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Form, Button, message } from 'antd'
import propTypes from 'prop-types'

import { Input } from 'components/DesignSystem/Input'
import Modal from 'components/DesignSystem/modal'
import { Select, Options } from 'components/DesignSystem/Select'
import { typeList } from 'constants/goalConstants'
import axios from 'axios'
import { BASE_URL, getAuthHeaders } from 'constants/authConstants'
import { AuthContext } from 'contexts/AuthContext'

const initialGoalState = {
    user_id: '',
    title: '',
    type: 'Monthly',
    image: '',
    children: [],
    progress: {
        progress: '',
        startsAt: 0,
        target: 100,
    },
    isCompleted: false,
}

function CreateGoalModal({
    setIsModalVisible,
    isModalVisible,
    onCreateGoalOk,
    onCancel,
}) {
    const [goal, setGoal] = useState(initialGoalState)
    const { user } = useContext(AuthContext)

    const submitGoal = async (goal) => {
        if (!goal.title) return message.error('Please enter title')
        if (!goal.type) return message.error('Please select type')
        if (!goal.progress.progress)
            return message.error('Please enter progress')
        goal.user_id = user._id
        const token = localStorage.getItem('token')
        try {
            axios.post(`${BASE_URL}/goals`, { goal }, getAuthHeaders(token))
            setGoal(initialGoalState)
            setIsModalVisible(!isModalVisible)
            message.success('Goal created successfully!')
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

    const handleChildrenInput = (e, id) => {
        const indexOfChildren = goal.children.findIndex((a) => a.key === id)
        const updatedChildren = goal.children
        updatedChildren[indexOfChildren].title = e.target.value
        setGoal({
            ...goal,
            children: updatedChildren,
        })
    }
    const addChildren = () => {
        setGoal({
            ...goal,
            children: [
                ...goal.children,
                {
                    key: uuid(),
                    icon: '',
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
    const keyResultInput = goal.children.map((ele) => {
        const id = ele.key
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
                        style={{ width: 315 }}
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
                        value={goal.progress.progress}
                        name="progress"
                        onChange={(e) => handleFromData(e)}
                    />
                </Form.Item>
                {keyResultInput}
                <Button onClick={() => addChildren()}>Add KeyResults</Button>
                <div style={{ display: 'flex', justifyContent: 'end' }}>
                    <Button onClick={() => setIsModalVisible(!isModalVisible)}>
                        Cancel
                    </Button>
                    &nbsp;&nbsp;
                    <Button htmlType="submit" type="primary">
                        Ok
                    </Button>
                </div>
            </Form>
        </Modal>
    )
}

CreateGoalModal.propTypes = {
    setIsModalVisible: propTypes.func.isRequired,
    isModalVisible: propTypes.bool.isRequired,
    onCreateGoalOk: propTypes.func.isRequired,
    onCancel: propTypes.func.isRequired,
}

export default CreateGoalModal

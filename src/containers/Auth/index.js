import GoogleLogin from 'react-google-login'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Form, Tabs } from 'antd'

import { AuthContext } from 'contexts/AuthContext'

import { Input } from 'components/DesignSystem/Input'
import Card from 'components/DesignSystem/Card'
import Button from 'components/DesignSystem/Button'

import GoogleImg from '../../assets/images/google.png'

const { REACT_APP_CLIENT_ID } = process.env

const Auth = () => {
    const { responseGoogle, authenticateUser } = useContext(AuthContext)
    const [tab, setTab] = useState('register')
    const history = useHistory()

    const { TabPane } = Tabs

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            history.push('/dashboard')
        }
        document.getElementById('name').focus()
    }, [])

    const submitRegistrationForm = (userData, tab) => {
        authenticateUser({ userData, tab })
    }

    return (
        <div className="auth-container">
            <div className="auth-row">
                <Card bordered={false}>
                    <Form
                        labelCol={{
                            span: 5,
                        }}
                        wrapperCol={{
                            span: 18,
                        }}
                        layout="horizontal"
                        initialValues={{
                            size: 'default',
                        }}
                        size={'default'}
                        autoComplete="off"
                        onFinish={(e) => submitRegistrationForm(e, tab)}
                    >
                        <Tabs
                            destroyInactiveTabPane={true}
                            defaultActiveKey={tab}
                            onChange={(tab) => setTab(tab)}
                            type="card"
                        >
                            <TabPane tab="Register" key="register">
                                <Form.Item
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Name!',
                                        },
                                    ]}
                                    aria-label="register-input"
                                    label="Name"
                                    name="name"
                                >
                                    <Input
                                        data-testid="confirm-checkbox"
                                        id="name"
                                        placeholder="Name"
                                    />
                                </Form.Item>
                                <Form.Item
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Email!',
                                        },
                                    ]}
                                    label="Email"
                                    name="email"
                                >
                                    <Input placeholder="Email" />
                                </Form.Item>
                                <Form.Item
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your Password!',
                                        },
                                    ]}
                                    label="Password"
                                    name="password"
                                >
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>
                            </TabPane>
                            <TabPane tab="Login" key="login">
                                <Form.Item
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Email!',
                                        },
                                    ]}
                                    label="Email"
                                    name="email"
                                >
                                    <Input id="email" placeholder="Email" />
                                </Form.Item>
                                <Form.Item
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your Password!',
                                        },
                                    ]}
                                    label="Password"
                                    name="password"
                                >
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>
                            </TabPane>
                        </Tabs>
                        <Button type="primary" block htmlType="submit">
                            Submit
                        </Button>
                    </Form>
                    <div className="auth-google-div">Or</div>
                    <img className="google-img" src={GoogleImg} alt="asd" />
                    <GoogleLogin
                        clientId={REACT_APP_CLIENT_ID}
                        render={(renderProps) => (
                            <button
                                onClick={renderProps.onClick}
                                className="google-btn"
                            >
                                Sign In with Google
                            </button>
                        )}
                        buttonText="Login"
                        uxMode="popup"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </Card>
            </div>
        </div>
    )
}

export default Auth

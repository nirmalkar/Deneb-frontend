import GoogleLogin from 'react-google-login'
import React, { useContext, useEffect, useState } from 'react'
import { Form, Tabs } from 'antd'

import { AuthContext } from 'contexts/AuthContext'

import { Input } from 'components/Input'
import Card from 'components/Card'
import Button from 'components/Button'

import GoogleImg from '../../assets/images/google.png'

const { REACT_APP_CLIENT_ID } = process.env

const Auth = () => {
    const { responseGoogle, authenticateUser, checkUserAuthorization } =
        useContext(AuthContext)
    const [tab, setTab] = useState('register')

    const { TabPane } = Tabs

    useEffect(() => {
        checkUserAuthorization()
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
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 14,
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
                                    label="Name"
                                    name="name"
                                >
                                    <Input placeholder="Name" />
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

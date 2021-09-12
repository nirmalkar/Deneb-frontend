import GoogleLogin from 'react-google-login'
import React, { useContext, useState } from 'react'
import { Row, Col, Form } from 'antd'

import { AuthContext } from 'contexts/AuthContext'

import Input from 'components/Input'
import Card from 'components/Card'
import Button from 'components/Button'

const { REACT_APP_CLIENT_ID } = process.env
const registerInitialState = {
    name: '',
    email: '',
    password: '',
}

const Auth = () => {
    const { responseGoogle } = useContext(AuthContext)
    const [registrationData, setRegisterData] = useState(registerInitialState)
    console.log(registrationData)

    const handleInputChange = (e) => {
        setRegisterData({
            ...registrationData,
            [e.target.name]: e.target.value,
        })
    }
    const submitRegistrationForm = () => {}
    return (
        <div className="App">
            <Row justify="center">
                <Col md={8}>
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
                            onSubmitCapture={(e) => submitRegistrationForm(e)}
                        >
                            <Form.Item label="Name">
                                <Input
                                    onChange={handleInputChange}
                                    placeholder="Name"
                                />
                            </Form.Item>
                            <Form.Item label="Email">
                                <Input
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                />
                            </Form.Item>
                            <Form.Item label="Password">
                                <Input
                                    onChange={handleInputChange}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Button type="primary" block htmlType="submit">
                                Submit
                            </Button>
                        </Form>
                        <GoogleLogin
                            clientId={REACT_APP_CLIENT_ID}
                            buttonText="Login"
                            uxMode="popup"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Auth

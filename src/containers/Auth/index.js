import GoogleLogin from 'react-google-login'
import React, { useContext } from 'react'
import { Row, Col } from 'antd'

import { AuthContext } from 'contexts/AuthContext'

import Card from 'components/Card'

const { REACT_APP_CLIENT_ID } = process.env

const Auth = () => {
    const { responseGoogle } = useContext(AuthContext)
    return (
        <div className="App">
            <Row justify="center">
                <Col md={8}>
                    <Card bordered={false}>
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

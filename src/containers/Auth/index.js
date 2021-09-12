import GoogleLogin from 'react-google-login'
import React, { useContext } from 'react'
import { AuthContext } from 'contexts/AuthContext'
import { Card } from 'antd'

const { REACT_APP_CLIENT_ID } = process.env

const Auth = () => {
    const { responseGoogle } = useContext(AuthContext)
    return (
        <div className="App">
            <Card>
                <GoogleLogin
                    clientId={REACT_APP_CLIENT_ID}
                    buttonText="Login"
                    uxMode="popup"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </Card>
        </div>
    )
}

export default Auth

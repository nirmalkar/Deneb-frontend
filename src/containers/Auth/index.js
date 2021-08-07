import GoogleLogin from "react-google-login";
import React, { useContext } from "react";
import { AuthContext } from "contexts/AuthContext";

const { REACT_APP_CLIENT_ID } = process.env;

const Auth = () => {
    const { responseGoogle } = useContext(AuthContext);
    return (
        <div className="App">
            <GoogleLogin
                clientId={REACT_APP_CLIENT_ID}
                buttonText="Login"
                uxMode="popup"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
            />
        </div>
    );
}

export default Auth;

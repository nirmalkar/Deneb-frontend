import React from 'react'

import NProgress from 'nprogress'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from 'constants/authConstants'

const initialState = {
    error: {},
    isAuthenticated: false,
    isLoading: false,
    user: {
        avatar: '',
        firstName: '',
        isLoggedIn: false,
        lastName: '',
        token: '',
        username: '',
    },
}

export const AuthContext = React.createContext(initialState)

const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADER':
            return {
                ...state,
                isLoading: action.payload,
            }
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            }
        case 'CONTINUE_SESSION':
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
            }
        case 'LOGIN_USER':
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
            }
        case 'LOGOUT_USER':
            return {
                ...state,
                isAuthenticated: false,
                isLoading: false,
                user: {},
            }
        default:
            return state
    }
}

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(AuthReducer, initialState)
    const history = useHistory()

    // function handleError(error) {
    //   // showErrorToast(error)
    //   dispatch({
    //     payload: error,
    //     type: "SET_ERROR",
    //   })
    // }

    function setLoader(isLoading) {
        dispatch({ payload: isLoading, type: 'SET_LOADER' })
    }

    function continueSession(user) {
        dispatch({ payload: user, type: 'LOGIN_USER' })
    }

    async function loginUser(user) {
        if (user) {
            NProgress.start()
            dispatch({ payload: true, type: 'SET_LOADER' })
            try {
                await axios.post(`${BASE_URL}/api/users/`, user)
                NProgress.done()
            } catch (err) {
                NProgress.done()
                console.log(err)
            }
        }
    }

    async function registerUser(user) {
        dispatch({ payload: true, type: 'SET_LOADER' })
        NProgress.start()
        try {
            // const response = await axios.post(`${BASE_URL}/api/users/`, user)
            loginUser()
        } catch (err) {
            NProgress.done()
            console.log(err)
        }
    }

    const responseGoogle = (response) => {
        if (response) {
            const { tokenId } = response
            try {
                const res = axios.post(`${BASE_URL}/api/users/googleLogin`, {
                    tokenId,
                })
                console.log(res)
            } catch (err) {
                console.log(err)
            }
        }
    }

    function logoutUser() {
        // removeAuthToken()
        dispatch({ type: 'LOGOUT_USER' })
        localStorage.clear()
        history.push('/login')
    }

    return (
        <AuthContext.Provider
            value={{
                continueSession,
                error: state.error,
                isAuthenticated: state.isAuthenticated,
                isLoading: state.isLoading,
                loginUser,
                logoutUser,
                registerUser,
                responseGoogle,
                setLoader,
                user: state.user,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

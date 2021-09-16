import React from 'react'

import { message } from 'antd'
import NProgress from 'nprogress'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import { BASE_URL, getAuthHeaders } from 'constants/authConstants'
import { removeAuthToken, setLocalStorage } from './Auth'

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
    function setLoader(isLoading) {
        dispatch({ payload: isLoading, type: 'SET_LOADER' })
    }

    function continueSession(user) {
        dispatch({ payload: user, type: 'LOGIN_USER' })
    }

    async function checkUserAuthorization() {
        dispatch({ payload: true, type: 'SET_LOADER' })
        const token = localStorage.getItem('token')
        if (token) {
            const headers = getAuthHeaders(token)
            const response = await axios.get(
                `${BASE_URL}/users/profile`,
                headers
            )
            const { data } = response
            dispatch({ payload: data, type: 'LOGIN_USER' })
            if (history.location.pathname === '/') {
                history.push('/dashboard')
            }
            dispatch({ payload: false, type: 'SET_LOADER' })
        } else {
            history.push('/')
            dispatch({ payload: false, type: 'SET_LOADER' })
        }
    }

    async function authenticateUser({ userData, tab }) {
        dispatch({ payload: true, type: 'SET_LOADER' })
        NProgress.start()
        const baseUrl =
            tab === 'register' ? `${BASE_URL}/users` : `${BASE_URL}/users/login`
        try {
            const response = await axios.post(baseUrl, userData)
            const { data } = response
            const { token } = data
            setLocalStorage(data)

            if (token) {
                message.success('User registered successfully')
                history.push('/dashboard')
                dispatch({ payload: data, type: 'LOGIN_USER' })
                dispatch({ payload: false, type: 'SET_LOADER' })
            }
            NProgress.done()
        } catch (err) {
            NProgress.done()
            message.error(err?.response?.data?.message)
            dispatch({ payload: false, type: 'SET_LOADER' })
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
        removeAuthToken()
        history.push('/')
        dispatch({ type: 'LOGOUT_USER' })
    }

    return (
        <AuthContext.Provider
            value={{
                continueSession,
                error: state.error,
                isAuthenticated: state.isAuthenticated,
                isLoading: state.isLoading,
                logoutUser,
                authenticateUser,
                responseGoogle,
                setLoader,
                checkUserAuthorization,
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

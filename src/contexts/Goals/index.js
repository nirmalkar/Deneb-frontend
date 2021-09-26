import React from 'react'

import { message } from 'antd'
import NProgress from 'nprogress'
import PropTypes from 'prop-types'
import axios from 'axios'

import { BASE_URL, getAuthHeaders } from 'constants/authConstants'

const initialState = {}

export const GoalsContext = React.createContext(initialState)

const GoalsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADER':
            return {
                ...state,
                isLoading: action.payload,
            }
        case 'GOALS':
            return {
                ...state,
                isLoading: action.payload,
            }
        default:
            return state
    }
}

export const GoalsProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(GoalsReducer, initialState)
    function setLoader(isLoading) {
        dispatch({ payload: isLoading, type: 'SET_LOADER' })
    }

    async function fetchGoals({ userId }) {
        dispatch({ payload: true, type: 'SET_LOADER' })
        NProgress.start()
        const baseUrl = `${BASE_URL}/goals/${userId}`
        const token = localStorage.get('token')
        const headers = getAuthHeaders(token)
        try {
            const response = await axios.get(baseUrl, headers)
            const { data } = response
            dispatch({ payload: data, type: 'GOALS' })
            NProgress.done()
        } catch (err) {
            NProgress.done()
            message.error(err?.response?.data?.message)
            dispatch({ payload: false, type: 'SET_LOADER' })
        }
    }

    return (
        <GoalsContext.Provider
            value={{
                error: state.error,
                isLoading: state.isLoading,
                fetchGoals,
                setLoader,
                user: state.user,
            }}
        >
            {children}
        </GoalsContext.Provider>
    )
}

GoalsProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

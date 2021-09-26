import React from 'react'

import { message } from 'antd'
import NProgress from 'nprogress'
import PropTypes from 'prop-types'
import axios from 'axios'

import { BASE_URL, getAuthHeaders } from 'constants/authConstants'

const initialState = { isLoading: false, goals: [] }

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
                goals: action.payload,
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
        console.log(userId)
        setLoader(true)
        NProgress.start()
        const baseUrl = `${BASE_URL}/goals/${userId}`
        const token = localStorage.getItem('token')
        const headers = getAuthHeaders(token)
        try {
            const response = await axios.get(baseUrl, headers)
            const { data } = response
            dispatch({ payload: data, type: 'GOALS' })
            setLoader(false)
            NProgress.done()
        } catch (err) {
            NProgress.done()
            message.error(err?.response?.data?.message)
            setLoader(false)
        }
    }

    return (
        <GoalsContext.Provider
            value={{
                error: state.error,
                isLoading: state.isLoading,
                fetchGoals,
                setLoader,
                goals: state.goals,
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

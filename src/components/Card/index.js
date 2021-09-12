import React from 'react'
import { Card as AntdCard } from 'antd'
import propTypes from 'prop-types'

function Card({ children }) {
    return (
        <>
            <AntdCard>{children}</AntdCard>
        </>
    )
}

Card.propTypes = {
    children: propTypes.node.isRequired,
}

export default Card

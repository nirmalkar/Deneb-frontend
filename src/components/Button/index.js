import React from 'react'
import propTypes from 'prop-types'
import { Button as AntdButton } from 'antd'

function Button(props) {
    const { children } = props
    return (
        <>
            <AntdButton {...props}>{children}</AntdButton>
        </>
    )
}
Button.propTypes = {
    children: propTypes.node.isRequired,
}
export default Button

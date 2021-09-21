import React from 'react'
import { Input as AntdInput, InputNumber as AntdNumInput } from 'antd'

function Input(props) {
    return <AntdInput {...props} />
}

function InputNumber(props) {
    return <AntdNumInput {...props} />
}

export { Input, InputNumber }

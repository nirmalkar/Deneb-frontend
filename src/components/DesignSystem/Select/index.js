import React from 'react'
import propTypes from 'prop-types'

import { Select as AntdSelect } from 'antd'

function Select(props) {
    const { children } = props
    return <AntdSelect {...props}>{children}</AntdSelect>
}

const Options = (props) => {
    const { children } = props
    return <Select.Option {...props}>{children}</Select.Option>
}

Select.propTypes = {
    children: propTypes.node.isRequired,
}

Options.propTypes = {
    children: propTypes.node.isRequired,
}
export { Select, Options }

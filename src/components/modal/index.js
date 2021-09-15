import React from 'react'
import { Modal as AntdModal } from 'antd'
import propTypes from 'prop-types'

function Modal(props) {
    const { children } = props
    return (
        <div>
            <AntdModal className="modal_main" {...props}>
                {children}
            </AntdModal>
        </div>
    )
}
Modal.propTypes = {
    children: propTypes.node.isRequired,
}
export default Modal

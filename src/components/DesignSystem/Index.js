import React, { useState } from 'react'
import Button from './Button'
import Card from './Card'
import { Input } from './Input'
import { Select, Options } from './Select'
import Modal from './modal'
import { Col, Row } from 'antd'

function DesignSystem() {
    const [showDSModal, setshowDSModal] = useState(false)
    return (
        <div style={{ padding: '2rem' }}>
            <Row justify="center">
                <Col span={10}>
                    <Button>Button</Button>
                    <br />
                    <br />
                    <Card style={{ width: '500px' }}>This is the Card</Card>
                    <br />
                    <br />
                    <Input
                        style={{ width: 500 }}
                        placeholder="design system input field"
                    />
                    <br />
                    <br />
                    <Select defaultValue="one">
                        <Options value="one">option 1</Options>
                        <Options value="two">option 2</Options>
                        <Options value="three">option 3</Options>
                    </Select>
                    <br />
                    <br />
                    <Button onClick={() => setshowDSModal(!showDSModal)}>
                        Show Modal
                    </Button>
                    <Modal
                        visible={showDSModal}
                        onOk={() => setshowDSModal(!showDSModal)}
                        onCancel={() => setshowDSModal(!showDSModal)}
                    >
                        <p>this is design system modal!!!</p>
                    </Modal>
                </Col>
            </Row>
        </div>
    )
}

export default DesignSystem

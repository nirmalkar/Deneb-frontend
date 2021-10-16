import React, { useState } from 'react'
import { Tree, Switch } from 'antd'
import propTypes from 'prop-types'

function AntdTree({ treeData }) {
    const [showLine, setShowLine] = useState(true)
    const [showIcon, setShowIcon] = useState(false)
    const [showLeafIcon, setShowLeafIcon] = useState(true)

    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info)
    }

    const onSetLeafIcon = (checked) => {
        setShowLeafIcon(checked)
        setShowLine({
            showLeafIcon: checked,
        })
    }

    const onSetShowLine = (checked) => {
        setShowLine(
            checked
                ? {
                      showLeafIcon,
                  }
                : false
        )
    }

    return (
        <div>
            <div
                style={{
                    marginBottom: 16,
                }}
            >
                showLine:{' '}
                <Switch checked={!!showLine} onChange={onSetShowLine} />
                <br />
                <br />
                showIcon: <Switch checked={showIcon} onChange={setShowIcon} />
                <br />
                <br />
                showLeafIcon:{' '}
                <Switch checked={showLeafIcon} onChange={onSetLeafIcon} />
            </div>
            <Tree
                showLine={showLine}
                showIcon={showIcon}
                defaultExpandedKeys={['0-0-0']}
                onSelect={onSelect}
                treeData={treeData}
            />
        </div>
    )
}

AntdTree.propTypes = {
    treeData: propTypes.arrayOf.isRequired,
}

export default AntdTree

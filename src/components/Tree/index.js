import React from 'react'
import { Tree } from 'antd'
import propTypes from 'prop-types'

import DeleteIcon from 'assets/images/remove.svg'
import EditIcon from 'assets/images/edit.svg'

const { TreeNode } = Tree
function AntdTree({ treeData }) {
    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info)
    }

    const treeComponent = (data) =>
        data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode
                        title={
                            <div className="tree-title-container">
                                {item.title}{' '}
                                <div className="tree-edit">
                                    <img
                                        className="edit"
                                        src={EditIcon}
                                        alt="edit"
                                    />
                                </div>
                                <div className="tree-delete">
                                    <img
                                        className="delete"
                                        src={DeleteIcon}
                                        alt="delete"
                                    />
                                </div>
                            </div>
                        }
                        key={item.key}
                        dataRef={item}
                    >
                        {treeComponent(item.children)}
                    </TreeNode>
                )
            }
            return (
                <TreeNode
                    key={item.key}
                    title={
                        <div className="tree-title-container">
                            {item.title}{' '}
                            <div className="tree-edit">
                                <img
                                    className="edit"
                                    src={EditIcon}
                                    alt="edit"
                                />
                            </div>
                            <div className="tree-delete">
                                <img
                                    className="delete"
                                    src={DeleteIcon}
                                    alt="delete"
                                />
                            </div>
                        </div>
                    }
                />
            )
        })

    return (
        <div className="antd-tree-cmp">
            <Tree showLine={true} showIcon={true} onSelect={onSelect}>
                {treeComponent(treeData)}
            </Tree>
        </div>
    )
}

AntdTree.propTypes = {
    treeData: propTypes.arrayOf(propTypes.object).isRequired,
}

export default AntdTree

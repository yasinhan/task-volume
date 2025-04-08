import React from 'react'
import EditableText from '@/component/common/editableText'
import './projectNode.css'
import EditablePercent from '@/component/common/editablePercent'
import WorkItem from '@/component/projectDetail/workItem'
import { Dropdown } from 'antd'

function ProjectNode(props) {

    const setWorkItem = (workItem) => {
        const newItems = props.node.workItems.map(item => item.itemIndex === workItem.itemIndex ? workItem : item)
        props.setNode({
            ...props.node,
            workItems: newItems,
        })
    }

    const initNewWorkItem = () => {
        props.setNode({
            ...props.node,
            workItems: [{
                itemIndex: 1,
                itemName: '',
                percentage: 0,
                arrange: [],
            }],
        })
    }

    const insertNewWorkItem = (itemIndex) => {
        const insertIndex = props.node.workItems.findIndex(item => item.itemIndex === itemIndex) + 1
        if (insertIndex === -1) {
            return
        }
        const newItems = [
            ...props.node.workItems.slice(0, insertIndex),
            {
                itemIndex: itemIndex + 1,
                itemName: '工作项',
                percentage: 0,
                arrange: [],
            },
            ...props.node.workItems.slice(insertIndex).map(item => ({
                ...item,
                itemIndex: item.itemIndex + 1,
            })),
        ]
        props.setNode({
            ...props.node,
            workItems: newItems,
        })
    }

    const deleteWorkItem = (itemIndex) => {
        const newItems = props.node.workItems.filter(item => item.itemIndex !== itemIndex)
            .map(item => item.itemIndex < itemIndex ? item : {
                ...item,
                itemIndex: item.itemIndex - 1,
            })
        props.setNode({
            ...props.node,
            workItems: newItems,
        })
    }


    const handleItemMenuClick = ({ key }) => {
        if (key === '1') {
            props.insertNewNode(props.node.nodeIndex)
        }
        if (key === '2') {
            props.deleteNode(props.node.nodeIndex)
        }

    }

    const nodeMenuItem = [
        {
            label: '插入新节点',
            key: '1',
        },
        {
            label: '删除节点',
            key: '2',
        },
    ]

    return <div className="nodeContainer" style={{ height: `${props.num * 50}px` }}>
        <div className="nodeInfo">
            <Dropdown
                menu={{
                    items: nodeMenuItem,
                    onClick: handleItemMenuClick,
                }}
                trigger={['contextMenu']}>
                <div className="nodeName" onClick={e => e.preventDefault()}>
                    <EditableText value={props.node.nodeName ?? '节点'}
                                  setValue={(value) => props.setNode({ ...props.node, nodeName: value })} />
                </div>
            </Dropdown>
            <div className="nodePercent">
                <EditablePercent value={props.node.percentage ?? 0}
                                 setValue={(value) => props.setNode({ ...props.node, percentage: value })} />
            </div>
        </div>
        <div className="workItem">
            {
                props.node.workItems && props.node.workItems.length > 0 ?
                    props.node.workItems.map((item, index) => {
                        return <WorkItem
                            key={index}
                            workItem={item}
                            setWorkItem={setWorkItem}
                            totalNum={props.num}
                            insertNewWorkItem={insertNewWorkItem}
                            deleteWorkItem={deleteWorkItem}
                        />
                    }) : <div className="emptyWorkItem" onClick={initNewWorkItem}></div>
            }
        </div>
    </div>
}

export default ProjectNode
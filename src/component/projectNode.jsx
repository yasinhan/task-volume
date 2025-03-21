import React, { useCallback } from 'react'
import EditableText from '@/component/common/editableText'
import './projectNode.css'
import EditablePercent from '@/component/common/editablePercent'
import WorkItem from '@/component/workItem'

function ProjectNode(props) {

    const setWorkItem = (workItem) => {
        const newItems = props.node.workItems.map(item => item.itemIndex === workItem.itemIndex ? workItem : item)
        props.setNode({
            ...props.node,
            workItems: newItems
        })
    }

    return <div className='nodeContainer' style={{ height: `${props.num * 50}px` }}>
        <div className='nodeInfo'>
            <div className='nodeName'>
                <EditableText value={props.node.nodeName ?? '节点'}
                              setValue={(value) => props.setNode({ ...props.node, nodeName: value })} />
            </div>
            <div className='nodePercent'>
                <EditablePercent value={props.node.percentage ?? 0}
                                 setValue={(value) => props.setNode({ ...props.node, percentage: value })} />
            </div>
        </div>
        <div className='workItem'>
            {
                props.node.workItems && props.node.workItems.length > 0 ?
                props.node.workItems.map((item) => {
                    return <WorkItem workItem={item} setWorkItem={setWorkItem} totalNum={props.num} />
                }) : <></>
            }
        </div>
    </div>
}

export default ProjectNode
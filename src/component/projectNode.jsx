import React from 'react'
import EditableText from '@/component/common/editableText'
import './projectNode.css'
import EditablePercent from '@/component/common/editablePercent'

function ProjectNode(props) {

    const height = props.node.percentage && props.node.percentage > 0 ? props.node.percentage : 100

    return <div className='nodeContainer' style={{ height: `${height}%` }}>
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

            }
        </div>
    </div>
}

export default ProjectNode
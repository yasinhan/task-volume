import React from 'react'
import EditableText from '@/component/common/editableText'
import './projectStage.css'
import EditablePercent from '@/component/common/editablePercent'
import { MinusOutlined } from '@ant-design/icons'
import ProjectNode from '@/component/projectNode'

function ProjectStage(props) {

    const setNode = (node) => {
        const newNodes = props.stage.nodes.map(item => item.nodeIndex === node.nodeIndex ? node : item)
        props.setStage({
            ...props.stage,
            nodes: newNodes
        })
    }

    return <div className='stageContainer'>
        <div className='stageTitle'>
            <EditableText value={props.stage.stageName ?? '阶段'}
                          setValue={(value) => props.setStage({ ...props.stage, stageName: value })} />
            <EditablePercent value={props.stage.percentage ?? 0}
                             setValue={(value) => props.setStage({ ...props.stage, percentage: value })} />
        </div>
        <div className='nodes'>
            {props.stage.nodes && props.stage.nodes.length > 0 &&
                props.stage.nodes.map((node, index) => {
                    return <ProjectNode node={node} index={index} setNode={setNode} />
                })
            }
        </div>
        <div onClick={() => props.removeStage(props.stage.stageIndex)} className='removeContainer'>
            <MinusOutlined />
        </div>
    </div>
}

export default ProjectStage
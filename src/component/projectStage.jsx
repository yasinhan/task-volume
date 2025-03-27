import React from 'react'
import EditableText from '@/component/common/editableText'
import './projectStage.css'
import EditablePercent from '@/component/common/editablePercent'
import { MinusOutlined } from '@ant-design/icons'
import ProjectNode from '@/component/projectNode'

function ProjectStage(props) {

    const participantNums = props.stage.nodes.reduce((result, node) => {
        let arrangeLength = 0

        if (!node.workItems || node.workItems.length === 0) {
            arrangeLength = 1
        } else {
            arrangeLength = node.workItems.reduce((sum, workItem) => {
                if (!workItem.arrange || workItem.arrange.length === 0) {
                    return sum + 1
                } else {
                    return sum + workItem.arrange.length
                }
            }, 0)
        }

        result[node.nodeIndex] = arrangeLength
        return result
    }, {})

    const sum = Object.values(participantNums).reduce((total, value) => {
        return total + value
    }, 0)

    const setNode = (node) => {
        const newNodes = props.stage.nodes.map(item => item.nodeIndex === node.nodeIndex ? node : item)
        props.setStage({
            ...props.stage,
            nodes: newNodes,
        })
    }

    const initNewNode = () => {
        props.setStage({
            ...props.stage,
            nodes: [{
                nodeIndex: 1,
                nodeName: '',
                percentage: 0,
                workItems: [],
            }],
        })
    }

    const insertNewNode = (nodeIndex) => {
        const insertIndex = props.stage.nodes.findIndex(item => item.nodeIndex === nodeIndex) + 1
        if (insertIndex === -1) {
            return
        }
        const newNodes = [
            ...props.stage.nodes.slice(0, insertIndex),
            {
                nodeIndex: nodeIndex + 1,
                nodeName: '节点',
                percentage: 0,
                workItems: [],
            },
            ...props.stage.nodes.slice(insertIndex).map(item => ({
                ...item,
                nodeIndex: item.nodeIndex + 1,
            })),
        ]
        props.setStage({
            ...props.stage,
            nodes: newNodes,
        })
    }

    const deleteNode = (nodeIndex) => {
        const newNodes = props.stage.nodes.filter(item => item.nodeIndex !== nodeIndex)
            .map(item => item.nodeIndex < nodeIndex ? item : {
                ...item,
                nodeIndex: item.nodeIndex - 1,
            })
        props.setStage({
            ...props.stage,
            nodes: newNodes,
        })
    }

    return <div className="stageContainer" style={{ height: `${sum * 50}px` }}>
        <div className="stageTitle">
            <EditableText value={props.stage.stageName ?? '阶段'}
                          setValue={(value) => props.setStage({ ...props.stage, stageName: value })} />
            <EditablePercent value={props.stage.percentage ?? 0}
                             setValue={(value) => props.setStage({ ...props.stage, percentage: value })} />
        </div>
        <div className="nodes">
            {props.stage.nodes && props.stage.nodes.length > 0 ?
                props.stage.nodes.map((node, index) => {
                    return <ProjectNode
                        key={index}
                        node={node}
                        setNode={setNode}
                        insertNewNode={insertNewNode}
                        deleteNode={deleteNode}
                        num={participantNums[node.nodeIndex]}
                    />
                }) : <div className="emptyNodes" onClick={initNewNode}></div>
            }
        </div>
        <div onClick={() => props.removeStage(props.stage.stageIndex)} className="removeContainer">
            <MinusOutlined />
        </div>
    </div>
}

export default ProjectStage
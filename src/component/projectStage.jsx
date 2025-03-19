import React from 'react'
import EditableText from '@/component/common/editableText'
import './projectStage.css'
import EditablePercent from '@/component/common/editablePercent'

function ProjectStage(props) {
    return <div className='stageContainer'>
        <div className='stageTitle'>
            <EditableText value={props.stage.stageName ?? '阶段'}
                          setValue={(value) => props.setStage({ ...props.stage, stageName: value })} />
            <EditablePercent value={props.stage.percentage ?? 0}
                             setValue={(value) => props.setStage({ ...props.stage, percentage: value })} />
        </div>
        <div className=''>

        </div>
    </div>
}

export default ProjectStage
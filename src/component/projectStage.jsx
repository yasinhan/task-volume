import React from 'react'
import EditableText from '@/component/common/editableText'

function ProjectStage(props) {
    return <div>
        <div>
            <EditableText />
            <div>{props.stage.stageName}</div>
            <div></div>
        </div>
        <div>

        </div>
    </div>
}

export default ProjectStage
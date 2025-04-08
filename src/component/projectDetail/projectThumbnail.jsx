import React from 'react'
import './projectThumbnail.css'

function ProjectThumbnail(props) {
    return <div className='container' onClick={props.switch}>
        <div>
            {props.project.projectName ?? '空项目'}
        </div>
        <div>
            {props.project.createTime}
        </div>
        {
            props.project.imgUrl && props.project.import !== '' ?
                <></> : <></>
        }
    </div>
}

export default ProjectThumbnail
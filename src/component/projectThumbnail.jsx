import React from 'react'

function ProjectThumbnail(props) {
    return <>
        <div>
            {props.project.name}
        </div>
        <div>
            {props.project.createTime}
        </div>
        {
            props.project.imgUrl && props.project.import !== '' ?
                <image></image> : <image />
        }
    </>
}

export default ProjectThumbnail
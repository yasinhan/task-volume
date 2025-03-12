import React from 'react'

function Project(props) {

    const addStage = () => {
        props.setProject({
            ...props.project,
            stages: [...props.project.stages, {
                stageName: '',
                percentage: 0,
                nodes: []
            }],
        })
    }
    return <>
        {
            props.project.stages.map((stage, index) => {
                return <div>

                </div>
            })
        }
        <div></div>
    </>
}

export default Project
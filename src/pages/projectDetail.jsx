import { useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { projectApi } from '@/api/projectApi'
import ProjectStage from '@/component/projectStage'
import EditableText from '@/component/common/editableText'

export default function ProjectDetail() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [project, setProject] = useState({})

    useEffect(() => {
        projectApi.getProject(id).then((res) => {
            setProject(res)
        })
    }, [id])


    const saveProject = () => {

    }

    const addStage = () => {
        setProject({
            ...project,
            stages: [...project.stages, {
                stageName: '',
                percentage: 0,
                nodes: [],
            }],
        })
    }

    const back = () => {
        navigate(`/`)
    }

    return <>
        <button onClick={back}>返回</button>
        <div>
            <div>
                项目名称
            </div>
            <EditableText value={project.projectName ?? '空项目'}
                          setValue={(value) => setProject({ ...project, projectName: value })} />
        </div>
        {
            project.stages && project.stages.map((stage, index) => {
                return <ProjectStage stage={stage} key={index} />
            })
        }
        <div></div>
    </>

}
import { useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { projectApi } from '@/api/projectApi'

export default function ProjectDetail() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [project, setProject] = useState({})

    const loadProject = async (id) => {
        const res = await projectApi.getProject(id)
        console.log(res)
        if (res) {
            setProject(res)
        }
    }

    useEffect(() => {
        loadProject(id)
    }, [id])

    const saveProject = () => {

    }

    const addStage = () => {
        setProject({
            ...project,
            stages: [...project.stages, {
                stageName: '',
                percentage: 0,
                nodes: []
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
            <div>
                {project.projectName}
            </div>
        </div>
        {
            project.stages && project.stages.map((stage, index) => {
                return <div>

                </div>
            })
        }
        <div></div>
    </>

}
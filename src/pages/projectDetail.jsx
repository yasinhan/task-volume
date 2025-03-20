import { useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { projectApi } from '@/api/projectApi'
import ProjectStage from '@/component/projectStage'
import EditableText from '@/component/common/editableText'
import './project.css'
import { PlusOutlined } from '@ant-design/icons'

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
                stageIndex: project.stages.at(-1).stageIndex + 1,
                stageName: '',
                percentage: 0,
                nodes: [],
            }],
        })
    }

    const removeStage = (index) => {
        setProject({
            ...project,
            stages: project.stages.filter(item => item.stageIndex !== index)
                .map(item => item.stageIndex < index ? item : {
                    ...item,
                    stageIndex: item.stageIndex - 1,
                } )
        })
    }

    const updateStage = stage => {
        setProject({
            ...project,
            stages: project.stages.map(item => item.stageIndex === stage.stageIndex ? stage : item),
        })
    }

    const back = () => {
        navigate(`/`)
    }

    return <div className='page'>
        <button onClick={back}>返回</button>
        <div className='header'>
            <div className='nameTitle'>
                项目名称:
            </div>
            <EditableText value={project.projectName ?? '空项目'}
                          setValue={(value) => setProject({ ...project, projectName: value })} />
        </div>
        {
            project.stages && project.stages.map((stage, index) => {
                return <ProjectStage stage={stage} key={index} setStage={updateStage}/>
            })
        }
        <div className='addStageContainer' onClick={addStage}><PlusOutlined />添加阶段</div>
    </div>

}
import { useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { projectApi } from '@/api/projectApi'
import ProjectStage from '@/component/projectStage'
import EditableText from '@/component/common/editableText'
import './project.css'
import { PlusOutlined } from '@ant-design/icons'
import { partnerApi } from '@/api/partnerApi'
import { ProjectContext } from '@/component/context/partnerContext'
import { calculateWorkVolume } from '@/util/Calculator'
import { Volume } from '@/component/participantsVolume'

export default function ProjectDetail() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [project, setProject] = useState({})
    const [partners, setPartners] = useState([])
    const [volume, setVolume] = useState({})

    useEffect(() => {
        projectApi.getProject(id).then((res) => {
            setProject(res)
            const { participantsVolume, workItem } = calculateWorkVolume(res)
            console.log(participantsVolume, workItem)
            setVolume(participantsVolume)
        })
        partnerApi.getAllPartner().then(res => {
            setPartners(res.map(p => {
                return { label: p, value: p }
            }))
        })
    }, [id])

    const addPartner = name => {
        partnerApi.addPartner(name).then((res) => {
            setPartners((res.map(p => {
                return { label: p, value: p }
            })))
        })
    }

    const saveProject = () => {
        projectApi.saveProject(project).then(() => {
            projectApi.getProject(id).then((res) => {
                setProject(res)
            })
        })
    }

    const addStage = () => {
        const newStage = project.stages && project.stages.length > 0 ? [...project.stages, {
            stageIndex: project.stages.at(-1).stageIndex + 1,
            stageName: '',
            percentage: 0,
            nodes: [],
        }] : [{
            stageIndex: 1,
            stageName: '阶段1',
            percentage: 0,
            nodes: [],
        }]
        setProject({
            ...project,
            stages: newStage,
        })
    }

    const removeStage = (index) => {
        setProject({
            ...project,
            stages: project.stages.filter(item => item.stageIndex !== index)
                .map(item => item.stageIndex < index ? item : {
                    ...item,
                    stageIndex: item.stageIndex - 1,
                }),
        })
    }

    const insertStage = (stageIndex) => {
        const insertIndex = project.stages.findIndex(stage => stage.stageIndex === stageIndex)
        if (insertIndex === -1) {
            return
        }
        const newStages = [
            ...project.stages.slice(0, insertIndex),
            {
                stageIndex: stageIndex,
                stageName: '阶段' + stageIndex,
                percentage: 0,
                nodes: [],
            },
            ...project.stages.slice(insertIndex).map(stage => ({
                ...stage,
                stageIndex: stage.stageIndex + 1,
            })),
        ]
        setProject({
            ...project,
            stages: newStages,
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
        saveProject()
    }

    return <ProjectContext.Provider value={{ saveProject, addPartner, partners }}>
        <div className="page">
            <button onClick={back}>返回</button>
            <div className="header">
                <div className="nameTitle">
                    项目名称:
                </div>
                <EditableText value={project.projectName ?? '空项目'}
                              setValue={(value) => setProject({ ...project, projectName: value })} />
            </div>
            {
                project.stages && project.stages.map((stage, index) => {
                    return <ProjectStage stage={stage} key={index} setStage={updateStage} removeStage={removeStage} />
                })
            }
            <div className="addStageContainer" onClick={addStage}><PlusOutlined />添加阶段</div>
            <Volume volume={volume} />
        </div>
    </ProjectContext.Provider>
}
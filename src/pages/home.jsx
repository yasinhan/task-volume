import React, { useEffect, useState } from 'react'
import ProjectThumbnail from '@/component/projectThumbnail'
import './home.css'
import {projectApi} from "@/api/projectApi";
import {useNavigate} from "react-router-dom";

export default function Home() {
    const [projects, setProjects] = useState([])

    const navigate = useNavigate()

    const loadProjects = async () => {
        const res = await projectApi.getAllProjects()
        setProjects(res)
    }

    useEffect(() => {
        loadProjects()
    }, [])

    const handleAddNewProject = async () => {
        const newId = projects.length > 0 ? projects.at(-1).id + 1 : 1

        const newProject = await projectApi.createProject(newId)
        if (newProject && newProject.id) {
            navigate(`/detail/${newProject.id}`)
        }
    }

    const switchToProject = (id) => {
        navigate(`/detail/${id}`)
    }

    return <div className='page'>
        <div className='title'>
            最近项目
        </div>
        <div className='projectCards'>
            <div className='createProject' onClick={handleAddNewProject}>
                +New
            </div>
            { projects && projects.length > 0 && projects.map((project, i) => {
                if (i <= 5) {
                    return <ProjectThumbnail project={project} switch={() => switchToProject(project.id)} />
                }
            })}
        </div>
    </div>
}
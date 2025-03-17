import React, { useEffect, useState } from 'react'
import ProjectThumbnail from '@/component/projectThumbnail'
import './home.css'
import {projectApi} from "@/api/projectApi";
import {useNavigate} from "react-router-dom";

export default function Home() {
    const [projects, setProjects] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const projects = projectApi.getAllProjects()
        setProjects(projects)
    }, [])

    const handleAddNewProject = () => {
        const newProject = projectApi.createProject()
        if (newProject && newProject.id) {
            navigate(`/detail/${newProject.id}`)
        }
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
                    return <ProjectThumbnail project={project} />
                }
            })}
        </div>
    </div>
}
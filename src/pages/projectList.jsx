import React, { useEffect, useState } from 'react'
import ProjectThumbnail from '@/component/projectThumbnail'
import './home.css'
import { projectApi } from '@/api/projectApi'
import { useNavigate } from 'react-router-dom'
import {Dropdown, Table} from 'antd'

export default function ProjectList() {
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

        await projectApi.createProject(newId)
        await loadProjects()
    }

    const copyNewProject = async projectId => {
        const originProject = projects.find(p => p.id === projectId)
        if (!originProject) {
            return
        }
        const newId = projects.length > 0 ? projects.at(-1).id + 1 : 1
        const newProject = {
            id: newId,
            ...originProject,
        }
        projectApi.saveProject(newProject)
        await loadProjects()
    }

    const deleteProject = async projectId => {
        await projectApi.deleteProject(projectId)
        await loadProjects()
    }


    const handleItemMenuClick = async (key, projectId) => {
        if (key === '1') {
            await copyNewProject(projectId)
        }
        if (key === '2') {
            await deleteProject(projectId)
        }
    }

    const switchToProject = (id) => {
        navigate(`/detail/${id}`)
    }

    return <div className="page">
        <Table
        />
    </div>
}
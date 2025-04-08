import React, {useEffect, useState} from 'react'
import ProjectThumbnail from '@/component/projectDetail/projectThumbnail'
import './home.css'
import {projectApi} from '@/api/projectApi'
import {useNavigate} from 'react-router-dom'
import {Dropdown} from 'antd'

export default function Home() {
    const [projects, setProjects] = useState([])

    const navigate = useNavigate()

    const loadProjects = async () => {
        const res = await projectApi.getLatestProjects(5)
        setProjects(res)
    }

    useEffect(() => {
        loadProjects()
    }, [])

    const handleAddNewProject = async () => {
        const newProject = await projectApi.createProject()
        if (newProject && newProject.id) {
            navigate(`/detail/${newProject.id}`)
        }
    }

    const handleNavigateAllProjects = async () => {
        navigate(`/list`)
    }

    const copyNewProject = async projectId => {
        const originProject = projects.find(p => p.id === projectId)
        if (!originProject) {
            return
        }
        const newId = await projectApi.createProject().id
        const newProject = {
            id: newId,
            projectName: originProject.projectName + '副本',
            ...originProject,
        }
        projectApi.saveProject(newProject)
        await loadProjects()
    }

    const deleteProject = async projectId => {
        await projectApi.deleteProject(projectId)
        await loadProjects()
    }

    const projectMenuItem = [
        {
            label: '复制项目',
            key: '1',
        },
        {
            label: '删除项目',
            key: '2',
        }
    ]

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
        <div className="mainHeader">
            <div className="title">
                最近项目
            </div>
            <div className="navAll" onClick={handleNavigateAllProjects}>
                查看全部
            </div>
        </div>

        <div className="projectCards">
            <div className="createProject" onClick={handleAddNewProject}>
                +New
            </div>
            {projects && projects.length > 0 && projects.map((project) => {
                return <Dropdown
                    menu={{
                        items: projectMenuItem,
                        onClick: ({key}) => handleItemMenuClick(key, project.id),
                    }}>
                    <ProjectThumbnail key={project.id} project={project}
                                      switch={() => switchToProject(project.id)}/>
                </Dropdown>
            })}
        </div>
    </div>
}
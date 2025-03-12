import React, { useEffect, useState } from 'react'
import ProjectThumbnail from '@/component/projectThumbnail'
import './home.css'

export default function Home() {
    const [projects, setProjects] = useState([])
    const [lastId, setLastId] = useState(0)

    useEffect(() => {

    }, [])

    const handleAddNewProject = () => {

    }

    return <div className='page'>
        <div className='title'>
            最近项目
        </div>
        <div className='projectCards'>
            <div className='createProject' onClick={handleAddNewProject}>
                +New
            </div>
            { projects.map((project, i) => {
                if (i <= 5) {
                    return <ProjectThumbnail project={project} />
                }
            })}
        </div>
    </div>
}
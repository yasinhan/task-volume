import React, { useEffect, useState } from 'react'
import ProjectThumbnail from '@/component/projectThumbnail'
import css from './home.css'

export default function Home() {
    const [projects, setProjects] = useState([])

    useEffect(() => {

    }, [])

    return <div>
        <div >
            最近项目
        </div>
        <div className={css.createProject}>
            +New
        </div>
        { projects.map((project) => {
            return <ProjectThumbnail project={project} />
        })}
    </div>
}
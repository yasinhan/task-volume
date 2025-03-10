import React, { useEffect, useState } from 'react'
import ProjectThumbnail from '@/component/projectThumbnail'

export default function Home() {
    const [projects, setProjects] = useState([])

    useEffect(() => {

    }, [])

    return <div>
        <div>
            最近项目
        </div>
        { projects.map((project) => {
            return <ProjectThumbnail project={project} />
        })}
    </div>
}
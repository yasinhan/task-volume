import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Project from '@/component/project'

export default function ProjectDetail() {
    const { id } = useParams()

    const [project, setProject] = useState({})

    useEffect(() => {

    }, [id])

    const saveProject = () => {

    }

    return <Project
        project={project}
        setProject={setProject}
        saveProject={saveProject()} />

}
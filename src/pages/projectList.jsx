import React, { useEffect, useState } from 'react'
import ProjectThumbnail from '@/component/projectDetail/projectThumbnail'
import './home.css'
import { projectApi } from '@/api/projectApi'
import { useNavigate } from 'react-router-dom'
import { Button, Dropdown, Table } from 'antd'

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

    const columns = [
        {
            title: '项目名称',
            dataIndex: 'projectName',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
        },
        {
            title: '最后更新时间',
            dataIndex: 'updateTime',
        },
        {
            title: '操作',
            key: 'action',
            render: (record) => {
                return <div>
                    <Button onClick={() => switchToProject(record.id)}>查看详情</Button>
                    <button onClick={() => deleteProject(record.id)}>删除</button>
                    <Button>复制</Button>
                </div>
            }
        }
    ]

    const handleAddNewProject = async () => {
        await projectApi.createProject()
        await loadProjects()
    }

    const deleteProject = async projectId => {
        await projectApi.deleteProject(projectId)
        await loadProjects()
    }


    const switchToProject = (id) => {
        navigate(`/detail/${id}`)
    }

    return <div className="page">
        <div>

        </div>
        <Table
            dataSource={projects}
            columns={columns}
            pagination={false}
        />
    </div>
}
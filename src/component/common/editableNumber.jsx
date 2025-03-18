import React, { useState } from 'react'
import { Input, Tooltip } from 'antd'
import {
    EditOutlined,
    CheckOutlined,
    CloseOutlined,
} from '@ant-design/icons'

export default function EditableText(props) {
    const [editing, setEditing] = useState(false)
    const [editingText, setEditingText] = useState('')

    const handleSave = () => {
        props.setValue(editingText.trim())
        setEditing(false)
    }

    const handleCancel = () => {
        setEditingText(props.value)
        setEditing(false)
    }

    return <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {editing ?
            <>
                <Input
                    size={'small'}
                    value={editingText}
                    onChange={e => setEditingText(e.target.value)}
                    onPressEnter={handleSave}
                    autoFocus
                />
                <Tooltip title="保存">
                    <CheckOutlined
                        style={{ color: '#52c41a', cursor: 'pointer' }}
                        onClick={handleSave}
                    />
                </Tooltip>
                <Tooltip title="取消">
                    <CloseOutlined
                        style={{ color: '#ff4d4f', cursor: 'pointer' }}
                        onClick={handleCancel}
                    />
                </Tooltip>
            </> :
            <>
                <div>{props.value}</div>
                <Tooltip title="编辑">
                    <EditOutlined
                        style={{ color: '#1890ff', cursor: 'pointer' }}
                        onClick={() => setEditing(true)}
                    />
                </Tooltip>
            </>
        }
    </div>
}
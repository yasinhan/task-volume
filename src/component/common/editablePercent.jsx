import React, { useState } from 'react'
import { InputNumber, Tooltip } from 'antd'
import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons'

export default function EditablePercent(props) {
    const [editing, setEditing] = useState(false)
    const [editingNum, setEditingNum] = useState(0)

    const handleSave = () => {
        props.setValue(editingNum)
        setEditing(false)
    }

    const handleCancel = () => {
        setEditingNum(props.value)
        setEditing(false)
    }

    return <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {editing ?
            <>
                <InputNumber
                    value={editingNum}
                    onChange={value => setEditingNum(value)}
                    onPressEnter={handleSave}
                    autoFocus
                />
                <CheckOutlined
                    style={{ color: '#52c41a', cursor: 'pointer' }}
                    onClick={handleSave}
                />
                <CloseOutlined
                    style={{ color: '#ff4d4f', cursor: 'pointer' }}
                    onClick={handleCancel}
                />
            </> :
            <>
                <div>{props.value}%</div>
                <EditOutlined
                    style={{ cursor: 'pointer' }}
                    onClick={() => setEditing(true)}
                />
            </>
        }
    </div>
}
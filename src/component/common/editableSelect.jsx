import React from 'react'
import {Select} from 'antd'
import './select.css'

export default function EditableSelect(props) {

    const handleChange = (newValue) => {
        const create = newValue.filter((value) => !props.options.includes(value))
        if (create && create.length > 0) {
            create.forEach(v => props.addNewValue(v))
        }
        props.setValue(newValue)
    }

    return <Select
        style={{width: '90%', height: '35px'}}
        mode='tags'
        options={props.options}
        value={props.value}
        onChange={handleChange}
        className='fixed-select'
    />

}
import React from 'react'
import EditableText from '@/component/common/editableText'
import './workItem.css'
import EditablePercent from '@/component/common/editablePercent'

function WorkItem(props) {

    const num = props.workItem.arrange?.length || 1
    const height = (num / props.totalNum) * 100

    return <div className='itemContainer' style={{ height: `${height}%`, minHeight: `${num * 40}px` }}>
        <div className='itemInfo'>
            <div className='itemName'>
                <EditableText value={props.workItem.itemName ?? '工作项'}
                              setValue={(value) => props.setWorkItem({ ...props.workItem, itemName: value })} />
            </div>
            <div className='itemPercent'>
                <EditablePercent value={props.workItem.percentage ?? 0}
                                 setValue={(value) => props.setWorkItem({ ...props.workItem, percentage: value })} />
            </div>
        </div>

    </div>
}

export default WorkItem
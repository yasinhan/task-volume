import React from 'react'
import EditableText from '@/component/common/editableText'
import './workItem.css'
import EditablePercent from '@/component/common/editablePercent'

function WorkItem(props) {

    const num = props.workItem.arrange?.length || 1
    const height = (num / props.totalNum) * 100

    const initNewArrange = () => {
        props.setWorkItem({
            ...props.workItem,
            arrange: [{
                owner: '',
                percentage: 0,
                actualPercentage: 0,
            }],
        })
    }

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
        <div className='arrangeContainer'>
            {
                props.workItem.arrange && props.workItem.arrange.length > 0 ?
                    props.workItem.arrange.map((arrange, i) => {
                        return <div className='arrangeItem'>
                            <div className='arrangeOwner'>
                                {arrange.owner}
                            </div>
                            <div className='arrangePercent'>
                                <EditablePercent value={arrange.percentage ?? 0}
                                                 setValue={(value) => props.setWorkItem({ ...props.workItem, percentage: value })} />
                            </div>
                            <div className='arrangeActualPercent'>
                                <EditablePercent value={arrange.actualPercentage ?? 0}
                                                 setValue={(value) => props.setWorkItem({ ...props.workItem, percentage: value })} />
                            </div>
                        </div>
                    }) : <div className='emptyArrange' onClick={initNewArrange} ></div>
            }
        </div>

    </div>
}

export default WorkItem
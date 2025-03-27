import React from 'react'
import EditableText from '@/component/common/editableText'
import './workItem.css'
import EditablePercent from '@/component/common/editablePercent'
import {useProject} from '@/component/context/partnerContext'
import EditableSelect from '@/component/common/editableSelect'
import {Dropdown} from 'antd'

function WorkItem(props) {

    const num = props.workItem.arrange?.length || 1
    const height = (num / props.totalNum) * 100

    const initNewArrange = () => {
        props.setWorkItem({
            ...props.workItem,
            arrange: [{
                owner: [],
                percentage: 0,
                actualPercentage: 0,
            }],
        })
    }

    const {partners, addPartner, saveProject} = useProject()

    const handleItemMenuClick = ({key}) => {
        if (key === '1') {
            props.insertNewWorkItem(props.workItem.itemIndex)
        }
        if (key === '2') {
            props.deleteWorkItem(props.workItem.itemIndex)
        }

    }

    const workItemMenuItem = [
        {
            label: '插入',
            key: '1',
        },
        {
            label: '删除',
            key: '2',
        }
    ]

    const handleArrangeChange = (value, index, field) => {
        const newArrange = props.workItem.arrange.map((item, i) => i === index ? {
            ...item,
            [field]: value,
        } : item)
        props.setWorkItem({
            ...props.workItem,
            arrange: newArrange,
        })
    }

    return <div className="itemContainer" style={{height: `${height}%`, minHeight: `${num * 40}px`}}>
        <div className="itemInfo">
            <Dropdown
                menu={{
                    items: workItemMenuItem,
                    onClick: handleItemMenuClick,
                }}
                trigger={["click"]}>
                <div className="itemName" onClick={e => {
                    e.preventDefault()
                }}>
                    <EditableText value={props.workItem.itemName ?? '工作项'}
                                  setValue={(value) => props.setWorkItem({...props.workItem, itemName: value})}/>
                </div>
            </Dropdown>
            <div className="itemPercent">
                <EditablePercent value={props.workItem.percentage ?? 0}
                                 setValue={(value) => props.setWorkItem({...props.workItem, percentage: value})}/>
            </div>
        </div>
        <div className="arrangeContainer">
            {
                props.workItem.arrange && props.workItem.arrange.length > 0 ?
                    props.workItem.arrange.map((arrange, i) => {
                        return <div className="arrangeItem">
                            <div className="arrangeOwner">
                                <EditableSelect value={arrange.owner}
                                                setValue={value => handleArrangeChange(value, i, 'owner')}
                                                addNewValue={addPartner}
                                                options={partners}/>
                            </div>
                            <div className="arrangePercent">
                                <EditablePercent value={arrange.percentage ?? 0}
                                                 setValue={value => handleArrangeChange(value, i, 'percentage')}/>
                            </div>
                            <div className="arrangeActualPercent">
                                <EditablePercent value={arrange.actualPercentage ?? 0}
                                                 setValue={value => handleArrangeChange(value, i, 'actualPercentage')}/>
                            </div>
                        </div>
                    }) : <div className="emptyArrange" onClick={initNewArrange}></div>
            }
        </div>
    </div>
}

export default WorkItem
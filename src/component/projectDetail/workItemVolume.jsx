import React from 'react'
import './volumn.css'

export function WorkItemVolume(props) {
    return <div className='volumnContainer'>
        <div className='volumeHeader'>
            <div className='volumeCell'>
                参与人
            </div>
            <div className='volumeCell'>
                预估工作量
            </div>
            <div className='volumeLastCell'>
                实际工作量
            </div>
        </div>
        {
            Object.entries(props.volume).map(([key, value]) => {
                return <div className='volumeRow'>
                    <div className='volumeCell'>
                        {key}
                    </div>
                    <div className='contentCell'>
                        <div style={{width: `${value.percent * 100}%`, height: '80%', background: '#95EC69'}}></div>
                    </div>
                    <div className='volumeLastCell'>
                        <div style={{width: `${value.actualPercent * 100}%`, height: '80%', background: '#95EC69'}}></div>
                    </div>
                </div>
            })
        }
    </div>
}
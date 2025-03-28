export function calculateWorkVolume(project) {
    const participantsVolume = {}
    const workItem = {}

    const recordRes = (ownerKey, actualPercent, percent, workName) => {
        if (participantsVolume[ownerKey]) {
            participantsVolume[ownerKey].percent += percent
            participantsVolume[ownerKey].actualPercent += actualPercent
            participantsVolume[ownerKey].items.push(workName)
        } else {
            participantsVolume[ownerKey] = {
                percent: percent,
                actualPercent: actualPercent,
                items: [workName]
            }
        }

        if (workItem[workName]) {

        }
    }

    const denominator = 100 ** 4

    project.stages?.map((stage) => {
        stage.nodes?.map((node) => {
            node.workItems?.map((item) => {
                const workItemKey = stage.stageName + ':' + node.nodeName + ':' + item.itemName
                item.arrange?.map((arrange) => {
                    const basicPercent = stage.percentage * node.percentage * item.percentage
                    const ownerKey = arrange.owner.join('&')
                    recordRes(ownerKey, arrange.actualPercent * basicPercent / denominator,
                        arrange.percentage * basicPercent / denominator, workItemKey)
                })
            })
        })
    })

    return participantsVolume
}
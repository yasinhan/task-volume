export function calculateWorkVolume(project) {
    const res = {}

    const recordRes = (key, actualPercent, percent, workName) => {
        if (res[key]) {
            res[key].percent += percent
            res[key].actualPercent += actualPercent
            res[key].items.push(workName)
        } else {
            res[key] = {
                percent: percent,
                actualPercent: actualPercent,
                items: [workName]
            }
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

    return res
}
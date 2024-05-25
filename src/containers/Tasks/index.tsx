import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import './index.css'
import Modal from "../../components/Modal"
import tasks from "../../models/tasks"
export default observer(({ open, onCancel }: any) => {
    useEffect(() => {
        const data = tasks.query();
        console.log('task ddddddddd', tasks.datas);
    }, [])
    return (
        <div className="task">
            <Modal title="Tasks" onCancel={() => { onCancel() }} show={open}>
                {
                    tasks?.datas?.length === 0 && (
                        <div className="leaderboard-empty">No Record</div>
                    )
                }
                {
                    (tasks.datas || []).map((item, index) => {
                        return (
                            <div className="task-item" key={item.taskid}>
                               
                                <div className="task-name">{item.name.substring(0, 8)}</div>
                                <div className="task-value">{item.point}</div>
                                <div className="task-value">{item.life}</div>
                            </div>
                        )
                    })
                }
            </Modal>
        </div>
    )
})

const Item = ({ item, subTitle }: any) => {
    console.log('item data', item)
    return (
        <div></div>
        // <div className="task-item" key={item.taskid}>
        //     <div className="task-icon">
        //         {item.name.substring(0, 1)}
        //     </div>
        //     <div className="task-name">{item.name.substring(0, 8)}</div>
        //     <div className="task-value">{item.point}</div>
        //     <div className="task-value">{item.life}</div>
        // </div>
    )
}
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
                <div className="task-wrapper">
                    {
                        tasks?.datas?.length === 0 && (
                            <div className="leaderboard-empty">No Record</div>
                        )
                    }
                    {
                        (tasks.datas || []).map((item, index) => {
                            return (
                                <div className="task-item" key={item.taskid}>
                                    <div className="task-name">{item.name}</div>
                                    <div className="task-value">{item.point}</div>
                                    {item.life > 0 &&
                                        <div className="task-value">{item.life}</div>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </Modal>
        </div>
    )
})
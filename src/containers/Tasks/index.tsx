import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import './index.css'
import Modal from "../../components/Modal"
import tasks from "../../models/tasks"
export default observer(({open, onCancel}: any) => {
    useEffect(() => {
        tasks.query();
    }, [])
    return (
        <div className="leaderboard">
            <Modal title="Tasks" onCancel={() => {onCancel()}} show={open}>
                {
                    (tasks.datas || []).map(item => {
                        return (
                            <Item key={item.taskid} title={item.name}></Item>
                        )
                    })
                }
            </Modal>
        </div>
    )
})

const Item = ({title,subTitle}: any) => {
    return (
        <div>
            <div>{title}</div>
        </div>
    )
}
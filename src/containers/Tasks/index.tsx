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
                <Item {...item}></Item>
              )
            })
          }
        </div>
      </Modal>
    </div>
  )
})

const iconMap = {
  'Invite Friends': '✅',
  'Connect Wallet': '🔁',
  'Daily Sign': '🤝',
  'Follow Twitter': '💠',
  'Forward Twitter': '➡️',
  'Like Twitter': '❤️',
  'Join Telegram': '📣',
}
const Item = ({ life, point, name }: any) => {
  return (
    <div className="task-item">
      <div className="task-icon">{iconMap[name]}</div>
      <div className="task-name">{name}</div>
      <div className="task-value">{point}</div>
      {life > 0 &&
        <div className="task-value">{life}</div>
      }
    </div>
  )
}


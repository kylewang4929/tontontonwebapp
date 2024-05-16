import { useEffect, useState } from "react"
import { getLeaderboard } from "../../services/api"
import leaderboard from "../../models/leaderboard"
import { observer } from "mobx-react-lite"
import './index.css'
import Button from "../../components/Button"
import Modal from "../../components/Modal"
export default observer(() => {
    const [open, setOpen] = useState(false)
    useEffect(() => {
        leaderboard.query();
    }, [])
    return (
        <div className="leaderboard">
            <Button style={{marginTop: '1rem',}} onClick={() => {
                setOpen(true)
            }}>Tasks</Button>
            <Modal title="Tasks" onCancel={() => setOpen(false)} show={open}>
                <div className="leaderboard-wapper">
                    {
                        leaderboard.datas.length === 0 && (
                            <div className="leaderboard-empty">No Record</div>
                        )
                    }
                {
                    leaderboard.datas.map((item, index) => {
                        return (
                            <div className="leaderboard-item">
                                <div className="leaderboard-index">{index + 1}</div>
                                <div className="leaderboard-icon"></div>
                                <div className="leaderboard-name">{item.name}</div>
                                <div className="leaderboard-value">{item.integral}</div>
                            </div>
                        )
                    })
                }
                </div>
            </Modal>
        </div>
    )
})
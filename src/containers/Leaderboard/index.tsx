import { useEffect, useState } from "react"
import { getLeaderboard } from "../../services/api"
import leaderboard from "../../models/leaderboard"
import { observer } from "mobx-react-lite"
import './index.css'
import Button from "../../components/Button"
import Modal from "../../components/Modal"
import { toJS } from "mobx"
export default observer(({open, onCancel}: any) => {
    useEffect(() => {
        leaderboard.query();
    }, [])
    return (
        <div className="leaderboard">
            <Modal title="Ranking" onCancel={() => onCancel()} show={open}>
                <div className="leaderboard-wapper">
                    {
                        leaderboard?.datas?.length === 0 && (
                            <div className="leaderboard-empty">No Record</div>
                        )
                    }
                {
                    (leaderboard.datas ||[]).map((item, index) => {
                        return (
                            <div className="leaderboard-item">
                                <div className="leaderboard-index">{index + 1}</div>
                                <div className="leaderboard-icon">
                                    {item.name.substring(0, 1)}
                                </div>
                                <div className="leaderboard-name">{item.name.substring(0, 8)}</div>
                                <div className="leaderboard-value">{item.point}</div>
                            </div>
                        )
                    })
                }
                </div>
            </Modal>
        </div>
    )
})
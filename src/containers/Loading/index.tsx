import { useEffect, useState } from "react"
import { getLeaderboard } from "../../services/api"
import leaderboard from "../../models/leaderboard"
import { observer } from "mobx-react-lite"
import Button from "../../components/Button"
import Modal, { LoadingModal } from "../../components/Modal"
import loading from "../../models/loading"
export default observer(({}: any) => {
    return (
        <LoadingModal show={loading.show}>
        </LoadingModal>
    )
})
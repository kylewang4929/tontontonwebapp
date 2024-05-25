import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import Boss from "../components/Boss";

export default observer(() => {
    const [life, setLife] = useState(100)

    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
        if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => {
            clearTimeout(timer);
        };
        } else {
        }
    }, [timeLeft]);

    return (
        <Boss life={life} time={timeLeft} onClick={() => {}}></Boss>
    )
})
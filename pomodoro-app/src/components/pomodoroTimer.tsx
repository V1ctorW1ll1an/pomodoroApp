import React, { useState } from "react";
import { useInterval } from "../hooks/useInterval";
import { secondsToTime } from "../utils/secondsToTime";

interface IProps {
    defaultPomodoroTimer: number;
}

export function PomodoroTimer(props: IProps): JSX.Element {
    const [mainTime, setMainTime] = useState(props.defaultPomodoroTimer);

    useInterval(() => {
        setMainTime(mainTime - 1);
    }, 1000);

    return <div>main time: {secondsToTime(mainTime)} </div>;
}

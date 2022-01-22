import React, { useState } from "react";
import { useInterval } from "../hooks/useInterval";
import { Button } from "./button";
import { Timer } from "./timer";

interface IProps {
    defaultPomodoroTimer: number;
}

export function PomodoroTimer(props: IProps): JSX.Element {
    const [mainTime, setMainTime] = useState(props.defaultPomodoroTimer);

    useInterval(() => {
        setMainTime(mainTime - 1);
    }, 1000);

    return (
        <div className="pomodoro">
            <h2>You are: Working</h2>
            <Timer mainTime={mainTime}></Timer>
            <Button text="teste"></Button>
        </div>
    );
}

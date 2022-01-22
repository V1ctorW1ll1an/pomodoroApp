import React, { useState } from "react";
import { useInterval } from "../hooks/useInterval";
import { Button } from "./button";
import { Timer } from "./timer";

interface IProps {
    pomodoroTimer: number;
    shortRestTime: number;
    longRestTime: number;
    cycles: number;
}

export function PomodoroTimer(props: IProps): JSX.Element {
    const [mainTime, setMainTime] = useState(props.pomodoroTimer);

    useInterval(() => {
        setMainTime(mainTime - 1);
    }, 1000);

    return (
        <div className="pomodoro">
            <h2>You are: Working</h2>
            <Timer mainTime={mainTime}></Timer>
            <div className="controls">
                <Button text="teste"></Button>
                <Button text="teste"></Button>
                <Button text="teste"></Button>
            </div>
            <div className="details">
                <p>testando</p>
                <p>testando</p>
                <p>testando</p>
                <p>testando</p>
            </div>
        </div>
    );
}

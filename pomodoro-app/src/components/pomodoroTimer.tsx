import React, { useEffect, useState } from "react";
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
    const [timeCounting, setTimeCounting] = useState(false);
    const [working, setWorking] = useState(false);
    const [text, setText] = useState("");

    const startWork = () => {
        setTimeCounting(true);
        setWorking(true);
    };

    useEffect(() => {
        if (working) document.body.classList.add("working");
    }, [working]);

    useEffect(() => {
        const theText = timeCounting ? "Pause work" : "Return to work";
        setText(theText);
    }, [timeCounting]);

    useInterval(
        () => {
            setMainTime(mainTime - 1);
        },
        timeCounting ? 1000 : null,
    );

    return (
        <div className="pomodoro">
            <h2>You are: Working</h2>
            <Timer mainTime={mainTime}></Timer>
            <div className="controls">
                <Button text="Start Work" onClick={() => startWork()}></Button>
                <Button text="teste"></Button>
                <Button
                    text={text}
                    onClick={() => setTimeCounting(!timeCounting)}
                ></Button>
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

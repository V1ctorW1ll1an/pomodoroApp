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
    const [resting, setResting] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const bellStart = require("../sounds/src_sounds_bell-start.mp3");
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const bellFinish = require("../sounds/src_sounds_bell-finish.mp3");

    const audioStartWorking = new Audio(bellStart);
    const audioFinishWorking = new Audio(bellFinish);

    const isHidden = (): string => {
        return !working && !resting ? "hidden" : "";
    };

    const startWork = () => {
        setTimeCounting(true);
        setWorking(true);
        setResting(false);
        setMainTime(props.pomodoroTimer);
        audioStartWorking.play();
    };

    const startResting = (long: boolean) => {
        setTimeCounting(true);
        setWorking(false);
        setResting(true);

        if (long) setMainTime(props.longRestTime);
        else setMainTime(props.shortRestTime);

        audioFinishWorking.play();
    };

    useEffect(() => {
        if (working) document.body.classList.add("working");
        if (resting) document.body.classList.remove("working");
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
                <Button
                    text="Rest"
                    onClick={() => startResting(false)}
                ></Button>
                <Button
                    className={isHidden()}
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

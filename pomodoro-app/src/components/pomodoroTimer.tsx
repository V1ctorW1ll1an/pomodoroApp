import React, { useEffect, useState, useCallback } from "react";
import { useInterval } from "../hooks/useInterval";
import { secondsToTime } from "../utils/secondsToTime";
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

    const generateCyclesFill = () => {
        return new Array(props.cycles - 1).fill(true);
    };

    const [cycles, setCycles] = useState(generateCyclesFill());
    const [fullWorkingTime, setFullWorkingTime] = useState(0);
    const [completedCycles, setCompletedCycles] = useState(0);
    const [numberOfPomodoro, setNumberOfPomodoro] = useState(0);

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const bellStart = require("../sounds/src_sounds_bell-start.mp3");
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const bellFinish = require("../sounds/src_sounds_bell-finish.mp3");

    const audioStartWorking = new Audio(bellStart);
    const audioFinishWorking = new Audio(bellFinish);

    const isHidden = (): string => {
        return !working && !resting ? "hidden" : "";
    };

    const workOrRest = () => {
        return working ? "Trabalhando" : "Descansando";
    };

    const startWork = useCallback(() => {
        setTimeCounting(true);
        setWorking(true);
        setResting(false);
        setMainTime(props.pomodoroTimer);
        audioStartWorking.play();
    }, [
        setTimeCounting,
        setWorking,
        setResting,
        setMainTime,
        props.pomodoroTimer,
    ]);

    const startResting = useCallback(
        (long: boolean) => {
            setTimeCounting(true);
            setWorking(false);
            setResting(true);

            if (long) setMainTime(props.longRestTime);
            else setMainTime(props.shortRestTime);

            audioFinishWorking.play();
        },
        [
            setTimeCounting,
            setWorking,
            setResting,
            setMainTime,
            props.longRestTime,
            props.shortRestTime,
        ],
    );

    useEffect(() => {
        if (working) document.body.classList.add("working");
        if (resting) document.body.classList.remove("working");
        if (mainTime > 0) return;

        if (working && cycles.length > 0) {
            startResting(false);
            cycles.pop();
        } else if (working && cycles.length <= 0) {
            startResting(false);
            setCycles(generateCyclesFill());
            setCompletedCycles(completedCycles + 1);
        }

        if (working) setNumberOfPomodoro(numberOfPomodoro + 1);
        if (resting) startWork();
    }, [
        working,
        resting,
        mainTime,
        cycles,
        startResting,
        setCycles,
        startWork,
        numberOfPomodoro,
        props.cycles,
        completedCycles,
    ]);

    useEffect(() => {
        const theText = timeCounting ? "Pause work" : "Return to work";
        setText(theText);
    }, [timeCounting]);

    useInterval(
        () => {
            setMainTime(mainTime - 1);
            if (working) setFullWorkingTime(fullWorkingTime + 1);
        },
        timeCounting ? 1000 : null,
    );

    return (
        <div className="pomodoro">
            <h2>Você está: {workOrRest()}</h2>
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
                <p>Ciclos concluídos: {completedCycles}</p>
                <p>Horas trabalhadas: {secondsToTime(fullWorkingTime)}</p>
                <p>Pomodoros concluídos: {numberOfPomodoro}</p>
            </div>
        </div>
    );
}

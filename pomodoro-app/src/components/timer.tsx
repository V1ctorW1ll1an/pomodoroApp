import React from "react";
import { secondsToTime } from "../utils/secondsToTime";

interface IProps {
    mainTime: number;
}

export function Timer(props: IProps): JSX.Element {
    return <div className="timer">{secondsToTime(props.mainTime)}</div>;
}

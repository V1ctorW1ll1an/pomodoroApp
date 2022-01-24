import React from "react";
import { secondsToMinutes } from "../utils/secondsToMinutes";

interface IProps {
    mainTime: number;
}

export function Timer(props: IProps): JSX.Element {
    return <div className="timer">{secondsToMinutes(props.mainTime)}</div>;
}

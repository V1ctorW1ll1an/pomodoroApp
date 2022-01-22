import React, { CSSProperties } from "react";

interface IProps {
    onClick?: () => void;
    text: string;
    className?: string;
    style?: CSSProperties;
}

export function Button(props: IProps): JSX.Element {
    return (
        <button
            onClick={props.onClick}
            className={props.className}
            style={props.style}
        >
            {props.text}
        </button>
    );
}

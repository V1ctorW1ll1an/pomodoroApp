import React from "react";
import { PomodoroTimer } from "./components/pomodoroTimer";

function App(): JSX.Element {
    return (
        <div className="App">
            <PomodoroTimer defaultPomodoroTimer={1500}></PomodoroTimer>
        </div>
    );
}

export default App;

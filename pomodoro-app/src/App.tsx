import React from "react";
import { PomodoroTimer } from "./components/pomodoroTimer";

function App(): JSX.Element {
    return (
        <div className="app">
            <PomodoroTimer
                pomodoroTimer={1500}
                shortRestTime={300}
                longRestTime={900}
                cycles={4}
            ></PomodoroTimer>
        </div>
    );
}

export default App;

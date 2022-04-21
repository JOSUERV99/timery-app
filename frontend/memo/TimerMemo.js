import * as React from "react";
import { MODES } from "../components/TimerScreen";

const TimerContext = React.createContext();

const TimerContextProvider = (props) => {

    const [ baseUrl, setBaseUrl ] = React.useState('http://localhost:3000');
    const [ apiKey, setApiKey ] = React.useState('');
    const [ mode, setMode ] = React.useState(MODES.CREATE);
    const [ selected, setSelected ] = React.useState(null);

    const value = React.useMemo(() => ({
        baseUrl, setBaseUrl,
        apiKey, setApiKey,
        mode, setMode,
        selected, setSelected
    }), 
    [
        baseUrl, apiKey,
        mode, selected
    ]);

    return (
        <TimerContext.Provider value={value}>
            {props.children}
        </TimerContext.Provider>
    );
}

export { TimerContext, TimerContextProvider };
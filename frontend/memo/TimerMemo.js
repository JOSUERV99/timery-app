import * as React from "react";

const TimerContext = React.createContext();

const TimerContextProvider = (props) => {

    const [ baseUrl, setBaseUrl ] = React.useState('localhost');
    const [ apiKey, setApiKey ] = React.useState('');

    const value = React.useMemo(() => ({
        baseUrl, setBaseUrl,
        apiKey, setApiKey,
    }), 
    [
        baseUrl, apiKey
    ]);

    return (
        <TimerContext.Provider value={value}>
            {props.children}
        </TimerContext.Provider>
    );
}

export { TimerContext, TimerContextProvider };
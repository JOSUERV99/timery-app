import * as React from "react";

import InputSpinner from "react-native-input-spinner";
import { Button, StyleSheet, Text, View } from "react-native";
import { calculateTotalTime, showTimer } from "../utils";
import { TimerContext } from "../memo/TimerMemo";

const timerSettings = {
  SETS: {
    key: "sets",
    minAmount: 1,
    maxAmount: 100,
    sample : 10,
    step: 1,
  },
  REST: {
    key: "rest",
    minAmount: 1,
    maxAmount: 60,
    sample : 40,
    step: 1,
  },
  WORK: {
    key: "work",
    minAmount: 1,
    maxAmount: 150,
    sample : 120,
    step: 1,
  },
};

const MODES = {
  TIMER : 0,
  CREATE : 1,
  UPDATE : 2
}

const buttonDefaultTextSize = 45;
const inputSpinnerDefaultColor = "#11fd1d";

export default function TimerScreen() {

  const timerContext = React.useContext(TimerContext);

  const [mode, setMode] = React.useState(MODES.CREATE);

  const [reps, setReps] = React.useState(timerSettings.SETS.sample);
  const [rest, setRest] = React.useState(timerSettings.REST.sample);
  const [work, setWork] = React.useState(timerSettings.WORK.sample);

  const [totalTime, setTotalTime] = React.useState(0);

  React.useEffect(() => {
    setTotalTime(calculateTotalTime(work, reps, rest));
  })

  const handleChange = (newValue, value, setState) => {
    setState(Number.isInteger(newValue) ? newValue : value);
    setTotalTime(calculateTotalTime(work, reps, rest));
  };

  const handleSave = (e) => {}

  const handleStart = (e) => {}

  const handleStop = (e) => {}

  const handleRestart = (e) => {}

  const optionsCreateAndModifySection = (
    <Text styles={styles.optionsSection}>
      <Button title="SAVE" color="#202020" touchSoundDisabled={false} onPress={handleSave}></Button>
      <Button title="START" color="#20ee40" onPress={handleStart}></Button>
    </Text>
  )

  const optionsTimingSection = (
    <Text styles={styles.optionsSection}>
      <Button title="RESTART" color="#202020" touchSoundDisabled={false} onPress={handleRestart}></Button>
      <Button title="STOP" color="#20ee40" onPress={handleStart}></Button>
    </Text>
  )

  const generateInputSpinner = (title, max, min, step, buttonFontSize, backgroundColor, onChange, value) => (
    <>
      <Text style={styles.inputLabel}>{title}</Text>
      <InputSpinner
          max={max}
          min={min}
          step={step}
          skin="square"
          buttonFontSize={buttonFontSize}
          buttonStyle={{backgroundColor}}
          fontSize={40}
          width={250}
          colorMax={"#f04048"}
          colorMin={"#40c5f4"}
          value={value}
          onChange={onChange}
        />
      </>
  )

  const generateTimerCreateAndModifyComponent = (
    <View style={styles.container}>
      <Text>WORKOUT TIME</Text>
      { showTimer(totalTime, styles.total) }
      {
        generateInputSpinner(
          "SETS",
          timerSettings.SETS.maxAmount,
          timerSettings.SETS.minAmount,
          timerSettings.SETS.step,
          buttonDefaultTextSize,
          inputSpinnerDefaultColor,
          (num) => handleChange(num, reps, setReps),
          reps
        )
      }
      {
        generateInputSpinner(
          "REST",
          timerSettings.REST.maxAmount,
          timerSettings.REST.minAmount,
          timerSettings.REST.step,
          buttonDefaultTextSize,
          inputSpinnerDefaultColor,
          (num) => handleChange(num, rest, setRest),
          rest
        )
      }
      {
        generateInputSpinner(
          "WORK",
          timerSettings.WORK.maxAmount,
          timerSettings.WORK.minAmount,
          timerSettings.WORK.step,
          buttonDefaultTextSize,
          inputSpinnerDefaultColor,
          (num) => handleChange(num, work, setWork),
          work
        )
      }
      { optionsCreateAndModifySection }
    </View>
  );

  const generateTimerTimingComponent = (
    <View style={styles.container}>
      { showTimer(totalTime, styles.total) }
      { optionsTimingSection }
    </View>
  );

  return (
    <>
    {mode === MODES.CREATE ? generateTimerCreateAndModifyComponent : generateTimerTimingComponent}
    {<Button onPress={() => mode === MODES.CREATE ? setMode(MODES.TIMER) : setMode(MODES.CREATE)} title="Change"></Button>}
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dddddd"
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    borderRadius: 60,
    textAlign: "center",
    fontSize: 100,
  },
  total: {
    fontSize: 50,
  },
  inputLabel : {
    fontSize : 25,
  },
  optionsSection : {
    paddingLeft: 10,
    flex: 1,
    flexDirection:'row',
    justifyContent: "space-around"
  }
});

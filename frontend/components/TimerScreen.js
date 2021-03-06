import * as React from "react";

import Toast from 'react-native-toast-message';
import InputSpinner from "react-native-input-spinner";
import Prompt from 'react-native-prompt-crossplatform';
import { Button, StyleSheet, Text, View } from "react-native";
import { calculateTotalTime, showTimer } from "../utils";
import { TimerContext } from "../memo/TimerMemo";
import { TimerStore } from "../store/TimerStore";

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

export const MODES = {
  TIMER : 0,
  CREATE : 1,
  UPDATE : 2
}

const buttonDefaultTextSize = 45;
const inputSpinnerDefaultColor = "#11fd1d";

export default function TimerScreen() {

  const timerContext = React.useContext(TimerContext);

  const [mode, setMode] = React.useState(MODES.CREATE);

  const [sets, setSets] = React.useState(timerSettings.SETS.sample);
  const [rest, setRest] = React.useState(timerSettings.REST.sample);
  const [work, setWork] = React.useState(timerSettings.WORK.sample);

  const [totalTime, setTotalTime] = React.useState(calculateTotalTime(work, sets, rest));
  const [name, setName] = React.useState('');
  const [addDialogVisible, setAddDialogVisible] = React.useState(false);

  React.useEffect(() => {
    console.log(totalTime)
    setInterval(() => {
      if (MODES.TIMER === mode) {
        setTotalTime(totalTime - 1);
      }
    }, 1000);
  }, [totalTime])
 

  React.useEffect(() => {
    setTotalTime(calculateTotalTime(work, sets, rest));
  })

  const handleChange = (newValue, value, setState) => {
    setState(Number.isInteger(newValue) ? newValue : value);
    setTotalTime(calculateTotalTime(work, sets, rest));
  };

  const handleSave = (timer) => {
    if (mode === MODES.CREATE)
    {
      TimerStore.create(timerContext, timer).then(({data}) => {
        console.log('Creating ', data);
        const element = timer;
        const succesful = data.affectedRows && data.affectedRows > 0;
        Toast.show({
          type: succesful ? 'success' : 'error',
          text1: 'Action message :D',
          text2: succesful ? `You create a new timer!` : `The ${element.name} was not created. Something happened :(`
        })
      })
    }
    else if (mode === MODES.UPDATE) 
    {
      TimerStore.modify(timerContext, timer).then(({data}) => {
        console.log('Updating ', data);
        const element = timer;
        const succesful = data.affectedRows && data.affectedRows > 0;
        Toast.show({
          type: succesful ? 'success' : 'error',
          text1: 'Action message :D',
          text2: succesful ? `You update the ${element.name} timer!` : `The ${element.name} was not updated. Something happened :(`
        })
      })
    }
    
  }

  const handleStart = (e) => {
    setMode(MODES.TIMER);
    console.log(mode);
  }

  const handleStop = (e) => {
    setMode(MODES.CREATE);
  }

  const handleRestart = (e) => {}

  const handleUpdate = (setting) => {
    TimerStore.modify(timerContext, setting).then(({data}) => {

      const succesful = data.affectedRows && data.affectedRows > 0;
      const element = setting;
        Toast.show({
          type: succesful ? 'success' : 'error',
          text1: 'Action message :D',
          text2: succesful ? `You have updated the ${element.name} timer` : `The ${element.name} was not deleted. Something happened :(`
        })

      timerContext.setMode(MODES.CREATE);
      timerContext.setSelected(null);

    }).catch(console.error);
  }

  const optionsCreateAndModifySection = (
    <Text styles={styles.optionsSection}>
      <Button title="CREATE" color="#dd34ee" onPress={() => {
          setMode(MODES.CREATE);
          setAddDialogVisible(true);
      }}/>
      <Button title="UPDATE" color="#2211ff" onPress={() => {
        setMode(MODES.UPDATE);
          setAddDialogVisible(true);
      }}/>
      <Button title="START" color="#20ee40" onPress={() => handleStart()}></Button>
    </Text>
  )

  const optionsTimingSection = (
    <Text styles={styles.optionsSection}>
      <Button title="RESTART" color="#202020" touchSoundDisabled={false} onPress={handleRestart}></Button>
      <Button title="STOP" color="#20ee40" onPress={handleStop}></Button>
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
          (num) => handleChange(num, sets, setSets),
          sets
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

  const generateTimerModify = () => (
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
          (num) => handleChange(num, timerContext.selected.sets, timerContext.selected.setSets),
          timerContext.selected.sets
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
          (num) => handleChange(num, timerContext.selected.rest, timerContext.selected.setRest),
          timerContext.selected.rest
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
          (num) => handleChange(num, timerContext.selected.work, timerContext.selected.setWork),
          timerContext.selected.work
        )
      }
      { optionsCreateAndModifySection }
    </View>
  );


  const savePrompt = (
    <Prompt
      title="Enter the timer name"
      inputPlaceholder="timer1"
      isVisible={addDialogVisible}
      onChangeText={(text) => setName(text)}
      onCancel={() => { setName(''); setAddDialogVisible(false)}}
      onSubmit={() => { handleSave({rest, sets, work, totalTime, name}); setAddDialogVisible(false)}}
    />
  );

  const generateTimerTimingComponent = (  
    <View style={styles.container}>
      { showTimer(totalTime, styles.total) }
      { optionsTimingSection }

    </View>
  );

  return (
    <>
      {
        mode === MODES.CREATE ? generateTimerCreateAndModifyComponent 
        : generateTimerTimingComponent}
      <Button onPress={() => mode === MODES.CREATE ? setMode(MODES.TIMER) : setMode(MODES.CREATE)} title="Change"></Button>
      {savePrompt}
      <Toast />
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

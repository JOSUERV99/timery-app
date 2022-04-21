import * as React from "react";
import Toast from 'react-native-toast-message';
import { Text, View, Button, StyleSheet, ScrollView } from "react-native";
import { List, Colors } from "react-native-paper";
import { TimerContext } from "../memo/TimerMemo";
import { TimerStore } from "../store/TimerStore";
import { showTimer } from "../utils";
import { MODES } from "./TimerScreen";

export default function SettingsScreen() {

  const timerContext = React.useContext(TimerContext);

  const [settings, setSettings] = React.useState([]);

  const refresh = () => {
    TimerStore.get(timerContext).then(({data}) => {
      setSettings(data?.result || []);
    }).catch(console.error);
  }

  React.useState(() => {
    refresh();
  }, [settings]);

  const handleDelete = (setting) => {
    TimerStore.delete(timerContext, {name : setting.name}).then(({data}) => {
      console.log(data)
      const succesful = data.affectedRows && data.affectedRows > 0;
      const element = setting;
      Toast.show({
        type: succesful ? 'success' : 'error',
        text1: 'Action message :D',
        text2: succesful ? `You have deleted the ${element.name} timer` : `The ${element.name} was not deleted. Something happened :(`
      })
      refresh();
    })
  };

  const handleModify = (setting) => {
    // TODO: CALL MODIFY IN ANOTHER SECTION MENU
    timerContext.setSelected(setting)
    timerContext.setMode(MODES.UPDATE);
    refresh();
  };

  const descriptionSection = (setting, key) => (
    <View key={key}>
      <Text>
        <List.Icon icon="play-circle-outline" color={Colors.black} />
        {showTimer(setting.work)}
        <List.Icon icon="restore" color={Colors.black} />
        {showTimer(setting.rest)}
        <List.Icon icon="autorenew" color={Colors.black} />X{setting.sets}
      </Text>
    </View>
  );

  const rightItemSection = (setting) => (
    <Text style={styles.optionsSection}>
      <Button
        color="#990c03"
        title="DELETE"
        icon="camera"
        mode="contained"
        onPress={() => handleDelete(setting)}
      >
      </Button>
    </Text>
  );

  const leftItemSection = (setting) => (
    <List.Icon
      style={styles.mainIcon}
      icon="av-timer"
      color={Colors.black}
    />
  );

  const itemTitle = (setting) => (
    <Text>
      {setting.name} - {showTimer(setting.totalTime)}
    </Text>
  );

  const generateItemComponent = (element, key) => (
    <List.Item
      key={key}
      style={styles.item}
      title={itemTitle(element)}
      description={descriptionSection(element, key)}
      left={() => leftItemSection(element)}
      right={() => rightItemSection(element)}
    />
  );

  return (
    <View styles={styles.mainContainer}>
      <Button onPress={() => refresh()} title="Refrescar"></Button>
      {
        settings && settings !== [] 
        ?
        <ScrollView>
        {settings.map((setting, index) =>
          generateItemComponent(setting, index)
        )}
        </ScrollView> 
        :
        <List.Item
          style={styles.item}
          title="There's no timers at the moment"
          description="Try adding a new one from the timer section"
        />
      }
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#aaaaaa",
    color: "#000",
    borderColor: "#000",
    borderWidth: 100,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  item: {
    fontSize: 25,
    borderColor: "#eee",
    borderWidth: 10,
  },
  mainIcon: {
    fontSize: 10,
  },
  total: {
    fontSize: 15,
  },
  emptyMessage : {
    fontSize : 25,
    color : '#000',
  }
});

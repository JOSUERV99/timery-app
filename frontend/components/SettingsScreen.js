import * as React from "react";
import { Text, View, Button, StyleSheet, ScrollView } from "react-native";
import { List, Colors } from "react-native-paper";
import { TimerContext } from "../memo/TimerMemo";
import { TimerStore } from "../store/timerStore";
import { showTimer } from "../utils";

const dummySettings = [
  {
    work: 1,
    rest: 1,
    sets: 1,
    totalTime: 10,
    name: "Timer 1",
  },
  {
    work: 1,
    rest: 1,
    sets: 1,
    totalTime: 10,
    name: "Timer 2",
  },
  {
    work: 1,
    rest: 1,
    sets: 1,
    totalTime: 10,
    name: "Timer 3",
  },
  {
    work: 1,
    rest: 1,
    sets: 1,
    totalTime: 10,
    name: "Timer 4",
  },
  {
    work: 1,
    rest: 1,
    sets: 1,
    totalTime: 10,
    name: "Timer 5",
  },
  {
    work: 1,
    rest: 1,
    sets: 1,
    totalTime: 10,
    name: "Timer 6",
  },
  {
    work: 1,
    rest: 1,
    sets: 1,
    totalTime: 10,
    name: "Timer 7",
  },
];

export default function SettingsScreen() {

  const timerContext = React.useContext(TimerContext);

  const [settings, setSettings] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  React.useState(() => {
    TimerStore.get(timerContext).then(({data}) => {
      console.log(data.result);
      setSettings(data?.result || []);
    }).catch(console.error);
  }, [settings]);

  const handleDelete = (setting) => {
    // TODO: DELETE
    setSettings(settings.filter(set => set !== setting))
  };

  const handleModify = (setting) => {
    // TODO: CALL MODIFY IN ANOTHER SECTION MENU
    setSelected(setting)
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
        color="#000"
        style={styles.optionButton}
        title="MODIFY"
        icon="camera"
        mode="contained"
        onPress={() => handleModify(setting)}
      >
        Press me
      </Button>
      <Button
        color="#990c03"
        title="DELETE"
        icon="camera"
        mode="contained"
        onPress={() => handleDelete(setting)}
      >
        Press me
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
      <ScrollView>
        {settings.map((setting, index) =>
          generateItemComponent(setting, index)
        )}
      </ScrollView>
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
});

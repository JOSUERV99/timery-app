import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
import TimerScreen from "./components/TimerScreen";
import SettingsScreen from "./components/SettingsScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Prompt from "react-native-prompt-crossplatform";
import { TimerContext, TimerContextProvider } from "./memo/TimerMemo";
import { Button } from "react-native-paper";

const TimeryApp = (props) => {
  const timerContext = React.useContext(TimerContext);
  const [baseUrlDialog, setBaseUrlDialog] = React.useState(false);
  const [baseUrl, setBaseUrl] = [timerContext.baseUrl, timerContext.setBaseUrl];

  const baseUrlPrompt = (
    <Prompt
      title="Enter the base url"
      inputPlaceholder={timerContext.baseUrl}
      isVisible={baseUrlDialog}
      onChangeText={(text) => setBaseUrl(text)}
      onCancel={() => {
        setBaseUrl("http://localhost:3000");
        setBaseUrlDialog(false);
      }}
      onSubmit={() => {
        setBaseUrl(baseUrl);
        setBaseUrlDialog(false);
      }}
    />
  );

  return (
    <NavigationContainer>
      {baseUrlPrompt}
      <Button onPress={() => setBaseUrlDialog(true)}>SET BASE URL</Button>
      <Tab.Navigator>
        <Tab.Screen
          name="Tick tock!"
          component={TimerScreen}
          options={{
            tabBarLabel: "Tick tock!",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="clock" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings!"
          component={SettingsScreen}
          options={{
            tabBarLabel: "Timer",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="timer" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <>
      <TimerContextProvider>
        <TimeryApp />
      </TimerContextProvider>
    </>
  );
}

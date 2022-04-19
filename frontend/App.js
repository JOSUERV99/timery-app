
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TimerContextProvider } from './memo/TimerMemo';

const Tab = createBottomTabNavigator();
import TimerScreen from './components/TimerScreen';
import SettingsScreen from './components/SettingsScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function App() {
  return (
    <TimerContextProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Timer" component={TimerScreen} options={{
            tabBarLabel : "Timer!",
            tabBarIcon : ({color, size}) => <MaterialCommunityIcons name="clock" color={color} size={size}/>
          }}/>
          <Tab.Screen name="Settings" component={SettingsScreen}  options={{
            tabBarLabel : "Settings",
            tabBarIcon : ({color, size}) => <MaterialCommunityIcons name="timer" color={color} size={size}/>
          }}/>
        </Tab.Navigator>
      </NavigationContainer>
    </TimerContextProvider>
  );
}

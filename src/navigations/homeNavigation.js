import React, { Component } from 'react';
import Home from './homeInterNav';
import PastComplaints from '../scenes/pastComplaints/pastComplaints';
import OngoingComplaints from '../scenes/ongoingComplaints/ongoingComplaints';
import settingsNav from  './settingsNavigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../styles/colors';

const Tab = createBottomTabNavigator();


export default class homeNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-home'
              : 'ios-home';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-settings' : 'ios-settings';
          } else if (route.name === 'Past') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          } else if (route.name === 'Ongoing') {
            iconName = focused ? 'ios-alert' : 'ios-alert';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })  }
      tabBarOptions={{
        pressColor: Colors.RED_LIGHT,//for click (ripple) effect color
        activeTintColor: Colors.RED_LIGHT,
        inactiveTintColor: Colors.GRAY_DARK,
        style: {
          backgroundColor: Colors.BLACK,//color you want to change
        },
      }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Past" component={PastComplaints} />
        <Tab.Screen name="Ongoing" component={OngoingComplaints} />
        <Tab.Screen name="Settings" component={settingsNav} />
      </Tab.Navigator>
    );
  }
}

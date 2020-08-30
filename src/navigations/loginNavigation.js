import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Login from '../scenes/login/loginScreen';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();


export default class loginNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <Stack.Navigator>
        <Stack.Screen name="Login" component={Login}  />
      </Stack.Navigator>
    );
  }
}

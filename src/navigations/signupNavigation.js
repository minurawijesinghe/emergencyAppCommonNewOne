import React, { Component } from 'react';
import signUp1 from '../scenes/signUp/signUp1';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();


export default class signupNavigation extends Component {
  render() {
    return (
        <Stack.Navigator>
        <Stack.Screen name="SignUp1" component={signUp1} />
      </Stack.Navigator>
    );
  }
}

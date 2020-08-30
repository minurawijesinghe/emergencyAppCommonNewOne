import Home from '../scenes/home/homeScreen';
import AddComplaint from './addComplaintNavigation';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class homeInterNav extends Component {
    render() {
        return (
            <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AddComplaint" component={AddComplaint} />
          </Stack.Navigator>
        )
    }
}


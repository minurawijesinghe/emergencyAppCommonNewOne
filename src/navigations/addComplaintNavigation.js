import AddComplaint from '../scenes/addComplaint/addComplaint';
import FinalComplaint from '../scenes/addComplaint/finishComplaint';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import React, { Component } from 'react'

export default class homeInterNav extends Component {
    render() {
        return (
            <Stack.Navigator>
            <Stack.Screen name="AddComplaint" component={AddComplaint} />
        
            <Stack.Screen name="FinalComplaint" component={FinalComplaint} />
            

          </Stack.Navigator>
        )
    }
}


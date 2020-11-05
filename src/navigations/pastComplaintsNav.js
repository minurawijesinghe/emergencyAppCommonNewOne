import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import PastComplaints from '../scenes/pastComplaints/pastComplaints';
import OfficerProfile from '../scenes/officerProfile/officerProfile';
import Complaint from '../scenes/complaintView/complaintView';
const Stack = createStackNavigator();

export default class pastComplaintsNav extends Component {
  render() {
    return (
        <Stack.Navigator>
        <Stack.Screen name="PastComplaints" component={PastComplaints} />
        <Stack.Screen name="OfficerProfile" component={OfficerProfile} />
        <Stack.Screen name="Complaint" component={Complaint} />


      </Stack.Navigator>
    );
  }
}

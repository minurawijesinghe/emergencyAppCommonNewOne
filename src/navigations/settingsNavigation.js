import React, { Component } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import GeneralSettings from '../scenes/settings/generalSettings';
import Logout from '../scenes/settings/logout';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();



const Drawer = createDrawerNavigator();


export default class settingsNavigation extends Component {
    render() {
        return (
          <Stack.Navigator>
        <Stack.Screen name="GeneralSettings" component={GeneralSettings} />
        <Stack.Screen name="Logout" component={Logout} />
      </Stack.Navigator>
        )
    }
}

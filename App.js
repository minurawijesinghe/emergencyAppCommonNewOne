/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { changeText, signedIn, signedOut } from './src/actions';
import { NavigationContainer } from '@react-navigation/native';
import LoginNav from './src/navigations/loginNavigation';
import homeNav from './src/navigations/homeNavigation';
import signUpNav from './src/navigations/signupNavigation';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

//


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log(this.props.isSignedIn);
        console.log(this.props.isSignedIn);

    return (
      <NavigationContainer>
        {!this.props.isSignedIn ? (
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginNav} options={{
              headerTitle: '',
              headerTransparent: true
            }} />
            <Stack.Screen name="SignUp" component={signUpNav} options={{
              headerTitle: '',
              headerTransparent: true
            }}  />
          </Stack.Navigator>
        ) : (
            <Stack.Navigator>
              <Stack.Screen  options={{
              headerTitle: '',
              headerTransparent: true
            }} name="Home" component={homeNav} />
            </Stack.Navigator>
          )}

      </NavigationContainer>
    )
  }
}



function mapStateToProps(state) {
  return {
    word: state.changeText,
    isSignedIn: state.initialState.SIGNED_IN,
  }
}

export default connect(mapStateToProps, { changeText, signedIn, signedOut })(App);

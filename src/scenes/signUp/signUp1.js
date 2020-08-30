import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView, AsyncStorage,Alert } from 'react-native';
import styles from './signUp1Styles';
import {Item, Input, Label} from 'native-base';
import Button from '../../components/molecules/buttons/cornerRoundButton';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import Spinner from 'react-native-loading-spinner-overlay';



export default class signUp1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:'',
      firstname:'',
      lastname:'',
      token:'',
      mobileNumber:'',
      confirmPassword:'',
      spinner: false

    };
  }
  
  spinnerToggle = ()=>{
    this.setState({
      spinner:!this.state.spinner,
    });
  }
  consoleFunction() {
    console.log("password :", this.state.password);
    console.log("firstName :", this.state.firstname);
    console.log("lastName :", this.state.lastname);
    console.log("username :", this.state.username);
  }
  signUp = async () => {
    this.spinnerToggle();
    this.consoleFunction();
    axios.post(baseURL + '/users/signup', {
      username: this.state.username,
      password: this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      mobileNumber:this.state.mobileNumber,
      officer:false,
    })
      .then((response) => {
        this.spinnerToggle();
        Alert.alert(JSON.stringify(response));
      }, (error) => {
        this.spinnerToggle();

        if (error.message == "Request failed with status code 500") {
          Alert.alert(JSON.stringify(error));
        }
        console.log(error.statusCode);
        

      });
  }
    render() {
        return (
            <ScrollView style={styles.container}>
               <Spinner
          visible={this.state.spinner}
          textContent={'Signing Up ...'}
          textStyle={styles.spinnerTextStyle}
        />
                 <View>
                    <Text style={styles.headerText}> SignUp </Text>

                    <View style={styles.itemContainer}>
                  <Item floatingLabel>
                    <Label style={styles.labelStyle}>National identity card number</Label>
                    <Input
                      keyboardType={'phone-pad'}
                      style={styles.Input}
                      onChangeText={(nicNumber) => {
                        this.setState({username: nicNumber});
                      }}
                    />
                  </Item>
                </View>
                <View style={styles.itemContainer}>
                  <Item floatingLabel>
                    <Label style={styles.labelStyle}>First Name</Label>
                    <Input
                      keyboardType={'default'}
                      style={styles.Input}
                      onChangeText={(firstname) => {
                        this.setState({firstname: firstname});
                      }}
                    />
                  </Item>
                  </View>

                  <View style={styles.itemContainer}>
                  <Item floatingLabel>
                    <Label style={styles.labelStyle}>Last Name</Label>
                    <Input
                      keyboardType={'default'}
                      style={styles.Input}
                      onChangeText={(lastname) => {
                        this.setState({lastname: lastname});
                      }}
                    />
                  </Item>
                  </View>

                <View style={styles.itemContainer}>
                  <Item floatingLabel>
                    <Label style={styles.labelStyle}>Mobile Number</Label>
                    <Input
                      keyboardType={'phone-pad'}
                      style={styles.Input}
                      onChangeText={(number) => {
                        this.setState({mobileNumber: number});
                      }}
                    />
                  </Item>
                </View>
                <View style={styles.itemContainer}>
                  <Item floatingLabel>
                    <Label style={styles.labelStyle}>Password</Label>
                    <Input
                      keyboardType={'default'}
                      style={styles.Input}
                      onChangeText={(password) => {
                        this.setState({password: password});
                      }}
                    />
                  </Item>
                </View>
                <View style={styles.itemContainer}>
                  <Item floatingLabel>
                    <Label style={styles.labelStyle}>Confirm Password</Label>
                    <Input
                      keyboardType={'default'}
                      style={styles.Input}
                      onChangeText={(confirmPassword) => {
                       this.setState({confirmPassword: confirmPassword});
                      }}
                    />
                  </Item>
                </View>
                <TouchableOpacity onPress={()=>this.signUp()}><Button title="SignUp"/></TouchableOpacity>
                </View>
            </ScrollView>
           
        )
    }
}

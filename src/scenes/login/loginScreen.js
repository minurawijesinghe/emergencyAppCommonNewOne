import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView , AsyncStorage, Alert} from 'react-native'
import {  changeText , signedIn, signedOut, updateToken } from '../../actions';
import { connect } from 'react-redux';
import {Item, Input, Label} from 'native-base';
import styles from './loginScreenStyles';
import Button from '../../components/molecules/buttons/cornerRoundButton';
import axios from 'axios';
import baseUrl from '../../utils/baseURL';
import LottieView from 'lottie-react-native';
import Spinner from 'react-native-loading-spinner-overlay';


class loginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username:'',
          password:'',
          token:'',
          loadingForApi:false,
        };
      }

      _storeData = async (token) => {
        try {
            await AsyncStorage.setItem('token', token);
        } catch (error) {
          console.log(error)
            // Error saving data
        }
    }
    // fetch the data back asyncronously
    _retrieveData = async () => {
      try {
          const value = await AsyncStorage.getItem('token');
          if (value !== null) {
              // Our data is fetched successfully
              console.log("saved Token",value);
              return value;
          }
      } catch (error) {
          // Error retrieving data
          return error;
      }
    }
    login(){
      this.setState({
        loadingForApi:true
      })
      if(this.state.password!=null && this.state.username!=null){
        axios.post(baseUrl+'/users/login', {
          username:this.state.username,
          password:this.state.password,
        }).then((response)=>{
          console.log('loginCalled')
          console.log(response.data.token);
          this.setState({
            loadingForApi:false
          })

/// if error happen in login update token function should move inside to the condition function,

          this.props.updateToken(response.data.token);
          if(response.data.success){
            this._storeData(response.data.token).then(
              this._retrieveData().then(
                this.props.signedIn()
              ).catch((err)=>{
                this.setState({
                  loadingForApi:false
                })
              })
              ).catch(err=>{console.log('storing error',err)
              this.setState({
                loadingForApi:false
              })});
          }
        }).catch((err)=>{
          this.setState({
            loadingForApi:false
          })

        console.log(err) })
      }else{
    Alert.alert('empty fields are there')  }
     
    }
    render() {
        console.log(this.props.isSignedIn);
        return (
            <ScrollView>
               <Spinner
          visible={this.state.loadingForApi}
          textContent={
            <Text>Authenticating...</Text>
          }
        />
            <View style={styles.container} >
                {//<Text> {this.props.word} </Text>
                }
                <View style={styles.loginAnimationContainer}>
                  <LottieView source={require('../../utils/lottieAnimations/login.json')} autoPlay loop speed={0.5}/>
                </View>
                <View style={styles.itemContainer}>
                  <Item floatingLabel>
                    <Label style={styles.labelStyle}>National identity card number</Label>
                    <Input
                      keyboardType={'default'}
                      style={styles.Input}
                      onChangeText={(username) => {
                       this.setState({username: username});
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
                
                <TouchableOpacity onPress={()=>this.login()}><Button  title ="LogIn"/></TouchableOpacity>

                <TouchableOpacity style={styles.textContainer} onPress={()=>this.props.navigation.navigate('SignUp')}>
                    <Text style={styles.signUpText}>
                        Not SignedUp yet?
                    </Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        )
    }
}
function mapStateToProps(state) {
    return {
      word: state.changeText,
      isSignedIn: state.initialState.SIGNED_IN,
    }
  }

export default connect(mapStateToProps, { signedIn, signedOut, updateToken})(loginScreen);

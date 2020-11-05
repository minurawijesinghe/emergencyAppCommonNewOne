import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView, AsyncStorage,Alert , ImageBackground} from 'react-native';
import styles from './signUp1Styles';
import {Item, Input, Label} from 'native-base';
import Button from '../../components/molecules/buttons/cornerRoundButton';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import Spinner from 'react-native-loading-spinner-overlay';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons' 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../styles/colors';
import {Fonts, Size} from '../../styles/fonts';





export default class signUp1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:null,
      password:null,
      firstname:null,
      lastname:null,
      token:null,
      mobileNumber:null,
      confirmPassword:null,
      spinner: false,
      isImageModalVisible:false,
      base64code:null,
      imagePath: '',
      imageExist:false,
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
     //console.log(this.validate());
    this.consoleFunction();
    if(this.validate()){
    axios.post(baseURL + '/users/signup', {
      username: this.state.username,
      password: this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      mobileNumber:this.state.mobileNumber,
      officer:false,
      image:this.state.base64code,
    })
      .then((response) => {
        this.spinnerToggle();
        this.props.navigation.navigate('Login');
        Alert.alert(JSON.stringify(response));
      }, (error) => {
        this.spinnerToggle();

        if (error.message == "Request failed with status code 500") {
          Alert.alert(JSON.stringify(error));
        }
        console.log(error.statusCode);
        

      });
    }

  }
  toggleImageModal = () => {
    this.setState({isImageModalVisible: !this.state.isImageModalVisible});
  };
  toggleImageExist = () => {
    this.setState({ imageExist: !this.state. imageExist, imagePath:''});
  };
  onImageFromGallery = async() => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      includeBase64:true,
    }).then(image => {
      console.log('gathered Image ',image.data);

      this.setState({
        imagePath: image.path,
        base64code:image.data,
        imageExist:!this.state.imageExist,
        isImageModalVisible: !this.state.isImageModalVisible,
      });

    });
  };
  onImageFromCamera = async() => {
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
      useFrontCamera: true,
      includeBase64:true,
    }).then(image => {
      this.setState({
        imagePath: image.path,
        base64code:image.data,
        imageExist:!this.state.imageExist,
        isImageModalVisible: !this.state.isImageModalVisible,
      });
      console.log('base64Image', this.state.base64code);
      this.toggleImageModal;
      
    });
  };
  validate=()=>{
    var regex = RegExp('[0-9]{9}[a-z]{1}','g'); 
    if(regex.test(this.state.username)){
      if(this.state.firstname !== null){
        if(this.state.base64code !==null){
          if(this.state.mobileNumber !== null){
            if(this.state.password !== null){
              if(this.state.password === this.state.confirmPassword){
                return true;
              }else{
                //this.spinnerToggle();
                Alert.alert('password and confirm password missmatched');
                return false;
              }
            }else{
              //this.spinnerToggle();
              Alert.alert('password field empty');
              return false;
            }
          }else{
            //this.spinnerToggle();

            Alert.alert('enter mobile number');
            return false;
          }
        }else{
         // this.spinnerToggle();

          Alert.alert('enter a image please');
          return false;
        }
      }else{
       // this.spinnerToggle();

        Alert.alert('enter name correctly');
        return false;

      }
    }  else{
      //this.spinnerToggle();

      Alert.alert('enter a correct Id number');
      return false;
    }
  }
    render() {
      var base64Image  = 'data:image/jpg;base64,'+this.state.base64code;

        return (
            <ScrollView style={styles.container}>
               <Spinner
          visible={this.state.spinner}
          textContent={'Signing Up ...'}
          textStyle={styles.spinnerTextStyle}
        />
         <Modal isVisible={this.state.isImageModalVisible}>
          <View style={styles.modal}>
            <View style={styles.modalInnerContainer}>
              <TouchableOpacity
                style={styles.modalCloseIconContainer}
                onPress={this.toggleImageModal}>
                <MaterialCommunityIcons
                  name="close"
                  size={40}
                  color={Colors.BLACK}
                />
              </TouchableOpacity>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.modalButtonsInnerContainer}
                  onPress={this.onImageFromGallery}>
                  <Text style={styles.buttonTextInnerModal}>
                    Choose Image from gallery
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButtonsInnerContainer}
                  onPress={this.onImageFromCamera}>
                  <Text style={styles.buttonTextInnerModal}>
                    Take image from camera
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
                 <View>
                    <Text style={styles.headerText}> SignUp </Text>

                    <View style={styles.itemContainer}>
                  <Item floatingLabel>
                    <Label style={styles.labelStyle}>National identity card number</Label>
                    <Input
                      keyboardType={'default'}
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
                <ImageBackground
          source={{uri:base64Image }}
          style={styles.image}>
              <View style={styles.imageIconContainer}>
              <TouchableOpacity
            style={styles.imageContainer}
            onPress={this.toggleImageModal}>
            <MaterialIcons
              name="add-a-photo"
              size={50}
              color={Colors.BUTTON_DARK}
            />
          </TouchableOpacity>
              </View>
        
        </ImageBackground>
                <TouchableOpacity onPress={()=>this.signUp()}><Button title="SignUp"/></TouchableOpacity>
                </View>
            </ScrollView>
           
        )
    }
}

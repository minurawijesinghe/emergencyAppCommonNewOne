import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  AsyncStorage,
  Alert,
} from 'react-native';
import {changeText, signedIn, signedOut, locationUpdate} from '../../actions';
import {connect} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import styles from './homeScreenStyles';
import AwesomeButton from 'react-native-really-awesome-button';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../styles/colors';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import Button from 'react-native-really-awesome-button/src/themes/blue';
import CountDown from 'react-native-countdown-component';
import Spinner from 'react-native-loading-spinner-overlay';
import Axios from 'axios';
import baseURL from '../../utils/baseURL';


const ScreenSize = Dimensions.get('window');

class homeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isPressed: false,
      canBeChangeStatus: true,
      latitude:0,
      loadingState:'Loading ...',
      longitude:0,
      spinnerText:'fetching location...',
      error:null,
      token:'',
    };
  }

  componentDidMount(){
    this.fetchCurrentLocation();
    this._retrieveData();
    // setInterval(() => {
       this.updateLocation();
     // }, 20000);
  }
  toggleLoading = ()=>{
    this.setState({
     // isLoading:!this.state.isLoading,
    });
    
  }

  updateLocation(){
    console.log('user location from update api ', this.state.latitude, this.state.longitude)
    this.props.locationUpdate(this.state.latitude, this.state.longitude);
    Axios.put(baseURL+'/userLocations',{body:{
      latitude:this.state.latitude,
      longitude:this.state.longitude,
    }},{
      headers:{
        'Authorization':`bearer ${this.state.token}`
      }
    })
   
  }


   fetchCurrentLocation=()=>{
    Geolocation.getCurrentPosition(
      (position) => {
       console.log('position' , position)
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          isLoading:false,
        })
      },(error) => this.setState({error: error.message}),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }
  changeCanBeChangeStatus(bool) {
      this.setState({
        canBeChangeStatus: bool,
      });
      if(!this.state.canBeChangeStatus){
        this.sendComplaint();
      }
  }
  changePressedStatus() {
    if (this.state.isPressed) {
      this.setState({
        isPressed: false,
      });
    } else {
      this.setState({
        isPressed: true,
      });
    }
  }

   // fetch the data back asyncronously
   _retrieveData = async () => {
    try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
            // Our data is fetched successfully
            console.log("saved Token",value);
            this.setState({
              token:value,
            });
            return value;
        }
    } catch (error) {
        // Error retrieving data
        return error;
    }
  }
  uploadAudio(complaintId){
    console.log(complaintId);
  }

  sendComplaint=()=>{
    Axios({
      url: baseURL + '/complaint',
      method: 'POST',
      headers: {
          Authorization: `bearer ${this.state.token}`
      },
      data: {
          latitude: this.state.complaintLat,
          longitude: this.state.complaintLon,
      }
  }).then((complaint) => {
      console.log('complaint id', complaint.data.complaint._id);
      this.uploadAudio(complaint.data.complaint._id);
      ///this.uploadImage(complaint.data.complaint._id);
      //this.uploadVideo(complaint.data.complaint._id);
      Alert.alert('successfully data uploading');
  }, err => console.log(err))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <ScrollView>
         <Spinner
          visible={this.state.isLoading}
          textContent={this.state.loadingState}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.container}>
          <Text style={styles.header}>Complaint counter</Text>
          <View style={styles.buttonContainer}>
            <AwesomeButtonRick
              backgroundPlaceholder={Colors.RED_LIGHT}
              backgroundDarker={Colors.RED_DARK}
              type="secondary"
              height={ScreenSize.width * 0.8}
              width={ScreenSize.width * 0.8}
              borderRadius={ScreenSize.width * 0.4}
              onPress={() => this.changePressedStatus()}
              backgroundActive={Colors.ALERT}
              raiseLevel={10}
              borderColor={Colors.BLACK}
              backgroundShadow={Colors.RED_DARK}
              disabled={!this.state.canBeChangeStatus}
              backgroundActive={Colors.BLACK}
              backgroundColor={Colors.BUTTON_DARK}
              // progress={this.state.isLoading}
              //progressLoadingTime={3000}
            >
              {this.state.canBeChangeStatus ? (
                !this.state.isPressed ? (
                  <View style={styles.buttonTextContainer}>
                    <Text style={styles.titleText}>EMERGENCY TAP</Text>
                    <Text style={styles.titleText}>HELP!</Text>
                    <Text style={styles.subTextMain}>
                      Tap will send your details
                    </Text>
                    <Text style={styles.subText}>
                      with voice record and video{' '}
                    </Text>
                    <Text style={styles.subText}> to the service provider</Text>
                  </View>
                ) : (
                  <CountDown
                    until={10}
                    size={30}
                    onFinish={() => {
                      this.changeCanBeChangeStatus(false);
                    }}
                    digitStyle={{backgroundColor: Colors.BUTTON_DARK}}
                    digitTxtStyle={{color: '#1CC625'}}
                    timeToShow={['S']}
                    timeLabels={{s: ''}}
                  />
                )
              ) : (
                <View style={styles.buttonDisabledView}>
                  <Text style={styles.buttonDisabledText}>
                    BUTTON DISABLED
                  </Text>
                  <Text style={styles.buttonDisabledTextSubText}>
                    Manually proceed to 
                  </Text>
                  <Text style={styles.buttonDisabledTextSubText}>
                    Cancel the complaint
                  </Text>
                </View>
              )}
            </AwesomeButtonRick>
          </View>
          {!this.state.canBeChangeStatus?(
             <View style={styles.cancelComplaintView}>
             <Text style={styles.importantText}>IMPORTANT.....!</Text>
             <Text style={styles.emergencyComplaintCancelText}>You have sent a emergency complaint please be sure to cancel the complaint if it is not necessary !</Text>
             <View style={styles.CancelButtonContainer}>
             <Button
               type="primary"
               width={ScreenSize.width * 0.9}
               backgroundDarker={Colors.BUTTON_DARK}
               borderColor={Colors.PURPLE}
               borderWidth={2}
               backgroundColor={Colors.BUTTON_DARK}
               backgroundShadow={Colors.PURPLE}
               onPress={() => {this.changeCanBeChangeStatus(true); this.changePressedStatus()}}>
               <Text style={styles.cancelComplaintButtonText}>
                Cancel the complaint 
               </Text>
             </Button>
           </View>
           </View>):(<Text></Text>)
         }
         
          <View style={styles.nextButtonContainer}>
            <Button
              type="primary"
              width={ScreenSize.width * 0.9}
              backgroundDarker={Colors.BLACK}
              borderColor={Colors.RED_LIGHT}
              borderWidth={2}
              backgroundColor={Colors.BUTTON_DARK}
              backgroundShadow={Colors.RED_DARK}
              onPress={() => this.props.navigation.navigate('AddComplaint')}>
              <Text style={styles.textNextButton}>
                You are not the victim but need complaint
              </Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  }
}
function mapStateToProps(state) {
  return {
    word: state.changeText,
    isSignedIn: state.initialState.SIGNED_IN,
    latitude:state.initialState.latitude,
    longitude:state.initialState.longitude,
  };
}

export default connect(mapStateToProps, {signedIn, signedOut, locationUpdate})(homeScreen);

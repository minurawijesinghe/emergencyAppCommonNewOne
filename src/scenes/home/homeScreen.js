import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  AsyncStorage,
  Alert,
  TouchableWithoutFeedback,
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
import storage from '@react-native-firebase/storage';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { useIsFocused } from '@react-navigation/native';



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
      recordSecs:0,
      isRecording:false,
      isThereAudio:false,
      recordTime:0,
      isRecording:false,
      loadingForApi:true,
      ongoingComplaint:false,
      focused:false,
      uploading:false,
    };
  }
  audioRecorderPlayer = new AudioRecorderPlayer();

  componentDidMount(){
   this.props.navigation.addListener('focus', () => {
    this._onGettingOngoingComplaint();  });
   
    this._onGettingOngoingComplaint();
    this.onStopRecord();
    this.fetchCurrentLocation();
    this._retrieveData();
     setInterval(() => {
       this.updateLocation();
      }, 20000);
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
  componentWillMount=()=>{
    console.log('component will mount executed');
  }

  onStartRecord = async () => {
    console.log('recordingstart');
    const result = await this.audioRecorderPlayer.startRecorder();
    this.audioRecorderPlayer.addRecordBackListener(e => {
      this.setState({
        recordSecs: e.current_position,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.current_position),
        ),
        isRecording: true,
      });
      console.log('isThereAudio', this.state.isThereAudio);
      console.log('isRecording', this.state.isRecording);

      return;
    });
    console.log();
    //console.log(result);
  };
  onStopRecord = async () => {
    const result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0,
      isRecording: false,
      isThereAudio: true,
    });
    //console.log('isRecording', this.state.isRecording);

    console.log('recording results', result);
  };
  _onGettingOngoingComplaint =()=>{
   
    console.log('getting on going complaint executed with token ', this.props.token);

    Axios({
      method: 'GET',
      url: baseURL + '/complaint/myOnGoingComplaint',
      headers: {Authorization: `Bearer ${this.props.token}`},
    })
    .then((myComplaint)=>{
      if(myComplaint.data==null){
        this.setState({
          canBeChangeStatus:true,
          ongoingComplaint:false,
          isPressed:false,
        
        });
      }
      console.log('getting on going complaint name ', myComplaint.data);
      this.setState({
        loadingForApi:false,
      })

      if(typeof myComplaint.data._id!=='undefined'){
        this.setState({
          canBeChangeStatus:false,
          ongoingComplaint:true,
        
        });
      }
    }).catch(err=>{console.log(err)
      this.setState({
        loadingForApi:false,
      })});
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
    this.onStopRecord();
      this.setState({
        canBeChangeStatus: bool,
      });
      if(!this.state.canBeChangeStatus){
        this.sendComplaint();
      }
  }
  changePressedStatus() {
    if (this.state.isPressed) {
      this.onStopRecord();
      this.setState({
        isPressed: false,
      });
    } else {
      this.onStartRecord();
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
  uploadAudio = complaintId => {
    // console.log('complaintId', complaintId);
    const reference1 = storage().ref(
      `/complaints/${complaintId}/audio.mp4`,
    );

   // console.log('url audio', url);

    reference1
      .putFile('file://sdcard/sound.mp4')
      .then(
        () => {
          reference1.getDownloadURL().then(url => {
            console.log('image download url from after then', url);
            Axios({
              url: baseURL + '/complaint/audio',
              method: 'PUT',
              headers: {
                Authorization: `bearer ${this.state.token}`,
              },
              data: {
                audio: url,
                complaintId: complaintId,
              },
            }).then(complaint => {
              this.setState({
                uploading:false,
              })
              this.props.navigation.navigate('Home');
            });
          });
        },
        err => console.log('err', err),
      )
      .catch(err => console.log(err));
  };

  sendComplaint=()=>{
    this.setState({
      uploading:true,
    })
    Axios({
      url: baseURL + '/complaint',
      method: 'POST',
      headers: {
          Authorization: `bearer ${this.state.token}`
      },
      data: {
          latitude: this.state.latitude,
          longitude: this.state.longitude,
      }
  }).then((complaint) => {
      console.log('complaint id', complaint.data.complaint._id);
      this.uploadAudio(complaint.data.complaint._id);
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
         <Spinner
          visible={this.state.loadingForApi}
          textContent={'getting your status...'}
          textStyle={styles.spinnerTextStyle}
        />
         <Spinner
          visible={this.state.uploading}
          textContent={'data uploading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.container}>
        <TouchableWithoutFeedback 
        onPress={()=>{this._onGettingOngoingComplaint()}}
        >
          <Text style={styles.header}>Complaint counter</Text>
          </TouchableWithoutFeedback>
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
                      with voice record of 10 seconds{' '}
                    </Text>
                    <Text style={styles.subText}> to the service provider</Text>
                    <Text style={styles.subText}> you can edit them on the  </Text>
                    <Text style={styles.subText}> ongoing complaint tab </Text>

                  </View>
                ) : (
                  <View>
                    <Text style={styles.countDownText}>Recording...</Text>
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
                  </View>
                )
              ) : (
                <View style={styles.buttonDisabledView}>
                  <Text style={styles.buttonDisabledText}>
                    BUTTON DISABLED
                  </Text>
                  <Text style={styles.buttonDisabledTextSubText}>
                    You have ongoing Complaint 
                  </Text>
                  <Text style={styles.buttonDisabledTextSubText}>
                    look at the ongoing tab 
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
                     </View>
           </View>):(<Text></Text>)
         }
         
          <View style={styles.nextButtonContainer}>
            {
              this.state.ongoingComplaint ? (
                <Button
                type="primary"
                width={ScreenSize.width * 0.9}
                backgroundDarker={Colors.BLACK}
                borderColor={Colors.RED_LIGHT}
                borderWidth={2}
                backgroundColor={Colors.BUTTON_DARK}
                backgroundShadow={Colors.RED_DARK}
                disabled={true}
                >
                <Text style={styles.textNextButton}>
                  You have a ongoing Complaint 
                </Text>
              </Button>
              ):(
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
              )
            }
           
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
    token:state.initialState.token,
  };
}

export default connect(mapStateToProps, {signedIn, signedOut, locationUpdate})(homeScreen);

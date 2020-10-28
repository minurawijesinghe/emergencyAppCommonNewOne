import React, { Component } from 'react';
import {  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  View, } from 'react-native';
import styles from './addComplaintStyles';
import Geolocation from 'react-native-geolocation-service';
import LoadingSpinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Foundation';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Button from '../../components/molecules/buttons/cornerRoundButton';
import { connect } from 'react-redux';
import { changeText, signedIn, signedOut, locationUpdate } from '../../actions';

const screenDimensions = Dimensions.get('window');
const latitudeDelta = 0.005;
const longitudeDelta = 0.005;
class mapScreen extends Component{
  constructor(props) {
    super(props);
    this.map = null;

    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.setNativeMapRef = this.setNativeMapRef.bind(this);

    this.state = {
      region: [],
      latitude: 0,
      longitude: 0,
      mLat: 0,
      mLon: 0,
      error: null,
      latitudeDelta,
      longitudeDelta,
      loading: true,
    };
  }

  componentDidMount(){
    console.log("componentDidMount location", this.props.latitude, this.props.longitude);
    Geolocation.getCurrentPosition(
      (position) => {
        console.log("position ",position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          loading:false,
        });
      },
      (error) => this.setState({error: error.message}),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }

  setNativeMapRef(ref) {
    this.map = ref;
  }
  handleRegionChange(region) {
    this.map
      .coordinateForPoint({
        x: screenDimensions.width / 2,
        y: screenDimensions.height / 2,
      })
      .then((coords) =>
        this.setState({
          latitude: coords.latitude,
          longitude: coords.longitude,
        }),
      )
      .catch((e) => alert(e));
  }
  render() {
    return (
      <ScrollView style={StyleSheet.absoluteFillObject}>
      <LoadingSpinner
        visible={this.state.loading}
        textContent={'fetching location'}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.locateText}>Location</Text>
        <Text style={styles.locateBottomText}>
          Select the new location 
        </Text>
      </View>
      <Icon
        name="marker"
        // eslint-disable-next-line react-native/no-inline-styles data
        style={{
          zIndex: 3,
          position: 'absolute',
          marginTop: -37,
          marginLeft: -11,
          left: '50%',
          top: '50%',
        }}
        size={40}
        color={"black"}
      />
      <TouchableOpacity
        style={styles.touchableView}
        onPress={() => {
          console.log(
            'latitude' + this.state.latitude,
            'longitude' + this.state.longitude,
          );
           this.props.navigation.navigate('FinalComplaint',{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
          });
        }}>
       <Button title='Set the location'/>
      </TouchableOpacity>
      <MapView
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        ref={this.setNativeMapRef}
        region={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        }}
        onRegionChangeComplete={() => this.handleRegionChange()}
        //onRegionChangeComplete={this.handleRegionChange}
        // eslint-disable-next-line prettier/prettier
    />
    </ScrollView>
    );
      }
}
function mapStateToProps(state) {
  return {
    word: state.changeText,
    isSignedIn: state.initialState.SIGNED_IN,
    longitude:state.initialState.longitude,
    latitude:state.initialState.latitude,
  }
}

export default connect(mapStateToProps, { changeText, signedIn, signedOut, locationUpdate })(mapScreen);

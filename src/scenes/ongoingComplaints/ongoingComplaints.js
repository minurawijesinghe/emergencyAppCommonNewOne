import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import styles from './ongoingComplaintsStyles';
import {updateToken} from '../../actions';
import {connect} from 'react-redux';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import LottieView from 'lottie-react-native';

class ongoingComplaints extends Component {
  constructor(props) {
    super(props);
    this.state = {
      officerFirstName:'',
      officerLastName:'',
      officerCode:'',
      latitude:0,
      longitude:0,
    };
  }
  componentDidMount=()=>{
    this._onGettingOnGoingComplaint();
  }
  _onGettingOnGoingComplaint=()=>{
    axios({
      method: 'GET',
      url: baseURL + '/complaint/myOnGoingComplaint',
      headers: {Authorization: `Bearer ${this.props.token}`},
    })
      .then(
        (complaint) => {
        },
        err => console.log(err),
      )
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Ongoing</Text>
          <View style={styles.lottieContainer}>
          <LottieView source={require('../../utils/lottieAnimations/proccesing.json')} autoPlay loop/>
          </View>
        </View>
      </ScrollView>
    );
  }
}
function mapStateToProps(state) {
  return {
    token: state.initialState.token,
    officerId: state.initialState.officerId,
  };
}

export default connect(mapStateToProps, {updateToken})(ongoingComplaints);



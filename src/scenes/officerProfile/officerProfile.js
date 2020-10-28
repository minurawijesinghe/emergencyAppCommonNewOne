import React, { Component } from 'react';
import { View, Text, ScrollView , Image} from 'react-native';
import styles from './officerProfileStyles';
import {updateToken} from '../../actions';
import {connect} from 'react-redux';
import baseUrl from '../../utils/baseURL';
import Axios from 'axios';



class officerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        officerId:'',
        officerFirstName:'',
        officerLastName:'',
        officerCode:'',
        image:'',
    };
  }

  componentDidMount=()=>{
    const {officerId} = this.props.route.params;
    console.log(' token ', this.props.token);
    this.setState({
        officerId:officerId,
    })
    this.getOfficerDetails();

  }
  getOfficerDetails=()=>{
    Axios.put(baseUrl+'/users/byId',{
        officerId:this.props.officerId,
      },{
        headers:{
          'Authorization':`bearer ${this.props.token}`
        }
      })
    .then(officerDetails => {
        console.log('officer details', officerDetails.data)
     this.setState({
       officerFirstName:officerDetails.data.firstname,
       officerLastName:officerDetails.data.lastname,
       image:officerDetails.data.image,
       officerCode:"Officer Code : "+officerDetails.data.officerCode,
     });
     console.log('officer name ', this.state.officerFirstName);
    }).catch(err=>{console.log(err)})
  }

  render() {
    var base64Image = 'data:image/jpg;base64,' + this.state.image;
    return (
      <ScrollView style={styles.container}>
          <View style={styles.headerContainer}></View>
        <Text style={styles.headerText}> Officer Profile </Text>
        <View style={styles.imageContainer}>
            <Image source={{uri: base64Image}} style={styles.image} />
        </View>
        <View style={styles.detailContainer}>
            <Text style={styles.nameText}>{this.state.officerFirstName}</Text>
            <Text style={styles.nameText}>{this.state.officerLastName}</Text>
            <Text style={styles.idText}>{this.state.officerCode}</Text>
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
  
  export default connect(mapStateToProps, {updateToken})(officerProfile);
  

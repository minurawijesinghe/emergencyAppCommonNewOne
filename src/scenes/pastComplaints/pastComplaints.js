import React, {Component} from 'react';
import {View, Text, ScrollView, FlatList} from 'react-native';
import styles from './pastComplaintsStyles';
import ComplaintListRender from '../../components/molecules/modals/complaintListRender';
import axios from 'axios';
import {updateToken, updateOfficerId} from '../../actions';
import {connect} from 'react-redux';
import baseURL from '../../utils/baseURL';
import Spinner from 'react-native-loading-spinner-overlay';



class pastComplaints extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complaintsList:null,
      loadingForApi:true,
    };
  }

  componentDidMount = async () => {
    this.getUserPastComplaints();
  };
  getUserPastComplaints=()=>{
    axios
    .get(baseURL + '/complaint/myComplaints', {
      headers: {
        Authorization: `Bearer ${this.props.token}`,
      },
    })
    .then(complaints => {
     complaintsData=complaints.data;
     this.setState({
       complaintsList:complaints.data,
       loadingForApi:false,
     })
    });
  }
  navigationToOfficerProfile=(officerId)=>{
    this.props.updateOfficerId(officerId);
    this.props.navigation.navigate('OfficerProfile', {officerId:officerId});
  }
  onComplaintPress=(complaintId)=>{
    console.log('complaint pressed');
    this.props.navigation.navigate('Complaint', {complaintId:complaintId});
  }

  render() {
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.loadingForApi}
          textContent={
            <Text style={{color: 'white'}}>Getting Data</Text>
          }
        />
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}> Past Complaints </Text>
        </View>
        <View style={styles.flatListContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.complaintsList}
            renderItem={({item}) => (
              <ComplaintListRender
                cLongitude={item.longitude}
                cLatitude={item.latitude}
                date={item.createdAt}
                officerFirstName={item.officerInCharge.firstname}
                officerSecondName={item.officerInCharge.lastname}
                officerId={item.officerInCharge.officerCode}
                image={item.officerInCharge.image}
                navigation={this.navigationToOfficerProfile}
                complaintId={item._id}
                onComplaintPress={this.onComplaintPress}
                id={item.officerInCharge._id}

              />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    token: state.initialState.token,
  };
}

export default connect(mapStateToProps, {updateToken, updateOfficerId})(pastComplaints);


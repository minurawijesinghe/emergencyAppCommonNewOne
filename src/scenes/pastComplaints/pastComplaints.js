import React, {Component} from 'react';
import {View, Text, ScrollView, FlatList} from 'react-native';
import styles from './pastComplaintsStyles';
import ComplaintListRender from '../../components/molecules/modals/complaintListRender';
import axios from 'axios';
import {updateToken, updateOfficerId} from '../../actions';
import {connect} from 'react-redux';
import baseURL from '../../utils/baseURL';

const DATA = [
  {
    latitude: 7.447675,
    longitude: 79.829494,
    date: '2020-10-28T12:02:05.091+00:00',
    firstName: 'Minura',
    secondName: 'Wijesinghe',
    officerId: '1234567890',
    image: '',
    id: 1,
  },
  {
    latitude: 7.447675,
    longitude: 79.829494,
    date: '2020-10-28T12:02:05.091+00:00',
    firstName: 'Minura',
    secondName: 'Wijesinghe',
    officerId: '1234567890',
    image: '',
    id: 2,
  },
  {
    latitude: 7.447675,
    longitude: 79.829494,
    date: '2020-10-28T12:02:05.091+00:00',
    firstName: 'Minura',
    secondName: 'Wijesinghe',
    officerId: '1234567890',
    image: '',
    id: 3,
  },
  {
    latitude: 7.447675,
    longitude: 79.829494,
    date: '2020-10-28T12:02:05.091+00:00',
    firstName: 'Minura',
    secondName: 'Wijesinghe',
    officerId: '1234567890',
    image: '',
    id: 4,
  },
  {
    latitude: 7.447675,
    longitude: 79.829494,
    date: '2020-10-28T12:02:05.091+00:00',
    firstName: 'Minura',
    secondName: 'Wijesinghe',
    officerId: '1234567890',
    image: '',
    id: 5,
  },
  {
    latitude: 7.447675,
    longitude: 79.829494,
    date: '2020-10-28T12:02:05.091+00:00',
    firstName: 'Minura',
    secondName: 'Wijesinghe',
    officerId: '1234567890',
    image: '',
    id: 6,
  },
];

let complaintsData=[];

class pastComplaints extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complaintsList:null,
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
     })
    });
  }
  navigationToOfficerProfile=(officerId)=>{
    this.props.updateOfficerId(officerId);
    this.props.navigation.navigate('OfficerProfile', {officerId:officerId});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}> Past Complaints </Text>
        </View>
        <View style={styles.flatListContainer}>
          {
          

          }
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


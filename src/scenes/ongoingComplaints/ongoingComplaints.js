import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import styles from './ongoingComplaintsStyles';

export default class ongoingComplaints extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}> ongoingComplaints </Text>
        </View>
      </ScrollView>
    );
  }
}

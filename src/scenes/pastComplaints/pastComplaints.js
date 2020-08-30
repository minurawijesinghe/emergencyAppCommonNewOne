import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import styles from './pastComplaintsStyles';

export default class pastComplaints extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}> Past Complaints </Text>
        </View>
      </ScrollView>
    );
  }
}

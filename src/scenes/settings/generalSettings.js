import React, {Component} from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';
import Button from 'react-native-really-awesome-button/src/themes/blue';
import styles from './generalSettingsStyles';
import {changeText, signedIn, signedOut} from '../../actions';
import {connect} from 'react-redux';
import {Colors} from '../../styles/colors';

const ScreenSize = Dimensions.get('window');

class generalSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.settingsText}>Settings</Text>
          <View style={styles.buttonContainer}>
            <Button
            width={ScreenSize.width * 0.9}
              type="secondary"
              backgroundDarker={Colors.BLACK}
              borderColor={Colors.RED_LIGHT}
              borderWidth={2}
              backgroundColor={Colors.BUTTON_DARK}
              backgroundShadow={Colors.RED_DARK}
              onPress={this.props.signedOut}>
              <Text style={styles.textInsideButtons}>Log Out</Text>
            </Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button
            width={ScreenSize.width * 0.9}
              type="secondary"
              backgroundDarker={Colors.BLACK}
              borderColor={Colors.RED_LIGHT}
              borderWidth={2}
              backgroundColor={Colors.BUTTON_DARK}
              backgroundShadow={Colors.RED_DARK}>
              <Text style={styles.textInsideButtons}>Cancel complaint</Text>
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
  };
}

export default connect(mapStateToProps, {signedIn, signedOut})(generalSettings);

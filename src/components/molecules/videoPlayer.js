import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import Player from 'react-native-video-player';

const ScreenSize = Dimensions.get('window');
let height = ScreenSize.height*0.6;
const VideoPlayer = ({videoLink, type}) => {
  if(type=='audio'){
    height=50;
  }else{
    height = ScreenSize.height*0.6;
  }
  return (
    <View style={styles.container}>
      <Player
        video={{uri:videoLink}}
        videoWidth={ScreenSize.width*0.9}
        videoHeight={height}
        disableFullscreen={false}
      />
    </View>
  );
};
export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    width: ScreenSize.width * 0.9,
    height: ScreenSize.height * 0.6,
  },
});
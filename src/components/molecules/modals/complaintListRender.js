import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {Fonts, Size} from '../../../styles/fonts';
import {Colors} from '../../../styles/colors';
const ScreenSize = Dimensions.get('window');

const complaintListRender = ({
  cLongitude,
  cLatitude,
  date,
  officerFirstName,
  officerSecondName,
  officerId,
  image,
  navigation,
  id,
}) => {
  let coordinates = {
    latitude: cLatitude,
    longitude: cLongitude,
  };
  var str = date;
  
  var res = str.split('T');
  var res2 = str.substring(11, 16);
  const [base64Image, setBase64Image] = useState(
    'data:image/jpg;base64,' + image,
  );
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.detailContainer} onPress={()=>navigation(id)}>
        <View>
          <Text style={styles.headerText}>{'Officer in charge'}</Text>
        </View>
        <View style={styles.officerDetailContainer}>
          <View style={styles.imageContainer}>
            <Image source={{uri: base64Image}} style={styles.image} />
          </View>
          <View style={styles.nameContainer}>
              <Text style={styles.name}>{officerFirstName}</Text>
              <Text style={styles.name}>{officerSecondName}</Text>
              <Text style={styles.name}>{officerId}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={{width:'100%', marginLeft:10}}>
      <Text style={styles.headerText}>{'Reported Location'}</Text>

      </View>
      <View style={styles.mapContainer}>
        <MapView
          showsUserLocation={true}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          // liteMode={true}
          //ref={this.setNativeMapRef}
          region={{
            latitude: cLatitude,
            longitude: cLongitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          //onRegionChangeComplete={this.handleRegionChange}
          // eslint-disable-next-line prettier/prettier
        >
          <Marker coordinate={coordinates} />
        </MapView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: ScreenSize.width * 0.9,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginVertical: 20,
    borderRadius: 20,
  },
  mapContainer: {
    width: ScreenSize.width * 0.9,
    height: ScreenSize.width * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  map: {
    width: ScreenSize.width * 0.9,
    height: ScreenSize.width * 0.8,
  },
  detailContainer: {
    width: ScreenSize.width * 0.9,
    padding: 10,
    marginTop: 10,
  },
  headerText: {
    fontFamily: Fonts.MonteSerratBold,
    fontSize: Size.ButtonText,
  },
  officerDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems:'center',
  },
  imageContainer: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    alignSelf: 'center',
    borderRadius: 80,
    margin: 5,
    backgroundColor:Colors.GRAY_DARK,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    alignSelf: 'center',
    borderRadius: 25,
  },
  nameContainer:{
    marginLeft:10,
  },
  name:{
      fontFamily:Fonts.OpenSansBold,
      fontSize:Size.large,
      color:Colors.GRAY_EXTRA_DARK,
  },
});

export default complaintListRender;

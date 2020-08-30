import React from 'react';
import { Text, View , StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import {Colors} from '../../../styles/colors';
import {Fonts, Size} from '../../../styles/fonts';




const ScreenSize  = Dimensions.get('window');
const cornerRoundButton=(props)=> {
    return(<View style={styles.container}>
        <Text style={styles.titleText}>{props.title}</Text>
    </View>
    );
    
    }
const styles = StyleSheet.create({
    container:{
        height: 50,
        borderRadius:25,
        backgroundColor:Colors.BLACK,
        justifyContent:'center',
        alignItems:'center',
        marginVertical:30,
    },
    titleText:{
        fontFamily:Fonts.OpenSansBold,
        color:Colors.RED_LIGHT,
        marginHorizontal:20,
    },
});
export default cornerRoundButton;

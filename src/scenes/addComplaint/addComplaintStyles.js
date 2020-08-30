/* eslint-disable prettier/prettier */
import { StyleSheet, Dimensions } from 'react-native';
import {Colors} from '../../styles/colors';
import {Fonts} from '../../styles/fonts';


const win = Dimensions.get('window');

const styles = StyleSheet.create({
    map: {
        height: win.height,
        width: win.width,
      },
      mapButton:{
        
        borderRadius:20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 90,
        height: 90,
        borderRadius: 90 / 2,
        
      },
      touchableView:{
        zIndex: 3,
        position: 'absolute',
        alignSelf:'center',
        alignItems:'center',
        marginTop:win.height*0.75,
      },
      locateText:{
          fontFamily:Fonts.MonteSerrat,
          letterSpacing:3,
          fontSize:25,
          color:Colors.BLACK,
      },
      headerContainer:{
        zIndex: 3,
        position: 'absolute',
        marginTop: 20,
        marginLeft: 10,
      },
      locateBottomText:{
        fontFamily:Fonts.MonteSerratBold,
        //letterSpacing:3,
        fontSize:15,
        color:Colors.BLACK,
        
      },
});

export default styles;
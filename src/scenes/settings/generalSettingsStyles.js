import { StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../../styles/colors';
import {Fonts,Size} from '../../styles/fonts';

const ScreenSize = Dimensions.get('window');
const styles  = StyleSheet.create({
    container:{
        width:ScreenSize.width,
        height:ScreenSize.height,
        backgroundColor:Colors.BLACK,
    },
    settingsText:{
        color:Colors.RED_LIGHT,
        fontFamily:Fonts.MonteSerratBold,
        fontSize:Size.HeaderSize,
        marginLeft:20,
        marginTop:20,
    },
    buttonContainer:{
        width:'100%',
        alignItems:'center',
        marginTop:40,
        marginBottom:20,
    },
    textInsideButtons:{
        fontFamily:Fonts.OpenSans,
        color:Colors.RED_LIGHT,
        fontSize:Size.ButtonText,
    },
});

export default styles;
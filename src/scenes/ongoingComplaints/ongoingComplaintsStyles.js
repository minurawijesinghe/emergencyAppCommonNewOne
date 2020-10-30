import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../../styles/colors';
import {Fonts, Size} from '../../styles/fonts';

const ScreenSize  = Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
        width:ScreenSize.width,
        height:ScreenSize.height,
        backgroundColor:Colors.BLACK,
    },
    headerContainer:{
        marginTop:20,
       flexDirection:'row',
       justifyContent:'center',
       marginLeft:10
    },
    headerText:{
        fontFamily:Fonts.MonteSerratBold,
        fontSize:Size.HeaderSize,
        color:Colors.RED_LIGHT,
        marginTop:30
    },
    lottieContainer:{
        width:200,
        height:200,
        marginLeft:20,
    },
});
export default styles;
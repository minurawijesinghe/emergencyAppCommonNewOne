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
        marginLeft:20,
        justifyContent:'center',
    },
    headerText:{
        fontFamily:Fonts.MonteSerratBold,
        fontSize:Size.HeaderSize,
        color:Colors.RED_LIGHT,
    },
});
export default styles;
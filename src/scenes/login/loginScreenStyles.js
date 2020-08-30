import { StyleSheet, Dimensions} from 'react-native';
import {Fonts, Size} from '../../styles/fonts';
import {Colors} from '../../styles/colors';
const screenSize = Dimensions.get('window');

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:20,
    },
    labelStyle:{
        fontFamily:Fonts.OpenSans
    },
    itemContainer:{
        marginVertical:20,
    },
    loginText:{
        fontFamily:Fonts.MonteSerratBold,
        letterSpacing:5,
        fontSize:Size.HeaderSize,
        alignSelf:'center',
        marginTop:40,
    },
    signUpText:{
        fontFamily:Fonts.OpenSans,
        textDecorationLine:"underline",
        color:Colors.BLUE,

    },
    textContainer:{
        alignItems:'center',
        justifyContent:'center',
        marginTop:30,
    },
});

export default styles;
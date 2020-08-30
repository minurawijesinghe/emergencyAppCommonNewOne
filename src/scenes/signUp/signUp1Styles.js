import {StyleSheet, Dimensions} from 'react-native';
import {Fonts, Size} from '../../styles/fonts';
import {Colors} from '../../styles/colors';
const ScreenSize = Dimensions.get('window');


const styles =  StyleSheet.create({
    container:{
        paddingHorizontal:20,
    },
    headerText:{
        fontFamily:Fonts.MonteSerratBold,
        fontSize:Size.HeaderSize,
        letterSpacing:5,
        alignSelf:'center',
        marginTop:40,
    },
    labelStyle:{
        fontFamily:Fonts.OpenSans,
    },
    itemContainer:{
        marginVertical:20,
    },
});

export default styles;
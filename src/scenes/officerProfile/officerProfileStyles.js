import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../../styles/colors';
import {Fonts, Size} from  '../../styles/fonts';


const ScreenSize = Dimensions.get('window');

const styles = StyleSheet.create({
    container:{
        height:ScreenSize.height,
        width:ScreenSize.width,
        backgroundColor:Colors.BLACK,
        padding:20,
    },
    headerContainer:{
        flexDirection:'row',
        justifyContent:'flex-start',
    },
    headerText:{
        fontFamily:Fonts.MonteSerratBold,
        fontSize:Size.HeaderSize,
        color:Colors.WHITE,
    },
    imageContainer:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        marginTop:100,
    },
    image:{
        width:200,
        height:200,
        borderRadius:100,
    },
    detailContainer:{
        width:ScreenSize.width*0.9,
        alignSelf:'center',
        justifyContent:'center',
        marginTop:40,
        alignItems:'center',
    },
    nameText:{
        fontFamily:Fonts.OpenSansBold,
        fontSize:Size.ButtonText,
        color:Colors.WHITE,
        margin:5,
    },
    idText:{
        fontFamily:Fonts.OpenSans,
        fontSize:Size.ButtonText,
        color:Colors.GRAY_MEDIUM,
        margin:5,
    },
    backButtonContainer:{
        width:100,
        height:50,
    },
});
export default styles;
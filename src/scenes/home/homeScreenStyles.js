import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../../styles/colors';
import {Fonts, Size} from  '../../styles/fonts';


const screenSize = Dimensions.get('window');

const styles = StyleSheet.create({
    text:{
        fontFamily:Fonts.MonteSerrat,
    },
    container:{
        height:screenSize.height,
        width:screenSize.width,
        backgroundColor:Colors.BLACK
    },
    emergencyButtonContainer:{
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
    },
    customButton:{
        height: screenSize.width*0.8,
        borderRadius:screenSize.width*0.4,
        width:screenSize.width*0.8,
        justifyContent:'center',
        alignItems:'center',
    },
    titleText:{

        fontFamily:Fonts.MonteSerratBold,
        color:Colors.BLACK,
        fontSize:Size.HeaderSize,
    },
    subText:{
        fontFamily:Fonts.OpenSans,
        color:Colors.BLACK,
        
    },
    subTextMain:{
        fontFamily:Fonts.OpenSans,
        color:Colors.BLACK,
        marginTop:10,
        
    },
    buttonTextContainer:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        backgroundColor:Colors.RED_LIGHT,
        alignItems:'center',
    },
    buttonContainer:{
        width:'100%',
        alignItems:"center",
        justifyContent:'center',
        marginTop:40,
    },
    nextButtonContainer:{
        width:'100%',
        alignItems:"center",
        justifyContent:'center',
        marginTop:100,
    },
    textNextButton:{
        fontFamily:Fonts.OpenSans,
        fontSize:Size.large,
        color:Colors.RED_LIGHT,
        marginHorizontal:10,
    },
    header:{
        fontFamily:Fonts.OpenSansBold,
        letterSpacing:3,
        fontSize:Size.HeaderSize,
        marginTop:20,
        color:Colors.RED_LIGHT,
        marginLeft:20,

    },
    buttonDisabledText:{
        fontFamily:Fonts.OpenSansBold,
        fontSize:Size.ButtonText,
        color:Colors.PURPLE,
    },
    buttonDisabledTextSubText:{
        fontFamily:Fonts.OpenSansBold,
        color:Colors.RED_DARK,
    },
    buttonDisabledView:{
        alignItems:"center",
        justifyContent:'center',
    },
    cancelComplaintView:{
        width:'95%',
        padding:20,
        borderWidth:1,
        borderColor:Colors.PURPLE,
        marginTop:40,
        alignSelf:'center',
        borderRadius:10,
        marginBottom:-60
    },
    emergencyComplaintCancelText:{
        fontFamily:Fonts.OpenSansBold,
        fontSize:Size.large,
        color:Colors.PURPLE,
        marginHorizontal:5,
        marginTop:10,
    },
    cancelComplaintButtonText:{
        fontFamily:Fonts.OpenSans,
        fontSize:Size.ButtonText,
        color:Colors.PURPLE,
    },
    CancelButtonContainer:{
        width:'100%',
        alignItems:"center",
        justifyContent:'center',
        marginTop:20,
    },
    importantText:{
        fontFamily:Fonts.MonteSerratBold,
        fontSize:Size.ButtonText,
        color:Colors.PURPLE,
    },
    spinnerTextStyle:{
        fontFamily:Fonts.MonteSerratBold,
        color:Colors.WHITE,
        fontSize:Size.ButtonText,
    },
    countDownText:{
        fontFamily:Fonts.OpenSans,
        fontSize:Size.ButtonText,
        color:Colors.WHITE,
    },
});
export default styles;
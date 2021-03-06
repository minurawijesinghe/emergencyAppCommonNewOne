import {StyleSheet, Dimensions} from 'react-native';
import {Fonts,Size} from '../../styles/fonts';
import {Colors} from '../../styles/colors';

const ScreenSize = Dimensions.get('window');

const styles = StyleSheet.create({
    container:{
        width:ScreenSize.width,
       
        backgroundColor:Colors.BLACK,
    },
    buttonText:{
        fontFamily:Fonts.OpenSansBold,
        alignSelf:'center',
        justifyContent:'center',
        fontSize:Size.ButtonText,
        color:Colors.RED_LIGHT,
    },
    buttonContainer:{
        alignItems:'center',
        justifyContent:'center',
        marginTop:60,
    },
    headerText:{
        fontFamily:Fonts.MonteSerratBold,
        fontSize:Size.HeaderSize,
        color:Colors.RED_LIGHT,
        marginTop:15,
        marginLeft:20,
    },
    buttonInnerContainer:{
        marginBottom:20,
    },
    voiceAddContainer:{
        width:ScreenSize.width*0.9,
        height:200,
        backgroundColor:Colors.BUTTON_DARK,
        borderWidth:3,
        elevation:20,
        margin:20,
        borderColor:Colors.RED_LIGHT,
        borderRadius:20,
    },
    attachVoiceText:{
        fontFamily:Fonts.OpenSans,
        color:Colors.RED_DARK,
        fontSize:Size.ButtonText,
        marginTop:10,
        marginLeft:20
    },
    voiceButtonContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    iconContainer:{
        marginHorizontal:20,
    },
    progressContainer:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
    },
    recordingText:{
        color:Colors.RED_LIGHT,
        alignSelf:'center',
        fontFamily:Fonts.OpenSans,
        fontSize:Size.large,
    },
    videoPlayerContainer:{
       width:'100%',
       paddingHorizontal:20,
       backgroundColor:Colors.BUTTON_DARK,
       paddingVertical:20,
    },
    singleButtonContainer:{
        marginTop:30,
        alignItems:'center',
        justifyContent:'center',
    },
    buttonContainer2:{
        alignItems:'center',
        justifyContent:'center',
        marginTop:0,
    },
    modal:{
        marginTop:ScreenSize.height*0.3,
        flex:1,
    },
    modalInnerContainer:{
        backgroundColor:Colors.BUTTON_DARK,
        height:200,
        borderRadius:20,
        
    },
    modalButtonsInnerContainer:{
        width:'100%',
        backgroundColor:Colors.BLACK,
        height:60,
        borderRadius:5,
        elevation:10,
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
        flexDirection:'row'
    },
    buttonTextInnerModal:{
        fontFamily:Fonts.OpenSansBold,
        color:Colors.RED_DARK,
        fontSize:Size.large,
    },
    modalCloseIconContainer:{
        width:'95%',
        height:40,
        justifyContent:'flex-end',
        alignItems:'flex-end',
    },
    modalButtonContainer:{
        justifyContent:'space-evenly',
        alignItems:'flex-start',
    },
    imageContainer:{
        width:ScreenSize.width*0.4,
        height:ScreenSize.width*0.6,
        borderRadius:20,
        alignSelf:'center',
        marginTop:30,
        borderWidth:3,
        borderColor:Colors.RED_DARK,
    },
    buttonTextSend:{
        fontFamily:Fonts.OpenSansBold,
        alignSelf:'center',
        justifyContent:'center',
        fontSize:Size.ButtonText,
        color:Colors.BLACK,
    },
    modalConfirm:{
        marginTop:ScreenSize.height*0.3,
        flex:1,
    },
    modalInnerContainerConfirm:{
        backgroundColor:Colors.BUTTON_DARK,
        height:120,
        borderRadius:20,
    },
    noteContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:ScreenSize.width*0.9,
        alignItems:'center',
        marginBottom:10,

    },
    inputContainer:{
        width:ScreenSize.width*0.7,
        borderRadius:20,
        justifyContent:'center',
        backgroundColor:Colors.WHITE,
        paddingHorizontal:10,
    },
    inputText:{
        fontFamily:Fonts.OpenSans,
        fontSize:Size.large,
    },
    noteIconContainer:{
        alignItems:'center',
        justifyContent:'center',
    },
});
export default styles;
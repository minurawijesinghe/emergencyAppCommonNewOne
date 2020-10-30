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
        backgroundColor:Colors.GRAY_MEDIUM,
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
    lottieContainer:{
        flexDirection:'row',
        width:ScreenSize.width*0.9,
        height:100,
        alignItems:'center',
        marginVertical:10,
        borderBottomWidth:1,
        borderBottomColor:Colors.GRAY_EXTRA_DARK,
        marginHorizontal:20,
        elevation:2,
        alignSelf:'center',
        borderRadius:5
    },
    lottieText:{
        fontFamily:Fonts.MonteSerrat,
        fontSize:Size.ButtonText,
        marginLeft:20,
        color:Colors.WHITE,
        

    },
    lottieInnerContainer:{
        width:80,
        height:80,
        alignItems:'center',
        marginVertical:2,
        marginLeft:5
    
    },
    noteText:{
        fontFamily:Fonts.OpenSans,
        fontSize:Size.large,
        color:Colors.WHITE
    },
    noteContainer:{
        width:ScreenSize.width*0.8,
        alignSelf:'center',
        justifyContent:'center',
        backgroundColor:Colors.GRAY_DARK,
        borderRadius:20,
        marginVertical:10,
        padding:10
    },
    noAttachmentText:{
        fontFamily:Fonts.OpenSans,
        fontSize:Size.ButtonText,
        color:Colors.GRAY_MEDIUM,
    },
    noAttachmentTextContainer:{
        width:ScreenSize.width*0.9,
        alignSelf:'center',
        justifyContent:'center',
        marginTop:60,

    },
    backButtonContainer:{
        width:100,
        height:50,
    },
});
export default styles;
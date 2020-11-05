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
        width:ScreenSize.width*0.3,
        height:ScreenSize.width*0.3,
        borderRadius:10,
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
    },
    image: {
        width:ScreenSize.width*0.5,
        height:ScreenSize.width*0.5,
        resizeMode: "cover",
        alignSelf:'center',
        backgroundColor:Colors.GRAY_DARK,
        borderRadius:10,
        marginTop:20,
      },
      imageIconContainer:{
          width:'100%',
          height:'100%',
          justifyContent: "center",
          alignItems:'center',

      },
      imageRemoveIconContainer:{
        width:'100%',
        alignItems:'flex-end',
        marginTop:-20,
        marginLeft:20
    },
    removeImageText:{
      fontFamily:Fonts.MonteSerrat,
      textDecorationLine:'underline',
      color:Colors.BLACK,
      alignSelf:'center',
      marginTop:20,
    },
});

export default styles;
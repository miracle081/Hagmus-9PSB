import { Platform, StatusBar, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#16171D',
    },
    body:{
        marginTop:Platform.OS === 'android' ? StatusBar.currentHeight : null,
        backgroundColor:'#21242D',
        height:1000,
        borderTopLeftRadius:30,
        borderTopRightRadius:30
    },
    hagmusLogo:{
        width:40,
        height:40,
        borderRadius:90,
        marginEnd:5
    },
   newsHeader:{
      color:'white',
      fontWeight:'bold',
      fontSize:18
    },
    hagmusLogo2:{
        width:'100%',
        height:150,
        borderRadius:5,
        // marginTop:10
    },
    news:{
        color:'#a9aab1',
        fontSize:14
      },
})
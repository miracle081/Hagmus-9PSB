import { StyleSheet,StatusBar,Platform } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#16171D',
   },
    
    body:{
         marginTop:Platform.OS === 'android' ? StatusBar.currentHeight : null,
        marginHorizontal:10,
         },
    header:{
        alignItems:'center',
        margin:10
    },
    text1:{
        color:'#787A8D',
       marginTop:10,
       fontSize:23,
       fontWeight:'bold'
    },
    formContainer:{
        padding: 8 ,
     },
    inputStyle:{
        padding: 10,
        marginBottom: 20,
        borderRadius:7,
        backgroundColor:'#21242D',
        color:'grey',
    },
    // getStarted:{
    //     backgroundColor:'#7B61FF',
    //     padding: 13,
    //     marginTop:15,
    //     alignItems:'center',
    //     justifyContent:'center',
    //     borderRadius:8,
    //    },

    idHold:{
        margin:13,
        padding:10,
    },
    
    id:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#21242D',
        padding:10,
        borderRadius:6
    },
   
});
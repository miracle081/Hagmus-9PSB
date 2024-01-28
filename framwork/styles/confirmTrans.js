import { StyleSheet,StatusBar,Platform } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#16171D',
        
              
    },
    body:{
         marginTop:Platform.OS === 'android' ? StatusBar.currentHeight : null,
        marginHorizontal:10,
        // alignItems:'center',
         },
    text2:{
        color:'white',
       marginTop:10,
       fontSize:20,
       fontWeight:'bold',
    },
    header1:{
        margin:15,
        alignItems:'center'
    },
    confirm:{
        alignItems:'center',
        margin:15
    },
    confirmPay:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:13,
        
    },
    register:{
      padding:10,
      margin:14
    },
    getStarted:{
        backgroundColor:'#7B61FF',
        padding: 13,
        marginTop:15,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:8,
        
       },
    
})
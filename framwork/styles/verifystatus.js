import { StyleSheet,StatusBar,Platform } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: "center",
    alignItems: "center",
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
        color:'orange',
       fontSize:18,
    //    fontWeight:'bold',
       padding:2
       
    },
    formContainer:{
        padding: 10 ,
     },
    
    pending:{
        alignItems:'center',
        borderWidth:1,
        borderColor:'orange',
        borderRadius:4,
        margin:10
    },
    pendingText:{
        alignItems:'center',
        margin:5
    },

    text2:{
        color:'grey',
        fontFamily:'Kurale_400Regular'
    },

    image:{
        width:218,
        height:200
    },
  
    getStarted:{
        backgroundColor:'#7B61FF',
        padding: 13,
        marginTop:15,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:8,
       },


   
});
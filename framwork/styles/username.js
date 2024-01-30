import { StyleSheet, StatusBar, Platform } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfbff',

    },
    body: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : null,
        marginHorizontal: 10,
        flex:1
    },
    header: {
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom: 15,
        marginTop: 15,
        paddingHorizontal:10,
    },
    text1: {
        color: '#7B61FF',
        fontSize: 13,
    },
    stepIndicator:{
        flexDirection:"row",
        gap:5
    },
    indicator:{
        width:20,
        height:3,
        borderRadius:5,
        backgroundColor:"#6b6d7ccd"
    },
    formContainer: {
        padding: 10,
        marginTop: 20
    },
    inputStyle: {
        padding: 10,
        marginBottom: 20,
        borderRadius: 7,
        // backgroundColor: '#21242D',
        borderWidth:1,
        borderColor:'#7B61FF',
        color: '#0f063f',
        fontSize: 16,
    

    },
    getStarted: {
        backgroundColor: '#7B61FF',
        padding: 13,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,

    },
    signupText: {
        color: '#181239',
        marginBottom: 10,
        fontSize: 15
    },
    country: {
    //    backgroundColor:'#21242D',
    borderWidth:1,
    borderColor:'#7B61FF',
       padding:12,
       borderRadius:7,
       flexDirection:'row',
       alignItems:'center',
       marginBottom:20
    },
    errorMessage:{
        color:'red'
    },
})
import { StyleSheet, StatusBar, Platform } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfbff', 

    },
    hold: {

    },
    body: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : null,
        marginHorizontal: 0,
        backgroundColor:'#fcfbff',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        // height:'100%'
    },
    header: {
        position: "relative",
        alignItems: 'center',
        marginBottom: 0,
        marginTop: 5,
    },
    BtnIcon: {
        backgroundColor: "#7B61FF",
        padding: 5,
        borderRadius: 60,
        position: "absolute",
        bottom: 0,
        right: 10,
        zIndex: 11,
    },
    // ProfileImage: {
    //     width: 80,
    //     height: 80,
    //     marginRight: 10,
    //     borderRadius: 80,
    // },
    text1: {
        color: '#050507',
        marginTop: 10,
        fontSize: 23,
        // fontWeight: 'bold'
    },
    formContainer: {
        padding: 10,
        marginTop: 10,
        marginBottom:15
    },
    inputStyle: {
        padding: 10,
        marginBottom: 5,
        borderRadius: 7,
        // backgroundColor: '#21242D',
        color: '#050507',
        fontSize: 16,
        borderBottomWidth:1,
        borderColor:'#7B61FF'

    },
    register:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:18,
        backgroundColor:'#e1def5',
        borderRadius:8
    },
    getStarted: {
        // backgroundColor: '#7B61FF',
        padding: 0,
        marginTop: 0,
        // alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,

    },
    signupText: {
        color: '#050507',
        marginBottom: 5,
        fontSize: 15,
        // fontWeight:'bold'
    },
    login: {
        flexDirection: 'row',
        marginBottom:10
    },
    terms: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
    },
    errorMessage: {
        color: 'red'
    },
    textBelow: {
        // flexDirection:'row',
        // justifyContent:'space-between'
        alignItems: 'center'
    }
})
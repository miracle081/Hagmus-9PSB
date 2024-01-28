import { StyleSheet, StatusBar, Platform } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfbff',

    },
    hold: {

    },
    body: {
        flex: 1,
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : null,
        marginHorizontal: 10,
    },
    header: {
        position: "relative",
        alignItems: 'center',
        marginBottom: 15,
        marginTop: 15,
        backgroundColor:'#d4cef1',
        padding:10,
        borderRadius:8
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
    ProfileImage: {
        width: 100,
        height: 100,
        marginRight: 10,
        borderRadius: 80,
    },
    text1: {
        color: '#787A8D',
        marginTop: 10,
        fontSize: 23,
        fontWeight: 'bold'
    },
    formContainer: {
        padding: 10,
        marginTop: 10
    },
    inputStyle: {
        padding: 10,
        marginBottom: 20,
        borderRadius: 7,
        backgroundColor: '#f5f4ff',
        color: '#090615',
        fontSize: 16,
        borderBottomWidth:1,
        borderColor:'#9486dc'
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
        color: '#434355',
        marginBottom: 5,
        fontSize: 15
    },
    calenderIcon: {
        backgroundColor: '#7B61FF',
        position: "absolute",
        padding: 8,
        top: 4,
        right: 4,
        borderRadius: 90
    },
    login: {
        flexDirection: 'row',
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
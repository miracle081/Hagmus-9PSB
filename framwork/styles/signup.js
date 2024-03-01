import { StyleSheet, StatusBar, Platform } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfbff',
    },
    body: {
        flex: 1,
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : null,
        marginHorizontal: 0,
        backgroundColor: '#fcfbff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        // height:'100%'
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 0,
        marginTop: 15,
        paddingHorizontal: 10,
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
        width: 80,
        height: 80,
        marginRight: 10,
        borderRadius: 80,
    },
    text1: {
        color: '#7B61FF',
        fontSize: 13,
        // fontWeight: 'bold'
    },
    stepIndicator: {
        flexDirection: "row",
        gap: 5
    },
    indicator: {
        width: 20,
        height: 3,
        borderRadius: 5,
        backgroundColor: "#6b6d7ccd"
    },
    welcomeNote: {
        fontSize: 23,
        color: '#0d0b14',
        // fontWeight:'bold',
        marginTop: 10,
    },
    formContainer: {
        padding: 10,
        marginTop: 0
    },
    inputStyle: {
        padding: 10,
        marginBottom: 20,
        borderRadius: 7,
        color: 'white',
        fontSize: 16,
        color: '#050507',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#7B61FF'

    },
    getStarted: {
        backgroundColor: '#7B61FF',
        padding: 10,
        marginTop: 9,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,

    },
    signupText: {
        color: '#0d0b14',
        marginBottom: 5,
        fontSize: 15,
        // fontWeight:'bold',
    },
    login: {
        flexDirection: 'row',
    },
    terms: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
        // borderWidth:1,
        // borderRadius:8
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
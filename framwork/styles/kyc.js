import { Inter_600SemiBold } from "@expo-google-fonts/inter";
import { StyleSheet, StatusBar, Platform } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#16171D',

    },
    hold: {

    },
    body: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : null,
        marginHorizontal: 10,
    },
    header: {
        alignItems: 'center',
        marginBottom: 15,
        marginTop: 15,
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
        backgroundColor: '#21242D',
        color: 'white',
        fontSize: 18

    },
    calenderIcon: {
        backgroundColor: '#7B61FF',
        position: "absolute",
        padding: 8,
        top: 4,
        right: 4,
        borderRadius: 90
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
        color: '#787A8D',
        marginBottom: 5,
        fontSize: 15
    },
    login: {
        flexDirection: 'row',
    },
    idHold: {
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: '#21242D',
        borderRadius: Inter_600SemiBold,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    id: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },

})
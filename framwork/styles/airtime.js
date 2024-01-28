import { StyleSheet, StatusBar, Platform } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e4e2eb',

    },
    body: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : null,
        marginHorizontal: 10,
        flex:1
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
        // marginTop: 15,
    },
    text1: {
        color: '#787A8D',
        marginTop: 10,
        fontSize: 23,
        fontWeight: 'bold'
    },
    inputStyle: {
        color: 'black',
        fontSize: 16,
        marginLeft:5,
        width:'100%',
        padding:3,
    },
    getStarted: {
        backgroundColor: '#7B61FF',
        padding: 13,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,

    },
    errorMessage: {
        color: 'red'
    },
    
})
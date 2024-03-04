import { Platform, StatusBar, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7B61FF',
    },

    body: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : null,
        flex: 1,
        // marginHorizontal:5,
    },

    vault: {
        flex: 1,
        backgroundColor: "#ebe8eb",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        height: '100%',
        padding: 5
    },
    balance: {
        margin: 5,
        padding: 10
    },
    coinImg: {
        width: 25,
        height: 25,
        marginRight: 5
    },
    inputStyle: {
        padding: 10,
        marginBottom: 30,
        borderRadius: 7,
        color: '#a1a1a1',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#7B61FF',
    },
    signupText: {
        color: '#787A8D',
        marginBottom: 3,
        fontSize: 15
    },
    getStarted: {
        backgroundColor: '#7B61FF',
        padding: 13,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,

    },

})
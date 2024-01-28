import { Platform, StatusBar, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfbff',
    },
    body: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : null,
        marginHorizontal: 15,
        flex: 1,
    },
    hagmusLogo: {
        width: 100,
        height: 100,
        marginTop: 10
    },
    inputStyle: {
        borderRadius: 5,
        borderColor: "gray",
        borderWidth: 1,
        padding: 5
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
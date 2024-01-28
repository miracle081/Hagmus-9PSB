import { StyleSheet, StatusBar, Platform } from "react-native";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: '#fcfbff',
    },
    header: {
        alignItems: 'center',
        margin: 10
    },
    text1: {
        color: '#7B61FF',
        fontSize: 15,
        padding: 2
    },
    formContainer: {
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop:100
    },

    done: {
        alignItems: 'center',
        backgroundColor: "#00ff0023",
        borderRadius: 90,
        padding: 20,
        borderColor: "#00ff0010"
    },
    pending: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#7B61FF',
        padding: 7,
        marginTop: 15,
        justifyContent: 'center',
        borderRadius: 50,
    },
    pendingText: {
        alignItems: 'center',
        margin: 5,
    },

    text2: {
        fontSize: 20,
        color: 'grey',
        fontFamily: 'Kurale_400Regular'
    },
    text3: {
        fontSize: 20,
        color: '#6449edff',
        fontWeight: 'bold'
    },
    getStarted: {
        backgroundColor: '#7B61FF',
        padding: 9,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
    register:{
        // flexDirection:"row",
        justifyContent:"space-evenly",
        margin:20,
    }
});
import { StyleSheet, StatusBar, Platform } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    body: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : null,
        marginHorizontal: 10,
        // alignItems:'center',
    },
    text1: {
        color: 'grey',
        marginTop: 10,
        marginRight: 5,
        fontSize: 20,
        fontWeight: 'bold',
    },
    text2: {
        color: 'white',
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    header1: {
        margin: 15,
        alignItems: 'center'
    },
    buySell: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 20,
        justifyContent: 'center'
    },
    buyCoin: {
        marginRight: 15,
        backgroundColor: '#21242D',
        padding: 8,
        borderRadius: 6,
    },
    sellCoin: {
        padding: 8,
        borderRadius: 6
    },
    inputPrice: {
        alignItems: 'center',
        marginTop: 10,
        paddingBottom:0,
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'center'

    },
    input: {
        borderColor: "#434242ff",
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
        width: "80%",
        backgroundColor: "transparent",
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
        marginEnd: 10
     },
     keyboardRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        // marginVertical: 10,
     },
     btn: {
        borderRadius: 50,
        flexDirection: 'row',
        width: 80,
        height: 80,
        margin: 10,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        marginBottom:0
     },
     btnText: {
        fontSize: 25,
        color: "white",
        fontWeight: "bold"
     },
    inputStyle: {
        borderColor: '#494D58',
        borderWidth: 2,
        borderRadius: 10,
        width: '80%',
        padding: 16,
        fontWeight: 'bold',
        fontSize: 50
    },
    outcome: {
        margin: 25,
        marginTop:4
    },
    getStarted: {
        padding: 13,
        // marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,

    },
})
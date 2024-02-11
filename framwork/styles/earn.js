import { Platform, StatusBar, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfbff',
    },
    body: {
        flex:1,
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : null,
        // marginHorizontal:5,
        // alignItems:'center',
        // backgroundColor:'#21242D',
        // height:1000,
        // borderTopLeftRadius:30,
        // borderTopRightRadius:30
    },
    balance: {
        backgroundColor: '#7B61FF',
        padding: 15,
        marginTop: 10,
        //  margin:5,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    },
    EarnAssets: {
        // backgroundColor: '#21242D',
        padding: 15,
        marginTop: 10,
        height: '100%'
    },
    action: {
        backgroundColor: '#ffffff',
        borderRadius: 6,
        padding: 18,
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#7B61FF'
    },
    getStart: {
        backgroundColor: '#7B61FF',
        padding: 10,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    inputStyle: {
        padding: 10,
        margin: 10,
        borderRadius: 7,
        backgroundColor: '#f5f4ff',
        color: '#090615',
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: '#9486dc',
        borderWidth: 1,

    },
})
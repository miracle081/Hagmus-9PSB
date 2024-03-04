import { Platform, StatusBar, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7B61FF',
    },

    body: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : null,
        flex:1,
        // marginHorizontal:5,
    },

    vault: {
        flex:1,
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
    savingsplan: {
        flexDirection: 'row',
        padding: 5,
        paddingVertical:0
    },
    savingsplan2: {
        flexDirection: 'row',
        padding: 5,
        paddingVertical:0
    },
    boxView: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10
    },
    boxStyle: {
        flex: 1,
        width: "100%",
        margin: 5,
        padding: 10,
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 5,
    }

})
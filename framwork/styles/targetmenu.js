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
        backgroundColor: "#ffffff",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        // height: '100%',
        padding: 5
    },
    balance: {
        margin: 5,
        padding: 10
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
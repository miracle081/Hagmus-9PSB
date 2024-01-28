import { Platform, StatusBar, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#16171D',
      },

    body: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : null,
        // marginHorizontal:5,
      },
    img:{
        width:50,
        height:50
    },
    getStarted: {
      backgroundColor: '#7B61FF',
      padding: 15,
      margin: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,

  },
})
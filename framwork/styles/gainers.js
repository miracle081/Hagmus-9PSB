import { StyleSheet, StatusBar, Platform } from "react-native";

export const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#16171D',

   },
   body: {
      marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : null,
      marginHorizontal: 10,
   },

   text1: {
      color: 'white',
      fontSize: 23,
      fontWeight: 'bold'
   },
   menu: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginTop: 10,
      marginBottom: 10,
   },
   menuHold: {
      backgroundColor: '#21242D',
      padding: 8,
      borderRadius: 5,
      alignItems: 'center',
   },
   menuHold2: {
      padding: 8,
      borderRadius: 5,
      alignItems: 'center',
   },
   coinList: {
      flex: 1,
      backgroundColor: '#21242D',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      marginTop: 10
   },
   header: {
      padding: 8,
      flexDirection: 'row',
      margin: 10
   },
   headerText1: {
      backgroundColor: '#21242D',
   },
   coinImg: {
      width: 35,
      height: 35,
      marginRight: 5,
      borderRadius:50,
   },
   coinCointainer: {
      padding: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',

   },
   coinDetails: {
      flexDirection: 'row',
      alignItems: 'center'
   },


})
import { StyleSheet, StatusBar, Platform } from "react-native";

export const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#16171D',
   },
   hold: {

   },
   body: {
      marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : null,
      marginHorizontal: 10,
   },

   text1: {
      color: 'white',
      marginTop: 10,
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
   coinDetails1: {
      flexDirection: 'row',
      justifyContent: "space-between",
      paddingLeft: 10,
      alignItems: 'center',
      paddingBottom: 10,
      marginVertical: 10,
   },
   coinDetails2: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 10,
      paddingBottom: 10
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
      marginBottom: 8,
      marginHorizontal: 5
   },
   coinDetails: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   search: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#494D58',
      margin: 15,
      padding: 3,
      borderRadius: 8
   },
   inputStyle: {
      borderColor: '#494D58',
      borderWidth: 2,
      borderRadius: 10,
      width: '50%',
      padding: 5,
      color: "white"
   }


})
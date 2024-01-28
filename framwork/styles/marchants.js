import { StatusBar, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#16171D',
   },
   body: {
      // marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : null,
      marginHorizontal: 4,
      flex: 1,
   },
   info: {
      backgroundColor: '#21242D',
      flex: 1,
      marginTop: 10,
      padding: 13,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
   },
   info2: {
      flexDirection: 'row',
   },
   header: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 10,
      marginBottom: 10,
      borderWidth: 0.5,
      borderColor: '#787A8D',
      padding: 5,
      borderRadius: 6
   },
   menu: {
      flexDirection: 'row',
      alignItems: 'center'
   },
   menu2: {
      color: 'white',
   },
   menu3: {
      color: '#787A8D',
   }
})
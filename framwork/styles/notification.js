import { StyleSheet, StatusBar, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  body: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : null,
    // marginHorizontal:5,
  },

  portfolioHold: {
    padding: 10,
    flex:1,
  },
  getStarted: {
    backgroundColor: '#7B61FF',
    padding: 13,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  portfolio: {
    margin: 10,
  },
  getStarted: {
    backgroundColor: '#7B61FF',
    padding: 13,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,

  },


});
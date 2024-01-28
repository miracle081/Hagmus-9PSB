import { StyleSheet, StatusBar, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebe8eb',
  },

  body: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : null,
    // marginHorizontal:5,
  },
  inputStyle: {
    padding: 10,
    marginBottom: 30,
    borderRadius: 7,
    // backgroundColor: '#595c64',
    color: '#a1a1a1',
    fontSize: 16,
    borderWidth:1,
    borderColor:'#7B61FF'
  },
  calenderIcon: {
    backgroundColor: '#7B61FF',
    position: "absolute",
    padding: 8,
    top: 9,
    right: 9,
    borderRadius: 90
},
  signupText: {
    color: '#787A8D',
    marginBottom: 3,
    fontSize: 15
  },
  getStarted: {
    backgroundColor: '#7B61FF',
    padding: 13,
    margin: 15,
    alignItems: 'center',
    borderRadius: 8,
  },
  portfolio: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 3,
  },
  newsImg: {
    width: 30,
    height: 30,
    borderRadius: 30
  },
  News: {
    flexDirection: 'row',
    alignItems: 'center',
  },

});
import { StyleSheet, StatusBar, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7B61FF',
  },

  body: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : null,
    flex: 1,
    backgroundColor: "#ebe8eb",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingTop: 30

  },
  inputStyle: {
    padding: 10,
    marginBottom: 0,
    borderRadius: 7,
    borderWidth: 1,
    borderColor:'#7B61FF',
    color: '#292828',
    fontSize: 16
  },
  calenderIcon: {
    backgroundColor: '#7B61FF',
    position: "absolute",
    padding: 8,
    top: 11,
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

  getStarted: {
    backgroundColor: '#7B61FF',
    padding: 13,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,

},

});
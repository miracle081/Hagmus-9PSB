import { StyleSheet, StatusBar, Platform, Dimensions } from "react-native";
import { theme } from "../components/Theme";
const screenWidth = Dimensions.get("screen").width
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfbff',
  },

  body: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : null,
    marginHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  accountHold: {
    backgroundColor: '#473d7c',
    padding: 18,
    marginBottom: 15,
    // paddingBottom: 10,
    // paddingTop: 0,
    marginTop: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10
  },
  hideBal: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  img: {
    width: 40,
    height: 40,
    marginRight: 5,
    borderRadius: 30,
  },
  img2: {
    width: 30,
    height: 30,
    marginRight: 5
  },
  usflag: {
    width: 15,
    height: 15,
    margin: 5
  },
  currencyFlag: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between"
  },
  profileImg: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  status: {
    backgroundColor: '#fcfbff',
    padding: 4,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginEnd: 10
  },
  accountBal: {
    padding: 0,
  },
  mainBal: {
    flexDirection: 'row',
    margin: 5
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#7B61FF',
    padding: 8,
    borderRadius: 5,
    width: 100,
    overflow: 'hidden',
    alignItems: 'center',
  },
  button2: {
    backgroundColor: '#494D58',
    padding: 8,
    borderRadius: 5,
    width: 100,
    overflow: 'hidden',
    alignItems: 'center'
  },
  coinHold: {
    borderWidth: 1,
    borderColor: '#21242D',
    padding: 5,
    borderRadius: 5,
    width: 150,
    overflow: 'hidden',
    marginRight: 8,
    marginTop: 3,
    marginBottom: 5,
    justifyContent: 'center',
    paddingVertical: 20
  },
  otherCoins: {
    marginVertical: 10,
    borderBottomColor: "#21242D",
    borderTopColor: "#21242D",
    borderWidth: 0.5,
    paddingVertical: 10,
  },
  newsHold: {
    borderWidth: 0.5,
    borderColor: '#21242D',
    backgroundColor: '#21242D',
    borderRadius: 15,
    margin: 4,
    width: screenWidth - 80
  },
  newsImg: {
    width: 30,
    height: 30,
    marginRight: 5,
    borderRadius: 30
  },
  News: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  textHeading: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: theme.fonts.EBGaramond_700Bold,
    fontSize: 17
  },

  getStarted: {
    backgroundColor: '#7B61FF',
    padding: 13,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  depostMethod: {
    backgroundColor: '#21242D',
    margin: 7,
    borderRadius: 6
  },
  assetflag: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: 90,
    borderColor: "#7b61ff89",
    borderWidth: 1,
  },
  rotatedIcon: {
    transform: [{ rotate: '200deg' }],
  },


});
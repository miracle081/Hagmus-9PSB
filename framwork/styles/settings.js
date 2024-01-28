import { StyleSheet, StatusBar, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfbff',
  },
  
  body: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : null,
    // marginHorizontal:5,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    marginBottom: 10,
  },
  menuHold: {
    borderBottomWidth: 2,
    borderBottomColor: '#7B61FF',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 5
  },
  menuHold2: {
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 5
  },
  menuText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
    marginRight: 15,
    alignItems: 'center'
  },
  hideBal: {
    padding: 10,
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  status: {
    backgroundColor: '#473d7c',
    padding: 4,
    paddingHorizontal:10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"center",
    marginBottom:5,
    marginTop:8,
    marginRight:10
  },

  mainBal: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5
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

  portfolioHold: {
    padding: 10,
  },
  News: {
    flexDirection: 'row',
    alignItems: 'center',
    // padding:8
  },
  newsImg: {
    width: 20,
    height: 20,
    borderRadius: 30
  },
  ProfileImage: {
    width: 90,
    height: 90,
    marginRight: 10,
    borderRadius: 90,
    borderColor:"#7b61ff89",
    borderWidth:1
  },
  ProfileImage: {
    width: 90,
    height: 90,
    marginRight: 10,
    borderRadius: 90,
    borderColor:"#7b61ff89",
    borderWidth:1
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 8,
  },
 assetflag: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: 90,
    borderColor:"#7b61ff89",
    borderWidth:1
  },
});
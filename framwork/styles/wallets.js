import { StyleSheet, StatusBar, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4e2eb',
  },

  body: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : null,
    marginHorizontal:5,
    
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
  accountHold: {
    backgroundColor: '#473d7c',
    padding: 18,
    marginBottom:15,
    // paddingBottom: 10,
    // paddingTop: 0,
    marginTop: 24,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius:10,
    borderBottomLeftRadius:10
  },
  hideBal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountBal: {
    padding: 0,
  },
  mainBal: {
    flexDirection: 'row',
    marginTop: 5
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop:10,
    marginBottom:10
  },
  button: {
    backgroundColor: '#7B61FF',
    padding: 8,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
  },
  button2: {
    backgroundColor: '#f1f1f5',
    padding: 8,
    borderRadius: 5,
    width: 150,
    alignItems: 'center',
    // flexDirection:'row',
    // justifyContent:'space-evenly'
  },

  portfolioHold: {
    padding:6,
    backgroundColor: '#f1f1f5',
    // padding:5,
    marginTop: 5,
    flex: 1,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius:10,
    borderBottomLeftRadius:10
  },
  News: {
    flexDirection: 'row',
    alignItems: 'center',
    // padding:8
  },
  newsImg: {
    width: 20,
    height: 20
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
    margin: 3,
  },
  getStart: {
    backgroundColor: '#7B61FF',
    padding: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
},
inputStyle: {
  padding: 5,
  // marginBottom: 20,
  borderRadius: 7,
  // backgroundColor: '#21242D',
  color: 'white',
  fontSize: 13,
  borderWidth:1,
  borderColor:'#7B61FF',
  width:'89%'
},


});
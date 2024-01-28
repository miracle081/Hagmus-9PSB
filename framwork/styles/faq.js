import { Platform, StatusBar, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#16171D',
    },
    body:{
        marginTop:Platform.OS === 'android' ? StatusBar.currentHeight : null,
        // marginHorizontal:5,
        // alignItems:'center',
        // backgroundColor:'#21242D',
        // height:1000,
        // borderTopLeftRadius:30,
        // borderTopRightRadius:30
    },
})
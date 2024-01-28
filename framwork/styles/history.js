import { Platform, StatusBar, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#e4e2eb',
    },
    body:{
        flex:1,
        marginTop:Platform.OS === 'android' ? StatusBar.currentHeight : null,
        padding:5,
        marginLeft:10,
        marginRight:10,
    },
    img:{
        width:40,
        height:40,
        marginRight:5,
        borderRadius:30
    },
})
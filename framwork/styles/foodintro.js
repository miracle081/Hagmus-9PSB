import { Platform, StatusBar, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#7B61FF',
    },

    body: {
        flex:1,
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : null,
        // marginHorizontal:5,
    },

    vault: {
        // flex:1,
        backgroundColor: "#fff",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        height: '100%',
        padding: 5
    },
   
    FoodSearch: {
        padding: 5,
        marginBottom: 0,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#7B61FF',
        color: '#292828',
        fontSize: 16,
        width:'80%',
        marginRight:8,
        
    },
    FoodSearch2:{
        marginLeft:10
    },
    

    getStarted: {
        backgroundColor: '#7B61FF',
        padding: 13,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },

    Box: {
        flexDirection: 'row',
        padding: 5,
        paddingVertical:0
    },
    
    boxView: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 10
    },
    boxStyle: {
        flex: 1,
      
        margin: 5,
        padding: 5,
        
        borderRadius: 5,
    },
    boxStyle2: {
        flex: 1,
        borderWidth:1,
        borderColor:'#bcb0f3',
        // backgroundColor: '#f3f0ff',
        margin: 5,
        padding: 5,
        
        borderRadius: 10,
    },
    bgimg: {
    //    width:50,
    //    height:50
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
      },
      countText: {
        fontSize: 20,
        // marginBottom: 0,
      },

      getStarted: {
        backgroundColor: '#7B61FF',
        padding: 13,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
})
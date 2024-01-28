import { Text, View, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { AppSafeAreaView } from "../components/AppSafeAreaView";
import { FontAwesomeIcon, FontAwesomeIconStyle } from "@fortawesome/react-native-fontawesome";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { styles } from "../styles/confirmTrans";

export function ConfirmTrans({ navigation }) {

  return (
    <AppSafeAreaView>
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={styles.header1}>
            <Text style={styles.text2}>Confirm Transaction</Text>
          </View>
       
        <View style={styles.confirm}>
            <Text style={{color:'#494D58',fontWeight:'bold', fontSize:17}}>You will get</Text>
            <View style={{flexDirection:'row', margin:8}}>
            <Text style={{marginRight:10,color:'white',fontWeight:'bold', fontSize:25}}>2654</Text>
            <Text style={{marginRight:5,color:'white',fontSize:25}}>Btc</Text>
            </View>
        </View>
        
        <View>
          <View style={styles.confirmPay}>
            <Text style={{color:'grey'}}>Bitcoin Price</Text>
            <Text style={{color:'white', fontWeight:'bold'}}>$15</Text>
          </View>
          <View
              style={{
                borderBottomColor: 'grey',
                borderBottomWidth: StyleSheet.hairlineWidth,
                margin:10
              }}
            />

          <View style={styles.confirmPay}>
            <Text style={{color:'grey'}}>Fee</Text>
            <Text style={{color:'white', fontWeight:'bold'}}>$0</Text>
          </View>
          <View
              style={{
                borderBottomColor: 'grey',
                borderBottomWidth: StyleSheet.hairlineWidth,
                margin:10
              }}
            />

          <View style={styles.confirmPay}>
            <Text style={{color:'grey', fontWeight:'bold'}}>Total</Text>
            <Text style={{color:'white', fontWeight:'bold'}}>$15</Text>
          </View>
          <View
              style={{
                borderBottomColor: 'grey',
                borderBottomWidth: StyleSheet.hairlineWidth,
                margin:10
              }}
            />
        </View>


       <View style={styles.register}>
                    <TouchableOpacity
                      style={styles.getStarted}>
                      <Text style={{fontSize: 16,fontWeight:'bold' }}>Pay $15</Text>
                    </TouchableOpacity>
                  </View>

         </View>
         </View>
    </AppSafeAreaView>
  )
}
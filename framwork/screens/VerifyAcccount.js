import { useContext, useEffect, useState, useCallback } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, } from "react-native";
import { AppSafeAreaView } from "../components/AppSafeAreaView";
import { styles } from "../styles/verifyAccount";
import { Kurale_400Regular } from "@expo-google-fonts/kurale";
import {Inter_900Black, Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";
import { useFonts } from 'expo-font';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import { faPassport } from '@fortawesome/free-solid-svg-icons';
import { faIdBadge } from '@fortawesome/free-solid-svg-icons';
// import { authentication } from '../../firebase/firebaseProjectSetting';
// import { reauthenticateWithCredential, updatePassword, EmailAuthProvider } from 'firebase/auth';


export function VerifyAccount({ navigation }) {     
    let [Loaded] = useFonts({
    Kurale_400Regular,
    Inter_400Regular,
});

if(!Loaded){
return null;
}

  return (
    <AppSafeAreaView>
      <View style={styles.container}>
        <View style={styles.body}>
          <TouchableOpacity onPress={()=>navigation.navigate('Kyc')}>
          <FontAwesomeIcon
          icon={faChevronLeft}
          color='#787A8D'
          size={25}
          />
          </TouchableOpacity>
          <View style={styles.header}>
            <Text style={styles.text1}>Verify Account</Text>
          </View>
         <View style={styles.formContainer}>

           <View style={{ margin:8}}>
              <Text style={{color:'#787A8D',fontSize:20,fontFamily:'Inter_400Regular',fontWeight:'bold',}}>
                Select a valid Government-issued document
                </Text>
           </View>
           <View style={styles.selectId}>
            <View style={styles.idHold}>
               <TouchableOpacity onPress={()=>navigation.navigate('IdVerification')}>
                <View style={styles.id}>
                    <FontAwesomeIcon
                    icon={faIdCard}
                    color='#7B61FF'
                    size={25}
                    />
                    <Text style={{color:'#787A8D', fontSize:17, marginLeft:6}}>National ID</Text>
                    </View>
              </TouchableOpacity>
            </View>

            <View style={styles.idHold}>
               <TouchableOpacity onPress={()=>navigation.navigate('IdVerification')}>
                <View style={styles.id}>
                    <FontAwesomeIcon
                    icon={faPassport}
                    color='#7B61FF'
                    size={25}
                    />
                    <Text style={{color:'#787A8D', fontSize:17, marginLeft:6}}>Passport</Text>
                    </View>
              </TouchableOpacity>
            </View>
            
            <View style={styles.idHold}>
               <TouchableOpacity onPress={()=>navigation.navigate('IdVerification')}>
                <View style={styles.id}>
                    <FontAwesomeIcon
                    icon={faIdBadge}
                    color='#7B61FF'
                    size={25}
                    />
                    <Text style={{color:'#787A8D', fontSize:17, marginLeft:6}}>Driver's License</Text>
                    </View>
              </TouchableOpacity>
            </View>
           </View>

            {/* <View style={styles.register}>
              <TouchableOpacity
                // onPress={changePassword}
                style={styles.getStarted}>
                <Text style={{ fontSize: 16, }}>Verify</Text>
              </TouchableOpacity>
            </View> */}
        <View style={{alignItems:'center',marginTop:15}}>
            <Text style={{fontFamily:'Kurale_400Regular', color:'#787A8D', fontSize:11}}>
            This information is used for identity verification only, 
            and will be kept secure by Hagmus
            </Text>
        </View>
          </View>

        </View>
      </View>
    </AppSafeAreaView>
  )
}
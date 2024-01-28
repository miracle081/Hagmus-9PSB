import { useContext, useEffect, useState, useCallback } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, Image, } from "react-native";
import { AppSafeAreaView } from "../components/AppSafeAreaView";
import { styles } from "../styles/signup";
import { Kurale_400Regular } from "@expo-google-fonts/kurale";
import { useFonts } from 'expo-font';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { authentication, db } from '../../firebase/firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { AppContext } from '../../globals/AppContext';
import { Mailer } from '../components/Mailer';
import { ToastApp } from '../components/Toast';


export function Verification({ navigation }) {
  const { userUID, setPreloader, account } = useContext(AppContext);
  const userEmail = account.email
  const [pin, setPin] = useState("");
  const [sentPin, setSentPin] = useState("");
  const [sec, setsec] = useState(30);
  const [expired, setExpired] = useState(false);
  const [disable, setDisable] = useState(true);


  function verificationTimer() {
    setDisable(true)
    setExpired(false)
    let count = 30
    let secInterval = setInterval(() => {
      if (count <= 0) {
        setDisable(false)
        clearInterval(secInterval)
        setsec(0)
      } else {
        count--
      }
      setsec(count);
    }, 1000);

    setTimeout(() => {
      setExpired(true)
      setSentPin(null)
    }, 900000);
  }

  async function sendMail() {
    const email = userEmail
    const sub = "[Hagmus] Please verify your device"
    const OTP = Math.round(Math.random() * 1000000)
    const msg = `
    <div style="padding: 1px 20px; background-color: black;">
        <p style="background-color: mediumslateblue; padding: 10px; color: white; font-size: 30px; text-align: center;">
        Hagmus
        </p>
        <h3 style="color: white;">Verification Code</h3>        
        <b style="color: white;">Your verification code:</b>
        <div
            style="width: fit-content; margin: 10px auto; padding: 10px 50px;font-weight: bold; font-size: 20px;background-color: mediumslateblue;color: white;border-radius: 5px;">
            ${OTP}
        </div>
        <h5 style="color: white;">
          The verification code will be valid for 15 minutes.
        </h5>

        <i style="color: orangered;">This is an automated message, please do not reply</i>
        <p style="font-size: 14px; color: white;">
            © 2023 hagmus.com, All Rights Reserved.
        </p>
    </div>
    `
    try {
      Mailer(email, sub, msg)
        .then(() => {
          setSentPin(OTP)
          verificationTimer()
          console.log(OTP);
        })
        .catch((error) => {
          ToastApp(error, "LONG")
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    sendMail();
  }, []);

  function verifyPin() {
    if (pin != "" && sentPin != "") {
      if (!expired) {
        if (pin == sentPin) {
          navigation.replace("Username");
          setPreloader(false)
          setPin("")
        } else {
          Alert.alert('Verification', "Invalid code. Please try again")
          setPreloader(false);
        }
      } else {
        Alert.alert('Verification', "Verification Code has expired. Resend another code")
        setPreloader(false);
      }
    }else{
      ToastApp("Enter OPT")
    }
  }

  return (
    <AppSafeAreaView>
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={{marginLeft:3 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              icon={faChevronLeft}
              size={25}
              color='#7B61FF'
            />
            </TouchableOpacity>
          </View>
          <View style={styles.header}>
            <View style={styles.stepIndicator}>
              <View style={[styles.indicator, { backgroundColor: "#7B61FF" }]}></View>
              <View style={[styles.indicator, { backgroundColor: "#7B61FF" }]}></View>
              <View style={styles.indicator}></View>
              <View style={styles.indicator}></View>
            </View>
            <Text style={styles.text1}>Step 2/4</Text>
          </View>
          <View style={{ marginBottom: 10, paddingHorizontal: 10, marginTop: 20,alignItems:'center' }}>
            <Text style={{ color: '#7B61FF',fontSize:18, marginBottom: 10,}}>Verification code sent to your email</Text>
            <Text style={[styles.signupText, { color: '#0f0544' }]}>{userEmail}</Text>
            {/* <Text style={{ color: '#0f0544', }}>Veify your email to proceed</Text> */}
          </View>

          <View style={styles.formContainer}>
            <TextInput
              style={styles.inputStyle}
              keyboardType='number-pad'
              placeholder='Enter code here'
              selectionColor={'#7B61FF'}
              onChangeText={text => setPin(text)}
              mode='outlined'
            />

            <View style={{ alignItems: 'center', margin: 15 }}>
              <Text style={{ color: 'grey', fontSize: 14 }}>00:{sec}</Text>
              <TouchableOpacity disabled={disable} onPress={sendMail}>
                <Text style={{ color: '#7B61FF', fontSize: 15, fontWeight: 'bold' }}>Resend Code</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.register}>
              <TouchableOpacity onPress={verifyPin} style={styles.getStarted}>
                <Text style={{ fontSize: 16, color:'white'}}>Verify</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ alignItems:'center' }}>
            <Image source={require('../../assets/221.png')}
              style={{ height: 200, width: 250, }} />
          </View>
        </View>
      </View>
    </AppSafeAreaView>
  )
}
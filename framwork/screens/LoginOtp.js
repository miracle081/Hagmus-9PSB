import { useContext, useEffect, useState, useCallback } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, Image, ScrollView, StatusBar, } from "react-native";
import { AppSafeAreaView } from "../components/AppSafeAreaView";
import { styles } from "../styles/signup";
import { AppContext } from '../../globals/AppContext';
import { Mailer } from '../components/Mailer';
import { ToastApp } from '../components/Toast';


export function LoginOtp({ navigation }) {
  const { userInfo, setPreloader } = useContext(AppContext);
  const userEmail = userInfo.email
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
        .catch(error => {
          setPreloader(false)
          setDisable(false)
          setsec(0)
          console.log(error)
          if (error.message == "JSON Parse error: Unexpected character: <") Alert.alert("Error!", "Network error, please try again");
                    else Alert.alert("Error!", error.message)
        });
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    // setPreloader(false)
    sendMail();
  }, []);

  function verifyPin() {
    if (pin != "" && sentPin != "") {
      setPreloader(true)
      if (!expired) {
        if (pin == sentPin) {
          setTimeout(() => {
            navigation.replace("HomePage");
            setPreloader(false);
          }, 2000);
        } else {
          Alert.alert('Verification', "Invalid code. Please try again")
          setPreloader(false);
        }
      } else {
        Alert.alert('Verification', "Verification Code has expired. Resend another code")
        setPreloader(false);
      }
    } else {
      ToastApp("Enter OPT")
    }
  }
  return (
    <AppSafeAreaView>
      <StatusBar style='light' />
      <View style={styles.container}>
        <View style={{ justifyContent: "flex-end", marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : null, alignItems: 'center' }}>
          <Image source={require('../../assets/use2.png')}
            style={{ height: 190, width: 280, }} />
        </View>
        <ScrollView>
          <View style={styles.body}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 5, padding: 8 }}>
              <Text style={[styles.text1, { fontSize: 15 }]}>Verification</Text>
            </View>
            <View style={{ marginBottom: 10, paddingHorizontal: 10, marginTop: 20 }}>
              <Text style={{ color: '#0b0b12', }}>Verification code sent to your email</Text>
              <Text style={[styles.signupText, { color: '#0b0b12' }]}>{userEmail}</Text>
            </View>

            <View style={styles.formContainer}>
              <TextInput
                style={styles.inputStyle}
                keyboardType='number-pad'
                placeholder='Enter code here'
                selectionColor={'grey'}
                onChangeText={text => setPin(text)}
                mode='outlined'
                placeholderTextColor={"gray"}
              />

              <View style={{ alignItems: 'center', margin: 15 }}>
                <Text style={{ color: 'grey', fontSize: 14 }}>{sec}</Text>
                <TouchableOpacity disabled={disable} onPress={sendMail}>
                  <Text style={{ color: '#7B61FF', fontSize: 15, fontWeight: 'bold' }}>Resend Code</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={verifyPin} style={styles.getStarted}>
                <Text style={{ fontSize: 16, color: 'white' }}>Verify</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
        {/* <View style={{ alignItems: 'center', height: 140, marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : null, }}>
          <Image source={require('../../assets/44.png')} style={{ height: 130, width: '100%', }} />
        </View> */}
      </View>
    </AppSafeAreaView>
  )
}
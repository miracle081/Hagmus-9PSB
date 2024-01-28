import { useContext, useEffect, useState } from 'react';
import { Text, View, TextInput, Alert, TouchableOpacity, Image, StatusBar, KeyboardAvoidingView, ScrollView, } from "react-native";
import { AppSafeAreaView } from "../components/AppSafeAreaView";
import { Checkbox } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDown, faAngleUp, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { styles } from "../styles/signup";
import { useFonts, Inter_900Black, Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";
import { Formik } from "formik";
import * as yup from 'yup';
import { onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import { AppContext } from '../../globals/AppContext';
import { authentication, db } from '../../firebase/firebase';
import { addDoc, doc, setDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const formRules = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required()
});



export function Signup({ navigation }) {

  const [open, setOpen] = useState(false);
  const { setUserUID, setPreloader, setAccount, account } = useContext(AppContext);
  const [checked, setChecked] = useState(false);

  let [Loaded] = useFonts({
    Inter_900Black,
    Inter_400Regular,
    Inter_700Bold,
  });

  if (!Loaded) {
    return null;
  }

  async function setAsyncItem(userUID,) {
    try {
      await AsyncStorage.setItem("userUID", userUID)
    } catch (error) {
      console.log(error);
    }
  }

  function createVault(userid) {
    return setDoc(doc(db, "vault", userid), {
      business: {},
      coinLock: [],
      education: {},
      emergency: {},
      fixed: [],
      others: {},
      travel: {},
    })
  }

  return (
    <AppSafeAreaView>
      <View style={styles.container}>
        <View style={{ marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : null, }}>

          <View style={styles.header}>
            <View style={styles.stepIndicator}>
              <View style={[styles.indicator, { backgroundColor: "#7B61FF" }]}></View>
              <View style={styles.indicator}></View>
              <View style={styles.indicator}></View>
              <View style={styles.indicator}></View>
            </View>
            <Text style={styles.text1}>Step 1/4</Text>
          </View>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView>
            <View style={{ alignItems: 'center', height: 140 }}>
              <Image source={require('../../assets/use1.png')} style={{ height: 165, width: 165, }} />
            </View>
            <View style={styles.body}>
              <View style={{ alignItems: 'center', marginTop: 0 }}>
                <Text style={styles.welcomeNote}>Welcome to Hagmus</Text>
              </View>

              <Formik
                initialValues={{
                  email: '',
                  password: '',
                  refferal_code: '',
                }}

                onSubmit={(values, actions) => {
                  actions.resetForm();
                  setPreloader(true)
                  setTimeout(() => {
                    setAccount({ ...account, email: values.email, password: values.password, refferal_code: values.refferal_code })
                    setPreloader(false);
                    navigation.navigate("Verification")
                  }, 1000);
                }}

                validationSchema={formRules}
              >
                {
                  (props) => (

                    <View style={styles.formContainer}>
                      <TouchableOpacity onPress={() => setOpen(!open)} style={{ flexDirection: "row", alignItems: "center", }}>
                        <Text style={styles.signupText}>Referral Code (Optional)  </Text>
                        <FontAwesomeIcon icon={open ? faAngleUp : faAngleDown} color='#787A8D' />
                      </TouchableOpacity>
                      {
                        open ? <TextInput
                          style={styles.inputStyle}
                          keyboardType='default'
                          placeholder='Username eg. jacksonmayor'
                          onChangeText={props.handleChange('refferal_code')}
                          selectionColor={'grey'}
                          placeholderTextColor='#787A8D'
                          mode='outlined'
                          autoCapitalize='none'
                        /> : null
                      }

                      <Text style={[styles.signupText, { marginTop: 10 }]}>Valid Email Address</Text>
                      <TextInput
                        style={styles.inputStyle}
                        keyboardType='email-address'
                        placeholder='Enter your email address'
                        onChangeText={props.handleChange('email')}
                        selectionColor={'grey'}
                        placeholderTextColor='#787A8D'
                        mode='outlined'
                        autoCapitalize='none'
                      />

                      <Text style={styles.errorMessage}>
                        {props.touched.email && props.errors.email}
                      </Text>


                      <Text style={styles.signupText}>Password</Text>
                      <TextInput
                        style={styles.inputStyle}
                        secureTextEntry={true}
                        selectionColor={'grey'}
                        placeholderTextColor='#787A8D'
                        placeholder='Enter your password'
                        onChangeText={props.handleChange('password')}
                        mode='outlined'
                        autoCapitalize='none'
                      />

                      <Text style={styles.errorMessage}>
                        {props.touched.password && props.errors.password}
                      </Text>

                      <View style={styles.terms}>
                        <Checkbox status={checked ? 'checked' : 'unchecked'}
                          onPress={() => setChecked(!checked)}
                          color='#7B61FF'
                          uncheckedColor='gray'
                        />
                        <Text style={styles.signupText}>
                          Accept <Text style={{ color: '#7B61FF', fontSize: 13 }}
                            onPress={() => navigation.navigate('Web', { uri: "https://hagmusinfo.com/Hagmus/Terms.html" })}>Terms of use</Text> &
                          <Text style={{ color: '#7B61FF', fontSize: 13 }}
                            onPress={() => navigation.navigate('Web', { uri: "https://hagmusinfo.com/Hagmus/privacypolicy.html" })}> Privacy Policy </Text> </Text>
                      </View>


                      <TouchableOpacity disabled={!checked} onPress={() => props.handleSubmit()}
                        style={[styles.getStarted, { backgroundColor: checked ? '#7B61FF' : '#574d8dff' }]}>
                        <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, }}>Continue</Text>
                      </TouchableOpacity>
                    </View>
                  )
                }
              </Formik>
              <View style={styles.login}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Login')}>
                  <Text style={{ color: '#0d0b14', margin: 15 }}>Already have an account?
                    <Text style={{ color: '#7B61FF', fontFamily: 'Inter_400Regular' }}> Login</Text></Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('NinVerification')}>
                  <Text style={{ color: '#0d0b14', margin: 15 }}>Test
                    <Text style={{ color: '#7B61FF', fontFamily: 'Inter_400Regular' }}> NIN</Text></Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* <View style={{ alignItems: 'center', height: 90, marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : null, }}>
            <Image source={require('../../assets/44.png')} style={{ height: 230, width: '100%', }} />
          </View> */}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </AppSafeAreaView>
  )
}
import * as React from 'react';
import { useContext, useEffect, useState, useCallback } from 'react';
import { Text, View, TextInput, Alert, TouchableOpacity, Image, StatusBar } from "react-native";
import { AppContext } from '../../globals/AppContext';
import { AppSafeAreaView } from "../components/AppSafeAreaView";
import { styles } from "../styles/login";
import { Formik } from "formik";
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { baseURL } from '../../config';
import { signIn } from '../components/LoginFunction';
import { Feather } from '@expo/vector-icons';

const formRules = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required()
});



export function Login({ navigation }) {
  const { setUserUID, setPreloader, setUserInfo, setToken, sendNotification } = useContext(AppContext);
  const [userAsync, setUserAsync] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // console.log(userAsync);
    setPreloader(true)
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('userInfo')
        if (value !== null) setUserAsync(JSON.parse(value)); else setUserAsync(null)
        setPreloader(false)
      } catch (e) {
        setPreloader(false)
      }
    }
    getData();
  }, []);


  function logout() {
    Alert.alert(
      "Sign Out!",
      `Are you sure you want to sign out ${userAsync.username}?`,
      [{ text: "No" }, {
        text: "Yes", onPress: async () => {
          setPreloader(true)
          try {
            await AsyncStorage.removeItem("userInfo")
            setTimeout(() => {
              setPreloader(false)
              setUserInfo({});
              setToken("")
              navigation.replace('LandingPage')
            }, 2000);
          } catch (error) {
            console.log(error);
          }
        }
      }]
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ alignItems: 'center', height: 140, }}>
          <Image source={require('../../assets/888.png')} style={{ height: 300, width: '100%', }} />
        </View>
        <View style={styles.header}>
          <Text style={styles.text1}>Login</Text>
        </View>
        <View style={styles.body}>


          <Formik
            initialValues={{
              email: !userAsync ? '' : userAsync.email,
              password: '',
            }}

            onSubmit={(values, actions) => {
              setPreloader(true)
              actions.resetForm();

              const formdata = new FormData();
              formdata.append("email", !userAsync ? values.email : userAsync.email,);
              formdata.append("password", values.password);
              const requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
              };
              fetch(`${baseURL}/api/login`, requestOptions)
                .then(response => response.json())
                .then(result => {
                  const { status, message, data } = result
                  if (status == "error") {
                    Alert.alert(
                      'Access denied',
                      message,
                      [{ text: 'Try again' }]
                    )
                  }
                  else if (status == "success") {
                    // console.log(data);
                    setUserInfo(data.user)
                    setToken(data.token)
                    if (data.user.email == "test@hagmuspay.com") {
                      navigation.reset({ index: 0, routes: [{ name: "HomePage", }] })
                    } else {
                      if (!userAsync) {
                        navigation.navigate("LoginOtp")
                        // navigation.reset({ index: 0, routes: [{ name: "HomePage", }] })
                      } else {
                        navigation.reset({ index: 0, routes: [{ name: "HomePage", }] })
                      }
                    }
                  } else {
                    Alert.alert(
                      'Sorry!',
                      "Something went wrong",
                      [{ text: 'Try again' }]
                    )
                  }
                  setPreloader(false)
                })
                .catch(error => {
                  setPreloader(false)
                  console.log('error', error)
                  if (error.message == "JSON Parse error: Unexpected character: <") Alert.alert("Error!", "Network error, please try again");
                  else Alert.alert("Error!", error.message)
                });
            }}

            validationSchema={yup.object({
              email: !userAsync ? yup.string().email().required() : null,
              password: yup.string().min(6).required()
            })}
          >


            {
              (props) => (

                <View style={styles.formContainer}>
                  {!userAsync ?
                    <>
                      {/* <Text style={styles.signupText}>Email Address</Text> */}
                      <TextInput
                        style={styles.inputStyle}
                        keyboardType='email-address'
                        placeholder='Email'
                        onChangeText={!userAsync ? props.handleChange('email') : null}
                        selectionColor={'grey'}
                        mode='outlined'
                        autoComplete='off'
                        autoCapitalize='none'
                        placeholderTextColor='#787A8D'
                      />

                      <Text style={styles.errorMessage}>
                        {!userAsync ? props.touched.email && props.errors.email : null}
                      </Text>
                    </>
                    :
                    <View style={{alignItems:'center'}}>
                      <Text style={{ color: 'black', fontSize: 25, marginBottom: 5 }}>Welcome back!</Text>
                      <Text style={{ color: '#919191', marginBottom: 20, fontSize: 17 }}>{userAsync.first_name}</Text>
                    </View>
                  }

                  {/* <Text style={styles.signupText}>Password</Text> */}
                  <View style={{ position: "relative" }}>
                    <TextInput
                      style={styles.inputStyle}
                      secureTextEntry={!showPassword}
                      selectionColor={'grey'}
                      placeholder='Password'
                      onChangeText={props.handleChange('password')}
                      mode='outlined'
                      autoComplete='off'
                      autoCapitalize='none'
                      placeholderTextColor='#787A8D'
                    />
                    <TouchableOpacity style={{ position: "absolute", top: 10, right: 10 }} onPress={() => setShowPassword(!showPassword)}>
                      <Feather name={!showPassword ? "eye" : "eye-off"} size={24} color="#7B61FF" />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.errorMessage}>
                    {props.touched.password && props.errors.password}
                  </Text>


                  <View style={styles.login}>
                    <TouchableOpacity
                      // onPress={() => sendNotification('ForgotPassword', "You are going to Forgot Password screen")}
                      onPress={() => navigation.navigate("ForgotPassword")}
                    >
                      <Text style={{ color: '#7B61FF', fontWeight: 'bold' }}>Forgot Password</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    onPress={() => props.handleSubmit()}
                    style={styles.register}>
                    <TouchableOpacity
                      style={styles.getStarted}>
                      <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, }}>Login</Text>
                    </TouchableOpacity>

                    <View style={{ backgroundColor: '#7B61FF', padding: 5, borderRadius: 100 }}>
                      <FontAwesomeIcon icon={faArrowRight} size={25} />
                    </View>

                  </TouchableOpacity>
                </View>
              )
            }
          </Formik>
          <View style={styles.textBelow}>
            <View style={styles.login}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Signup')}>
                <Text style={{ color: '#050507', margin: 15 }}>Don't have an account?<Text style={{ color: '#7B61FF', fontFamily: 'Inter_400Regular', fontWeight: 'bold' }}> Register here</Text></Text>
              </TouchableOpacity>

              {/* <TouchableOpacity
                onPress={() => navigation.navigate('NinVerification')}>
                <Text style={{ color: '#050507', margin: 15 }}>Nin VERIFICATION<Text style={{ color: '#7B61FF', fontFamily: 'Inter_400Regular', fontWeight: 'bold' }}> Register here</Text></Text>
              </TouchableOpacity> */}

            </View>
            {userAsync ?
              <TouchableOpacity
                onPress={logout}>
                <Text style={{ color: '#7B61FF', fontFamily: 'Inter_400Regular' }}>Sign Out</Text>
              </TouchableOpacity> : null
            }
          </View>
          {/* <View style={{ alignItems: 'center', height: 180, marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : null, }}>
            <Image source={require('../../assets/44.png')} style={{ height: 330, width: '100%', }} />
          </View> */}
        </View>
      </View>
    </View>
  )
}
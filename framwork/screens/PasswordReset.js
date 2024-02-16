import { useContext, useEffect, useState, useCallback } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, ImageBackground, ScrollView } from "react-native";
import { AppSafeAreaView } from "../components/AppSafeAreaView";
import { styles } from "../styles/login";
import { Kurale_400Regular } from "@expo-google-fonts/kurale";
import { useFonts } from 'expo-font';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { reauthenticateWithCredential, updatePassword, EmailAuthProvider } from 'firebase/auth';
import { authentication } from '../../firebase/firebase';
import { ToastApp } from '../components/Toast';
import { AppContext } from '../../globals/AppContext';
import { baseURL } from '../../config';
import { handleError } from '../components/HandleRequestError';


export function PasswordReset({ navigation }) {
  const { token, setPreloader, } = useContext(AppContext);
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");

  function changePassword() {
    setPreloader(true)
    const data = {
      old_password: currentPassword,
      new_password: newPassword,
      confirm_password
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${token}`
      },
      body: JSON.stringify(data),
      redirect: 'follow'
    };
    fetch(baseURL + "/api/change-password", requestOptions)
      .then(response => response.json())
      .then(response => {
        const { data, status, message } = response;
        // console.log(response);
        setPreloader(false)
        if (status == "success") {
          Alert.alert(
            "Chang Password!",
            "Password has been changed successfully",
            [{ text: "Ok", onPress: () => navigation.goBack() }]
          )
        }
        handleError(status, message);
        setPreloader(false)
      })
      .catch(error => {
        setPreloader(false)
        console.log('error', error)
        Alert.alert("Error!", error.message)
      });
  }

  return (
    <AppSafeAreaView>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/newD.png')} // Replace with the path to your image
          style={{ height: 200 }}
        >
          {/* Other components can be placed inside ImageBackground */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              color='#ffffff'
              size={25}
              style={{ marginTop: 47, marginLeft: 10 }}
            />
          </TouchableOpacity>

        </ImageBackground>
        <ScrollView>
          <View style={styles.body}>
            <View style={{ alignItems: 'center', marginBottom: 3 }}>
              <Text style={styles.text1}>Password Reset</Text>
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.signupText}>Current Password</Text>
              <TextInput
                style={{ borderWidth: 1, padding: 6, borderRadius: 8, borderColor: '#7B61FF', marginBottom: 10 }}
                keyboardType='default'
                // placeholder='Current password'
                selectionColor={'#7B61FF'}
                secureTextEntry={true}
                onChangeText={inp => setCurrentPassword(inp.trim())}
                mode='outlined'
              />

              <Text style={styles.signupText}>New Password</Text>
              <TextInput
                style={{ borderWidth: 1, padding: 6, borderRadius: 8, borderColor: '#7B61FF', marginBottom: 10 }}
                keyboardType='default'
                // placeholder='Confirm Password'
                selectionColor={'#7B61FF'}
                secureTextEntry={true}
                onChangeText={inp => setNewPassword(inp.trim())}
                mode='outlined'
              />

              <Text style={styles.signupText}>Confirm Password</Text>
              <TextInput
                style={{ borderWidth: 1, padding: 6, borderRadius: 8, borderColor: '#7B61FF' }}
                keyboardType='default'
                // placeholder='New Password'
                selectionColor={'#7B61FF'}
                secureTextEntry={true}
                onChangeText={inp => setConfirm_password(inp.trim())}
                mode='outlined'
              />

              <TouchableOpacity
                onPress={changePassword}
                style={{ backgroundColor: '#7B61FF', padding: 10, alignItems: 'center', borderRadius: 8, marginTop: 10 }}>
                <Text style={{ fontSize: 16, color: 'white' }}>Reset</Text>
              </TouchableOpacity>

            </View>
          </View>
        </ScrollView>
      </View>
    </AppSafeAreaView>
  )
}
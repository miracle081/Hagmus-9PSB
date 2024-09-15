import { useContext, useEffect, useState, useCallback } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, ImageBackground } from "react-native";
import { AppSafeAreaView } from "../components/AppSafeAreaView";
import { styles } from "../styles/login";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../../globals/AppContext';
import { ModalAlert } from '../components/ModalAlert';
import { baseURL } from '../../config';
import { handleError } from '../components/HandleRequestError';
// import { reauthenticateWithCredential, updatePassword, EmailAuthProvider } from 'firebase/auth';


export function ForgotPassword({ navigation }) {
  const { userInfo, setPreloader, token } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [Avisible, setAvisible] = useState(false);
  const [amsg, setAmsg] = useState("");

  function sendMail() {
    setPreloader(true)
    const data = {
      email
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

    fetch(baseURL + "/forgot-password", requestOptions)
      .then(response => response.json())
      .then(response => {
        const { status, message } = response;
        // console.log(response);
        setPreloader(false)
        if (status == "success") {
          Alert.alert(
            'Success',
            message,
          )
        }
        handleError(status, message);
      })
      .catch(error => {
        setPreloader(false)
        console.log('error', error)
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
        <View style={styles.body}>
          <View style={styles.header}>
            <Text style={styles.text1}>Forgot Password</Text>
          </View>
          <View style={{ marginBottom: 10, alignItems: 'center' }}>
            <Text style={{ color: 'grey', fontFamily: 'Kurale_400Regular' }}>Enter your registered email address</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.signupText}>Email address</Text>
            <TextInput
              style={{ borderWidth: 1, padding: 6, borderRadius: 8, borderColor: '#7B61FF', marginTop: 5, marginBottom: 10 }}
              keyboardType='email-address'
              placeholder='Enter your email address'
              selectionColor={'grey'}
              onChangeText={text => setEmail(text)}
              mode='outlined'
            />

            <TouchableOpacity
              onPress={sendMail}
              style={{ backgroundColor: '#7B61FF', padding: 10, alignItems: 'center', borderRadius: 8, marginTop: 10 }}>
              <Text style={{ fontSize: 16, color: "white" }}>Reset</Text>
            </TouchableOpacity>

          </View>
          <ModalAlert message={amsg} onClose={() => setAvisible(!Avisible)} visible={Avisible} />
        </View>
      </View>
    </AppSafeAreaView>
  )
}
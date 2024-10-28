// import * as React from 'react';
import { useContext, useState, } from 'react';
import { Text, View, TextInput, Modal, TouchableOpacity, KeyboardAvoidingView, ScrollView, Pressable, Alert, Platform, Image } from "react-native";
import { AppContext } from '../../globals/AppContext';
import { AppSafeAreaView } from "../components/AppSafeAreaView";
import { styles } from "../styles/username";
import { faCalendarAlt, faChevronLeft, faInfoCircle, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { baseURL } from '../../config';
import { handleError } from '../components/HandleRequestError';
import { theme } from '../components/Theme';
import { SelectList } from 'react-native-dropdown-select-list'

export function Username({ navigation }) {
  const { account, setUserInfo, setToken, token, setPreloader } = useContext(AppContext);
  const [hiden, setHiden] = useState(false);
  const [otp, setOtp] = useState('');
  const [bvn, setBvn] = useState('');
  const [otp_id, setOtp_id] = useState('');
  const [first_name, setfirst_name] = useState('');
  const [last_name, setlast_name] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [dateVisibility, setDateVisibility] = useState(false);
  const [dob, setDob] = useState("");
  const [modalVisibility, setModalVisibility] = useState(false)


  // function btnVali() {
  //   const condition = phone == "";
  //   return condition
  // }

  // function reauthenticate() {
  //   const data = {
  //     email: account.email,
  //     password: account.password,
  //   };
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //     redirect: 'follow'
  //   };
  //   fetch(`${baseURL}/login`, requestOptions)
  //     .then(response => response.json())
  //     .then(result => {
  //       const { status, message, data } = result
  //       setPreloader(false)
  //       if (status == "success") {
  //         // console.log(data);
  //         setUserInfo(data.user)
  //         setToken(data.token)
  //         navigation.reset({ index: 0, routes: [{ name: "HomePage", }] })
  //       }
  //       handleError(status, message);
  //     })
  //     .catch(error => {
  //       console.log('error', error)
  //       setPreloader(false)
  //     });
  // }

  function createAccount() {
    setPreloader(true)
    const formdata = {
      first_name,
      last_name,
      gender,
      dob,
      email: account.email,
      bvn,
      phone: phone,
      password: account.password,
      refferal_code: account.refferal_code
    }
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(formdata),
      redirect: 'follow'
    };
    fetch(`${baseURL}/register`, requestOptions)
      .then(response => response.json())
      .then(result => {
        const { status, message, data } = result
        // console.log(result);
        if (status == "success") {
          setUserInfo(data.user)
          setToken(data.token)
          navigation.reset({ index: 0, routes: [{ name: "HomePage", }] })
        } else {
          setPreloader(false)
        }
        handleError(status, message);
      })
      .catch(error => {
        console.log('error', error)
        setPreloader(false)
      });
  }
  // setPreloader(false)

  const onChange = (currentDate) => {
    let rDate = new Date(currentDate.nativeEvent.timestamp)
    if (rDate.getTime() < new Date().getTime()) {
      // setDateVisibility(!dateVisibility)
      setDob(`${rDate.getFullYear()}-${(rDate.getMonth() + 1).toString().padStart(2, '0')}-${rDate.getDate().toString().padStart(2, '0')}`);
    } else {
      Alert.alert(
        "Date selected!",
        "You cannot choose a date in the future."
      )
    }
  };

  function verifyBVN() {
    setPreloader(true)
    const formdata = {
      bvn,
      otp,
      otp_id,
      key: "j8YifmnrZ09028624if0204JH171106582456072622wrHnJJHsrnb"
    }
    const requestOptions = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formdata),
      redirect: 'follow'
    };

    fetch(baseURL + "/verify-bvn", requestOptions)
      .then(response => response.json())
      .then(response => {
        const { data, status, message } = response;
        setPreloader(false);
        // console.log(response);
        if (status == "success") {
          setHiden(true);
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

  function sendBvnOtp() {
    setPreloader(true)
    const formdata = {
      bvn: bvn,
      key: "j8YifmnrZ09028624if0204JH171106582456072622wrHnJJHsrnb"
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${token}`
      },
      body: JSON.stringify(formdata),
      redirect: 'follow'
    };
    fetch(baseURL + "/bvn-otp", requestOptions)
      .then(response => response.json())
      .then(response => {
        const { data, status, message } = response;
        setPreloader(false)
        // console.log(response);
        if (status == "success") {
          closeModal();
          setOtp_id(data.otpId)
        }
        handleError(status, message);
      })

      .catch(error => {
        setPreloader(false)
        console.log('error', error)
      });
  }

  const handleDateChange = (text) => {
    const cleaned = text.replace(/[^\d]/g, '');

    let formatted = '';
    if (cleaned.length > 6) {
      formatted = `${cleaned.slice(0, 4)}-${cleaned.slice(4, 6)}-${cleaned.slice(6, 8)}`;
    } else if (cleaned.length > 4) {
      formatted = `${cleaned.slice(0, 4)}-${cleaned.slice(4, 6)}`;
    } else if (cleaned.length > 0) {
      formatted = `${cleaned.slice(0, 4)}`;
    }
    setDob(formatted);
  };


  const closeModal = () => {
    setModalVisibility(!modalVisibility);
  };



  return (
    <AppSafeAreaView>
      <View style={styles.container}>
        <View style={styles.body}>
          <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              icon={faChevronLeft}
              size={25}
              color='grey'
            />
          </TouchableOpacity>
          <View style={styles.header}>
            <View style={styles.stepIndicator}>
              <View style={[styles.indicator, { backgroundColor: "#7B61FF" }]}></View>
              <View style={[styles.indicator, { backgroundColor: "#7B61FF" }]}></View>
              <View style={[styles.indicator, { backgroundColor: "#7B61FF" }]}></View>
              {/* <View style={styles.indicator}></View> */}
            </View>
            <Text style={styles.text1}>Step 3/3</Text>
          </View>
          <ScrollView>
            <KeyboardAvoidingView
            // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            // style={{ flex: 3 }}
            >
              <View style={styles.formContainer}>

                <Text style={[styles.signupText, { marginTop: 30 }]}>Enter the detials on your valid ID card</Text>
                
                <TextInput
                  style={[styles.inputStyle, { marginBottom: 20 }]}
                  selectionColor={'grey'}
                  placeholder='First Name'
                  mode='outlined'
                  placeholderTextColor='#787A8D'
                  onChangeText={(text) => setfirst_name(text.trim())}
                />
                {first_name !== "" ?

                  <TextInput
                    style={[styles.inputStyle, { marginBottom: 20, color: "#0f1018" }]}
                    placeholder='Last Name'
                    selectionColor={'grey'}
                    mode='outlined'
                    placeholderTextColor='#787A8D'
                    onChangeText={inp => setlast_name(inp.trim())}
                  />
                  : null}

                {last_name !== "" ?
                  <TextInput
                    style={[styles.inputStyle, { marginBottom: 20, color: "#0f1018" }]}
                    keyboardType='numeric'
                    placeholder='Phone number'
                    selectionColor={'grey'}
                    mode='outlined'
                    placeholderTextColor='#787A8D'
                    onChangeText={inp => setPhone(inp.trim())}
                  />
                  : null}
                {phone !== "" ?
                  <>
                    <Text style={styles.signupText}>Date of birth (YYYY-MM-DD)</Text>
                    <TextInput
                      style={[styles.inputStyle, { marginBottom: 20, color: "#0f1018" }]}
                      keyboardType='numeric'
                      placeholder='Date of Birth'
                      selectionColor={'grey'}
                      mode='outlined'
                      placeholderTextColor='#787A8D'
                      onChangeText={inp => handleDateChange(inp)}
                      value={dob}
                    />
                  </> : null}

                {dob !== "" ?
                  <SelectList
                    setSelected={(val) => setGender(val)}
                    data={[{ key: "1", value: "Male" }, { key: "2", value: "Female" }]}
                    save="value"
                    boxStyles={styles.inputStyle}
                    placeholder='Select Gender'
                  />
                  : null}

                {gender !== "" ?
                  <TextInput
                    style={[styles.inputStyle, { marginBottom: 20, color: "#0f1018" }]}
                    keyboardType='numeric'
                    placeholder='Valid BVN'
                    selectionColor={'grey'}
                    mode='outlined'
                    placeholderTextColor='#787A8D'
                    onChangeText={inp => inp.length == 11 ? setBvn(inp.trim()) : setBvn("")}
                  />
                  : null}

                {bvn !== "" ?
                  <TouchableOpacity onPress={() => { createAccount(); }} style={[styles.getStarted, { marginBottom: 20 }]}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Create Account</Text>
                  </TouchableOpacity>
                  : null}

                <View style={{ alignItems: 'center', }}>
                  <Image source={require('../../assets/CBN.png')} style={{ width: 120, height: 100 }} />
                  <Text style={{ color: '#7B61FF' }} >In accordance to CBN policy all{'\n'} account must be verified</Text>
                </View>
              </View>


              {/* ============== BVN Modal ============== */}
              <Modal
                visible={modalVisibility}
                animationType="slide"
                transparent={true}
              >
                <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
                  <Pressable style={{ flex: 1 }} >
                  </Pressable>
                  <View style={{ backgroundColor: "#fcfbff", height: 550, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                    <View style={{ alignItems: 'flex-end', margin: 10 }}>
                      <TouchableOpacity>
                        <FontAwesomeIcon
                          icon={faXmark}
                          size={24}
                          color='#7B61FF'
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: 0, padding: 15 }}>
                      <View style={{ marginBottom: 30 }}>
                        <Text style={{ textAlign: "center", marginBottom: 20, fontWeight: 'bold', color: '#2e3144', fontSize: 18 }}>Verify NIN OTP</Text>
                        <View style={{ backgroundColor: '#f0f0f0', borderColor: '#7B61FF', borderWidth: 0.3, borderRadius: 8, padding: 10, flexDirection: "row", alignItems: "center", gap: 10 }}>
                          <FontAwesomeIcon icon={faInfoCircle} size={25} color='#7B61FF' />
                          <Text>
                            Expect OTP to come before 1 - 2 minutes.
                          </Text>
                        </View>
                      </View>
                      <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : null}
                      >
                        <ScrollView>
                          <TextInput
                            style={[styles.inputStyle, { marginBottom: 20, color: "gray" }]}
                            keyboardType='numeric'
                            placeholder='OTP'
                            selectionColor={'grey'}
                            mode='outlined'
                            placeholderTextColor='#787A8D'
                            onChangeText={inp => setOtp(inp.trim())}
                          />

                          <TouchableOpacity onPress={() => { closeModal(); verifyBVN() }} style={styles.getStarted}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Verify</Text>
                          </TouchableOpacity>
                        </ScrollView>
                      </KeyboardAvoidingView>
                    </View>
                  </View>
                </View>
              </Modal>


            </KeyboardAvoidingView>
          </ScrollView>
        </View>

      </View>
    </AppSafeAreaView >
  )
}
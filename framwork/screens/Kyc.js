import { useContext, useEffect, useState } from 'react';
import { Text, View, TextInput, Alert, TouchableOpacity, Pressable, } from "react-native";
import { AppSafeAreaView } from "../components/AppSafeAreaView";
import { Checkbox } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarAlt, faChevronLeft, faChevronRight, faCloudUpload, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { styles } from "../styles/kyc";
import { useFonts, Inter_900Black, Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";
import { doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase/firebase';
import { AppContext } from '../../globals/AppContext';
import { getDownloadURL, ref } from 'firebase/storage';
import { faCloudscale } from '@fortawesome/free-brands-svg-icons';
import { ToastApp } from '../components/Toast';
import DateTimePicker from '@react-native-community/datetimepicker';

export function Kyc({ navigation }) {
  const { userUID, setPreloader, userInfo, ID, setID } = useContext(AppContext);
  const [fName, setfName] = useState('');
  const [lName, setlName] = useState('');
  const [dateVisibility, setDateVisibility] = useState(false);
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  useEffect(() => {
    async function fetchProfilePic() {
      setPreloader(true)
      const reference = ref(storage, `usersIDCards/${userUID}/frontID${userUID}`);
      await getDownloadURL(reference)
        .then(x => {
          setID(x);
          setPreloader(false)
        }).catch(() => {
          setPreloader(false)
          setID("");
        })
    }
    fetchProfilePic();
  }, [])

  const Verify = () => {
    setPreloader(true)
    updateDoc(doc(db, "users", userUID), {
      fname: fName,
      lname: lName,
      phone,
      cardNumber,
      dob,
      userStatus: "pending"
    })
      .then(() => {
        setPreloader(false)
        ToastApp("Details submited Successfully. Under Review.", "LONG");
        navigation.goBack()
      })
      .catch(() => {
        setPreloader(false);
        ToastApp("Failed to submit details. Please try again", "LONG");
      })
  }

  const onChange = (currentDate) => {
    setDateVisibility(!dateVisibility)
    let rDate = new Date(currentDate.nativeEvent.timestamp)
    rDate = rDate.toLocaleDateString()
    setDob(rDate);
  };

  return (
    <AppSafeAreaView>
      <View style={styles.container}>
        <View style={styles.body}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              icon={faChevronLeft}
              size={20}
              color='#787A8D'
              style={{ marginTop: 10 }}
            />
          </TouchableOpacity>
          <View style={styles.header}>
            <Text style={styles.text1}>KYC</Text>
          </View>

          <View style={styles.formContainer}>
            {ID == "" ?
              <TouchableOpacity onPress={() => navigation.navigate('VerifyAccount')}>
                <View style={styles.idHold}>
                  <View style={styles.id}>
                    <FontAwesomeIcon
                      icon={faIdCard}
                      color='#7B61FF'
                      size={25}
                    />
                    <Text style={{ color: '#787A8D', fontSize: 17, marginLeft: 6 }}>Select ID</Text>
                  </View>
                  <View>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      style={{ marginRight: 5 }}
                      color='#787A8D'
                    />
                  </View>
                </View>
              </TouchableOpacity> :
              <View>
                <View style={styles.idHold}>
                  <View style={styles.id}>
                    <FontAwesomeIcon
                      icon={faIdCard}
                      color='#7B61FF'
                      size={25}
                    />
                    <Text style={{ color: '#787A8D', fontSize: 17, marginLeft: 6 }}>ID Selected</Text>
                  </View>
                  <View style={styles.id}>
                    <FontAwesomeIcon
                      icon={faCloudUpload}
                      size={17}
                      color='#10ab02'
                    />
                    <Text style={{ color: '#10ab02', fontSize: 11, marginLeft: 6 }}>Uploaded</Text>
                  </View>
                </View>
              </View>
            }

            <Text style={styles.signupText}>First Name</Text>
            <TextInput
              style={styles.inputStyle}
              keyboardType='default'
              placeholder='First name on ID'
              selectionColor={'#787A8D'}
              mode='outlined'
              placeholderTextColor="#787A8D"
              onChangeText={inp => setfName(inp.trim())}
            />


            <Text style={styles.signupText}>Last Name</Text>
            <TextInput
              style={styles.inputStyle}
              selectionColor={'#787A8D'}
              placeholder='Last name on ID'
              mode='outlined'
              placeholderTextColor="#787A8D"
              onChangeText={inp => setlName(inp.trim())}
            />

            <Text style={styles.signupText}>Card Number</Text>
            <TextInput
              style={styles.inputStyle}
              selectionColor={'#787A8D'}
              placeholder='Enter card number'
              mode='outlined'
              placeholderTextColor="#787A8D"
              onChangeText={inp => setCardNumber(inp.trim())}
            />

            <Text style={styles.signupText}>Phone Number</Text>
            <TextInput
              style={styles.inputStyle}
              selectionColor={'#787A8D'}
              placeholder='Enter phone number'
              mode='outlined'
              placeholderTextColor="#787A8D"
              onChangeText={inp => setPhone(inp.trim())}
              keyboardType='phone-pad'
            />

            {dateVisibility ?
              <DateTimePicker
                mode={'date'}
                value={new Date()}
                onChange={d => onChange(d)}
              />
              : null}

            <Text style={styles.signupText}>Date of birth</Text>
            <View style={{ position: "relative" }}>
              <Pressable onPress={() => setDateVisibility(true)}>
                <Text style={[styles.inputStyle, { paddingVertical: 10 }]}>{dob|| "MM/DD/YYYY"}</Text>
              </Pressable>
              <TouchableOpacity onPress={() => setDateVisibility(true)} style={styles.calenderIcon}>
                <FontAwesomeIcon icon={faCalendarAlt} color="white" />
              </TouchableOpacity>
            </View>


            {fName && lName && cardNumber && dob && ID != "" ?
              <TouchableOpacity onPress={Verify}
                style={styles.getStarted}>
                <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, color: "white" }}>Verify</Text>
              </TouchableOpacity> :
              <View
                style={[styles.getStarted, { opacity: 0.5 }]}>
                <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, color: "white" }}>Verify</Text>
              </View>
            }

          </View>
        </View>
      </View>
    </AppSafeAreaView>
  )
}
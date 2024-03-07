// import * as React from 'react';
import { useContext, useState, } from 'react';
import { Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Pressable, Alert } from "react-native";
import { AppContext } from '../../globals/AppContext';
import { AppSafeAreaView } from "../components/AppSafeAreaView";
import { styles } from "../styles/username";
import { faCalendarAlt, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import DateTimePicker from '@react-native-community/datetimepicker';

export function Username({ navigation }) {
  const { account, setAccount } = useContext(AppContext);
  const [userName, setuserName] = useState('');
  const [fName, setfName] = useState('');
  const [lName, setlName] = useState('');
  const [phone, setPhone] = useState('');
  const [dateVisibility, setDateVisibility] = useState(false);
  const [dob, setDob] = useState("");


  function btnVali() {
    const condition = userName == "" || fName == "" || lName == "" || phone == "" || dob == "";
    return condition
  }

  function proceed() {
    const formdata = {
      first_name: fName,
      last_name: lName,
      name: fName + " " + lName,
      email: account.email,
      phone: phone,
      username: userName,
      password: account.password,
      dob
    }
    setAccount(formdata)
    navigation.navigate("UserAddress")
  }

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
              <View style={[styles.indicator, { backgroundColor: "#7B61FF" }]} ></View>
              <View style={styles.indicator}></View>
            </View>
            <Text style={styles.text1}>Step 3/4</Text>
          </View>
          <ScrollView>
            <KeyboardAvoidingView
            // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            // style={{ flex: 3 }}
            >
              <View style={styles.formContainer}>
                <Text style={styles.signupText}>First name</Text>
                <TextInput
                  style={[styles.inputStyle, { marginBottom: 10 }]}
                  selectionColor={'grey'}
                  // placeholder='Enter your first name'
                  mode='outlined'
                  placeholderTextColor='#787A8D'
                  onChangeText={(text) => setfName(text.trim())}
                  autoCapitalize='words'
                  autoCorrect={true}
                />

                <Text style={styles.signupText}>Last Name</Text>
                <TextInput
                  style={[styles.inputStyle, { marginBottom: 10 }]}
                  selectionColor={'grey'}
                  // placeholder='Enter your last name'
                  mode='outlined'
                  placeholderTextColor='#787A8D'
                  onChangeText={(text) => setlName(text.trim())}
                  autoCapitalize='words'
                  autoCorrect={true}
                />

                <Text style={styles.signupText}>Username</Text>
                <TextInput
                  style={[styles.inputStyle, { marginBottom: 20 }]}
                  selectionColor={'grey'}
                  placeholder='Enter your username'
                  mode='outlined'
                  placeholderTextColor='#787A8D'
                  onChangeText={(text) => setuserName(text.trim().toLowerCase())}
                  autoCapitalize='none'
                  autoComplete='off'
                />

                <Text style={styles.signupText}>Valid Phone Number</Text>
                <TextInput
                  style={[styles.inputStyle, { marginBottom: 20 }]}
                  selectionColor={'grey'}
                  // placeholder='Enter your phone number'
                  mode='outlined'
                  placeholderTextColor='#787A8D'
                  onChangeText={(text) => setPhone(text.trim())}
                  keyboardType='number-pad'
                />

                {dateVisibility ?
                  <DateTimePicker
                    mode={'date'}
                    value={new Date()}
                    onChange={d => onChange(d)}
                  />
                  : null}

                <Text style={styles.signupText}>Date of birth</Text>
                <View style={[styles.inputStyle, { paddingVertical: 5, position: "relative", justifyContent: "space-between", flexDirection: "row", alignItems: "center" }]}>
                  <Pressable onPress={() => setDateVisibility(true)}>
                    <Text style={[styles.input, { paddingVertical: 10 }]}>{dob || "DD/MM/YYYY"}</Text>
                  </Pressable>
                  <TouchableOpacity onPress={() => setDateVisibility(true)} style={{ backgroundColor: "#7B61FF", padding: 8, borderRadius: 50 }}>
                    <FontAwesomeIcon icon={faCalendarAlt} color="white" />
                  </TouchableOpacity>
                </View>


                <View>
                  <TouchableOpacity disabled={btnVali()}
                    onPress={proceed}
                    style={[styles.getStarted, { opacity: btnVali() ? 0.5 : 1 }]}>
                    <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, color: "white" }}>Proceed</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>

      </View>
    </AppSafeAreaView>
  )
}
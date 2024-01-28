import { useContext, useEffect, useState } from 'react';
import { Text, View, TextInput, Alert, TouchableOpacity, } from "react-native";
import { AppSafeAreaView } from "../components/AppSafeAreaView";
import { Checkbox } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faChevronRight, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { styles } from "../styles/kyc";
import { useFonts, Inter_900Black, Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";
import { AppContext } from '../../globals/AppContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { ToastApp } from '../components/Toast';




export function BankDetails({ navigation }) {
  const { userUID, setPreloader } = useContext(AppContext);
  const [bank, setBank] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  function addMethode() {
    setPreloader(true)
    updateDoc(doc(db, "users", userUID), {
      bankDetails: {
        bank,
        accountName,
        accountNumber,
      }
    })
      .then(() => {
        navigation.goBack("");
        setPreloader(false)
        ToastApp("Bank detials has been added");
      }).catch(() => {
        setPreloader(false)
        ToastApp("Something went wrong. Please try again", "LONG");
      })
  }

  let [Loaded] = useFonts({
    Inter_900Black,
    Inter_400Regular,
    Inter_700Bold,
  });

  if (!Loaded) {
    return null;
  }

  return (
    <AppSafeAreaView>
      <View style={styles.container}>
        <View style={styles.body}>
          <TouchableOpacity onPress={() => navigation.navigate('WithdrawalMethod')}>
            <FontAwesomeIcon
              icon={faChevronLeft}
              size={25}
              color='#787A8D'
              style={{ marginTop: 10 }}
            />
          </TouchableOpacity>
          <View style={styles.header}>
            <Text style={[styles.text1, { color: 'white' }]}>Add Bank Info</Text>
          </View>
          <View></View>

          <View style={styles.formContainer}>
            <Text style={styles.signupText}>Account full Name</Text>
            <TextInput
              style={styles.inputStyle}
              autoCapitalize="characters"
              // placeholder='As shown on your accoutn'
              selectionColor={'#787A8D'}
              mode='outlined'
              placeholderTextColor='#787A8D'
              onChangeText={inp => setAccountName(inp)}
            />

            <Text style={styles.signupText}>Bank Name</Text>
            <TextInput
              style={styles.inputStyle}
              autoCapitalize="words"
              selectionColor={'#787A8D'}
              // placeholder='Zenith Bank'
              mode='outlined'
              placeholderTextColor='#787A8D'
              onChangeText={inp => setBank(inp)}
            />

            <Text style={styles.signupText}>Account Number</Text>
            <TextInput
              style={styles.inputStyle}
              keyboardType="phone-pad"
              selectionColor={'grey'}
              // placeholder='2323543094'
              mode='outlined'
              placeholderTextColor='#787A8D'
              onChangeText={inp => setAccountNumber(inp)}
            />

            <View style={styles.register}>
              <TouchableOpacity
                onPress={addMethode}
                style={styles.getStarted}>
                <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </AppSafeAreaView>
  )
}
import { useContext, useEffect, useState, useCallback } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, Image, } from "react-native";
import { AppSafeAreaView } from "../components/AppSafeAreaView";
import { styles } from "../styles/verifystatus";
import { Kurale_400Regular } from "@expo-google-fonts/kurale";
import { Inter_400Regular } from "@expo-google-fonts/inter";
import { useFonts } from 'expo-font';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
// import { authentication } from '../../firebase/firebaseProjectSetting';
// import { reauthenticateWithCredential, updatePassword, EmailAuthProvider } from 'firebase/auth';


export function VerifyStatus({ navigation }) {
  let [Loaded] = useFonts({
    Kurale_400Regular,
    Inter_400Regular,
  });

  if (!Loaded) {
    return null;
  }
  //   const [newPassword, setNewPassword] = useState("");
  //   const [currentPassword, setCurrentPassword] = useState("");

  //   function changePassword() {
  //     let user = authentication.currentUser
  //     let cred = EmailAuthProvider.credential(user.email, currentPassword)
  //     reauthenticateWithCredential(user, cred)
  //       .then(() => {
  //         updatePassword(user, newPassword)
  //           .then(() => Alert.alert(
  //             "Password Updated successfully",
  //           ))
  //           .catch((error) => Alert.alert(error.message));
  //       })
  //       .catch(error => alert(error.message))
  //   }

  return (
    <AppSafeAreaView>
      <View style={styles.container}>
        <View style={styles.body}>
          {/* <TouchableOpacity>
          <FontAwesomeIcon
          icon={faChevronLeft}
          color='grey'
          size={25}
          />
          </TouchableOpacity> */}
          <View style={styles.formContainer}>

            <View style={styles.imageContain}>
              <Image source={require('../../assets/pending.png')} style={styles.image} />
            </View>
            <View style={styles.pending}>
              <Text style={styles.text1}>Pending..</Text>
            </View>
            <View style={styles.pendingText}>
              <Text style={styles.text2}>Your documents are being reviewed. {"\n"}
                After review, you will be notified.</Text>
            </View>

          </View>
          <View style={[styles.register, { marginTop: 10 }]}>
            <TouchableOpacity
              // onPress={changePassword}
              style={styles.getStarted}>
              <Text style={{ fontSize: 16, }}>Home</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </AppSafeAreaView>
  )
}
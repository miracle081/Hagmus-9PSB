import { useContext, useEffect, useState, useCallback } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, } from "react-native";
import { AppSafeAreaView } from "../components/AppSafeAreaView";
import { styles } from "../styles/idverification";
import { Kurale_400Regular } from "@expo-google-fonts/kurale";
import {Inter_400Regular} from "@expo-google-fonts/inter";
import { useFonts } from 'expo-font';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
// import { authentication } from '../../firebase/firebaseProjectSetting';
// import { reauthenticateWithCredential, updatePassword, EmailAuthProvider } from 'firebase/auth';


export function ProfileImageUpload({ navigation }) {     
    let [Loaded] = useFonts({
    Kurale_400Regular,
    Inter_400Regular,
});

if(!Loaded){
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
          <TouchableOpacity>
          <FontAwesomeIcon
          icon={faChevronLeft}
          color='grey'
          size={25}
          />
          </TouchableOpacity>
          <View style={styles.header}>
            <Text style={styles.text1}>Verify Account</Text>
          </View>
         <View style={styles.formContainer}>
        
            <Text style={{color:'grey', fontFamily:'Inter_400Regular', marginBottom:5, fontWeight:'bold', fontSize:20}}>
            Take Selfie Photo
            </Text>

           
           <View style={styles.selectId}>
            <View style={styles.idHold}>
               <TouchableOpacity>
                <View style={styles.id}>
                    <FontAwesomeIcon
                    icon={faCameraRetro}
                    color='grey'
                    size={25}
                    />
                    <Text style={{color:'grey',  marginLeft:6}}>Upload portrait photo</Text>
                    </View>
              </TouchableOpacity>
            </View>
           </View>

        <View style={styles.idRequire}>

        <View style={styles.list}>
            <FontAwesomeIcon
            icon={faCheck}
            color='green'
            />
            <Text style={{ color:'grey', fontSize:15, margin:8}}>
            Take a selfie of yourself with a neutral expression
            </Text>
        </View>

        <View style={styles.list}>
            <FontAwesomeIcon
            icon={faCheck}
            color='green'
            />
            <Text style={{ color:'grey', fontSize:15, margin:8}}>
            Make sure your whole face is visible,{"\n"} centered, and your eyes are open
            </Text>
        </View>

        <View style={styles.list}>
            <FontAwesomeIcon
            icon={faXmark}
            color='red'
            />
            <Text style={{ color:'grey', fontSize:15, margin:8}}>
            Do not crop your ID or screenshots of your ID
            </Text>
        </View>

        <View style={styles.list}>
            <FontAwesomeIcon
            icon={faXmark}
            color='red'
            />
            <Text style={{ color:'grey', fontSize:15, margin:8}}>
            Do not hide or alter parts of your face{"\n"}
             (No hats/ beauty images/ filters/ headgear)
            </Text>
        </View>

        </View>
          </View>
           <View style={[styles.register,{marginTop:10}]}>
              <TouchableOpacity
                // onPress={changePassword}
                style={styles.getStarted}>
                <Text style={{ fontSize: 16, }}>Continue</Text>
              </TouchableOpacity>
            </View>

        </View>
      </View>
    </AppSafeAreaView>
  )
}
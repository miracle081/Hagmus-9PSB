import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, TextInput, Alert } from "react-native";
import { styles } from "../styles/leavemsg";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight, faArrowLeft, faBookOpenReader, faCircleQuestion, faEnvelope, faGlobe, faMessage } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faLinkedin, faReadme, faTelegram, faTwitter, faWeebly } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { useContext, useState } from "react";
import { AppContext } from "../../globals/AppContext";
import { Mailer } from "../components/Mailer";
import { ModalAlert } from "../components/ModalAlert";

export function DeleteAcct({ navigation }) {
  const { userInfo, setPreloader } = useContext(AppContext);
  const [message, setMessage] = useState('');
  const [Avisible, setAvisible] = useState(false);
  const [amsg, setAmsg] = useState("");

  function handleAlert(message) {
    setAvisible(true);
    setAmsg(message)
  }
  
  async function sendMail() {
    setPreloader(true)
    const email = userInfo.email
    const sub = `[Hagmus] Message from ${userInfo.first_name} ${userInfo.last_name}`
    const msg = ` <p style="font-size:15px;font-family:arial;">
    Username: @${userInfo.username} <br> 
    Sender's email address: ${userInfo.email} <br> 
    ${message}</p>`
    try {
      Mailer(email, sub, msg)
        .then(() => {
          setPreloader(false)
          handleAlert("Your message has been recieved. Account will be deleted " + userInfo.email)
        })
        .catch((error) => {
          setPreloader(false)
          handleAlert("Failed, please try again")
          console.log(error);
        });
    } catch (error) {
      setPreloader(false)
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ margin: 18 }}>
      </View>
      <View style={{ margin: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            size={25}
            color={'#787A8D'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={{ marginTop: 20 }}>
          <View style={{
            padding: 10, backgroundColor: '#16171D', margin: 10, alignItems: 'center',
            borderRadius: 5
          }}>
            <Text style={{ color: 'red', fontSize: 13 }}>
              Request for Account and all Personal data to be Deleted</Text>
          </View>

          <View style={{ padding: 15, backgroundColor: '#16171D', margin: 10, height: 230, borderRadius: 5 }}>
            <TextInput
              style={styles.inputStyleMsg}
              keyboardType='default'
              placeholder='Enter Message'
              placeholderTextColor="#787A8D"
              numberOfLines={2}
              pointerEvents="auto"
              multiline={true}
              color='white'
              selectionColor={'#7B61FF'}
              onChangeText={inp => setMessage(inp.trim())}
            />
          </View>

          <View
            style={{ marginTop: 20, padding: 10 }}>

            <TouchableOpacity onPress={sendMail}
              style={{ marginBottom: 28 }}>
              <View style={{
                backgroundColor: "red", padding: 8,
                borderRadius: 5, alignItems: 'center'
              }}>
                <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}>Delete</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <ModalAlert message={amsg} onClose={()=> setAvisible(!Avisible)} visible={Avisible} />

      </View>
    </View>
  )
}
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, TextInput, Alert, KeyboardAvoidingView } from "react-native";
import { styles } from "../styles/leavemsg";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight, faArrowLeft, faBookOpenReader, faCircleQuestion, faEnvelope, faEnvelopesBulk, faGlobe, faMessage } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faLinkedin, faReadme, faTelegram, faTwitter, faWeebly } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { useContext, useState } from "react";
import { AppContext } from "../../globals/AppContext";
import { Mailer } from "../components/Mailer";
import { ModalAlert } from "../components/ModalAlert";

export function LeaveMsg({ navigation }) {
  // const { userInfo, setPreloader } = useContext(AppContext);
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
          handleAlert("Your message has been recieved by the management and responds will be sent to your mail " + userInfo.email)
        })
        .catch((error) => {
          setPreloader(false)
          handleAlert("Failed to send message to the management, please try again")
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
            size={20}
            color={'#787A8D'}
          />
        </TouchableOpacity>
      </View>
      <View style={{ padding: 10, marginTop: 20, alignItems: 'center', borderRadius: 5 }}>
        <FontAwesomeIcon icon={faEnvelopesBulk} size={60} color="#7B61FF" />
        <Text style={{ color: '#121212', fontSize: 13 }}>Leave a message and you will get a response via mail</Text>
      </View>

      <View style={styles.body}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView style={{ padding: 10, margin: 10, borderRadius: 5 }}>
            <TextInput
              style={styles.inputStyleMsg}
              keyboardType='default'
              placeholder='Enter Subject'
              placeholderTextColor="#787A8D"
              numberOfLines={2}
              pointerEvents="auto"
              multiline={true}
              color='gray'
              selectionColor={'#7B61FF'}
              onChangeText={inp => setMessage(inp.trim())}
            />
            <View style={[styles.inputStyleMsg,{height:170}]}>
              <TextInput
                style={{}}
                keyboardType='default'
                placeholder='Enter Message'
                placeholderTextColor="#787A8D"
                numberOfLines={2}
                pointerEvents="auto"
                multiline={true}
                color='gray'
                selectionColor={'#7B61FF'}
                onChangeText={inp => setMessage(inp.trim())}
              />
            </View>
            <View style={{ marginTop: 20, }}>
              <TouchableOpacity onPress={sendMail} style={{ marginBottom: 28, backgroundColor: "#7B61FF", padding: 8, borderRadius: 5, alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Send Message</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <ModalAlert message={amsg} onClose={() => setAvisible(!Avisible)} visible={Avisible} />

      </View>
    </View>
  )
}
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { styles } from "../styles/aboutus";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight, faArrowLeft, faBookOpenReader, faCircleQuestion, faEnvelope, faGlobe, faMessage } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faLinkedin, faReadme, faTelegram, faTwitter, faWeebly, faWhatsapp, faWhatsappSquare } from "@fortawesome/free-brands-svg-icons";
import { ModalAlert } from "../components/ModalAlert";
import { Button, Linking } from 'react-native';

// Send whatsapp support message

        const openWhatsApp = () => {
          // Replace 'YOUR_NUMBER' with your WhatsApp number including country code
          // and 'YOUR_MESSAGE' with the message you want to pre-fill.
          const phoneNumber = '+2348067548931';
          const message = 'Good Day';
      
          // Constructing the WhatsApp URL
          const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
      
          // Opening WhatsApp using Linking
          Linking.openURL(whatsappUrl)
            .then(() => console.log("WhatsApp opened successfully"))
            .catch(err => console.error("An error occurred", err));
        };

export function HelpSupport({ navigation }) {
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
                                <ScrollView>
                                        <View style={{ margin: 13, padding: 4 }}>

                                                <TouchableOpacity
                                                        onPress={() => navigation.navigate('Web', { uri: "https://hagmus.com" })}
                                                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}
                                                >
                                                        <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, alignItems: 'center' }}>
                                                                <FontAwesomeIcon
                                                                        icon={faCircleQuestion}
                                                                        color='#7B61FF'
                                                                        style={{ marginRight: 8 }}
                                                                        size={25}
                                                                />
                                                                <Text style={{ color: 'black', fontSize: 16 }}>FAQs</Text>
                                                        </View>
                                                        <FontAwesomeIcon
                                                                icon={faAngleRight}
                                                                color='grey'
                                                                
                                                        />
                                                </TouchableOpacity>


                                                <TouchableOpacity
                                                        onPress={() => navigation.navigate('LeaveMsg')}
                                                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}
                                                >
                                                        <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, alignItems: 'center' }}>
                                                                <FontAwesomeIcon
                                                                        icon={faEnvelope}
                                                                        color='#7B61FF'
                                                                        style={{ marginRight: 8 }}
                                                                        size={25}
                                                                />
                                                                <Text style={{ color: 'black', fontSize: 16 }}>Leave a Message</Text>
                                                        </View>
                                                        <FontAwesomeIcon
                                                                icon={faAngleRight}
                                                                color='grey'
                                                        />
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                 onPress={openWhatsApp}
                                                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}
                                                >
                                                        <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, alignItems: 'center' }}>
                                                                <FontAwesomeIcon
                                                                        icon={faWhatsappSquare}
                                                                        color='#09681a'
                                                                        style={{ marginRight: 5 }}
                                                                        size={30}
                                                                />
                                                                <Text style={{ color: 'black', fontSize: 16 }}>Chat us on Whatsapp</Text>
                                                        </View>
                                                        <FontAwesomeIcon
                                                                icon={faAngleRight}
                                                                color='grey'
                                                        />
                                                </TouchableOpacity>




                                        </View>
                                        <View
                                                style={{
                                                        borderBottomColor: '#787A8D',
                                                        borderBottomWidth: StyleSheet.hairlineWidth,
                                                        margin: 15,
                                                }}
                                        />

                                        <View style={{
                                                margin: 7, backgroundColor: '#16171D', padding: 8, borderRadius: 5,
                                                alignItems: 'center',
                                        }}>
                                                <Text style={{ color: '#FFE5F1', fontSize: 14, lineHeight: 20 }}>For more enquiries, contact us

                                                </Text>
                                        </View>

                                        <View style={{alignItems:'center'}}>
                                                <Text style={{fontWeight:'bold',fontSize:18}}>Support@hagmus.com</Text>
                                        </View>
                                </ScrollView>
                        </View>
                </View>
        )
}
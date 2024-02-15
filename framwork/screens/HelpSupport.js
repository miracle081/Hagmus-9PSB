import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { styles } from "../styles/aboutus";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight, faArrowLeft, faBookOpenReader, faCircleQuestion, faEnvelope, faGlobe, faMessage } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faLinkedin, faReadme, faTelegram, faTwitter, faWeebly } from "@fortawesome/free-brands-svg-icons";
import { ModalAlert } from "../components/ModalAlert";

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
                                                        // onPress={() => navigation.navigate('Web', { uri: "https://hagmus.com/#support" })}
                                                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}
                                                >
                                                        <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, alignItems: 'center' }}>
                                                                <FontAwesomeIcon
                                                                        icon={faCircleQuestion}
                                                                        color='#7B61FF'
                                                                        style={{ marginRight: 5 }}
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
                                                                        style={{ marginRight: 5 }}
                                                                />
                                                                <Text style={{ color: 'black', fontSize: 16 }}>Leave a Message</Text>
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
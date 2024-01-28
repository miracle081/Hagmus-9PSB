import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { styles } from "../styles/aboutus";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight, faArrowLeft, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faLinkedin, faTelegram, faTwitter, faWeebly } from "@fortawesome/free-brands-svg-icons";

export function AboutUs({ navigation }) {
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
                <View style={{ alignItems: 'center', marginBottom: 15 }}>
                    <Image source={require('../../assets/icon.png')}
                        style={styles.hagmusLogo} />
                </View>

                <ScrollView>
                    <View style={{ margin: 13, padding: 4 }}>
                        <View style={{
                            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
                            , marginBottom: 20
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesomeIcon
                                    icon={faFacebook}
                                    color='#3B5998'
                                    size={22}
                                    style={{ marginRight: 5 }}
                                />
                                <Text style={{ color: '#05030d', fontSize: 16 }}>Follow us on Facebook</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: '#05030d', fontSize: 16 }}>@HagmusPay</Text>
                            </View>
                        </View>

                        <View style={{
                            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                            marginTop: 20, marginBottom: 20
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesomeIcon
                                    icon={faTwitter}
                                    color='#1DA1F2'
                                    size={22}
                                    style={{ marginRight: 5 }}
                                />
                                <Text style={{ color: '#05030d', fontSize: 16 }}>Follow us on Twitter</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: '#05030d', fontSize: 16 }}>@HagmusPay</Text>
                            </View>
                        </View>

                        <View style={{
                            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                            marginTop: 20, marginBottom: 20
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesomeIcon
                                    icon={faTelegram}
                                    color='#0088cc'
                                    size={22}
                                    style={{ marginRight: 5 }}
                                />
                                <Text style={{ color: '#05030d', fontSize: 16 }}>Join us on Telegram</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: '#05030d', fontSize: 16 }}>@HagmusPay</Text>
                            </View>
                        </View>

                        <View style={{
                            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                            marginTop: 20, marginBottom: 20
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesomeIcon
                                    icon={faLinkedin}
                                    color='#0072b1'
                                    size={22}
                                    style={{ marginRight: 5 }}
                                />
                                <Text style={{ color: '#05030d', fontSize: 16 }}>Follow us on Linkedin</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: '#05030d', fontSize: 16 }}>@HagmusPay</Text>
                            </View>
                        </View>

                        <View style={{
                            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                            marginTop: 20
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesomeIcon
                                    icon={faGlobe}
                                    color='#787A8D'
                                    size={22}
                                    style={{ marginRight: 5 }}
                                />
                                <Text style={{ color: '#05030d', fontSize: 16 }}>Hagmus Webpage </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: '#05030d', fontSize: 16 }}>hagmuspay.com</Text>
                            </View>
                        </View>
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
                        <Text style={{ color: '#FFE5F1', fontSize: 14, lineHeight: 20 }}>Join the HagmusPay community via our main 
                        social media channels. Please be wary of fake accounts impersonating Hagmuspay.

                        </Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}
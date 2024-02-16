import { faArrowLeft, faAngleRight, faEnvelope, faEnvelopeOpen, faCopy, faEdit, faFaceSadTear, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Button, Image } from "react-native";
import { styles } from "../styles/notification";
import { useContext } from "react";
import { formatMoney } from "../components/FormatMoney";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContext } from "../../globals/AppContext";

export function Earn({ navigation }) {
    const { userInfo, accountInfo } = useContext(AppContext);

    const imageUrl = 'https://wenethub.com/imageslink/referralB.png';
    

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>
                {/* <View style={{ marginTop: 30, flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            size={25}
                            color='#787A8D'
                            style={{ marginRight: '30%' }}
                        />
                    </TouchableOpacity>
                </View> */}

            </View>

            <ScrollView style={{ flex: 1 }}>
                <View style={{ padding: 20, margin: 8, borderWidth: 1, borderRadius: 8, borderColor: '#d3ceeb' }}>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, marginTop: 10 }}>
                        <Text style={{ color: '#20212a', fontWeight: 'bold', fontSize: 16 }}>Referral Code</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#20212a', fontWeight: 'bold', fontSize: 16 }}>@{userInfo.username}</Text>
                            <FontAwesomeIcon
                                icon={faCopy}
                                color="#7b61ff"
                                style={{ marginLeft: 5 }}
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            borderBottomColor: '#d2d6df',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            marginTop: 10,
                            marginBottom: 15
                        }}
                    />


                    <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, marginTop: 10 }}>
                        <Text style={{ color: '#20212a', fontWeight: 'bold', fontSize: 16 }}>Total Bonus</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#20212a', fontWeight: 'bold', fontSize: 16 }}>₦{formatMoney(Number(accountInfo.cashback_balance) + Number(accountInfo.referral_bonus))}</Text>

                        </View>
                    </View>
                    <View
                        style={{
                            borderBottomColor: '#d2d6df',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            marginTop: 10,
                            marginBottom: 10
                        }}
                    />

                </View>

                <View style={{ alignItems: 'center', marginBottom: 15, marginTop: 18 }}>
                    {/* <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>Referral Info</Text> */}
                    {/* <Image source={require('../../assets/bns.png')} style={{ width: 410, height: 170 }} /> */}
                    <Image  source={{ uri: imageUrl }} style={{ width: '100%', height: 170 }}/>
                </View>

                <View style={{ alignItems: 'center', marginBottom: 15, marginTop: 18 }}>
                    {/* <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>Referral Info</Text> */}
                    <Image source={require('../../assets/referralbns.jpeg')} style={{ width: '100%', height: 170 }} />
                </View>
            </ScrollView >

            <View style={{ margin: 20 }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Referral')}
                    style={styles.getStarted}>
                    <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, color: 'white', fontWeight: 'bold' }}>Bonus Account</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView >
    )
}
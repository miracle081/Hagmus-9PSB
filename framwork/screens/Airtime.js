import { useContext, useEffect, useState, useCallback } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, Image, Pressable, ScrollView, FlatList, } from "react-native";
import { AppSafeAreaView } from "../components/AppSafeAreaView";
import { styles } from "../styles/airtime";
import { Kurale_400Regular } from "@expo-google-fonts/kurale";
import { useFonts } from 'expo-font';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faCaretDown, faChevronDown, faChevronLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import { reauthenticateWithCredential, updatePassword, EmailAuthProvider } from 'firebase/auth';
import { authentication, db } from '../../firebase/firebase';
import { ToastApp } from '../components/Toast';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { Modal } from 'react-native';
import { generateRequestId } from '../components/requestId';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { AppContext } from '../../globals/AppContext';
import { symbol } from '../components/currencySymbols';
import { dateTime } from '../components/DateTime';
import { VTPass, baseURL } from '../../config';
import { handleError } from '../components/HandleRequestError';
import { PinTransactionModal } from '../components/PinModal';

const airTimeService = [
    { amount: 50, cashBack: 0.8 },
    { amount: 100, cashBack: 1.7 },
    { amount: 200, cashBack: 3.4 },
    { amount: 500, cashBack: 8.5 },
    { amount: 1000, cashBack: 17 },
    { amount: 2000, cashBack: 34, },
]

const networkList = [
    { name: "MTN", id: "mtn", image: "https://wenethub.com/imageslink/mtnlogo.png" },
    { name: "Glo", id: "glo", image: "https://wenethub.com/imageslink/glo.jpg" },
    { name: "Airtel", id: "airtel", image: "https://wenethub.com/imageslink/airtel.jpg" },
    { name: "9Moble", id: "etisalat", image: "https://wenethub.com/imageslink/9mobile.png" },
]

export function Airtime({ navigation }) {
    const { userUID, setPreloader, userInfo, accountInfo, token, pin, setPin } = useContext(AppContext);
    const [newPassword, setNewPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [modalVisibility, setModalVisibility] = useState(false);
    const [modalVisibility2, setModalVisibility2] = useState(false);
    const [airTime, setAirTime] = useState({ amount: 0, cashBack: 0, });
    const [network, setNetwork] = useState(networkList[0]);
    const [phone, setPhone] = useState(userInfo.phone);
    const [color, setColor] = useState('gray');
    const [message, setMessage] = useState('');

    // useEffect(() => {
    //     setPreloader(false)
    // }, [])

    async function buyAirtime() {
        setPreloader(true)
        const data = {
            phone_number: phone,
            network: network.id,
            amount: String(airTime.amount),
            pin
        };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${token}`
            },
            body: JSON.stringify(data),
            redirect: 'follow'
        };

        fetch(baseURL + "/api/vas/airtime/pay", requestOptions)
            .then(response => response.json())
            .then(response => {
                const { data, status, message } = response;
                // console.log(response);
                setPreloader(false)
                if (status == "success") {
                    setPin("")
                    navigation.navigate("Successful", {
                        name: "",
                        amount: symbol("ngn") + airTime.amount,
                        message: `${symbol("ngn")}${airTime.amount} ${network.name} was bought successfully`,
                        screen: "Airtime"
                    })
                }
                handleError(status, message);
            })
            .catch(error => {
                setPreloader(false)
                console.log('error', error)
                Alert.alert("Error!", error.message)
            });
    }

    const closeModal = () => {
        setModalVisibility(!modalVisibility);
    };
    const closeModal2 = () => {
        setModalVisibility2(!modalVisibility2);
    };
    const [pinModalVisibility, setPinMetModalVisibility] = useState(false);
    const pinModal = () => {
        setPinMetModalVisibility(!pinModalVisibility);
    };

    function validateAmount(amt) {
        const limit = { from: 50, to: 500000 }
        if (amt < limit.from || amt > limit.to) {
            setMessage(`Amount must be ${symbol("ngn")}${limit.from} - ${symbol("ngn")}${limit.to}`);
            setColor('#ff0000ff')
            setAirTime({ amount: 0, cashBack: 0 })
        } else {
            if (amt < accountInfo.account_balance) {
                const cal = amt * 1.7 / 100;
                setAirTime({ amount: amt, cashBack: cal })
                setMessage('Amount Ok');
                setColor('#02904bff')
            } else {
                setMessage(`Insufficient Balace (Bal: ${accountInfo.account_balance})`);
                setColor('#ff0000be')
                setAirTime({ amount: 0, cashBack: 0 })
            }
        }
    }

    return (
        <AppSafeAreaView  backgroundColor={"#e4e2eb"}>
            <View style={styles.container}>
                <View style={styles.body}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            color='#787A8D'
                            size={20}
                        />
                    </TouchableOpacity>
                    <View style={styles.header}>
                        <Text style={styles.text1}>Airtime</Text>
                    </View>

                    <ScrollView style={{ flex: 1 }}>
                        <View style={{}}>
                            <Image source={require('../../assets/cashback.png')} style={{ width: '100%', height: 70, marginBottom: 10, borderRadius: 8 }} />
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#f1f1f5', padding: 10, borderRadius: 8, }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={closeModal}
                                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={{ uri: network.image }} style={{ width: 40, height: 40, borderRadius: 100, marginRight: 5 }} />
                                    <FontAwesomeIcon icon={faCaretDown} color='grey' />
                                </TouchableOpacity>
                                <Text style={{ borderLeftWidth: 2, borderColor: '#9387cf', height: 30, marginLeft: 14 }}></Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <TextInput
                                    style={styles.inputStyle}
                                    keyboardType='phone-pad'
                                    placeholder='Input Number'
                                    selectionColor={'grey'}
                                    onChangeText={inp => setPhone(inp.trim())}
                                    value={`${phone}`}
                                />
                            </View>
                        </View>


                        {/* Top Up */}
                        <View style={{ backgroundColor: '#f1f1f5', padding: 18, borderRadius: 8, marginTop: 18, }}>
                            <View style={{ padding: 3, }}>

                                {airTimeService.map(item => {
                                    return (
                                        <TouchableOpacity key={item.amount}
                                            onPress={() => { setAirTime(item), closeModal2() }}
                                            style={{ flexDirection: "row", alignItems: 'center', justifyContent: "space-between", backgroundColor: '#dcdcdc7e', padding: 15, borderRadius: 8, marginTop: 5, paddingVertical: 10, flex: 1, }}>
                                            <View style={{ flex: 1 }}>
                                                <Text style={{ fontSize: 14, color: '#343434', fontWeight: "bold" }}>₦{item.amount}</Text>
                                                <Text style={{ fontSize: 11, marginBottom: 2, color: '#5541b7' }}>+₦{item.cashBack} bonus</Text>
                                            </View>
                                            <TouchableOpacity
                                                onPress={() => { setAirTime(item), closeModal2() }}
                                                style={[styles.getStarted, { borderRadius: 50, padding: 5, paddingHorizontal: 15, marginTop: 0 }]}>
                                                <Text style={{ fontSize: 12, color: "white" }}>Buy</Text>
                                            </TouchableOpacity>
                                        </TouchableOpacity>
                                    )
                                })
                                }
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#f1f1f5', padding: 10, borderRadius: 8, marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                <Text style={{ marginLeft: 14, fontWeight: 'bold', fontSize: 18 }}>₦</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <TextInput
                                    style={styles.inputStyle}
                                    keyboardType='phone-pad'
                                    placeholder='50 - 500000'
                                    selectionColor={'grey'}
                                    onChangeText={inp => validateAmount(inp.trim())}
                                />
                            </View>
                        </View>
                        {message != "" ? <Text style={{ marginBottom: 25, color: color }}>{message}</Text> : null}

                        <View style={styles.register}>
                            <TouchableOpacity
                                onPress={closeModal2}
                                style={styles.getStarted}>
                                <Text style={{ fontSize: 16, color: "white" }}>Pay</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <Image source={require('../../assets/cashback.png')} style={{ width: '100%', height: 70, marginBottom: 10, borderRadius: 8 }} />
                        </View>
                    </ScrollView>
                </View>

                {/* ============== Network provider modal ============== */}
                <Modal
                    visible={modalVisibility}
                    animationType="slide"
                    transparent={true}
                >
                    <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
                        <Pressable style={{ flex: 1 }} onPress={closeModal} >
                        </Pressable>
                        <View style={{ backgroundColor: "#eeeff4", height: 350, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                            <View style={{ alignItems: 'flex-end', margin: 10 }}>
                                <TouchableOpacity onPress={closeModal}>
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        size={24}
                                        color='#7B61FF'
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={{ color: '#787A8D', margin: 10, fontWeight: "bold" }}>Select Network</Text>

                                <View style={{ padding: 10, flex: 1 }}>
                                    <FlatList data={networkList}
                                        style={{ flex: 1 }}
                                        renderItem={({ item }) => {
                                            return (
                                                <TouchableOpacity onPress={() => { setNetwork(item); closeModal() }}
                                                    style={{ backgroundColor: '#d2d7ef', padding: 4, borderRadius: 8, marginTop: 10 }}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Image source={{ uri: item.image }} style={{ width: 40, height: 40, borderRadius: 100, marginRight: 5 }} />
                                                        <Text style={{ fontWeight: 'bold', color: '#111532', marginRight: 8, fontSize: 18 }}>{item.name}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        }} key={({ item }) => { item.id }} />
                                </View>
                            </View>

                        </View>
                    </View>
                </Modal>

                {/* ============== Confirm Payment modal ============== */}
                <Modal
                    visible={modalVisibility2}
                    animationType="slide"
                    transparent={true}
                >
                    <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
                        <Pressable style={{ flex: 1 }} onPress={closeModal2} >
                        </Pressable>
                        <View style={{ backgroundColor: "#eeeff4", height: 350, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                            <View style={{ alignItems: 'flex-end', margin: 10 }}>
                                <TouchableOpacity onPress={closeModal2}>
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        size={24}
                                        color='#7B61FF'
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={{ padding: 10 }}>
                                <View style={{ padding: 10, }}>
                                    <View style={{ alignItems: 'center', marginBottom: 8 }}>
                                        <Text>₦<Text style={{ fontSize: 25 }}>{airTime.amount}</Text></Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                        <Text style={{ color: "#727272" }}>Product</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image source={{ uri: network.image }} style={{ width: 30, height: 30, borderRadius: 100, marginRight: 5 }} />
                                            <Text style={{ color: "#727272" }}>{network.name}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                        <Text style={{ color: "#727272" }}>Amount</Text>
                                        <Text style={{ color: "#727272" }}>₦{airTime.amount}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                        <Text style={{ color: "#727272" }}>Bonus</Text>
                                        <Text style={{ color: "#309900" }}>₦{airTime.cashBack} Cashback</Text>
                                    </View>
                                </View>
                                <View style={styles.register}>
                                    <TouchableOpacity onPress={() => { closeModal2(); pinModal() }} style={styles.getStarted}>
                                        <Text style={{ fontSize: 16, color: "white" }}>Pay</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>

                <PinTransactionModal visibility={pinModalVisibility} onClose={pinModal} onVerify={() => { pinModal(); buyAirtime() }} />

            </View>
        </AppSafeAreaView>
    )
}
import { useContext, useEffect, useState, useCallback } from 'react';
import { Text, View, TextInput, Modal, TouchableOpacity, Alert, Image, Pressable, ScrollView, FlatList, StyleSheet, } from "react-native";
import { AppSafeAreaView } from "../components/AppSafeAreaView";
import { styles } from "../styles/airtime";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleRight, faArrowLeft, faCaretDown, faCaretRight, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { AppContext } from '../../globals/AppContext';
import { symbol } from '../components/currencySymbols';
import { baseURL } from '../../config';
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
    { name: "Ikeja Electricity", abName: "IKEDC", id: "ikeja-electric", image: "https://wenethub.com/imageslink/ike.png" },
    { name: "Eko Electricity", abName: "EKEDC", id: "eko-electric", image: "https://wenethub.com/imageslink/EKEDC.jpeg" },
    { name: "Kano Electricity", abName: "KEDCO", id: "kano-electric", image: "https://wenethub.com/imageslink/kano.png" },
    { name: "Port Harcourt Electricity", abName: "PHED", id: "portharcourt-electric", image: "https://wenethub.com/imageslink/ph.png" },
    { name: "Jos Electricity", abName: "JED", id: "jos-electric", image: "https://wenethub.com/imageslink/jos.jpeg" },
    { name: "Ibadan Electricity", abName: "IBEDC", id: "ibadan-electric", image: "https://wenethub.com/imageslink/ibadan.png" },
    { name: "Kaduna Electricity", abName: "KAEDCO", id: "kaduna-electric", image: "https://wenethub.com/imageslink/kaduna.jpeg" },
    { name: "Abuja Electricity", abName: "AEDC", id: "abuja-electric", image: "https://wenethub.com/imageslink/abj.jpeg" },
    { name: "Enugu Electricity", abName: "EEDC", id: "enugu-electric", image: "https://wenethub.com/imageslink/enugu.png" },
    { name: "Benin Electricity", abName: "BEDC", id: "benin-electric", image: "https://wenethub.com/imageslink/benin.jpeg" },
    { name: "ABA Electricity", abName: "ABA", id: "aba-electric", image: "https://wenethub.com/imageslink/abaa.png" },

]

export function Electricity({ navigation }) {
    const { accountInfo, setPreloader, userInfo, token, pin, setPin } = useContext(AppContext);
    const [newPassword, setNewPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [modalVisibility, setModalVisibility] = useState(false);
    const [modalVisibility2, setModalVisibility2] = useState(false);
    const [electricity, setElectricity] = useState({ amount: 0, cashBack: 0, status: false });
    const [network, setNetwork] = useState(networkList[0]);
    const [phone, setPhone] = useState("");
    const [method, setMethod] = useState('prepaid');
    const [color, setColor] = useState('gray');
    const [message, setMessage] = useState('');
    const [checked, setChecked] = useState(false);
    const [card, setCard] = useState({ name: "", color: "", verified: false });

    const closeModal = () => setModalVisibility(!modalVisibility);
    const closeModal2 = () => setModalVisibility2(!modalVisibility2);
    const [pinModalVisibility, setPinMetModalVisibility] = useState(false);
    const pinModal = () => {
        setPinMetModalVisibility(!pinModalVisibility);
    };

    async function buyElectricity() {
        setPreloader(true);

        const data = {
            phone_number: userInfo.phone,
            network: network.id,
            amount: String(electricity.amount),
            plan_code: method,
            meter_number: phone,
            pin,
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

        fetch(baseURL + "/api/vas/electricity/pay", requestOptions)
            .then(response => response.json())
            .then(response => {
                const { data, status, message } = response;
                console.log(response);
                setPreloader(false)
                if (status == "success") {
                    setPin("")
                    if (data.status == 'Pending') {
                        Alert.alert(
                            'Transaction Pending',
                            "Your transaction is processing, please check back later",
                        )
                    }

                    if (data.status == "Completed") {
                        navigation.navigate("Successful", {
                            name: "",
                            amount: `${symbol("ngn")}${electricity.amount}`,
                            message: `${network.name} bought successfuly \n Token: ${data.transfer_source}`,
                            screen: "Electricity"
                        })
                    }
                }
                handleError(status, message);
            })
            .catch(error => {
                setPreloader(false)
                console.log('error', error)
            });
    }

    async function verifyCard(card) {
        setPreloader(true)
        const data = {
            account: card,
            service: network.id,
            type: method
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

        fetch(baseURL + "/api/vas/billers/verify-account", requestOptions)
            .then(response => response.json())
            .then(response => {
                const { data, status, message } = response;
                // console.log(response);
                setPreloader(false)
                if (status == "success") {
                    setCard({ name: data.Customer_Name, color: '#1f8805', verified: true })
                } else {
                    setCard({ name: message, color: '#ff0000ff', verified: false })
                }
                handleError(status, message);
            })
            .catch(error => {
                setPreloader(false)
                console.log('error', error)
            });
    }

    function validateAmount(amt) {
        const limit = { from: 500, to: 500000 }
        if (amt < limit.from || amt > limit.to) {
            setMessage(`Amount must be ${symbol("ngn")}${limit.from} - ${symbol("ngn")}${limit.to}`);
            setColor('#ff0000ff')
            setElectricity({ amount: 0, cashBack: 0, status: false })
        } else {
            if (accountInfo.account_balance > amt) {
                const cal = amt * 1.7 / 100;
                setElectricity({ amount: amt, cashBack: cal, status: true })
                setMessage('Amount Ok');
                setColor('#02743dbe')
            } else {
                setMessage(`Insufficient Balace (Bal: ${accountInfo.account_balance})`);
                setColor('#ff0000be')
                setElectricity({ amount: 0, cashBack: 0, status: false })
            }
        }
    }

    function input(inp) {
        setPhone(inp)
        if (inp.length == 11) {
            verifyCard(inp)
        }
    }

    return (
        <AppSafeAreaView>
            <View style={styles.container}>
                <View style={styles.body}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            color='#787A8D'
                            size={25}
                        />
                    </TouchableOpacity>
                    <ScrollView>
                        <View style={styles.header}>
                            <Text style={styles.text1}>Electricity</Text>
                        </View>

                        <View style={{ backgroundColor: '#f1f1f5', borderRadius: 8, }}>
                            <Text style={{ padding: 8, marginLeft: 5, color: 'grey', fontSize: 16 }}>Select Provider</Text>
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                                    backgroundColor: '#f1f1f5', padding: 10, borderRadius: 8,
                                }}
                                onPress={closeModal}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Image source={{ uri: network.image }} style={{ width: 40, height: 40, borderRadius: 100, marginRight: 8 }} />
                                    <Text>{network.name} ({network.abName})</Text>
                                </View>
                                <FontAwesomeIcon icon={faCaretDown} color='grey' />
                            </TouchableOpacity>

                            <View
                                style={{
                                    borderBottomColor: 'grey',
                                    borderBottomWidth: StyleSheet.hairlineWidth,
                                    marginBottom: 15
                                }}
                            />

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom: 10 }}>
                                <TouchableOpacity onPress={() => setMethod("prepaid")}
                                    style={{ backgroundColor: '#d3d1de', width: 105, borderRadius: 10, opacity: method == "prepaid" ? 1 : 0.4 }}>
                                    <View style={{ padding: 0, alignItems: 'center', width: 105, marginTop: 8 }}>
                                        <Text style={{ marginBottom: 3, marginTop: 3, color: '#08080e', }}>Prepaid</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-betwee' }}>
                                        <View style={{ backgroundColor: method == "prepaid" ? '#5d5593' : "#6b6b6b9c", padding: 3, borderTopRightRadius: 12, borderBottomLeftRadius: 12, }}>
                                            <FontAwesomeIcon icon={faCheck} size={15} color='#d3d1de' />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setMethod("postpaid")}
                                    style={{ backgroundColor: '#d3d1de', width: 105, borderRadius: 10, opacity: method == "postpaid" ? 1 : 0.4 }}>
                                    <View style={{ padding: 0, alignItems: 'center', width: 105, marginTop: 8, }}>
                                        <Text style={{ marginBottom: 3, marginTop: 3, color: '#08080e', }}>Postpaid</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-betwee' }}>
                                        <View style={{ backgroundColor: method == "postpaid" ? '#5d5593' : "#6b6b6b9c", padding: 3, borderTopRightRadius: 12, borderBottomLeftRadius: 12, }}>
                                            <FontAwesomeIcon icon={faCheck} size={15} color='#d3d1de' />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>



                        {/* Top Up */}
                        <View style={{ backgroundColor: '#f1f1f5', padding: 18, borderRadius: 8, marginTop: 18, }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ color: 'grey' }}>Meter Number</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Text style={{ color: 'grey', marginRight: 4 }}>Beneficiaries</Text>
                                    <FontAwesomeIcon icon={faAngleRight} color='grey' size={18} />
                                </View>
                            </View>

                            <View style={{
                                flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                                backgroundColor: '#cdcdd3', borderRadius: 8, padding: 10, marginTop: 8
                            }}>
                                <TextInput
                                    style={styles.inputStyle}
                                    keyboardType='phone-pad'
                                    placeholder='Input Number'
                                    selectionColor={'grey'}
                                    onChangeText={inp => input(inp.trim())}
                                    value={`${phone}`}
                                />
                            </View>
                            {card.name != "" ? <Text style={{ color: card.color }}>{card.name}</Text> : null}

                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: 'grey', }}>Select Amount</Text>
                                <View style={{ flexDirection: 'row', padding: 10 }}>

                                    <TouchableOpacity onPress={() => { setElectricity({ amount: 1000, }); closeModal2() }}
                                        style={{ alignItems: 'center', marginBottom: 0, marginTop: 10, marginRight: 7 }}>
                                        <View style={{ backgroundColor: '#d3d1de', padding: 5, borderRadius: 10, alignItems: 'center', width: 90, }}>
                                            <Text style={{ fontSize: 13, fontWeight: 'bold', margin: 10, fontSize: 13 }}>₦<Text style={{ fontSize: 17 }}>1000</Text></Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { setElectricity({ amount: 2000, }); closeModal2() }}
                                        style={{ alignItems: 'center', marginBottom: 0, marginTop: 10, marginRight: 7 }}>
                                        <View style={{ backgroundColor: '#d3d1de', padding: 5, borderRadius: 10, alignItems: 'center', width: 90, }}>
                                            <Text style={{ fontSize: 13, fontWeight: 'bold', margin: 10, fontSize: 13 }}>₦<Text style={{ fontSize: 17 }}>2000</Text></Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { setElectricity({ amount: 3000, }); closeModal2() }}
                                        style={{ alignItems: 'center', marginBottom: 0, marginTop: 10, marginRight: 7 }}>
                                        <View style={{ backgroundColor: '#d3d1de', padding: 5, borderRadius: 10, alignItems: 'center', width: 90, }}>
                                            <Text style={{ fontSize: 13, fontWeight: 'bold', margin: 10, fontSize: 13 }}>₦<Text style={{ fontSize: 17 }}>3000</Text></Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', padding: 10 }}>
                                    <TouchableOpacity onPress={() => { setElectricity({ amount: 4000, }); closeModal2() }}
                                        style={{ alignItems: 'center', marginBottom: 10, marginTop: 0, marginRight: 7 }}>
                                        <View style={{ backgroundColor: '#d3d1de', padding: 5, borderRadius: 10, alignItems: 'center', width: 90, }}>
                                            <Text style={{ fontSize: 13, fontWeight: 'bold', margin: 10, fontSize: 13 }}>₦<Text style={{ fontSize: 17 }}>4000</Text></Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { setElectricity({ amount: 5000, }); closeModal2() }}
                                        style={{ alignItems: 'center', marginBottom: 10, marginTop: 0, marginRight: 7 }}>
                                        <View style={{ backgroundColor: '#d3d1de', padding: 5, borderRadius: 10, alignItems: 'center', width: 90, }}>
                                            <Text style={{ fontSize: 13, fontWeight: 'bold', margin: 10, fontSize: 13 }}>₦<Text style={{ fontSize: 17 }}>5000</Text></Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { setElectricity({ amount: 6000, }); closeModal2() }}
                                        style={{ alignItems: 'center', marginBottom: 10, marginTop: 0, marginRight: 7 }}>
                                        <View style={{ backgroundColor: '#d3d1de', padding: 5, borderRadius: 10, alignItems: 'center', width: 90, }}>
                                            <Text style={{ fontSize: 13, fontWeight: 'bold', margin: 10, fontSize: 13 }}>₦<Text style={{ fontSize: 17 }}>6000</Text></Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18, marginRight: 4 }}>₦</Text>
                                <View style={{
                                    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                                    backgroundColor: '#e8e8f0', borderRadius: 5, padding: 10, marginTop: 8, borderBottomWidth: 1,
                                    borderColor: 'grey', width: '95%'
                                }}>
                                    <TextInput
                                        style={styles.inputStyle}
                                        keyboardType='phone-pad'
                                        placeholder='Enter Amount'
                                        selectionColor={'grey'}
                                        onChangeText={inp => validateAmount(inp.trim())}
                                    // value={`${electricity.amount}`}
                                    />
                                </View>
                            </View>
                            {message != "" ? <Text style={{ color: color, marginStart: 20, fontSize: 14 }}>{message}</Text> : null}
                        </View>

                        <View style={[styles.register, { marginBottom: 20 }]}>
                            <TouchableOpacity disabled={!electricity.status}
                                onPress={closeModal2} style={[styles.getStarted, { backgroundColor: electricity.status ? "#7B61FF" : "#7b61ff96" }]}>
                                <Text style={{ fontSize: 16, color: "white" }}>Proceed</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>

                {/* ============== Subscription provider modal ============== */}
                <Modal
                    visible={modalVisibility}
                    animationType="slide"
                    transparent={true}
                >
                    <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
                        <Pressable style={{ flex: 1 }} onPress={closeModal} >
                        </Pressable>
                        <View style={{ backgroundColor: "#eeeff4", height: 450, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
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
                                <Text style={{ color: '#787A8D', margin: 10, fontWeight: "bold" }}>Select Provider</Text>

                                <View style={{ padding: 10, flex: 1 }}>
                                    <FlatList data={networkList}
                                        style={{ flex: 1, marginBottom: 16 }}
                                        renderItem={({ item }) => {
                                            return (
                                                <TouchableOpacity onPress={() => { setNetwork(item); closeModal() }}
                                                    style={{
                                                        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                                                        backgroundColor: '#cacad5', padding: 5, borderRadius: 8, marginBottom: 15
                                                    }}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                        <Image source={{ uri: item.image }} style={{ width: 40, height: 40, borderRadius: 100, marginRight: 8 }} />
                                                        <Text>{item.name} ({item.abName})</Text>
                                                    </View>
                                                    <FontAwesomeIcon icon={faCaretRight} color='grey' />
                                                </TouchableOpacity>
                                            )
                                        }} key={({ item }) => { item.id }} />
                                </View>
                            </View>

                        </View>
                    </View>
                </Modal>

                {/* ============== Confirm Payment modal ============== */}
                {card.verified ?
                    <Modal
                        visible={modalVisibility2}
                        animationType="slide"
                        transparent={true}
                    >
                        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
                            <Pressable style={{ flex: 1 }} onPress={closeModal2} >
                            </Pressable>
                            <View style={{ backgroundColor: "#eeeff4", height: 450, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                                <View style={{ alignItems: 'flex-end', margin: 10 }}>
                                    <TouchableOpacity onPress={closeModal2}>
                                        <FontAwesomeIcon
                                            icon={faXmark}
                                            size={24}
                                            color='#7B61FF'
                                        />
                                    </TouchableOpacity>
                                </View>
                                <ScrollView>
                                    <View style={{ padding: 10 }}>
                                        <View>
                                            <Text style={{ color: '#787A8D', margin: 10, fontWeight: "bold" }}>Confirm Details</Text>
                                            <View style={{ padding: 10 }}>
                                                <View style={{ padding: 10, }}>
                                                    <View style={{ alignItems: 'center', marginBottom: 15 }}>
                                                        <Text>₦<Text style={{ fontSize: 25, fontWeight: 'bold' }}>{electricity.amount}</Text></Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                                        <Text style={{ color: "#727272" }}>Product</Text>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <Image source={{ uri: 'https://media.premiumtimesng.com/wp-content/files/2012/11/PHCN-logo.jpg' }} style={{ width: 30, height: 30, borderRadius: 100, marginRight: 5 }} />
                                                            <Text style={{ color: "#727272" }}>Abuja Electricity</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                                        <Text style={{ color: "#727272" }}>Method</Text>
                                                        <Text style={{ color: "#727272" }}>{`${method}`.toUpperCase()}</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                                        <Text style={{ color: "#727272" }}>Amount</Text>
                                                        <Text style={{ color: "#727272" }}>₦{electricity.amount}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.register}>
                                                    <TouchableOpacity onPress={() => { closeModal2(); pinModal() }} style={styles.getStarted}>
                                                        <Text style={{ fontSize: 16, color: "white" }}>Next</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                        </View>
                                    </View>
                                </ScrollView>

                            </View>
                        </View>
                    </Modal>
                    : null
                }
                <PinTransactionModal visibility={pinModalVisibility} onClose={pinModal} onVerify={() => { pinModal(); buyElectricity() }} />

            </View>
        </AppSafeAreaView>
    )
}
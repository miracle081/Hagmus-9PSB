import { useContext, useEffect, useState, useCallback } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, Image, Pressable, ScrollView, FlatList, } from "react-native";
import { AppSafeAreaView } from "../components/AppSafeAreaView";
import { styles } from "../styles/airtime";
import { Kurale_400Regular } from "@expo-google-fonts/kurale";
import { useFonts } from 'expo-font';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleRight, faArrowLeft, faCaretDown, faCaretRight, faCheck, faChevronDown, faChevronLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import { reauthenticateWithCredential, updatePassword, EmailAuthProvider } from 'firebase/auth';
import { authentication, db } from '../../firebase/firebase';
import { ToastApp } from '../components/Toast';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { Modal } from 'react-native';
import { generateRequestId } from '../components/requestId';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { AppContext } from '../../globals/AppContext';
import { symbol } from '../components/currencySymbols';
import { Checkbox } from 'react-native-paper';
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
    { name: "GOTV", id: "gotv", image: "https://wenethub.com/imageslink/gotv.png" },
    { name: "DSTV", id: "dstv", image: "https://wenethub.com/imageslink/dstv.jpg" },
    { name: "Startimes", id: "startimes", image: "https://wenethub.com/imageslink/star.jpg" },
    { name: "Showmax", id: "showmax", image: "https://wenethub.com/imageslink/max.png" },
]

export function Tv({ navigation }) {
    const { userUID, setPreloader, userInfo, token, pin, setPin } = useContext(AppContext);
    const [newPassword, setNewPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [modalVisibility, setModalVisibility] = useState(false);
    const [modalVisibility2, setModalVisibility2] = useState(false);
    const [service, setService] = useState({ amount: 0, cashBack: 0, variation_code: "", name: "" });
    const [network, setNetwork] = useState(networkList[0]);
    const [phone, setPhone] = useState("");
    const [variation, setVariation] = useState([]);
    const [card, setCard] = useState({ name: "", color: "", verified: false });


    async function fetchVariation(net) {
        setPreloader(true)
        const requestOptions = {
            method: 'GET',
            headers: {
                authorization: `bearer ${token}`
            },
            redirect: 'follow'
        };
        fetch(`${baseURL}/api/vas/billers/${net || networkList[0].id}/plans`, requestOptions)
            .then(response => response.json())
            .then(response => {
                const { data, status, message } = response;
                // console.log(response);
                setPreloader(false)
                if (status == "success") {
                    setVariation(data)
                }
                handleError(status, message);
            })
            .catch(error => {
                setPreloader(false)
                console.log('error', error)
            });
    }

    useEffect(() => {
        fetchVariation()
    }, []);

    // function updateUser(refID) {
    //     updateDoc(doc(db, 'users', userUID), {
    //         ngn: Number(userInfo.ngn) - Number(service.amount)
    //     }).then(() => {
    //         addDoc(collection(db, 'histories'), {
    //             category: "tv",
    //             UID: userUID,
    //             dataID: new Date().getTime(),
    //             networkName: network.name,
    //             image: network.image,
    //             amount: service.amount,
    //             description: phone,
    //             date: dateTime(),
    //             refID,
    //             // transType: "TV s"
    //         })
    //         navigation.navigate("Successful", {
    //             name: "",
    //             amount: `${symbol("ngn")}${service.amount}`,
    //             message: `${service.name} successfuly`,
    //             screen: "Tv"
    //         })
    //         setPreloader(false)
    //     }).catch((e) => {
    //         console.log(e);
    //         setPreloader(false)
    //         ToastApp('Something went wrong, please try again', "LONG");
    //     })
    // }

    async function buyTVSub() {
        setPreloader(true);
        const data = {
            phone_number: userInfo.phone || "08166811697",
            network: network.id,
            amount: String(service.amount),
            plan_code: service.variation_code,
            smartcard_number: phone,
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

        fetch(baseURL + "/api/vas/cable-tv/pay", requestOptions)
            .then(response => response.json())
            .then(response => {
                const { data, status, message } = response;
                // console.log(response);
                setPreloader(false)
                if (status == "success") {
                    setPin("")
                    navigation.navigate("Successful", {
                        name: "",
                        amount: `${symbol("ngn")}${service.amount}`,
                        message: `${service.name} successfuly`,
                        screen: "Tv"
                    })
                }
                handleError(status, message);
            })
            .catch(error => {
                setPreloader(false)
                console.log('error', error)
            });

        // const username = 'lectcle@gmail.com';
        // const password = 'Cleanzy123';
        // const authString = `${username}:${password}`;
        // // const encodedAuthString = btoa(authString);
        // const url = 'https://api-service.vtpass.com/api/pay';
        // const apiKey = VTPass.apiKey;
        // const secretKey = VTPass.secretKey;
        // const requestId = generateRequestId()
        // const payload = {
        //     request_id: requestId,
        //     serviceID: network.id,
        //     billersCode: phone,
        //     variation_code: service.variation_code,
        //     amount: service.amount,
        //     phone: userInfo.phone || "08166811697",
        //     subscription_type: "change"
        // };

        // if (service.amount > userInfo.ngn) {
        //     setPreloader(false)
        //     Alert.alert("Acount", "Insufficent funds")
        // } else {
        //     try {
        //         const data = await fetch(url, {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'Authorization': `${authString}`,
        //                 'api-key': apiKey,
        //                 'secret-key': secretKey
        //             },
        //             body: JSON.stringify(payload)
        //         });
        //         const dataReturn = await data.json();
        //         setPreloader(false)
        //         if (dataReturn.code == "000") {
        //             updateUser(requestId);
        //         } else {
        //             Alert.alert("Status", dataReturn.response_description)
        //         }
        //     } catch (error) {
        //         setPreloader(false)
        //         console.log("error: ", error);
        //     }
        // }
    }

    async function verifyCard(card) {
        setPreloader(true)

        const data = {
            account: card,
            service: network.id,
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
                // handleError(status, message);
            })
            .catch(error => {
                setPreloader(false)
                console.log('error', error)
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

    function input(inp) {
        setPhone(inp)
        if (inp.length == 10) {
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
                    <View style={styles.header}>
                        <Text style={styles.text1}>TV</Text>
                    </View>


                    <View style={{}}>
                        <Image source={require('../../assets/cashback.png')} style={{ width: '100%', height: 70, marginBottom: 10, borderRadius: 8 }} />
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
                                <Text>{network.name}</Text>
                            </View>
                            <FontAwesomeIcon icon={faCaretDown} color='grey' />
                        </TouchableOpacity>
                    </View>



                    {/* Top Up */}
                    <View style={{ backgroundColor: '#f1f1f5', padding: 18, borderRadius: 8, marginTop: 18, flex: 1 }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ color: 'grey' }}>Smartcard Number</Text>
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
                            <Text style={{ color: 'grey' }}>Subscription Period</Text>
                            <View style={{ backgroundColor: '#d3d1de', width: 105, borderRadius: 10, marginTop: 8 }}>
                                <View style={{ backgroundColor: '#d3d1de', padding: 0, alignItems: 'center', width: 105, marginTop: 8 }}>
                                    <Text style={{ marginTop: 8, color: '#08080e', }}>30 Day</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-betwee' }}>
                                    <View style={{ backgroundColor: '#5d5593', padding: 3, borderTopLeftRadius: 0, borderBottomLeftRadius: 10, }}>
                                        <FontAwesomeIcon icon={faCheck} size={15} color='#d3d1de' />
                                    </View>
                                </View>

                            </View>
                        </View>

                        <View style={{ borderRadius: 8, marginTop: 15, flex: 1 }}>
                            <Text style={{ padding: 0, marginLeft: 0, color: 'grey', fontSize: 16, }}>Package</Text>
                            <FlatList data={variation}
                                style={{ flex: 1 }}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity disabled={!card.verified} onPress={() => { setService({ amount: item.variation_amount, name: item.name, variation_code: item.variation_code }); closeModal2(); }}
                                            style={{ flexDirection: "row", alignItems: 'center', justifyContent: "space-between", backgroundColor: '#dcdcdc7e', padding: 15, borderRadius: 8, marginTop: 5, paddingVertical: 10, flex: 1, opacity: card.verified ? 1 : 0.4 }}>
                                            <View style={{ flex: 1 }}>
                                                <Text style={{ fontSize: 14, color: '#343434', fontWeight: "bold" }}>{item.name}</Text>
                                                <Text style={{ fontSize: 13, color: '#1f8805', marginTop: 5 }}>{symbol("ngn")}{item.variation_amount}</Text>
                                            </View>
                                            <TouchableOpacity disabled={!card.verified}
                                                onPress={() => { setService({ amount: item.variation_amount, name: item.name, variation_code: item.variation_code }); closeModal2(); }}
                                                style={[styles.getStarted, { borderRadius: 50, padding: 5, paddingHorizontal: 15, marginTop: 0 }]}>
                                                <Text style={{ fontSize: 12, color: "white" }}>Buy</Text>
                                            </TouchableOpacity>
                                        </TouchableOpacity>
                                    )
                                }} key={({ item }) => { item.id }} />
                        </View>

                    </View>
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
                        <View style={{ backgroundColor: "#eeeff4", height: 400, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
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

                                <View style={{ padding: 10, }}>
                                    <FlatList data={networkList}
                                        // style={{ flex: 1 }}
                                        renderItem={({ item }) => {
                                            return (
                                                <TouchableOpacity onPress={() => { setNetwork(item); closeModal(); fetchVariation(item.id) }}
                                                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#cacad5', padding: 5, borderRadius: 8, marginBottom: 15 }}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                        <Image source={{ uri: item.image }} style={{ width: 40, height: 40, borderRadius: 100, marginRight: 8 }} />
                                                        <Text>{item.name}</Text>
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
                            <ScrollView>
                                <View style={{ padding: 10 }}>
                                    <View>
                                        <Text style={{ color: '#787A8D', margin: 10, fontWeight: "bold" }}>Confirm Details</Text>


                                        <View style={{ padding: 10 }}>
                                            <View style={{ padding: 10, }}>
                                                <View style={{ alignItems: 'center', marginBottom: 15 }}>
                                                    <Text>₦<Text style={{ fontSize: 25, fontWeight: 'bold' }}>{service.amount}</Text></Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                                    <Text style={{ color: "#727272" }}>Product</Text>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Image source={{ uri: network.image }} style={{ width: 30, height: 30, borderRadius: 100, marginRight: 5 }} />
                                                        <Text style={{ color: "#727272" }}>{network.name}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                                    <Text style={{ color: "#727272" }}>Package</Text>
                                                    <Text style={{ color: "#727272" }}>{service.name}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                                    <Text style={{ color: "#727272" }}>Amount</Text>
                                                    <Text style={{ color: "#727272" }}>₦{service.amount}</Text>
                                                </View>
                                                {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                                    <Text style={{ color: "#727272" }}>Bonus</Text>
                                                    <Text style={{ color: "#309900" }}>₦ Cashback</Text>
                                                </View> */}
                                            </View>
                                            <View style={styles.register}>
                                                <TouchableOpacity onPress={() => { closeModal2(); pinModal(); }} style={styles.getStarted}>
                                                    <Text style={{ fontSize: 16,color:"white" }}>Continue</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                    </View>
                                </View>
                            </ScrollView>

                        </View>
                    </View>
                </Modal>

                <PinTransactionModal visibility={pinModalVisibility} onClose={pinModal} onVerify={() => { pinModal(); buyTVSub() }} />
            </View>
        </AppSafeAreaView>
    )
}
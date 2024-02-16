import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, ImageBackground, Pressable, TextInput, Alert } from "react-native";
import { styles } from "../styles/aboutus";
import { Checkbox } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowCircleDown, faArrowLeft, faUserCheck, faXmark, } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import { Modal } from "react-native";
import { faCcMastercard, faCcVisa } from "@fortawesome/free-brands-svg-icons";
import { baseURL } from "../../config";
import { AppContext } from "../../globals/AppContext";
import { handleError } from "../components/HandleRequestError";
import { symbol } from "../components/currencySymbols";

export function DollarCards({ navigation }) {
    const { setPreloader, token, userInfo, getUserCards, getAccountInfo } = useContext(AppContext);
    const [checkedMaster, setCheckedMaster] = useState(false);
    const [checkedVisa, setCheckedVisa] = useState(false);
    const [card, setCard] = useState("");
    const [rate, setRate] = useState(0);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [amount, setAmount] = useState(0);
    const [convertionAmount, setConvertionAmount] = useState(0);


    const closeModal = () => {
        setModalVisibility(!modalVisibility);
    };

    async function createCard() {
        setPreloader(true)
        const data = {
            brand: card,
            amount: String(amount),
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

        fetch(baseURL + "/api/cards/virtual", requestOptions)
            .then(response => response.json())
            .then(result => {
                const { data, status, message } = result
                // console.log(message);
                setPreloader(false)
                if (status == "success") {
                    getUserCards()
                    getAccountInfo()
                    navigation.navigate('MyDollarCard')
                }
                handleError(status, message);
            })
            .catch(error => {
                setPreloader(false)
                console.log('error', error)
                Alert.alert("Error!", error.message)
            });
    }

    function converter(amt) {
        const result = (3 + amt) * rate
        setAmount(3 + amt)
        setConvertionAmount(result)
        return result
    }

    function getRate() {
        setPreloader(true)
        const requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: {
                authorization: `bearer ${token}`
            }
        };

        fetch(baseURL + "/api/cards/exchange-rate", requestOptions)
            .then(response => response.json())
            .then(result => {
                const { data, status, message } = result
                console.log(result);
                setPreloader(false)
                if (status == "success") {
                    setRate(data.rate)
                    setConvertionAmount(data.rate * 3)
                }
                handleError(status, message);
            })
            .catch(error => {
                setPreloader(false)
                console.log('error', error)
            });
    }

    function bvnCheckBeforeCreatingCard() {
        if (userInfo.bvn_verified == 0) {
            Alert.alert(
                "Unverified BVN",
                "You need to verify your BVN to create a card.",
                [{ text: "Verify BVN", onPress: () => navigation.navigate("BvnVerify") }]
            )
        } else {
            createCard()
        }
    }

    useEffect(() => {
        // setPreloader(false)
        getRate()
    }, []);

    return (
        <View style={styles.container}>

            <ScrollView>
                <View style={styles.body}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            color='#7B61FF'
                            size={25}
                            style={{ margin: 8 }}
                        />
                    </TouchableOpacity>
                    <View style={{ marginHorizontal: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => { setCheckedMaster(true); setCheckedVisa(false); setCard("MasterCard") }}
                                style={{ alignItems: 'center' }}>
                                <Image source={require('../../assets/cardG.png')} style={{ width: 170, height: 250, marginTop: 9 }} />
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#261964' }}>Master Card</Text>
                                    <Checkbox status={checkedMaster ? 'checked' : 'unchecked'}
                                        color='#7B61FF'
                                        uncheckedColor='gray'
                                    />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { setCheckedVisa(true); setCheckedMaster(false); setCard("Visa") }}
                                style={{ alignItems: 'center' }}>
                                <Image source={require('../../assets/cardN.png')} style={{ width: 190, height: 255, }} />
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#261964' }}>Visa Card</Text>
                                    <Checkbox status={checkedVisa ? 'checked' : 'unchecked'}
                                        color='#7B61FF'
                                        uncheckedColor='gray'
                                    />
                                </View>
                            </TouchableOpacity>


                        </View>

                        <View style={{ alignItems: 'center', backgroundColor: '#eceaf5', padding: 15, margin: 10, borderRadius: 8 }}>
                            <View>
                                <Text style={{ fontSize: 15, color: '#261964', fontWeight: 'bold', marginBottom: 3 }}>HagmusPay Card</Text>
                                <View style={{ borderBottomColor: '#b7aed3', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 15 }} />
                            </View>


                            <Text style={{ fontSize: 13.5, color: '#261964' }}>
                                With HagmusPay dollar card, you can receive international payments and also make international payments on numerous platforms like Aliexpress, Alibaba, ASOS, Facebook, Netflix, Prime, Google, DigitalOcean, AWS, and many more </Text>
                        </View>

                        <View style={{ margin: 8 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ backgroundColor: '#eceaf5', padding: 8, marginRight: 10, borderRadius: 100 }}>
                                        <FontAwesomeIcon icon={faCreditCard} size={20} color="#422dab" />
                                    </View>
                                    <Text style={{ fontSize: 15, color: '#261964', }}>Card Creation</Text>
                                </View>
                                <Text style={{ fontSize: 16, color: '#261964', fontWeight: 'bold', }}>$2</Text>
                            </View>
                        </View>

                        <View style={{ margin: 8 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ backgroundColor: '#eceaf5', padding: 8, marginRight: 10, borderRadius: 100 }}>
                                        <FontAwesomeIcon icon={faArrowCircleDown} size={20} color="#422dab" />
                                    </View>
                                    <Text style={{ fontSize: 15, color: '#261964', }}>Deposit Fee</Text>
                                </View>
                                <Text style={{ fontSize: 16, color: '#261964', fontWeight: 'bold', }}>2%</Text>
                            </View>
                        </View>


                        <View style={{ margin: 8 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ backgroundColor: '#eceaf5', padding: 8, marginRight: 10, borderRadius: 100 }}>
                                        <FontAwesomeIcon icon={faUserCheck} size={20} color="#422dab" />
                                    </View>
                                    <Text style={{ fontSize: 15, color: '#261964', }}>BVN Required</Text>
                                </View>
                                <Text style={{ fontSize: 16, color: userInfo.bvn_verified == 0 ? "#ff0000" : '#261964', fontWeight: 'bold', }}>{userInfo.bvn_verified == 0 ? "Unverified" : "Verified"}</Text>
                            </View>
                        </View>


                        <TouchableOpacity disabled={card != "" ? false : true}
                            onPress={closeModal}
                            style={{ backgroundColor: card != "" ? '#7B61FF' : '#0f0b1f42', padding: 10, margin: 8, borderRadius: 8, alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 15 }}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* ==============  Modal ============== */}
            <Modal
                visible={modalVisibility}
                animationType="slide"
                transparent={true}
            >
                <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
                    <Pressable style={{ flex: 1 }} onPress={closeModal} >
                    </Pressable>
                    <View style={{ backgroundColor: "#fcfbff", height: 400, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                        <View style={{ alignItems: 'flex-end', margin: 10 }}>
                            <TouchableOpacity onPress={closeModal}>
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    size={24}
                                    color='#7B61FF'
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={{ margin: 8 }}>
                            <TextInput
                                keyboardType="numeric"
                                style={{ borderWidth: 1, padding: 8, margin: 5, borderRadius: 8, borderColor: '#7B61FF', marginBottom: 10 }}
                                selectionColor={'grey'}
                                placeholderTextColor='#787A8D'
                                onChangeText={(inp) => converter(Number(inp))}
                                placeholder='Amount'
                                mode='outlined'
                            />
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ backgroundColor: '#eceaf5', padding: 8, marginRight: 10, borderRadius: 100 }}>
                                        <FontAwesomeIcon icon={card == "MasterCard" ? faCcMastercard : faCcVisa} size={20} color="#422dab" />
                                    </View>
                                    <Text style={{ fontSize: 15, color: '#261964', }}>Card Type</Text>
                                </View>
                                <Text style={{ fontSize: 15, color: '#261964', fontWeight: 'bold', }}>{card}</Text>
                            </View>
                        </View>
                        <View style={{ margin: 8 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ backgroundColor: '#eceaf5', padding: 8, marginRight: 10, borderRadius: 100 }}>
                                        <FontAwesomeIcon icon={faCreditCard} size={20} color="#422dab" />
                                    </View>
                                    <Text style={{ fontSize: 15, color: '#261964', }}>Card Creation Amount</Text>
                                </View>
                                <Text style={{ fontSize: 15, color: '#261964', fontWeight: 'bold', }}>$3</Text>
                            </View>
                        </View>

                        <View style={{ backgroundColor: '#eceaf5', padding: 15, margin: 10, borderRadius: 8 }}>
                            <Text style={{ fontSize: 13.5, color: '#261964' }}>
                                {symbol("usdt")}1 = {symbol("ngn") + rate} </Text>
                            <Text style={{ fontSize: 13.5, color: '#261964' }}>
                                {symbol("ngn")}{convertionAmount} will be deducted from you main wallet when creating this card
                            </Text>
                        </View>

                        <View style={{ marginTop: 20, }}>
                            <TouchableOpacity
                                onPress={() => { closeModal(); bvnCheckBeforeCreatingCard() }}
                                style={{ backgroundColor: '#7B61FF', padding: 10, margin: 8, borderRadius: 8, alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 15 }}>Create</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        </View>
    )
}
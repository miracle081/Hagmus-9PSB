import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, ImageBackground, FlatList, TextInput, Pressable, Alert } from "react-native";
import { styles } from "../../styles/aboutus";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight, faArrowLeft, faCircleExclamation, faCirclePlus, faGlobe, faRotate, faTag, faTags, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../globals/AppContext";
import { Modal } from "react-native";
import { symbol } from "../../components/currencySymbols";
import { baseURL } from "../../../config";
import { formatMoney } from "../../components/FormatMoney";
import { handleError } from "../../components/HandleRequestError";

export function FundDollarCard({ navigation }) {
    const { cardId, userInfo, setCardId, setPreloader, token, } = useContext(AppContext);
    const [modalVisibility, setModalVisibility] = useState(false)
    const [cardInfo, setCardInfo] = useState({ card_balance: { currentBalance: 0, availableBalance: 0 }, })
    const [amount, setAmount] = useState(0);
    const [rate, setRate] = useState(0);
    const [convertionAmount, setConvertionAmount] = useState(0);

    const closeModal = () => {
        setModalVisibility(!modalVisibility);
    };

    function getCardInfo() {
        setPreloader(true)
        const requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: {
                authorization: `bearer ${token}`
            }
        };

        fetch(baseURL + "/api/cards/" + cardId, requestOptions)
            .then(response => response.json())
            .then(result => {
                const { data, status, message } = result
                setPreloader(false)
                // console.log(result);
                if (status == "success") {
                    setCardInfo(data)
                    setPreloader(false)
                }
                handleError(status, message);
            })
            .catch(error => {
                setPreloader(false)
                console.log('error', error)
            });
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
                // console.log(result);
                if (status == "success") {
                    setRate(data.rate)
                    setPreloader(false)
                }
                handleError(status, message);
            })
            .catch(error => {
                setPreloader(false)
                console.log('error', error)
            });
    }

    useEffect(() => {
        // setPreloader(false)
        getRate()
        getCardInfo();
    }, []);

    function converter(amt) {
        const result = (amt) * rate
        const percent = result * (0.018)
        setAmount(amt)
        setConvertionAmount(result + percent)
        return result
    }

    function fundCard() {
        setPreloader(true)
        const data = {
            card_id: cardId,
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

        fetch(baseURL + "/api/cards/fund", requestOptions)
            .then(response => response.json())
            .then(response => {
                const { data, status, message } = response;
                // console.log(response);
                setPreloader(false)
                if (status == "success") {
                    getCardInfo()
                    navigation.navigate("Successful", {
                        name: "",
                        amount: symbol("usdt") + formatMoney(amount),
                        message: `Your card has been funded successfuly`,
                        screen: "ViewCard"
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


    return (
        <View style={styles.container}>

            <ImageBackground
                source={require('../../../assets/888.png')} // Replace with the path to your image
                style={{ height: 100 }}
            >
                {/* Other components can be placed inside ImageBackground */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            color='#7B61FF'
                            size={25}
                            style={{ marginTop: 47, marginLeft: 10 }}
                        />
                    </TouchableOpacity>

                    <View>
                        <Text style={{ marginTop: 47, marginLeft: '43%', fontSize: 20 }}>Fund Card</Text>
                    </View>
                </View>

                <TouchableOpacity style={{
                    flexDirection: 'row', marginTop: 18, alignItems: 'center',
                    justifyContent: 'flex-end', marginRight: 15,
                }}>
                    <View style={{ marginRight: 3, borderRadius: 100 }}>
                        <FontAwesomeIcon icon={faCircleExclamation} color="#15075e" />
                    </View>
                    <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#15075e', }}>
                        Learn more</Text>
                </TouchableOpacity>


            </ImageBackground>

            <ScrollView>
                <View style={styles.body}>



                    <View style={{ marginTop: 15 }}>
                        <View
                            style={{
                                padding: 3, margin: 0, borderWidth: 2, borderColor: '#7B61FF',
                                borderRadius: 10, marginBottom: 10
                            }}>
                            <Text style={{ color: '#7B61FF', fontSize: 13, marginLeft: 8 }}>Enter Funding Amount</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <Text style={{ fontSize: 17, marginLeft: 8 }}>$</Text>
                                <TextInput
                                    style={{ width: "98%", padding: 2, fontSize: 18, }}
                                    selectionColor={'#7B61FF'}
                                    keyboardType='numeric'
                                    onChangeText={(inp) => { converter(Number(inp)) }}
                                />
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 18, alignItems: 'center' }}>
                            <View style={{ backgroundColor: '#d1caf8', padding: 5, marginRight: 10, borderRadius: 100 }}>
                                <FontAwesomeIcon icon={faRotate} color="#15075e" />
                            </View>
                            <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#15075e', letterSpacing: 0.5 }}>
                                Conversion Rate : $1 = {symbol("ngn") + formatMoney(rate)}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 18, alignItems: 'center', marginBottom: 10 }}>
                            <View style={{ backgroundColor: '#d1caf8', padding: 5, marginRight: 10, borderRadius: 100 }}>
                                <FontAwesomeIcon icon={faTag} color="#15075e" />
                            </View>
                            <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#15075e', letterSpacing: 0.5 }}>
                                Funding fee : 1.8% </Text>
                        </View>

                        <View style={{ padding: 15, backgroundColor: '#d1caf8', marginTop: 18, borderRadius: 10, marginBottom: 10 }}>
                            <Text style={{ marginBottom: 3, fontSize: 13, color: '#15075e' }}>Amount to be debited form your account</Text>
                            <Text style={{ marginBottom: 3, fontSize: 18, color: '#15075e', fontWeight: 'bold', letterSpacing: 0.5 }}>
                                {symbol("ngn")}{formatMoney(convertionAmount)}</Text>
                        </View>

                        <View style={{ alignItems: 'center', marginTop: 15 }}>
                            <Text style={{ fontSize: 12 }}>Funding fee is 1.8%  of the amount you are funding</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={closeModal}
                        style={{ backgroundColor: "#7B61FF", padding: 10, marginHorizontal: 10, marginTop: 30, borderRadius: 8 }}>
                        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Continue</Text>
                    </TouchableOpacity>

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
                    <View style={{ backgroundColor: "#fcfbff", borderTopRightRadius: 20, borderTopLeftRadius: 20, paddingBottom: 30, height: 400 }}>
                        <View style={{ alignItems: 'center', margin: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ marginLeft: '35%' }}>
                                <Text style={{ color: '#302856', fontWeight: 'bold', fontSize: 16 }}>Confirm Details</Text>
                            </View>
                            <TouchableOpacity onPress={closeModal}>
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    size={24}
                                    color='#7B61FF'
                                />
                            </TouchableOpacity>
                        </View>


                        <View style={{ alignItems: 'center', marginBottom: 20 }}>
                            <Text style={{ color: '#302856', fontSize: 12, marginBottom: 5 }}>You are Funding your Card with</Text>
                            <Text style={{ color: '#302856', fontSize: 25, fontWeight: 'bold' }}>${formatMoney(amount)}</Text>
                        </View>

                        <View style={{ padding: 15 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                                <Text style={{ fontSize: 15, color: '#302856' }}>Card Holder</Text>
                                <Text style={{ fontSize: 16, color: '#302856', fontWeight: 'bold', textTransform: 'uppercase' }}>{userInfo.first_name} {userInfo.last_name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 }}>
                                <Text style={{ fontSize: 15, color: '#302856' }}>Card Number</Text>
                                <Text style={{ fontSize: 16, color: '#302856', fontWeight: 'bold' }}>{cardInfo.card_number}</Text>
                            </View>
                        </View>

                        <View style={{ backgroundColor: '#eceaf5', padding: 15, margin: 10, borderRadius: 8 }}>
                            {/* <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:15}}>
                            <Text style={{fontSize:15}}>Rate</Text>
                            <Text style={{ fontSize: 15.5, color: '#261964',}}>
                                {symbol("usdt")}1= {symbol("ngn") + formatMoney(rate)} </Text>
                         </View> */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 15 }}>Total Amount</Text>
                                <Text style={{ fontSize: 15.5, color: '#261964', fontWeight: "bold" }}>
                                    {symbol("ngn")}{formatMoney(convertionAmount)} </Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 20, }}>
                            <TouchableOpacity onPress={() => { closeModal(); fundCard() }}
                                style={{ backgroundColor: '#7B61FF', padding: 10, margin: 8, borderRadius: 8, alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 15 }}>Fund</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        </View>
    )
}
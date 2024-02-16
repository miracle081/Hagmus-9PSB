import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, ImageBackground, Pressable, TextInput, StatusBar, Platform, SafeAreaView, FlatList } from "react-native";
import { styles } from "../../styles/aboutus";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faCircleArrowDown, faCirclePlus, faCreditCard, faCreditCardAlt, faEllipsis, faSquareArrowUpRight, faXmark, } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-native";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../globals/AppContext";
import { baseURL } from "../../../config";
import { formatMoney } from "../../components/FormatMoney";
import { handleError } from "../../components/HandleRequestError";
import { symbol } from "../../components/currencySymbols";
import { dateTime } from "../../components/DateTime";

export function ViewCard({ navigation }) {
    const { cardId, setPreloader, token } = useContext(AppContext);
    const [modalVisibility, setModalVisibility] = useState(false)
    const [modalVisibility2, setModalVisibility2] = useState(false)
    const [cardInfo, setCardInfo] = useState({ card_balance: { currentBalance: 0, availableBalance: 0 }, })
    const [amount, setAmount] = useState(0);
    const [rate, setRate] = useState(0);
    const [history, setHistory] = useState([]);
    const [convertionAmount, setConvertionAmount] = useState(0);


    const closeModal = () => {
        setModalVisibility(!modalVisibility);
    };
    const closeModal2 = () => {
        setModalVisibility2(!modalVisibility2);
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
                    setRate(data.sell)
                    setPreloader(false)
                }
                handleError(status, message);
            })
            .catch(error => {
                setPreloader(false)
                console.log('error', error)
            });
    }

    function getHistory() {
        setPreloader(true)
        const requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: {
                authorization: `bearer ${token}`
            }
        };

        fetch(`${baseURL}/api/cards/${cardId}/transactions`, requestOptions)
            .then(response => response.json())
            .then(result => {
                const { data, status, message } = result
                if (status == "success") {
                    setHistory(data)
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
        getHistory()
        getRate()
        getCardInfo();
    }, []);

    function converter(amt) {
        const result = (amt) * rate
        setAmount(amt)
        setConvertionAmount(result)
        return result
    }

    function withdrawCard() {
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

        fetch(baseURL + "/api/cards/withdraw", requestOptions)
            .then(response => response.json())
            .then(response => {
                const { data, status, message } = response;
                // console.log(response);
                setPreloader(false)
                if (status == "success") {
                    getCardInfo()
                    getHistory()
                    navigation.navigate("Successful", {
                        name: "",
                        amount: symbol("usdt") + formatMoney(amount),
                        message: `${symbol("usdt") + formatMoney(amount)} withdrawal successfully`,
                        screen: "ViewCard"
                    })
                }
                handleError(status, message);
            })
            .catch(error => { setPreloader(false); console.log('error', error) });
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={[styles.container, { marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : null }]}>
                <View style={{
                    flexDirection: 'row', alignItems: 'center', alignItems: 'center',
                    justifyContent: 'space-between', marginBottom: 10, padding: 5
                }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            color='#7B61FF'
                            size={25}
                            style={{ marginTop: 0, marginLeft: 10 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('CardSettings')}
                        style={{ marginRight: 10 }}>
                        <FontAwesomeIcon icon={faEllipsis} color="#7B61FF" size={30} />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={[styles.body, { backgroundColor: '#fcfbff' }]}>


                        <View style={{ alignItems: 'center', marginBottom: 18 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#302856' }}>CURRENT BALANCE</Text>
                            <Text style={{ fontSize: 29, fontWeight: 'bold', color: '#302856' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#302856' }}>$ </Text>{formatMoney(cardInfo.card_balance.availableBalance)}</Text>
                        </View>


                        <TouchableOpacity onPress={() => navigation.navigate("CardDetails")} style={{ alignItems: 'center', marginBottom: 20 }}>
                            <Image source={require('../../../assets/card2.png')} style={{ width: '75%', height: 170 }} />
                            <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#2b14a1' }}>Show card details</Text>
                        </TouchableOpacity>

                        {/* =================dollar card history==================== */}

                        <View style={{ marginHorizontal: 18, marginTop: 20 }}>
                            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#2b14a1', marginBottom: 18 }}>Transactions</Text>
                                <Text>View All</Text>
                            </TouchableOpacity>
                            {history.length > 0 ?
                                history.map(item => {
                                    console.log(item);
                                    return (
                                        <>
                                            <View key={item.internal_reference} style={{ flexDirection: 'row', gap: 5, justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, flex: 1 }}>
                                                <View style={{ flexDirection: 'row', flex: 1, }}>
                                                    <FontAwesomeIcon icon={item.type == "credit" ? faCircleArrowDown : faSquareArrowUpRight} color={item.type == "credit" ? "#016f19" : "#bb0802"} size={28} />
                                                    <View style={{ marginLeft: 10, flex: 1 }}>
                                                        <Text style={{ color: '#0202029f', fontWeight: 'bold', fontSize: 15, }} numberOfLines={1}>{item.narration}</Text>
                                                        <Text style={{ color: "gray", fontSize: 13, marginTop: 4 }}>{dateTime(item.created_at)}</Text>
                                                    </View>
                                                </View>
                                                <Text style={{ color: item.type == "credit" ? "#016f19" : "#bb0802", }}>{item.type == "credit" ? "+" : "-"} ${item.amount}</Text>
                                            </View>
                                            <View style={{ borderBottomColor: '#ddd9ef', borderBottomWidth: StyleSheet.hairlineWidth, margin: 10, }} />
                                        </>
                                    )
                                }) :
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: "center",
                                        alignItems: 'center',
                                        opacity: 0.5,
                                        zIndex: -1,
                                    }}>
                                    <FontAwesomeIcon icon={faCreditCard} color="gray" size={120} />
                                    <Text style={{ fontSize: 16, marginTop: 20, color: 'gray' }}>No History yet</Text>
                                </View>
                            }
                        </View>
                    </View>
                </ScrollView>

                <View style={{
                    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 15,
                }}>

                    <TouchableOpacity
                        onPress={closeModal}
                        style={{
                            backgroundColor: '#7B61FF', padding: 15, borderRadius: 8, marginBottom: 18,
                            alignItems: 'center', width: '40%'
                        }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Withdraw</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('FundDollarCard')}
                        style={{
                            backgroundColor: '#7B61FF', padding: 15, borderRadius: 8, marginBottom: 18,
                            alignItems: 'center', width: '40%'
                        }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Fund Card</Text>
                    </TouchableOpacity>
                </View>
                {/* ============== Withdrawal Modal ============== */}
                <Modal
                    visible={modalVisibility}
                    animationType="slide"
                    transparent={true}
                >
                    <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
                        <Pressable style={{ flex: 1 }} onPress={closeModal} >
                        </Pressable>
                        <View style={{ backgroundColor: "#fcfbff", borderTopRightRadius: 20, borderTopLeftRadius: 20, paddingBottom: 30 }}>
                            <View style={{ alignItems: 'flex-end', margin: 10 }}>
                                <TouchableOpacity onPress={closeModal}>
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        size={24}
                                        color='#7B61FF'
                                    />
                                </TouchableOpacity>
                            </View>

                            <View>
                                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                                    <Text style={{ color: '#302856', fontSize: 18, fontWeight: 'bold' }}>Card Withdrawal</Text>
                                    <Text style={{ color: '#302856', fontSize: 12, marginBottom: 8 }}>Amount will be withdrawn to your naira account</Text>
                                    <Text style={{ color: '#302856', fontSize: 23, fontWeight: 'bold' }}>{symbol("ngn")}{formatMoney(convertionAmount)}</Text>
                                </View>
                                <TextInput
                                    keyboardType="numeric"
                                    style={{ borderWidth: 1, padding: 8, margin: 5, borderRadius: 8, borderColor: '#7B61FF' }}
                                    selectionColor={'grey'}
                                    placeholderTextColor='#787A8D'
                                    placeholder='Enter Dollar Amount'
                                    mode='outlined'
                                    onChangeText={(inp) => { converter(Number(inp)) }}
                                />
                            </View>

                            <View style={{ backgroundColor: '#eceaf5', padding: 15, margin: 18, borderRadius: 8 }}>
                                <Text style={{ fontSize: 13.5, color: '#261964' }}>
                                    {symbol("usdt")}1 = {symbol("ngn") + formatMoney(rate)} </Text>
                                {/* <Text style={{ fontSize: 13.5, color: '#261964' }}>
                                {symbol("ngn")}{formatMoney(convertionAmount)} will be deducted from you main wallet when creating this card
                            </Text> */}
                            </View>

                            <View style={{ marginTop: 20, }}>
                                <TouchableOpacity onPress={() => { closeModal(); withdrawCard() }}
                                    style={{ backgroundColor: '#7B61FF', padding: 10, margin: 8, borderRadius: 8, alignItems: 'center' }}>
                                    <Text style={{ color: 'white', fontSize: 15 }}>Withdraw</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </Modal>
                {/* ==============Action  Modal ============== */}
                <Modal
                    visible={modalVisibility2}
                    animationType="slide"
                    transparent={true}
                >
                    <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
                        <Pressable style={{ flex: 1 }} onPress={closeModal2} >
                        </Pressable>
                        <View style={{ backgroundColor: "#fcfbff", borderTopRightRadius: 20, borderTopLeftRadius: 20, paddingBottom: 30, height: 600 }}>
                            <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}>
                                <TouchableOpacity onPress={closeModal2}>
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        size={30}
                                        color='#7B61FF'
                                    />
                                </TouchableOpacity>
                                <View style={{ marginLeft: '25%' }}>
                                    <Text style={{ color: '#302856', fontSize: 21, fontWeight: 'bold' }}>Card Settings</Text>
                                </View>
                            </View>

                            <View style={{ padding: 15 }}>
                                <TouchableOpacity style={{ padding: 10 }}>
                                    <Text style={{ color: '#302856', fontSize: 17, fontWeight: 'bold' }}>Delete card</Text>
                                    <Text style={{ color: '#302856', fontSize: 12, marginBottom: 8 }}>Delete your card and transfer the money to your wallet.
                                        Deleted Cards will not incur decline cost.
                                    </Text>
                                </TouchableOpacity>
                                <View style={{ borderBottomColor: '#ddd9ef', borderBottomWidth: StyleSheet.hairlineWidth, marginHorizontal: 10, marginBottom: 20 }} />

                                <TouchableOpacity style={{ padding: 10 }}>
                                    <Text style={{ color: '#302856', fontSize: 17, fontWeight: 'bold' }}>Freeze card</Text>
                                    <Text style={{ color: '#302856', fontSize: 12, marginBottom: 8 }}>When your card is frozen, all attempted transactions will be rejected.
                                        Decline fees will still apply to frozen cards.
                                    </Text>
                                </TouchableOpacity>
                                <View style={{ borderBottomColor: '#ddd9ef', borderBottomWidth: StyleSheet.hairlineWidth, marginHorizontal: 10, marginBottom: 20 }} />

                                <TouchableOpacity style={{ padding: 10 }}>
                                    <Text style={{ color: '#302856', fontSize: 17, fontWeight: 'bold' }}>Decline fees</Text>
                                    <Text style={{ color: '#302856', fontSize: 12, marginBottom: 8 }}>Learn about decline fees and the reason
                                    </Text>
                                </TouchableOpacity>
                                <View style={{ borderBottomColor: '#ddd9ef', borderBottomWidth: StyleSheet.hairlineWidth, marginHorizontal: 10, marginBottom: 20 }} />

                                <TouchableOpacity style={{ padding: 10 }}>
                                    <Text style={{ color: '#302856', fontSize: 17, fontWeight: 'bold' }}>Crad Statements</Text>
                                    <Text style={{ color: '#302856', fontSize: 12, marginBottom: 8 }}>When your card is frozen, all attempted transactions will be rejected.
                                        Decline fees will still apply to frozen cards.
                                    </Text>
                                </TouchableOpacity>
                                <View style={{ borderBottomColor: '#ddd9ef', borderBottomWidth: StyleSheet.hairlineWidth, marginHorizontal: 10, marginBottom: 20 }} />


                            </View>
                        </View>
                    </View>
                </Modal>

            </View>
        </SafeAreaView>
    )
}
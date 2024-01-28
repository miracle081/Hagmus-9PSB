import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, ImageBackground, Pressable, TextInput } from "react-native";
import { styles } from "../../styles/aboutus";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faCircleArrowDown, faCirclePlus, faCopy, faCreditCard, faCreditCardAlt, faEllipsis, faEye, faSquareArrowUpRight, faXmark, } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-native";
import { useContext, useEffect, useState } from "react";
import { baseURL } from "../../../config";
import { AppContext } from "../../../globals/AppContext";
import { handleError } from "../../components/HandleRequestError";
import { PinTransactionModal } from "../../components/PinModal";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";

export function CardDetails({ navigation }) {
    const { cardId, userInfo, setPreloader, token, pin, setPin } = useContext(AppContext);
    const [modalVisibility, setModalVisibility] = useState(false)
    const [cardInfo, setCardInfo] = useState({ billing_address: { line1: "", city: "", state: "", country: "", postalCode: "" } })
    const [click, setClick] = useState(false)

    const [pinModalVisibility, setPinMetModalVisibility] = useState(false);
    const pinModal = () => {
        setPinMetModalVisibility(!pinModalVisibility);
    };

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


    useEffect(() => {
        // setPreloader(false)
        getCardInfo();
    }, []);

    function revealCard() {
        setPreloader(true)
        const data = {
            card_id: cardId,
            pin: pin,
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

        fetch(baseURL + "/api/cards/secure-data", requestOptions)
            .then(response => response.json())
            .then(response => {
                const { data, status, message } = response;
                // console.log(response);
                setPreloader(false)
                if (status == "success") {
                    setClick(true)
                    setCardInfo({ ...cardInfo, card_number: data.pan, card_cvv: data.cvv })
                }
                handleError(status, message);
            })
            .catch(error => {
                setPreloader(false)
                console.log('error', error)
            });
    }


    return (
        <View style={styles.container}>

            <View style={[styles.body, { backgroundColor: '#fcfbff' }]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        color='#7B61FF'
                        size={25}
                        style={{ marginTop: 0, marginLeft: 10 }}
                    />
                </TouchableOpacity>

                <View style={{ alignItems: 'center', marginBottom: 18, flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#302856', marginRight: 10 }}>CARD DETAILS</Text>
                    <TouchableOpacity onPress={pinModal}>
                        <FontAwesomeIcon icon={click ? faEye : faEyeSlash} size={23} color="#302856" />
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ marginBottom: 20 }}>

                    <View style={{ alignItems: 'center', backgroundColor: '#eceaf5', padding: 15, margin: 10, borderRadius: 8 }}>
                        <Text style={{ fontSize: 13.5, color: '#261964' }}>
                            Please keep in mind that in order to avoid denied transactions, you must maintain a minimum balance of $1.
                        </Text>
                    </View>

                    {/* =================dollar card history==================== */}

                    <View>
                        <View style={{ marginHorizontal: 18, marginTop: 20 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ color: '#302856', fontSize: 14, }}>Card Number</Text>
                                    <Text style={{ color: '#302856', fontSize: 17, marginTop: 4, fontWeight: 'bold' }}>{cardInfo.card_number}</Text>
                                </View>
                                <FontAwesomeIcon icon={faCopy} />
                            </View>
                            <View style={{ borderBottomColor: '#cdc7eb', borderBottomWidth: StyleSheet.hairlineWidth, margin: 14, }} />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ color: '#302856', fontSize: 14, }}>Card Holder Name</Text>
                                    <Text style={{ color: '#302856', fontSize: 17, marginTop: 4, fontWeight: 'bold' }}>{userInfo.first_name} {userInfo.last_name}</Text>
                                </View>
                                <FontAwesomeIcon icon={faCopy} />
                            </View>
                            <View style={{ borderBottomColor: '#cdc7eb', borderBottomWidth: StyleSheet.hairlineWidth, margin: 14, }} />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ color: '#302856', fontSize: 14, }}>CVV</Text>
                                    <Text style={{ color: '#302856', fontSize: 17, marginTop: 4, fontWeight: 'bold' }}>{cardInfo.card_cvv}</Text>
                                </View>
                                <FontAwesomeIcon icon={faCopy} />
                            </View>
                            <View style={{ borderBottomColor: '#cdc7eb', borderBottomWidth: StyleSheet.hairlineWidth, margin: 14, }} />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ color: '#302856', fontSize: 14, }}>Expiry Date</Text>
                                    <Text style={{ color: '#302856', fontSize: 17, marginTop: 4, fontWeight: 'bold' }}>{cardInfo.card_expiry}</Text>
                                </View>
                                <FontAwesomeIcon icon={faCopy} />
                            </View>
                            <View style={{ borderBottomColor: '#cdc7eb', borderBottomWidth: StyleSheet.hairlineWidth, margin: 14, }} />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ color: '#302856', fontSize: 14, }}>Billing Address</Text>
                                    <Text style={{ color: '#302856', fontSize: 17, marginTop: 4, fontWeight: 'bold' }}>{cardInfo.billing_address.line1 || "-"}</Text>
                                </View>
                                <FontAwesomeIcon icon={faCopy} />
                            </View>
                            <View style={{ borderBottomColor: '#cdc7eb', borderBottomWidth: StyleSheet.hairlineWidth, margin: 14, }} />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ color: '#302856', fontSize: 14, }}>City</Text>
                                    <Text style={{ color: '#302856', fontSize: 17, marginTop: 4, fontWeight: 'bold' }}>{cardInfo.billing_address.city || "-"}</Text>
                                </View>
                                <FontAwesomeIcon icon={faCopy} />
                            </View>
                            <View style={{ borderBottomColor: '#cdc7eb', borderBottomWidth: StyleSheet.hairlineWidth, margin: 14, }} />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ color: '#302856', fontSize: 14, }}>State</Text>
                                    <Text style={{ color: '#302856', fontSize: 17, marginTop: 4, fontWeight: 'bold' }}>{cardInfo.billing_address.state || "-"}</Text>
                                </View>
                                <FontAwesomeIcon icon={faCopy} />
                            </View>
                            <View style={{ borderBottomColor: '#cdc7eb', borderBottomWidth: StyleSheet.hairlineWidth, margin: 14, }} />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ color: '#302856', fontSize: 14, }}>Country</Text>
                                    <Text style={{ color: '#302856', fontSize: 17, marginTop: 4, fontWeight: 'bold' }}>{cardInfo.billing_address.country || "-"}</Text>
                                </View>
                                <FontAwesomeIcon icon={faCopy} />
                            </View>
                            <View style={{ borderBottomColor: '#cdc7eb', borderBottomWidth: StyleSheet.hairlineWidth, margin: 14, }} />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ color: '#302856', fontSize: 14, }}>Postal Code</Text>
                                    <Text style={{ color: '#302856', fontSize: 17, marginTop: 4, fontWeight: 'bold' }}>{cardInfo.billing_address.postalCode || "-"}</Text>
                                </View>
                                <FontAwesomeIcon icon={faCopy} />
                            </View>
                            <View style={{ borderBottomColor: '#cdc7eb', borderBottomWidth: StyleSheet.hairlineWidth, margin: 14, }} />

                        </View>
                    </View>

                </ScrollView>
            </View>

            <PinTransactionModal visibility={pinModalVisibility} onClose={pinModal} onVerify={() => { pinModal(); revealCard() }} />


            {/* ==============  Modal ============== */}
            <Modal
                visible={modalVisibility}
                animationType="slide"
                transparent={true}
            >
                <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
                    <Pressable style={{ flex: 1 }} onPress={closeModal} >
                    </Pressable>
                    <View style={{ backgroundColor: "#fcfbff", height: 580, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
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
                                <Text style={{ color: '#302856' }}>Fund card directly from wallet balance</Text>
                            </View>
                            <TextInput
                                keyboardType="numeric"
                                style={{ borderWidth: 1, padding: 8, margin: 5, borderRadius: 8, borderColor: '#7B61FF' }}
                                selectionColor={'grey'}
                                placeholderTextColor='#787A8D'
                                placeholder='Amount'
                                mode='outlined'
                            />
                        </View>


                        <View style={{ marginTop: 20, }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('MyDollarCard')}
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
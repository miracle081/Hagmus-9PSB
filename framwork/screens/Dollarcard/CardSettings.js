import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, ImageBackground, Pressable, TextInput, StatusBar, Platform, SafeAreaView } from "react-native";
import { styles } from "../../styles/aboutus";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faCircleArrowDown, faCirclePlus, faCreditCard, faCreditCardAlt, faEllipsis, faSquareArrowUpRight, faTriangleExclamation, faXmark, } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-native";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../globals/AppContext";
import { baseURL } from "../../../config";
import { formatMoney } from "../../components/FormatMoney";
import { handleError } from "../../components/HandleRequestError";
import { symbol } from "../../components/currencySymbols";
import { ToastApp } from "../../components/Toast";

export function CardSettings({ navigation }) {
    const { cardId, userCards, setPreloader, token, getUserCards } = useContext(AppContext);
    const [modalVisibility, setModalVisibility] = useState(false)
    const [cardInfo, setCardInfo] = useState({ card_balance: { currentBalance: 0, availableBalance: 0 }, })
    const [amount, setAmount] = useState(0);
    const [rate, setRate] = useState(0);
    const [convertionAmount, setConvertionAmount] = useState(0);


    const closeModal = () => {
        setModalVisibility(!modalVisibility);
    };

    useEffect(() => {
        const cinfo = userCards.find(all => all.id == cardId)
        // console.log(cinfo);
        setCardInfo(cinfo)
    }, [])


    function deleteCard() {
        setPreloader(true)
        const requestOptions = {
            method: 'PUT',
            redirect: 'follow',
            headers: {
                authorization: `bearer ${token}`
            }
        };

        fetch(`${baseURL}/api/cards/${cardId}/terminate`, requestOptions)
            .then(response => response.json())
            .then(result => {
                const { data, status, message } = result
                // console.log(result);
                setPreloader(false)
                if (status == "success") {
                    ToastApp("Your card has been successfully deleted.", "LONG")
                    getUserCards()
                    navigation.navigate("MyDollarCard");
                }
                handleError(status, message);
            })
            .catch(error => {
                setPreloader(false)
                console.log('error', error)
            });
    }

    function freezeCard() {
        setPreloader(true)
        const requestOptions = {
            method: 'PUT',
            redirect: 'follow',
            headers: {
                authorization: `bearer ${token}`
            }
        };

        fetch(`${baseURL}/api/cards/${cardId}/block`, requestOptions)
            .then(response => response.json())
            .then(result => {
                const { data, status, message } = result
                // console.log(result);
                setPreloader(false)
                if (status == "success") {
                    ToastApp("Your card has been successfully frozen.", "LONG")
                    getUserCards()
                    navigation.goBack();
                }
                handleError(status, message);
            })
            .catch(error => {
                setPreloader(false)
                console.log('error', error)
            });
    }

    function unfreezeCard() {
        setPreloader(true)
        const requestOptions = {
            method: 'PUT',
            redirect: 'follow',
            headers: {
                authorization: `bearer ${token}`
            }
        };

        fetch(`${baseURL}/api/cards/${cardId}/unblock`, requestOptions)
            .then(response => response.json())
            .then(result => {
                const { status, message } = result
                // console.log(result);
                setPreloader(false)
                if (status == "success") {
                    ToastApp("Your card has been successfully unfrozen.", "LONG")
                    getUserCards()
                    navigation.goBack();
                }
                handleError(status, message);
            })
            .catch(error => {
                setPreloader(false)
                console.log('error', error)
            });
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>

                <ScrollView>
                    <View style={[styles.body, { backgroundColor: '#fcfbff' }]}>
                        <View style={{
                            flexDirection: 'row', alignItems: 'center', alignItems: 'center',
                            marginBottom: 10, padding: 5
                        }}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <FontAwesomeIcon
                                    icon={faArrowLeft}
                                    color='#7B61FF'
                                    size={25}
                                    style={{ marginTop: 0, marginLeft: 10 }}
                                />
                            </TouchableOpacity>

                            <View style={{ marginLeft: '25%' }}>
                                <Text style={{ color: '#302856', fontSize: 21, fontWeight: 'bold' }}>Card Settings</Text>
                            </View>
                        </View>
                        <View style={{ padding: 10 }}>
                            {cardInfo.card_status != "canceled" ? <>
                                <TouchableOpacity
                                    onPress={closeModal}
                                    style={{ padding: 10 }}>
                                    <Text style={{ color: '#302856', fontSize: 17, fontWeight: 'bold' }}>Delete card</Text>
                                    <Text style={{ color: '#302856', fontSize: 12, marginBottom: 8 }}>Delete your card and transfer the money to your wallet.
                                        Deleted Cards will not incur decline cost.
                                    </Text>
                                </TouchableOpacity>
                                <View style={{ borderBottomColor: '#ddd9ef', borderBottomWidth: StyleSheet.hairlineWidth, marginHorizontal: 10, marginBottom: 20 }} />
                            </> : null}
                            {cardInfo.card_status == "active" ? <>
                                <TouchableOpacity onPress={freezeCard} style={{ padding: 10 }}>
                                    <Text style={{ color: '#302856', fontSize: 17, fontWeight: 'bold' }}>Freeze card</Text>
                                    <Text style={{ color: '#302856', fontSize: 12, marginBottom: 8 }}>When your card is frozen, all attempted transactions will be rejected.
                                        Decline fees will still apply to frozen cards.
                                    </Text>
                                </TouchableOpacity>
                                <View style={{ borderBottomColor: '#ddd9ef', borderBottomWidth: StyleSheet.hairlineWidth, marginHorizontal: 10, marginBottom: 20 }} />
                            </> : null}
                            {cardInfo.card_status == "inactive" ? <>
                                <TouchableOpacity onPress={unfreezeCard} style={{ padding: 10 }}>
                                    <Text style={{ color: '#302856', fontSize: 17, fontWeight: 'bold' }}>Unfreeze card</Text>
                                    <Text style={{ color: '#302856', fontSize: 12, marginBottom: 8 }}>When your card is frozen, all attempted transactions will be rejected.
                                        Decline fees will still apply to frozen cards.
                                    </Text>
                                </TouchableOpacity>
                                <View style={{ borderBottomColor: '#ddd9ef', borderBottomWidth: StyleSheet.hairlineWidth, marginHorizontal: 10, marginBottom: 20 }} />
                            </> : null}
                            <TouchableOpacity style={{ padding: 10 }}>
                                <Text style={{ color: '#302856', fontSize: 17, fontWeight: 'bold' }}>Decline fees</Text>
                                <Text style={{ color: '#302856', fontSize: 12, marginBottom: 8 }}>Learn about decline fees and the reason
                                </Text>
                            </TouchableOpacity>
                            <View style={{ borderBottomColor: '#ddd9ef', borderBottomWidth: StyleSheet.hairlineWidth, marginHorizontal: 10, marginBottom: 20 }} />

                            <TouchableOpacity style={{ padding: 10 }}>
                                <Text style={{ color: '#302856', fontSize: 17, fontWeight: 'bold' }}>Card Statements</Text>
                                <Text style={{ color: '#302856', fontSize: 12, marginBottom: 8 }}>Generate and download monthly card statement.
                                </Text>
                            </TouchableOpacity>
                            <View style={{ borderBottomColor: '#ddd9ef', borderBottomWidth: StyleSheet.hairlineWidth, marginHorizontal: 10, marginBottom: 20 }} />


                        </View>

                    </View>
                </ScrollView>

                {/* ============== Delete Modal ============== */}
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
                                    <Text style={{ color: '#302856', fontSize: 18, fontWeight: 'bold' }}>Delete USD card</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', margin: 15 }}>
                                        <FontAwesomeIcon icon={faTriangleExclamation} size={30} color="#de4040" />
                                        <Text style={{ color: '#302856', fontSize: 12, marginLeft: 10 }}>The card will be permanently removed,
                                            {"\n"} and there is no way to reverse this action.
                                        </Text>
                                    </View>
                                    <Text style={{ color: '#302856', fontSize: 12, marginLeft: 10 }}>Please note that in creating a new card,
                                        you will pay for card creation fee
                                    </Text>
                                </View>

                            </View>



                            <View style={{ marginTop: 20, }}>
                                <TouchableOpacity onPress={() => { closeModal(); deleteCard() }}
                                    style={{ backgroundColor: '#de4040', padding: 10, margin: 8, borderRadius: 8, alignItems: 'center' }}>
                                    <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Delete Card</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </Modal>


            </View>
        </SafeAreaView>
    )
}
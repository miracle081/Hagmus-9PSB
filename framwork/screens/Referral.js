import { Dimensions, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { useEffect, useState } from 'react'
import { styles } from '../styles/earn'
import { faAngleRight, faArrowLeft, faArrowRight, faGift, faGifts, faMobileScreenButton, faMoneyBill, faPhone, faPhoneAlt, faUsers, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import { AppContext } from '../../globals/AppContext'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { ToastApp } from '../components/Toast'
import Carousel from 'react-native-reanimated-carousel'
import { formatMoney } from '../components/FormatMoney'
import { baseURL } from '../../config'
import { symbol } from '../components/currencySymbols'
import { handleError } from '../components/HandleRequestError'

export function Referral({ navigation }) {
    const { setPreloader, userInfo, carouselLinks, accountInfo, getAccountInfo, token } = useContext(AppContext);
    const [modalVisibility, setModalVisibility] = useState(false)
    const [amount, setAmount] = useState(0)
    const [account, setAccount] = useState(0)
    const screenWidth = Dimensions.get('screen').width;

    const closeModal = () => {
        setModalVisibility(!modalVisibility);
    };

    // useEffect(() => {
    //     setPreloader(false)
    // }, [])

    function redeemEarn() {
        setPreloader(true)
        const data = {
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
        fetch(baseURL + "/api/account/withdraw-cashback", requestOptions)
            .then(response => response.json())
            .then(response => {
                const { data, status, message } = response;
                // console.log(response);
                setPreloader(false)
                if (status == "success") {
                    navigation.navigate("Successful", {
                        name: "",
                        amount: `${symbol("ngn")}${amount}`,
                        message: `${amount} has been redeemed to your main balance`,
                        screen: "Referral"
                    })
                }
                handleError(status, message);
                getAccountInfo();
            })
            .catch(error => {
                setPreloader(false)
                console.log('error', error)
            });
    }

    // function redeemReferral() {
    //     setPreloader(true)
    //     const data = {
    //         amount: String(amount),
    //     };
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             authorization: `bearer ${token}`
    //         },
    //         body: JSON.stringify(data),
    //         redirect: 'follow'
    //     };
    //     fetch(baseURL + "/api/account/withdraw-referral-bonus", requestOptions)
    //         .then(response => response.json())
    //         .then(response => {
    //             const { data, status, message } = response;
    //             // console.log(response);
    //             setPreloader(false)
    //             if (status == "success") {
    //                 navigation.navigate("Successful", {
    //                     name: "",
    //                     amount: `${symbol("ngn")}${amount}`,
    //                     message: `${amount} has been redeemed to your main balance`,
    //                     screen: "Referral"
    //                 })
    //             }
    //             handleError(status, message);
    //             getAccountInfo();
    //         })
    //         .catch(error => {
    //             setPreloader(false)
    //             console.log('error', error)
    //         });
    // }

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.5}>
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        size={18}
                        color='#787A8D'
                        style={{ margin: 10 }}
                    />
                </TouchableOpacity>
                <ScrollView>
                    <View style={[styles.balance, { paddingVertical: 20 }]}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                            <Text style={{ fontSize: 17, color: '#ffffffa8', marginRight: 10 }}>Total Balance</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("CashbackHistory")} style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={{ fontSize: 12, color: '#ffffffa8', }}>Cashback History</Text>
                                <FontAwesomeIcon icon={faAngleRight} color='#d5d7e7' size={11} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', marginRight: 10 }}>₦{formatMoney(Number(accountInfo.cashback_balance + accountInfo.referral_bonus))}</Text>
                            <TouchableOpacity onPress={closeModal}
                                style={{ backgroundColor: '#f0f0f3', padding: 5, borderRadius: 100, width: "25%", height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                {/* <FontAwesomeIcon icon={faArrowRight} color='#7B61FF' /> */}
                                <Text style={{ fontSize: 13, alignItems: 'center', fontWeight: 'bold', marginLeft: 5, color: '#7B61FF' }}>Redeem</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ backgroundColor: "#f6f5f9" }}>

                        <View style={styles.EarnAssets}>

                            <View style={styles.action}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <FontAwesomeIcon
                                            icon={faUsers}
                                            size={18}
                                            color='#7B61FF'
                                        />
                                        <Text style={{ color: '#2b2c36', fontSize: 15, marginLeft: 5 }}>Referral Bonus</Text>
                                    </View>
                                    <Text style={{ color: '#2b2c36', fontSize: 15, marginLeft: 5, fontWeight: 'bold' }}>₦ 0.00</Text>
                                </View>
                            </View>


                            <TouchableOpacity onPress={() => { setAccount(); closeModal(); }}
                                style={styles.action}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <FontAwesomeIcon
                                            icon={faMoneyBill}
                                            size={18}
                                            color='#7B61FF'
                                        />
                                        <Text style={{ color: '#2b2c36', fontSize: 15, marginLeft: 5 }}>Cashback</Text>
                                    </View>
                                    {/* <Text style={{ color: 'white', fontSize: 15, marginLeft: 5, fontWeight: 'bold' }}>${Number(userInfo.hagmusTask).toFixed(2)}</Text> */}
                                    <Text style={{ color: '#2b2c36', fontSize: 15, marginLeft: 5, fontWeight: 'bold' }}>₦{formatMoney(Number(accountInfo.cashback_balance))}</Text>
                                </View>
                            </TouchableOpacity>
                            <View>
                                <Image source={require('../../assets/banner.png')} style={{ width: '100%', height: 140 }} />
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>Daily Bonus</Text>
                            </View>

                            <TouchableOpacity onPress={() => navigation.navigate('Airtime')}
                                style={styles.action}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ backgroundColor: '#f7f6f9', padding: 8, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                                            <FontAwesomeIcon
                                                icon={faMobileScreenButton}
                                                size={22}
                                                color='#7B61FF'
                                            />
                                        </View>
                                        <View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ color: '#2b2c36', fontSize: 15, marginLeft: 8, fontWeight: 'bold' }}>MTN Airtime</Text>
                                                <Image source={require('../../assets/nr.png')} style={{ width: 18, height: 18 }} />
                                            </View>
                                            <Text style={{ color: '#2b2c36', fontSize: 10, marginLeft: 8, }}>Buy Airtime and get up to <Text style={{ color: '#6a51e9', fontWeight: 'bold', }}>3%</Text>{'\n'}cashback</Text>
                                        </View>
                                    </View>
                                    {/* <Text style={{ color: 'white', fontSize: 15, marginLeft: 5, fontWeight: 'bold' }}>${Number(userInfo.hagmusTask).toFixed(2)}</Text> */}
                                    <View style={{
                                        backgroundColor: '#7B61FF', padding: 8, borderRadius: 9, width: '18%'
                                        , height: 33, alignItems: 'center',
                                    }}>
                                        <Text style={{ fontWeight: 'bold', color: 'white' }}>GO</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate('Airtime')}
                                style={styles.action}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ backgroundColor: '#f7f6f9', padding: 8, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                                            <FontAwesomeIcon
                                                icon={faMobileScreenButton}
                                                size={22}
                                                color='#7B61FF'
                                            />
                                        </View>
                                        <View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ color: '#2b2c36', fontSize: 15, marginLeft: 8, fontWeight: 'bold' }}>GLO Airtime</Text>
                                                <Image source={require('../../assets/nr.png')} style={{ width: 18, height: 18 }} />
                                            </View>
                                            <Text style={{ color: '#2b2c36', fontSize: 10, marginLeft: 8, }}>Buy Airtime and get up to <Text style={{ color: '#6a51e9', fontWeight: 'bold', }}>3%</Text>{'\n'}cashback</Text>
                                        </View>
                                    </View>
                                    {/* <Text style={{ color: 'white', fontSize: 15, marginLeft: 5, fontWeight: 'bold' }}>${Number(userInfo.hagmusTask).toFixed(2)}</Text> */}
                                    <View style={{
                                        backgroundColor: '#7B61FF', padding: 8, borderRadius: 9, width: '18%'
                                        , height: 33, alignItems: 'center',
                                    }}>
                                        <Text style={{ fontWeight: 'bold', color: 'white' }}>GO</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate('Airtime')}
                                style={styles.action}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ backgroundColor: '#f7f6f9', padding: 8, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                                            <FontAwesomeIcon
                                                icon={faMobileScreenButton}
                                                size={22}
                                                color='#7B61FF'
                                            />
                                        </View>
                                        <View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ color: '#2b2c36', fontSize: 15, marginLeft: 8, fontWeight: 'bold' }}>9MOBILE Airtime</Text>
                                                <Image source={require('../../assets/nr.png')} style={{ width: 18, height: 18 }} />
                                            </View>
                                            <Text style={{ color: '#2b2c36', fontSize: 10, marginLeft: 8, }}>Buy Airtime and get up to <Text style={{ color: '#6a51e9', fontWeight: 'bold', }}>3%</Text>{'\n'}cashback</Text>
                                        </View>
                                    </View>
                                    {/* <Text style={{ color: 'white', fontSize: 15, marginLeft: 5, fontWeight: 'bold' }}>${Number(userInfo.hagmusTask).toFixed(2)}</Text> */}
                                    <View style={{
                                        backgroundColor: '#7B61FF', padding: 8, borderRadius: 9, width: '18%'
                                        , height: 33, alignItems: 'center',
                                    }}>
                                        <Text style={{ fontWeight: 'bold', color: 'white' }}>GO</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate('Airtime')}
                                style={styles.action}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ backgroundColor: '#f7f6f9', padding: 8, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                                            <FontAwesomeIcon
                                                icon={faMobileScreenButton}
                                                size={22}
                                                color='#7B61FF'
                                            />
                                        </View>
                                        <View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ color: '#2b2c36', fontSize: 15, marginLeft: 8, fontWeight: 'bold' }}>AIRTEL Airtime</Text>
                                                <Image source={require('../../assets/nr.png')} style={{ width: 18, height: 18 }} />
                                            </View>
                                            <Text style={{ color: '#2b2c36', fontSize: 10, marginLeft: 8, }}>Buy Airtime and get up to <Text style={{ color: '#6a51e9', fontWeight: 'bold', }}>3%</Text>{'\n'}cashback</Text>
                                        </View>
                                    </View>
                                    {/* <Text style={{ color: 'white', fontSize: 15, marginLeft: 5, fontWeight: 'bold' }}>${Number(userInfo.hagmusTask).toFixed(2)}</Text> */}
                                    <View style={{
                                        backgroundColor: '#7B61FF', padding: 8, borderRadius: 9, width: '18%'
                                        , height: 33, alignItems: 'center',
                                    }}>
                                        <Text style={{ fontWeight: 'bold', color: 'white' }}>GO</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            <View style={{ flex: 1, marginVertical: 15, }}>
                                <Carousel
                                    loop
                                    width={screenWidth}
                                    height={150}
                                    autoPlay={true}
                                    data={carouselLinks}
                                    scrollAnimationDuration={2000}
                                    renderItem={({ index }) => (
                                        <View
                                            style={{ marginTop: 5, }}
                                        >
                                            <Image
                                                style={{
                                                    width: '90%',
                                                    height: 150,
                                                    borderRadius: 10,
                                                }}
                                                source={carouselLinks[index]} />
                                        </View>
                                    )}
                                />
                            </View>

                        </View>

                    </View>
                </ScrollView>

            </View>

            {/* ============== Redeem Modal ============== */}
            <Modal
                visible={modalVisibility}
                animationType="slide"
                transparent={true}
            >
                <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
                    <Pressable style={{ flex: 1 }} onPress={closeModal} >
                    </Pressable>
                    <View style={{ backgroundColor: "#fcfbff", height: 250, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                        <View style={{ alignItems: 'flex-end', margin: 10 }}>
                            <TouchableOpacity onPress={closeModal}>
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    size={24}
                                    color='#7B61FF'
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginTop: 20, }}>
                            {/* <View style={{alignItems:'center'}}>
                            <Text style={{ color: '#17122f', margin: 10, fontWeight: "bold" }}>Redeem {symbol("ngn") + accountInfo.cashback_balance} to Funding</Text>
                                </View> */}
                            <TextInput
                                style={[styles.inputStyle, { marginBottom: 20 }]}
                                selectionColor={'grey'}
                                mode='outlined'
                                placeholderTextColor='#787A8D'
                                onChangeText={(text) => setAmount(Number(text.trim()))}
                                keyboardType='number-pad'
                                placeholder='Enter Amount'
                            />

                            <TouchableOpacity onPress={() => { closeModal(); redeemEarn() }}
                                style={styles.getStart}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Redeem ₦{formatMoney(amount)}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        </View>
    )
}
// import * as React from 'react';
import { useContext, useState, useCallback } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, Modal, Pressable, StyleSheet, FlatList, KeyboardAvoidingView, ScrollView } from "react-native";
import { AppContext } from '../../globals/AppContext';
import { AppSafeAreaView } from "../components/AppSafeAreaView";
import { styles } from "../styles/username";
import { faChevronLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { doc, getDoc, onSnapshot, } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { useFocusEffect } from '@react-navigation/native';
import { baseURL } from '../../config';
import { handleError } from '../components/HandleRequestError';


export function UserAddress({ navigation }) {
    const { setPreloader, setToken, setUserInfo, account } = useContext(AppContext);
    const [countries, setCountries] = useState([{ country: "Nigeria", flag: require("../../assets/ngnflag.png"), currency: "ngn" }]);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState({ country: "", currency: "", flag: "" });
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [postal_code, setPostal_code] = useState('');
    const [address, setAddress] = useState('');

    // useFocusEffect(
    //     useCallback(() => {
    //         setPreloader(true)
    //         getDoc(doc(db, "admin", "countryAPI")).then(rDocs => {
    //             const info = rDocs.data().countries
    //             setCountries(info);
    //             setPreloader(false)
    //         })
    //     }, [])
    // );

    const closeModal = () => setModalVisibility(!modalVisibility);

    function btnVali() {
        const condition = state == "" || city == "" || postal_code == "" || address == "" || selectedCountry.country == "";
        return condition
    }

    function reauthenticate() {
        const data = {
            email: account.email,
            password: account.password,
        };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            redirect: 'follow'
        };
        fetch(`${baseURL}/login`, requestOptions)
            .then(response => response.json())
            .then(result => {
                const { status, message, data } = result
                setPreloader(false)
                if (status == "success") {
                    // console.log(data);
                    setUserInfo(data.user)
                    setToken(data.token)
                    navigation.reset({ index: 0, routes: [{ name: "HomePage", }] })
                }
                handleError(status, message);
            })
            .catch(error => {
                console.log('error', error)
                setPreloader(false)
            });
    }

    function createAccount() {
        setPreloader(true)
        const formdata = {
            first_name: account.first_name,
            last_name: account.last_name,
            name: account.name,
            email: account.email,
            phone: account.phone,
            username: account.username,
            dob: account.dob,
            city,
            state,
            address,
            postal_code,
            country: selectedCountry.country,
            password: account.password,
            refferal_code: account.refferal_code
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formdata),
            redirect: 'follow'
        };
        fetch(`${baseURL}/register`, requestOptions)
            .then(response => response.json())
            .then(result => {
                const { status, message, data } = result
                // console.log(result);
                if (status == "success") {
                    reauthenticate()
                }
                handleError(status, message);
            })
            .catch(error => {
                console.log('error', error)
                setPreloader(false)
            });
    }

    return (
        <AppSafeAreaView>
            <View style={styles.container}>
                <View style={styles.body}>
                    <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={() => navigation.goBack()}>
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            size={25}
                            color='grey'
                        />
                    </TouchableOpacity>
                    <View style={styles.header}>
                        <View style={styles.stepIndicator}>
                            <View style={[styles.indicator, { backgroundColor: "#7B61FF" }]} ></View>
                            <View style={[styles.indicator, { backgroundColor: "#7B61FF" }]} ></View>
                            <View style={[styles.indicator, { backgroundColor: "#7B61FF" }]} ></View>
                            <View style={[styles.indicator, { backgroundColor: "#7B61FF" }]} ></View>
                        </View>
                        <Text style={styles.text1}>Step 4/4</Text>
                    </View>
                    <ScrollView>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            style={{ flex: 1 }}
                        >
                            <View style={styles.formContainer}>
                                <Text style={styles.signupText}>City</Text>
                                <TextInput
                                    style={[styles.inputStyle, { marginBottom: 10 }]}
                                    selectionColor={'grey'}
                                    mode='outlined'
                                    placeholderTextColor='#787A8D'
                                    onChangeText={(text) => setCity(text.trim())}
                                    autoCapitalize='words'
                                    autoCorrect={true}
                                />

                                <Text style={styles.signupText}>State</Text>
                                <TextInput
                                    style={[styles.inputStyle, { marginBottom: 10 }]}
                                    selectionColor={'grey'}
                                    mode='outlined'
                                    placeholderTextColor='#787A8D'
                                    onChangeText={(text) => setState(text.trim())}
                                    autoCapitalize='words'
                                    autoCorrect={true}
                                />

                                <Text style={styles.signupText}>Postal Code</Text>
                                <TextInput
                                    style={[styles.inputStyle, { marginBottom: 20 }]}
                                    selectionColor={'grey'}
                                    mode='outlined'
                                    placeholderTextColor='#787A8D'
                                    onChangeText={(text) => setPostal_code(text.trim())}
                                    keyboardType='number-pad'
                                />
                                <Text style={styles.signupText}>Country</Text>
                                <TouchableOpacity activeOpacity={0.5} onPress={closeModal} >
                                    <View style={styles.country}>
                                        {
                                            selectedCountry.country == "" ?
                                                <>
                                                    <Image source={require('../../assets/globe.png')}
                                                        style={{ width: 25, height: 25, marginRight: 10, borderRadius: 100 }} />
                                                    <Text style={{ color: '#787A8D' }}>Select your country</Text>
                                                </> :
                                                <>
                                                    <Image source={selectedCountry.flag}
                                                        style={{ width: 25, height: 25, marginRight: 10, borderRadius: 100 }} />
                                                    <Text style={{ color: '#141125' }}>{selectedCountry.country}</Text>
                                                </>
                                        }
                                    </View>
                                </TouchableOpacity>

                                <Text style={styles.signupText}>Address</Text>
                                <TextInput
                                    style={[styles.inputStyle, { marginBottom: 0 }]}
                                    selectionColor={'grey'}
                                    placeholder='Enter your address'
                                    mode='outlined'
                                    placeholderTextColor='#787A8D'
                                    onChangeText={(text) => setAddress(text.trim())}
                                />

                                <View>
                                    <TouchableOpacity disabled={btnVali()}
                                        onPress={createAccount}
                                        style={[styles.getStarted, { opacity: btnVali() ? 0.5 : 1 }]}>
                                        <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, color: "white" }}>Proceed</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>

                <Modal
                    visible={modalVisibility}
                    animationType="slide"
                    transparent={true}
                >
                    <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
                        <Pressable style={{ flex: 1 }} onPress={closeModal} >
                        </Pressable>
                        <View style={{ backgroundColor: "#fcfbff", borderTopRightRadius: 20, borderTopLeftRadius: 20, height: 150 }}>
                            <View style={{ alignItems: 'flex-end', margin: 10 }}>
                                <TouchableOpacity onPress={closeModal}>
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        size={24}
                                        color='#7B61FF'
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginLeft: 5 }}>
                                {/* <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Change default Currency</Text> */}
                            </View>
                            <View>
                                <FlatList data={countries} renderItem={({ item }) => {
                                    return (
                                        <>
                                            <TouchableOpacity onPress={() => { setSelectedCountry({ country: item.country, currency: item.currency, flag: item.flag }), closeModal() }}>
                                                <View style={{ margin: 10, padding: 5, flexDirection: 'row', alignItems: 'center' }}>
                                                    <Image source={item.flag} style={{ width: 35, height: 35, borderRadius: 100, marginRight: 5 }} />
                                                    <View>
                                                        <Text style={{ color: '#141125', fontSize: 15, fontWeight: 'bold', marginLeft: 5 }}>{item.country}</Text>
                                                        <Text style={{ fontSize: 12, color: '#141125', marginLeft: 5 }}>{item.currency.toUpperCase()}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                            <View style={{ borderBottomColor: '#baadfe', borderBottomWidth: StyleSheet.hairlineWidth, margin: 10 }} />
                                        </>
                                    )
                                }} key={({ item }) => { item.id }} />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </AppSafeAreaView>
    )
}
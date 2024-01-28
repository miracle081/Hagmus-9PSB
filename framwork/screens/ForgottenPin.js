import { useContext, useEffect, useState, useCallback } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, Image, ScrollView, } from "react-native";
import { AppSafeAreaView } from "../components/AppSafeAreaView";
import { styles } from "../styles/setpin";
import { Kurale_400Regular } from "@expo-google-fonts/kurale";
import { useFonts } from 'expo-font';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faStarOfLife } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { authentication, db } from '../../firebase/firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { AppContext } from '../../globals/AppContext';
import { Mailer } from '../components/Mailer';
import { baseURL } from '../../config';
import { handleError } from '../components/HandleRequestError';


export function ForgottenPin({ navigation }) {
    const { token, setPreloader, } = useContext(AppContext);
    const [pin, setPin] = useState("");
    const [otp, setOTP] = useState("");
    const [confirm_pin, setConfirm_pin] = useState("");

    // useEffect(() => {
    //   setPreloader(false)
    // }, [])

    function SetTracPin() {
        setPreloader(true)
        const data = {
            otp,
            new_pin: pin,
            confirm_pin
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
        fetch(baseURL + "/api/reset-pin", requestOptions)
            .then(response => response.json())
            .then(response => {
                const { data, status, message } = response;
                // console.log(response);
                setPreloader(false)
                setPreloader(false)
                if (status == "success") {
                    Alert.alert(
                        "Set Pin!",
                        "Pin has been created successfully",
                        [{ text: "Ok", onPress: () => navigation.goBack() }]
                    )
                }
                handleError(status, message);
            })
            .catch(error => {
                console.log(error)
                setPreloader(false)
            });
    }

    function getOTP() {
        setPreloader(true)
        const requestOptions = {
            method: 'POST',
            headers: {
                authorization: `bearer ${token}`
            },
            redirect: 'follow'
        };

        fetch(baseURL + "/api/forgot-pin", requestOptions)
            .then(response => response.json())
            .then(response => {
                const { status, message } = response;
                // console.log(response);
                setPreloader(false)
                if (status == "success") {
                    Alert.alert(
                        'Success',
                        message,
                    )
                }
                handleError(status, message);
            })
            .catch(error => {
                setPreloader(false)
                console.log('error', error)
            });
    }

    return (
        <AppSafeAreaView>
            <View style={styles.container}>
                <View style={styles.body}>
                    <ScrollView>
                        <View style={{ alignItems: 'center', marginTop: 30 }}>
                            <Image source={require('../../assets/changepin.png')} style={{ width: '70%', height: 200 }} />
                        </View>
                        <View style={{ alignItems: 'center', marginTop: 30, marginBottom: 15 }}>
                            <Text style={[styles.text1, { fontSize: 25 }]}>Change Transaction Pin</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <View style={styles.formContainer}>
                                <View style={{ flexDirection: "row", gap: 5, alignItems: "center", flex: 1, marginBottom: 15 }}>
                                    <TextInput
                                        style={[styles.inputStyle, { flex: 1, marginBottom: 0 }]}
                                        keyboardType='number-pad'
                                        placeholder='Enter OPT'
                                        selectionColor={'grey'}
                                        onChangeText={text => setOTP(text.trim())}
                                        mode='outlined'
                                    />
                                    <TouchableOpacity onPress={getOTP} style={[styles.getStarted, { marginTop: 0 }]}>
                                        <Text style={{ fontSize: 16, color: "white" }}>Get OPT</Text>
                                    </TouchableOpacity>
                                </View>
                                <TextInput
                                    style={styles.inputStyle}
                                    keyboardType='number-pad'
                                    placeholder='New Pin'
                                    selectionColor={'grey'}
                                    onChangeText={text => setPin(text.trim())}
                                    secureTextEntry
                                    mode='outlined'
                                    />
                                <TextInput
                                    style={styles.inputStyle}
                                    secureTextEntry
                                    keyboardType='number-pad'
                                    placeholder='Confirm New Pin'
                                    selectionColor={'grey'}
                                    onChangeText={text => setConfirm_pin(text.trim())}
                                    mode='outlined'
                                />


                                <View style={styles.register}>
                                    <TouchableOpacity onPress={SetTracPin} style={styles.getStarted}>
                                        <Text style={{ fontSize: 16, color: "white" }}>Set Pin</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View >
        </AppSafeAreaView >
    )
}
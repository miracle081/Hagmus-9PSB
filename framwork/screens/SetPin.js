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


export function SetPin({ navigation }) {
    const { token, setPreloader, getUserInfo } = useContext(AppContext);
    const [pin, setPin] = useState("");
    const [confirm_pin, setConfirm_pin] = useState("");

    // useEffect(() => {
    //   setPreloader(false)
    // }, [])


    function SetTracPin() {
        setPreloader(true)
        const data = {
            pin,
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
        fetch(baseURL + "/api/set-pin", requestOptions)
            .then(response => response.json())
            .then(response => {
                const { status, message } = response;
                // console.log(response);
                setPreloader(false)
                if (status == "success") {
                    getUserInfo()
                    Alert.alert(
                        "Set Pin!",
                        message,
                        [{ text: "Ok", onPress: () => navigation.goBack() }]
                    )
                }
                handleError(status, message);
            })
            .catch(error => {
                setPreloader(false)
                console.log('error', error)
                if (error.message == "JSON Parse error: Unexpected character: <") Alert.alert("Error!", "Network error, please try again");
                    else Alert.alert("Error!", error.message)
            });
    }

    return (
        <AppSafeAreaView>
            <View style={styles.container}>
                <View style={styles.body}>
                    <ScrollView>
                        <View style={{ alignItems: 'center', marginTop: 30 }}>
                            <Image source={require('../../assets/setcode.png')} style={{ width: '70%', height: 200 }} />
                        </View>

                        <View style={{ alignItems: 'center', marginTop: 30, marginBottom: 15 }}>

                            <Text style={[styles.text1, { fontSize: 25 }]}>Set Transaction Pin</Text>
                        </View>
                        {/* <View style={{ marginBottom: 10, paddingHorizontal: 10, marginTop: 20 }}>
                         <Text style={{ color: '#787A8D', }}>Set a pin that used to validate all your transactions </Text>
                     </View> */}

                        <View style={{}}>
                            <View style={styles.formContainer}>
                                <TextInput
                                    style={styles.inputStyle}
                                    keyboardType='number-pad'
                                    placeholder='New Pin'
                                    selectionColor={'grey'}
                                    onChangeText={text => setPin(text.trim())}
                                    mode='outlined'
                                    secureTextEntry
                                />
                                <TextInput
                                    secureTextEntry
                                    style={styles.inputStyle}
                                    keyboardType='number-pad'
                                    placeholder='Confirm Pin'
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
            </View>
        </AppSafeAreaView>
    )
}
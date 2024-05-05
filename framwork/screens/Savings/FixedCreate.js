import { faCalendarAlt, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Text, TouchableOpacity, TextInput, Pressable, Modal, ScrollView, StyleSheet, Alert, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { styles } from "../../styles/fixedcreate";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../globals/AppContext";
import { addDoc, collection, doc, onSnapshot, query, runTransaction, updateDoc, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import DateTimePicker from '@react-native-community/datetimepicker';
import { ToastApp } from "../../components/Toast";
import { dateTime, generateRef, getFutureTimestamp } from "../../components/DateTime";
import moment from "moment";
import { Checkbox } from "react-native-paper";
import { symbol } from "../../components/currencySymbols";
import { AppSafeAreaView } from "../../components/AppSafeAreaView";
import { handleError } from "../../components/HandleRequestError";
import { baseURL } from "../../../config";


const options = [
    // { days: 30, label: '1 month', pa: 1.7 },
    { days: 60, label: '2 months', pa: 3 },
    { days: 90, label: '3 months', pa: 5 },
    { days: 180, label: '6 months', pa: 10 },
    { days: 210, label: '7 months', pa: 12 },
    // { days: 240, label: '8 months', pa: 14 },
    { days: 270, label: '9 months', pa: 15 },
    { days: 365, label: '12 months', pa: 20 },
];

export function FixedCreate({ navigation }) {
    const { userUID, setPreloader, token, vaultInfo, accountInfo, getSavings } = useContext(AppContext);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [modalVisibility2, setModalVisibility2] = useState(false);
    const [checked, setChecked] = useState(false);
    const [color, setColor] = useState('gray');
    const [message2, setMessage2] = useState('');
    const [amount, setAmount] = useState(0);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [days, setDays] = useState(0);
    const [pa, setPa] = useState(0);
    const [interest, setInterest] = useState(0);

    // setPreloader(false)

    const closeModal = () => {
        setModalVisibility(!modalVisibility);
    };
    const closeModal2 = () => {
        setModalVisibility2(!modalVisibility2);
    };

    function validation(inp) {
        if (inp >= 1000) {
            if (inp <= accountInfo.account_balance) {
                setAmount(Number(inp))
                setMessage2('Amount Ok');
                setColor('#14a301ff');
            } else {
                setMessage2(`Insufficient funds on NGN(Bal: ${accountInfo.account_balance})`);
                setColor('#ce0a0ae5')
                setAmount(0)
            }
        }
        else {
            setMessage2(`Minimum Amount ₦1000`);
            setColor('#ce0a0ae5')
            setAmount(0)
        }
    }

    function nameCheck(inp) {
        if (inp > 30) {
            ToastApp("Name must be 40 words")
        } else {
            setName(inp)
        }
    }

    function btnVal() {
        if (name === "" || amount <= 0 || days == 0) {
            return (
                <View style={[styles.getStarted, { backgroundColor: "#7b61ff94" }]}>
                    <Text style={{ fontSize: 16, }}>Next</Text>
                </View>
            )
        } else {
            return (
                <TouchableOpacity onPress={() => { getInterest(); closeModal2() }} style={styles.getStarted}>
                    <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, color: 'white' }}>Continue</Text>
                </TouchableOpacity>
            )
        }
    }


    function dateConverter() {
        const timeS = getFutureTimestamp(days)
        let rDate = new Date(timeS)
        rDate = rDate.toLocaleDateString()
        return days != 0 ? moment(timeS).format('MMMM Do YYYY, h:mm:ss a') : "Select date"
    }

    const handleOptionPress = (optionIndex, d, pa) => {
        setChecked(optionIndex);
        setDays(d);
        setPa(pa);
    };

    function getInterest() {
        const month = days / 30
        const percent = pa / 100
        let int = percent / 12 * month * amount;
        int = Math.floor(int * 100) / 100;
        setInterest(int)
    }

    function createFixed() {
        setPreloader(true)
        const formdata = {
            name,
            description,
            amount,
            type: "fixed",
            tenure: days,
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(formdata),
            redirect: 'follow'
        };

        fetch(baseURL + "/api/savings/create", requestOptions)
            .then(response => response.json())
            .then(response => {
                const { data, status, message } = response;
                setPreloader(false)
                // console.log(response);
                if (status == "success") {
                    getSavings();
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
        <AppSafeAreaView backgroundColor={"#7B61FF"}>
            <View style={styles.container}>
                <View style={styles.body}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : null}
                    >
                        <ScrollView>
                            <View style={{ alignItems: 'center', marginBottom: 15 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 23, color: '#7B61FF' }}>Create a New Secure lock</Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 11, color: '#787A8D' }}>Lock funds and unlock on a due date</Text>
                            </View>

                            <View>
                                <View style={{ padding: 20, marginTop: 10 }}>

                                    <Text style={styles.signupText}>Name (30 words)</Text>
                                    <TextInput
                                        style={[styles.inputStyle, { marginBottom: 20 }]}
                                        keyboardType="default"
                                        placeholder='Name'
                                        selectionColor={'#7B61FF'}
                                        mode='outlined'
                                        placeholderTextColor="#787A8D"
                                        onChangeText={inp => nameCheck(inp.trim())}
                                    />



                                    <Text style={styles.signupText}>Amount</Text>
                                    <TextInput
                                        style={[styles.inputStyle, { marginBottom: 0 }]}
                                        keyboardType='numeric'
                                        placeholder='0'
                                        selectionColor={'#7B61FF'}
                                        mode='outlined'
                                        placeholderTextColor="#787A8D"
                                        onChangeText={inp => validation(Number(inp.trim()))}
                                    />
                                    {message2 != "" ? <Text style={{ marginBottom: 0, color: color }}>{message2}</Text> : null}

                                    <Text style={[styles.signupText, { marginTop: 15, }]}>Payback Date</Text>
                                    <View style={{ position: "relative" }}>
                                        <Pressable>
                                            <Text style={[styles.inputStyle, { paddingVertical: 15, }]}>{dateConverter()}</Text>
                                        </Pressable>
                                        <TouchableOpacity
                                            onPress={closeModal}
                                            style={styles.calenderIcon}>
                                            <FontAwesomeIcon icon={faCalendarAlt} color="white" />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ marginTop: 20 }}>
                                        <Text style={styles.signupText}>Description</Text>
                                        <TextInput
                                            style={[styles.inputStyle, { marginBottom: 20 }]}
                                            keyboardType='default'
                                            selectionColor={'#7B61FF'}
                                            mode='outlined'
                                            placeholderTextColor="#787A8D"
                                            onChangeText={inp => setDescription(inp.trim())}
                                        />
                                    </View>
                                </View>

                                <View style={{ padding: 15, marginTop: 10, }}>
                                    {btnVal()}
                                </View>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>

                <Modal
                    visible={modalVisibility}
                    animationType="slide"
                    transparent={true}
                >
                    <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
                        <Pressable style={{ flex: 1 }} onPress={closeModal} >
                        </Pressable>
                        <View style={{ backgroundColor: "#ebe8eb", height: 420, borderTopRightRadius: 20, borderTopLeftRadius: 20, paddingTop: 40 }}>
                            <View style={{ margin: 10, position: 'absolute', top: -40, right: "40%" }}>
                                <TouchableOpacity onPress={closeModal} style={{ backgroundColor: "#7B61FF", padding: 15, borderRadius: 50 }}>
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        size={20}
                                        color='#fff'
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={{ alignItems: 'center', marginBottom: 5 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#5e5f6d' }}>Select end date</Text>
                            </View>
                            <View style={{ marginTop: 10, padding: 5, flex: 1 }}>
                                <View style={{ flex: 1 }}>
                                    <FlatList style={{ flex: 1 }}
                                        data={options} renderItem={({ item }) => {
                                            // console.log(item);
                                            return (
                                                <TouchableOpacity onPress={() => setDays(item.days)}>
                                                    <View style={{ alignItems: 'center', flexDirection: 'row', padding: 5, justifyContent: "space-between" }}>
                                                        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                                            <Checkbox
                                                                status={days == item.days ? 'checked' : 'unchecked'}
                                                                color='#7B61FF'
                                                            />
                                                            <Text style={{ fontSize: 13, color: '#46464d' }}>End in {item.days} days - ({item.label})</Text>
                                                        </View>
                                                        <Text style={{ fontSize: 15, color: '#7B61FF', fontWeight: "bold", marginRight: 12 }}>{item.pa} % P.a</Text>
                                                    </View>
                                                    <View style={{ borderBottomColor: '#d2d3da', borderBottomWidth: StyleSheet.hairlineWidth, marginLeft: 15, marginRight: 15 }} />
                                                </TouchableOpacity>
                                            )
                                        }} key={({ item }) => { item.id }} />
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>


                <Modal
                    visible={modalVisibility2}
                    animationType="slide"
                    transparent={true}
                >
                    <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
                        <Pressable style={{ flex: 1 }} onPress={closeModal2} >
                        </Pressable>
                        <View style={{ backgroundColor: "#ebe8eb", height: 550, borderTopRightRadius: 20, borderTopLeftRadius: 20, paddingTop: 40 }}>
                            <View style={{ margin: 10, position: 'absolute', top: -40, right: "40%" }}>
                                <TouchableOpacity onPress={closeModal2} style={{ backgroundColor: "#7B61FF", padding: 15, borderRadius: 50 }}>
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        size={20}
                                        color='#fff'
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ alignItems: 'center', marginBottom: 15 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#5e5f6d', }}> Fixed Info</Text>
                            </View>

                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
                                    <Text>Name</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ marginRight: 5 }}>{name}</Text>
                                    </View>
                                </View>
                                <View style={{ borderBottomColor: '#787A8D', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 10, marginRight: 20, marginLeft: 20 }} />
                            </View>

                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
                                    <Text>Amount</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ marginRight: 5 }}>₦{amount}</Text>
                                    </View>
                                </View>
                                <View style={{ borderBottomColor: '#787A8D', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 10, marginRight: 20, marginLeft: 20 }} />
                            </View>
                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
                                    <Text>Total Interest</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ marginRight: 5 }}>₦{interest}</Text>
                                    </View>
                                </View>
                                <View style={{ borderBottomColor: '#787A8D', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 10, marginRight: 20, marginLeft: 20 }} />
                            </View>
                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
                                    <Text>Due Date</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ marginRight: 5 }}> {days} days - {dateConverter(days)}</Text>
                                    </View>
                                </View>
                                <View style={{ borderBottomColor: '#787A8D', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 10, marginRight: 20, marginLeft: 20 }} />
                            </View>

                            <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                                <Checkbox status={checked ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked(!checked)}
                                    color='#7B61FF'
                                />
                                <Text style={{ fontSize: 11, color: '#5e5f6d', }}>I hereby acknowledge that this fixed {'\n'}
                                    cannot be broken once it has been created.</Text>

                            </View>

                            <View style={{ padding: 15 }}>
                                <TouchableOpacity onPress={() => { closeModal2(); createFixed() }} disabled={!checked} style={[styles.getStarted, { backgroundColor: checked ? '#7B61FF' : '#574d8dff' }]}>
                                    <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, color:'white' }}>Fund</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </Modal >
            </View>
        </AppSafeAreaView>

    )
}
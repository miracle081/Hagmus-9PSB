import { Alert, FlatList, Image, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/businesstargetinfo";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Checkbox, Switch } from "react-native-paper";
import { useState } from "react";
import { getFutureTimestamp } from "../../components/DateTime";
import moment from "moment";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { AppContext } from "../../../globals/AppContext";
import { useContext } from "react";
import { faCalendarAlt, faCheckCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import { AppSafeAreaView } from "../../components/AppSafeAreaView";
import { baseURL } from "../../../config";
import { handleError } from "../../components/HandleRequestError";


const options = [
    { days: 30, label: '1 month', pa: 1.7 },
    { days: 60, label: '2 months', pa: 3.3 },
    { days: 90, label: '3 months', pa: 5 },
    { days: 120, label: '4 months', pa: 6.6 },
    { days: 150, label: '5 months', pa: 8 },
    { days: 180, label: '6 months', pa: 10 },
    { days: 210, label: '7 months', pa: 12 },
    { days: 240, label: '8 months', pa: 13 },
    { days: 270, label: '9 months', pa: 15 },
    { days: 300, label: '10 months', pa: 17 },
    { days: 330, label: '11 months', pa: 18.3 },
    { days: 365, label: '12 months', pa: 20 },
];

const frequencyOption = ["daily", "weekly", "monthly"]

export function TargetDate({ navigation }) {
    const { setPreloader, token, targetName, accountInfo, getSavings } = useContext(AppContext);
    const [days, setDays] = useState(0);
    const [pa, setPa] = useState(0);
    const [color, setColor] = useState('gray');
    const [message2, setMessage2] = useState('');
    const [amount, setAmount] = useState(0);
    const [targetAmount, setTargetAmount] = useState(0);
    const [description, setDescription] = useState("");
    const [interest, setInterest] = useState(0);
    const [frequency, setFrequency] = useState("");
    const [auto_deposit, setAuto_deposit] = useState(false);

    // setPreloader(false)

    const [modalVisibility, setModalVisibility] = useState(false);
    const closeModal = () => setModalVisibility(!modalVisibility);

    const [frequencyVisibility, setFrequencyVisibility] = useState(false);
    const closeFrequency = () => setFrequencyVisibility(!frequencyVisibility);

    const [modalVisibility2, setModalVisibility2] = useState(false);
    const closeModal2 = () => setModalVisibility2(!modalVisibility2);

    function validation(inp) {
        if (inp >= 500) {
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
            setMessage2(`Minimum Amount ₦500`);
            setColor('#ce0a0ae5')
            setAmount(0)
        }
    }

    function dateConverter() {
        const timeS = getFutureTimestamp(days)
        let rDate = new Date(timeS)
        rDate = rDate.toLocaleDateString()
        return days != 0 ? moment(timeS).format('MMMM Do YYYY') : "Select date"
    }


    function btnVal() {
        if (amount <= 0 || frequency === "" || targetAmount === 0) {
            return (
                <View style={[styles.getStarted, { backgroundColor: "#7b61ff94" }]}>
                    <Text style={{ fontSize: 16, }}>Next</Text>
                </View>
            )
        } else {
            return (
                <TouchableOpacity onPress={() => { createTarget(); closeModal2() }} style={styles.getStarted}>
                    <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, color: 'white' }}>Continue</Text>
                </TouchableOpacity>
            )
        }
    }

    function createTarget() {
        setPreloader(true)
        const formdata = {
            name: targetName,
            description,
            amount,
            type: "target",
            // tenure: days,
            target: targetAmount,
            frequency,
            auto_deposit
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(formdata),
            redirect: 'follow'
        };

        fetch(baseURL + "/savings/create", requestOptions)
            .then(response => response.json())
            .then(response => {
                const { data, status, message } = response;
                setPreloader(false)
                console.log(response);
                if (status == "success") {
                    getSavings();
                    navigation.navigate('TargetMenu')
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
                    <View style={{ alignItems: 'center', margin: 15 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', textTransform: "capitalize" }}>Create {targetName} Target</Text>
                    </View>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={styles.vault}>

                            <View style={{ alignItems: 'center', marginBottom: 15 }}>
                                <Text style={{ color: '#787A8D' }}>Easily accomplish your financial goal</Text>
                            </View>
                            <KeyboardAvoidingView style={{ flex: 1 }}
                                behavior={Platform.OS === 'ios' ? 'padding' : null}
                            >

                                <View style={{}}>
                                    <View style={{ padding: 20, }}>
                                        <Text style={styles.signupText}>Initail Funding Amount</Text>
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

                                        <Text style={[styles.signupText, { marginTop: 10, }]}>Target Amount</Text>
                                        <TextInput
                                            style={[styles.inputStyle, { marginBottom: 0 }]}
                                            keyboardType='numeric'
                                            placeholder='0'
                                            selectionColor={'#7B61FF'}
                                            mode='outlined'
                                            placeholderTextColor="#787A8D"
                                            onChangeText={inp => setTargetAmount(Number(inp.trim()))}
                                        />

                                        <Text style={[styles.signupText, { marginTop: 10, }]}>End Date</Text>
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

                                        <Text style={[styles.signupText, { marginTop: 10, }]}>Frequency</Text>
                                        <View style={{ position: "relative" }}>
                                            <Pressable onPress={closeFrequency}>
                                                <Text style={[styles.inputStyle, { paddingVertical: 15, textTransform: "capitalize" }]}>{frequency ? frequency : "Select frequency"}</Text>
                                            </Pressable>
                                            <TouchableOpacity
                                                onPress={closeFrequency}
                                                style={styles.calenderIcon}>
                                                <FontAwesomeIcon icon={faCalendarAlt} color="white" />
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{ marginTop: 10 }}>
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


                                        <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 20, alignItems: "center", }} onPress={() => setAuto_deposit(!auto_deposit)}>
                                            <Text style={{ fontSize: 18, }}>Auto Deposit</Text>
                                            <Switch value={auto_deposit} color="#7B61FF" thumbColor="#7B61FF" onChange={() => setAuto_deposit(!auto_deposit)} />
                                            {/* <View style={[styles.radio, { borderColor: auto_deposit ? "#7B61FF" : "gray", }]}>
                                                <View style={[styles.radioInner, { backgroundColor: auto_deposit ? "#7B61FF" : "transparent" }]} />
                                            </View> */}
                                        </TouchableOpacity>

                                    </View>

                                    <View style={{ padding: 15, marginTop: 5, }}>
                                        {btnVal()}
                                    </View>
                                </View>

                            </KeyboardAvoidingView>
                        </View>
                    </ScrollView>

                </View>

                {/* ===================== Days Modal =============== */}
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
                                                <TouchableOpacity onPress={() => { setDays(item.days); closeModal() }}>
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

                {/* ===================== frequency Modal =============== */}
                <Modal
                    visible={frequencyVisibility}
                    animationType="slide"
                    transparent={true}
                >
                    <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
                        <Pressable style={{ flex: 1 }} onPress={closeFrequency} >
                        </Pressable>
                        <View style={{ backgroundColor: "#ebe8eb", height: 420, borderTopRightRadius: 20, borderTopLeftRadius: 20, paddingTop: 40 }}>
                            <View style={{ margin: 10, position: 'absolute', top: -40, right: "40%" }}>
                                <TouchableOpacity onPress={closeFrequency} style={{ backgroundColor: "#7B61FF", padding: 15, borderRadius: 50 }}>
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        size={20}
                                        color='#fff'
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={{ alignItems: 'center', marginBottom: 5 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#5e5f6d' }}>Select frequency for target savings</Text>
                            </View>
                            <View style={{ marginTop: 10, padding: 5, flex: 1 }}>
                                <View style={{ flex: 1 }}>
                                    <FlatList style={{ flex: 1 }}
                                        data={frequencyOption} renderItem={({ item }) => {
                                            // console.log(item);
                                            return (
                                                <TouchableOpacity onPress={() => { setFrequency(item); closeFrequency(); }}>
                                                    <View style={{ alignItems: 'center', flexDirection: 'row', padding: 5, justifyContent: "space-between" }}>
                                                        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                                            <Checkbox
                                                                status={frequency == item ? 'checked' : 'unchecked'}
                                                                color='#7B61FF'
                                                            />
                                                            <Text style={{ fontSize: 13, color: '#46464d', textTransform: "capitalize" }}>{item}</Text>
                                                        </View>
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

            </View>

        </AppSafeAreaView>
    )
}
import { Alert, FlatList, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/targetmenu";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight, faFaceSmile, faMinus, faMinusCircle, faPlus, faPlusCircle, faSquareArrowUpRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../../globals/AppContext";
import { useState } from "react";
import { AppSafeAreaView } from "../../components/AppSafeAreaView";
import { Modal } from "react-native";
import { Checkbox } from "react-native-paper";
import { baseURL } from "../../../config";
import { handleError } from "../../components/HandleRequestError";
import { symbol } from "../../components/currencySymbols";
import { formatMoney } from "../../components/FormatMoney";
import { dateTime } from "../../components/DateTime";

export function SpendRetain({ navigation }) {
    const { userUID, getAccountInfo, setPreloader, token, getMySAYS, saysInfo, } = useContext(AppContext);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [modalVisibility2, setModalVisibility2] = useState(false);
    const [balance, setBalance] = useState(0);
    const [checked, setChecked] = useState(true);
    const [checkedD, setCheckedD] = useState(false);
    const [count, setCount] = useState(10);
    const [status, setStatus] = useState(JSON.stringify(saysInfo) != '{}' ? saysInfo.status : "inactive");
    const [amount, setAmount] = useState(0);
    const [histories, setHistories] = useState([]);

    function updateStatus() {
        if (status != "active") {
            setCheckedD(true)
            setChecked(false)
            setCount(0)
        }
    }

    const closeModal = () => {
        setModalVisibility(!modalVisibility);
    };
    const closeModal2 = () => {
        setModalVisibility2(!modalVisibility2);
    };

    //increase and decrease count

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleDecrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };


    function updateSavings() {
        setPreloader(true)
        const formdata = {
            amount: count.toString(),
            type: "percentage",
            status: status,
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

        fetch(baseURL + "/api/says/my-says/" + saysInfo.id + "/update", requestOptions)
            .then(response => response.json())
            .then(response => {
                const { data, status, message } = response;
                setPreloader(false)
                // console.log(response);
                if (status == "success") {
                    getMySAYS();
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
                if (error.message == "JSON Parse error: Unexpected character: <") Alert.alert("Error!", "Network error, please try again");
                else Alert.alert("Error!", error.message)
            });
    }

    function withdrawSavings() {
        setPreloader(true)
        const formdata = {
            says_id: saysInfo.id,
            amount,
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

        fetch(baseURL + "/api/says/withdraw", requestOptions)
            .then(response => response.json())
            .then(response => {
                const { data, status, message } = response;
                setPreloader(false)
                // console.log(response);
                if (status == "success") {
                    getAccountInfo();
                    getMySAYS();
                    navigation.navigate("Successful", {
                        name: "",
                        amount: `${symbol("ngn")}${amount}`,
                        message: `₦${amount} Withdrawal successfully`,
                        screen: "SpendRetain"
                    })
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

    function getTrasctoins() {
        setPreloader(true)
        const requestOptions = {
            method: 'GET',
            headers: {
                authorization: `bearer ${token}`
            },
            redirect: 'follow'
        };
        fetch(`${baseURL}/api/says/${saysInfo.id}/transactions`, requestOptions)
            .then(response => response.json())
            .then(response => {
                const { data, status, message } = response;
                // console.log(data);
                setPreloader(false)
                if (status == "success") {
                    setHistories(data.sort((a, b) => b.id - a.id))
                }
                handleError(status, message);
            })
            .catch(error => {
                setPreloader(false)
                console.log(error);
                if (error.message == "JSON Parse error: Unexpected character: <") Alert.alert("Error!", "Network error, please try again");
                else Alert.alert("Error!", error.message)

            });
    }

    useEffect(() => {
        getTrasctoins();
        setCount(saysInfo.amount);
        // console.log(saysInfo);
        updateStatus()
    }, []);


    return (
        <AppSafeAreaView backgroundColor={"#7B61FF"}>
            <View style={styles.container}>
                <View style={styles.body}>
                    <View style={{ alignItems: 'center', margin: 15 }}>
                        {/* <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>Business Target</Text> */}
                    </View>
                    <View style={styles.vault}>

                        <View style={{ alignItems: 'center', margin: 10 }}>
                            {/* <Text style={{ fontSize: 20 }}>Target (Up to 14% p.a)</Text> */}
                            <Text style={{ fontSize: 28, fontWeight: 'bold', margin: 5, color: '#7B61FF' }}>₦{formatMoney(saysInfo.balance)}</Text>
                        </View>


                        <View style={{ marginLeft: 20, marginRight: 20, justifyContent: "center", marginTop: 10 }}>
                            <View style={{ backgroundColor: '#9582f5', marginBottom: 20, borderRadius: 50 }}>
                                <View
                                    onPress={() => navigation.navigate('FixedTarget')}
                                    activeOpacity={1}
                                >
                                    <View style={{ backgroundColor: '#ffffff', borderRadius: 20, marginTop: 30, marginLeft: 10, marginRight: 10, padding: 20, marginBottom: 0 }}>
                                        <View style={{ alignItems: 'center', }}>


                                            <TouchableOpacity
                                                onPress={closeModal}
                                                style={{ backgroundColor: '#9582f5ff', padding: 8, borderRadius: 8, }}>
                                                <Text style={{ color: 'white', fontSize: 15 }}>Withdraw</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 8, marginTop: 20 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Spend and Retain percent {Number(saysInfo.amount)}%</Text>
                                                <View style={{
                                                    backgroundColor: saysInfo.status == "active" ? '#d6f6e1ff' : '#f6d6d6ff', borderRadius: 8,
                                                    width: 55, alignItems: 'center', padding: 3
                                                }}>
                                                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: saysInfo.status == "active" ? '#1b8741ff' : '#871f1bff' }}>{saysInfo.status}</Text>
                                                </View>
                                            </View>

                                            <View style={{ borderBottomColor: '#c5b9ff', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 15, marginTop: 15 }} />

                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Funding Source</Text>
                                                <View style={{
                                                    backgroundColor: '#d3cbfb', borderRadius: 8,
                                                    width: 108, alignItems: 'center', padding: 3
                                                }}>
                                                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#7B61FF' }}>Hagmus account</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                </View>
                            </View>

                        </View>

                        <TouchableOpacity
                            onPress={closeModal2}
                            style={{
                                backgroundColor: '#d3cbfb', marginHorizontal: 10, padding: 8,
                                borderRadius: 8, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly'
                            }}>
                            <Text style={{ color: '#7B61FF' }}>Set savings percentage</Text>
                            <FontAwesomeIcon icon={faChevronRight} color="#7B61FF" />
                        </TouchableOpacity>

                        <View style={{ flex: 1, padding: 10, marginTop: 10, backgroundColor: 'white', marginHorizontal: 8, borderRadius: 5 }} >
                            <View style={{ flex: 1 }}>
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Recent activities</Text>
                                </View>
                                {histories.length > 0 ?
                                    <FlatList style={{ flex: 1 }}
                                        data={histories} renderItem={({ item }) => {
                                            return (
                                                <>
                                                    <View>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <Text style={{ color: '#474749', marginBottom: 5 }}>{item.narration}</Text>
                                                            <Text style={{ color: item.type == "credit" ? 'green' : "red" }}>{item.type == "credit" ? '+' : "-"} ₦{item.amount}</Text>
                                                        </View>
                                                        <Text style={{ color: '#6e6a7f', fontSize: 12 }}>{dateTime(item.created_at)}</Text>
                                                    </View>
                                                    <View style={{ borderBottomColor: '#c5b9ff', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 15, marginTop: 15 }} />
                                                </>
                                            )
                                        }} key={({ item }) => { item.id }} /> :
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: 'center', opacity: 0.5, zIndex: -1, }}>
                                        <FontAwesomeIcon icon={faFaceSmile} color="gray" size={120} />
                                        <Text style={{ fontSize: 16, marginTop: 20, color: 'gray' }}>No histories yet</Text>
                                    </View>
                                }
                            </View>
                        </View>

                    </View>
                </View>

                <Modal
                    visible={modalVisibility}
                    animationType="slide"
                    transparent={true}
                >
                    <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
                        <Pressable style={{ flex: 1 }} onPress={closeModal} >
                        </Pressable>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : null}
                        >
                            <View style={{ backgroundColor: "#ebe8eb", height: 350, borderTopRightRadius: 20, borderTopLeftRadius: 20, paddingTop: 40 }}>
                                <View style={{ margin: 10, position: 'absolute', top: -40, right: "40%" }}>
                                    <TouchableOpacity onPress={closeModal} style={{ backgroundColor: "#7B61FF", padding: 15, borderRadius: 50 }}>
                                        <FontAwesomeIcon
                                            icon={faXmark}
                                            size={20}
                                            color='#fff'
                                        />
                                    </TouchableOpacity>
                                </View>

                                <View style={{ margin: 15, padding: 8 }}>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 18, fontWeight: 'bold' }}>Make Withdrawal (₦)</Text>

                                    </View>

                                    <View>
                                        <TextInput
                                            style={{
                                                borderWidth: 1, padding: 10, marginTop: 15, marginBottom: 20,
                                                borderRadius: 6, borderColor: '#7B61FF'
                                            }}
                                            keyboardType='default'
                                            placeholder='₦ Enter amount'
                                            selectionColor={'#7B61FF'}
                                            onChangeText={inp => setAmount(Number(inp))}
                                        />
                                    </View>
                                    <TouchableOpacity onPress={() => { closeModal(); withdrawSavings(); }} style={{ padding: 15, backgroundColor: '#7B61FF', borderRadius: 8, alignItems: 'center', marginTop: 20 }}>
                                        <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, color: 'white' }}>Withdraw</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </KeyboardAvoidingView>
                    </View>
                </Modal >

                <Modal
                    visible={modalVisibility2}
                    animationType="slide"
                    transparent={true}
                >
                    <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
                        <Pressable style={{ flex: 1 }} onPress={closeModal2} >
                        </Pressable>
                        <View style={{ backgroundColor: "#ebe8eb", height: 450, borderTopRightRadius: 20, borderTopLeftRadius: 20, paddingTop: 40 }}>
                            <View style={{ margin: 10, position: 'absolute', top: -40, right: "40%" }}>
                                <TouchableOpacity onPress={closeModal2} style={{ backgroundColor: "#7B61FF", padding: 15, borderRadius: 50 }}>
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        size={20}
                                        color='#fff'
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={{ margin: 15, padding: 8 }}>
                                <View style={{ flexDirection: "row", gap: 10 }}>
                                    <TouchableOpacity onPress={() => { setChecked(true); setCheckedD(false); setCount(10); setStatus("active") }} style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', backgroundColor: '#cac2f1', padding: 5, borderRadius: 8 }}>
                                        <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 14, fontWeight: 'bold' }}>Activate</Text>
                                        <Checkbox status={checked ? 'checked' : 'unchecked'} color='#7B61FF' uncheckedColor='gray' />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { setCheckedD(true); setChecked(false); setCount(0); setStatus("inactive") }} style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', backgroundColor: '#f1c2c2', padding: 5, borderRadius: 8 }}>
                                        <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 14, fontWeight: 'bold' }}>Deactivate</Text>
                                        <Checkbox status={checkedD ? 'checked' : 'unchecked'} color='#c80926' uncheckedColor='gray' />
                                    </TouchableOpacity>
                                </View>

                                <View style={{ alignItems: 'center', marginTop: 45 }}>
                                    <Text>Set Percentage</Text>
                                </View>

                                <View style={{
                                    flexDirection: 'row', alignItems: 'center', marginHorizontal: 45, marginBottom: 45, marginTop: 8, justifyContent: 'center',
                                    backgroundColor: '#e3defc', padding: 8, borderRadius: 8
                                }}>

                                    <TouchableOpacity title="Decrement" onPress={handleDecrement}
                                        style={{ borderWidth: 1, borderColor: '#7B61FF', padding: 8, borderRadius: 5 }}>
                                        <FontAwesomeIcon icon={faMinusCircle} size={20} color="#7B61FF" />
                                    </TouchableOpacity>

                                    <View style={{ padding: 8, width: 80, alignItems: 'center' }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}> {Number(count)}%</Text>
                                    </View>

                                    <TouchableOpacity title="Increment" onPress={handleIncrement}
                                        style={{ borderWidth: 1, borderColor: '#7B61FF', padding: 8, borderRadius: 5 }}>
                                        <FontAwesomeIcon icon={faPlusCircle} size={20} color="#7B61FF" />
                                    </TouchableOpacity>


                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => setCount(25)} style={{ borderWidth: 1, borderColor: '#7B61FF', padding: 8, width: 55, borderRadius: 8, alignItems: 'center' }}>
                                        <Text style={{ color: '#69628d', fontSize: 15 }}>25%</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setCount(50)} style={{ borderWidth: 1, borderColor: '#7B61FF', padding: 8, width: 55, borderRadius: 8, alignItems: 'center' }}>
                                        <Text style={{ color: '#69628d', fontSize: 15 }}>50%</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setCount(75)} style={{ borderWidth: 1, borderColor: '#7B61FF', padding: 8, width: 55, borderRadius: 8, alignItems: 'center' }}>
                                        <Text style={{ color: '#69628d', fontSize: 15 }}>75%</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setCount(100)} style={{ borderWidth: 1, borderColor: '#7B61FF', padding: 8, width: 55, borderRadius: 8, alignItems: 'center' }}>
                                        <Text style={{ color: '#69628d', fontSize: 15 }}>100%</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={() => { closeModal2(); updateSavings(); }} style={{ padding: 15, backgroundColor: '#7B61FF', borderRadius: 8, alignItems: 'center', marginTop: 20 }}>
                                    <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, color: 'white' }}>Save</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </Modal >
            </View>
        </AppSafeAreaView>
    )
}
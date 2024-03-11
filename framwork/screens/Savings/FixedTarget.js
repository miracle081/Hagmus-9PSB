import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/targets";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFaceSmile, faLock, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../../globals/AppContext";
import { useEffect } from "react";
import moment from "moment";
import { StatusBar } from "expo-status-bar";
import { ToastApp } from "../../components/Toast";
import { doc, runTransaction, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { AppSafeAreaView } from "../../components/AppSafeAreaView";
import { baseURL } from "../../../config";
import { handleError } from "../../components/HandleRequestError";
import { dateTime, getFutureTimestamp } from "../../components/DateTime";
import { formatMoney } from "../../components/FormatMoney";


export function FixedTarget() {
    const { userInfo, token, setPreloader, getSavings } = useContext(AppContext);
    const [vaultInfo, setVaultInfo] = useState([]);
    const [balance, setBalance] = useState(0);
    const [fixedInfo, setFixedInfo] = useState({});
    const [modalVisibility, setModalVisibility] = useState(false);

    useEffect(() => {
        // console.log(fixedInfo);
        getTrasctoins();
    }, []);

    const closeModal = () => {
        setModalVisibility(!modalVisibility);
    };

    function dateConverter(days, startDate) {
        const timeS = getFutureTimestamp(days, startDate)
        let rDate = new Date(timeS)
        rDate = rDate.toLocaleDateString()
        // return moment(timeS).format('DD/MM/YYYY, h:mm:ss a');
        return moment(timeS).format('DD/MM/YYYY');
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
        fetch(`${baseURL}/api/savings/my-savings`, requestOptions)
            .then(response => response.json())
            .then(response => {
                const { data, status, message } = response;
                // console.log(data);
                setPreloader(false)
                if (status == "success") {
                    const rData = data.filter(all => all.type == "fixed")
                    let amt = 0
                    rData.forEach(d => {
                        amt += Number(d.amount) + Number(d.total_interest)
                    })
                    setBalance(amt);
                    setVaultInfo(rData)
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

    function withdraw(id, amount) {
        setPreloader(true)
        const formdata = {
            saving_id: id,
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

        fetch(baseURL + "/api/savings/withdraw", requestOptions)
            .then(response => response.json())
            .then(response => {
                const { data, status, message } = response;
                setPreloader(false)
                // console.log(response);
                if (status == "success") {
                    getSavings();
                    getTrasctoins();
                    navigation.navigate("TradeSuccessful", {
                        name: "",
                        amount: symbol("ngn") + amount,
                        message: `${symbol("ngn")}${amount} withdrawal successfully`,
                        screen: "Targets"
                    })
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
                <StatusBar style="light" />
                <View style={styles.body}>
                    <View style={{ alignItems: 'center', margin: 15 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>Fixed Savings Plan</Text>
                    </View>
                    <View style={styles.vault}>
                        <View style={styles.balance}>
                            <View style={{ alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ color: '#7B61FF', fontSize: 18 }}>₦
                                        <Text style={{ color: '#7B61FF', fontSize: 28, fontWeight: 'bold' }}>{formatMoney(balance)}</Text>
                                    </Text>
                                </View>
                            </View>
                        </View>
                        {vaultInfo.length > 0 ?
                            <FlatList style={{ flex: 1 }}
                                data={vaultInfo} renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity onPress={() => { setFixedInfo(item); closeModal() }} activeOpacity={0.6} style={{ margin: 10, padding: 10, backgroundColor: 'white', borderRadius: 8 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <Text style={{ color: 'black', fontWeight: 'bold' }}>{item.name}</Text>
                                                <View style={{
                                                    backgroundColor: '#8b77f0', padding: 5, borderTopLeftRadius: 100, borderBottomLeftRadius: 100, width: 70,
                                                    borderTopRightRadius: 100, alignItems: 'center', height: 30, justifyContent: 'center'
                                                }}>
                                                    <FontAwesomeIcon icon={faLock} color="white" />
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: 10 }}>
                                                <View style={{ alignItems: 'center' }}>
                                                    <Text style={{ marginBottom: 5, color: '#787A8D', fontSize: 14 }}>Amount (₦)</Text>
                                                    <Text style={{ fontSize: 17, color: '#757577' }}>{item.amount}</Text>
                                                </View>
                                                <Text style={{ color: 'white', width: 1, backgroundColor: '#787A8D', marginLeft: 5, height: 40 }}></Text>
                                                <View style={{ alignItems: 'center' }}>
                                                    <Text style={{ marginBottom: 5, color: '#787A8D', fontSize: 14 }}>Total {item.interest_rate}% p.a</Text>
                                                    <Text style={{ fontSize: 17, color: '#757577' }}>₦{item.total_interest}</Text>
                                                </View>
                                            </View>
                                            <View style={{ borderBottomColor: '#787A8D', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 10, marginTop: 3, }} />
                                            <Text style={{ fontSize: 12, color: '#7B61FF' }}>Due date:
                                                <Text style={{ fontWeight: 'bold', color: '#7B61FF' }}> {dateConverter(item.tenure, item.start_date)}</Text>
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                }} key={({ item }) => { item.id }} /> :
                            <View style={{ flex: 1, justifyContent: "center", alignItems: 'center', opacity: 0.5, zIndex: -1, }}>
                                <FontAwesomeIcon icon={faFaceSmile} color="gray" size={120} />
                                <Text style={{ fontSize: 16, marginTop: 20, color: 'gray' }}>No Deposits yet</Text>
                            </View>
                        }
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
                        <View style={{ backgroundColor: "#ebe8eb", height: 520, borderTopRightRadius: 20, borderTopLeftRadius: 20, paddingTop: 40 }}>
                            <View style={{ margin: 10, position: 'absolute', top: -40, right: "40%" }}>
                                <TouchableOpacity onPress={closeModal} style={{ backgroundColor: "#7B61FF", padding: 15, borderRadius: 50 }}>
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
                                    <Text>Amount</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ marginRight: 5 }}>₦{fixedInfo.amount}</Text>
                                    </View>
                                </View>
                                <View style={{ borderBottomColor: '#787A8D', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 10, marginRight: 20, marginLeft: 20 }} />
                            </View>

                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
                                    <Text>Total % p.a</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ marginRight: 5 }}>{fixedInfo.interest_rate}</Text>
                                    </View>
                                </View>
                                <View style={{ borderBottomColor: '#787A8D', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 10, marginRight: 20, marginLeft: 20 }} />
                            </View>

                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
                                    <Text>Total Interest</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ marginRight: 5 }}>₦{fixedInfo.total_interest}</Text>
                                    </View>
                                </View>
                                <View style={{ borderBottomColor: '#787A8D', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 10, marginRight: 20, marginLeft: 20 }} />
                            </View>
                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
                                    <Text>Deposit Date</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ marginRight: 5 }}>{moment(fixedInfo.created_at).format('DD/MM/YYYY, h:mm:ss a')}</Text>
                                    </View>
                                </View>
                                <View style={{ borderBottomColor: '#787A8D', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 10, marginRight: 20, marginLeft: 20 }} />
                            </View>
                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
                                    <Text>Due Date</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ marginRight: 5 }}>{dateConverter(fixedInfo.tenure, fixedInfo.start_date)}</Text>
                                    </View>
                                </View>
                                <View style={{ borderBottomColor: '#787A8D', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 10, marginRight: 20, marginLeft: 20 }} />
                            </View>

                            <View style={{ padding: 15 }}>
                                {new Date().getTime() > getFutureTimestamp(fixedInfo.tenure, fixedInfo.start_date) ?
                                    <TouchableOpacity onPress={() => { closeModal(); withdraw(fixedInfo.id, fixedInfo.amount) }} style={styles.getStarted}>
                                        <Text style={{ fontFamily: 'Inter_400Regular', color: "white", fontSize: 16, }}>Withdraw</Text>
                                    </TouchableOpacity> :
                                    <View style={[styles.getStarted, { backgroundColor: '#49416e', flexDirection: "row" }]}>
                                        <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, color: "white" }}>Fixed </Text>
                                        <FontAwesomeIcon icon={faLock} size={17} color="white" />
                                    </View>
                                }
                            </View>
                        </View>
                    </View>
                </Modal >
            </View>
        </AppSafeAreaView>
    )
}
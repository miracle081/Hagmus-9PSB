import { FlatList, Image, ImageBackground, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/targets";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowUpFromBracket, faBullseye, faBusinessTime, faCirclePlus, faEye, faEyeSlash, faFaceSmile, faHandHoldingDollar, faLock, faSackDollar, faWallet, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import { useContext } from "react";
import { doc, onSnapshot, runTransaction, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { useEffect } from "react";
import moment from "moment";
import { Modal } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ToastApp } from "../../components/Toast";
import { dateTime } from "../../components/DateTime";
import { AppContext } from "../../../globals/AppContext";
import { AppSafeAreaView } from "../../components/AppSafeAreaView";


export function Targets({ navigation }) {
    const { userUID, setPreloader, userInfo, docID } = useContext(AppContext);
    const [balance, setBalance] = useState(0);
    const [target, setTarget] = useState({ dateCreated: 0, days: 0, deposites: [], dueDate: 0, pa: 0 });
    const [modalVisibility, setModalVisibility] = useState(false);
    const [modalVisibility2, setModalVisibility2] = useState(false);
    const [color, setColor] = useState('gray');
    const [amount, setAmount] = useState(0);
    const [interest, setInterest] = useState(0);
    const [message2, setMessage2] = useState('');

    const closeModal = () => {
        setModalVisibility(!modalVisibility);
    };
    const closeModal2 = () => {
        setModalVisibility2(!modalVisibility2);
    };

    function validation(inp) {
        if (inp > 0) {
            if (inp <= userInfo.ngn) {
                setAmount(Number(inp))
                setMessage2('Amount Ok');
                setColor('#14a301ff')
            } else {
                setMessage2(`Insufficient funds on NGN (Bal: ${userInfo.ngn})`);
                setColor('#ce0a0ae5')
                setAmount(0)
            }
        }
        else {
            setMessage2('Amount must not be empty');
            setColor('#ce0a0ae5')
            setAmount(0)
        }
    }

    useEffect(() => {
        onSnapshot(doc(db, "vault", userUID), (doc) => {
            const info = doc.data()[docID]
            if (JSON.stringify(info) != '{}') {
                setTarget(info);
                let amt = 0
                info.deposites.map(d => amt += d.amount + d.interest)
                setBalance(amt)
            } else {
                setBalance(0)
                setTarget({ dateCreated: 0, days: 0, deposites: [], dueDate: 0, pa: 0 });
            }
        });
    }, []);

    function dateConverter(date) {
        let rDate = new Date(date)
        rDate = rDate.toLocaleDateString()
        return moment(date).format('DD/MM/YYYY')
    }

    async function fundTarget() {
        setPreloader(true)
        try {
            await runTransaction(db, (transaction) => {
                transaction.update(doc(db, 'users', userUID), { ngn: Number(userInfo.ngn) - Number(amount) },)
                return Promise.resolve();
            })
                .then(() => {
                    updateDoc(doc(db, "vault", userUID), {
                        [docID]: {
                            ...target, deposites: [
                                ...target.deposites, {
                                    amount,
                                    interest,
                                    data: new Date()
                                }
                            ],
                        }
                    })
                        .then(() => {
                            ToastApp(`Deposit of ${amount} was successful`, "LONG");
                            setPreloader(false)
                            setAmount(0)
                        })
                        .catch(() => {
                            setPreloader(false)
                            ToastApp('Something went wrong, please try again', "LONG");
                        })
                })
                .catch(() => {
                    setPreloader(false);
                    ToastApp('Something went wrong, please try again', "LONG");
                })

        } catch {
            setPreloader(false)
        }
    }

    
    async function withdrawTarget() {
        setPreloader(true)
        try {
            await runTransaction(db, (transaction) => {
                transaction.update(doc(db, 'users', userUID), { ngn: Number(userInfo.ngn) + Number(balance) },)
                return Promise.resolve();
            })
                .then(() => {
                    updateDoc(doc(db, "vault", userUID), {
                        [docID]: {}
                    })
                        .then(() => {
                            ToastApp(`Withdrawal of ${amount} was successful`, "LONG");
                            setPreloader(false)
                            navigation.goBack();
                        })
                        .catch((e) => {
                            console.log(e);
                            setPreloader(false)
                            ToastApp('Something went wrong 2, please try again', "LONG");
                        })
                })
                .catch(() => {
                    setPreloader(false);
                    ToastApp('Something went wrong, please try again', "LONG");
                })

        } catch {
            setPreloader(false)
        }
    }

    function daysRemaining() {
        const currentTime = Date.now();
        const timeDifference = target.dueDate - currentTime;
        const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        return daysRemaining
    }

    function getInterest(amount) {
        const month = daysRemaining() / 30
        const percent = target.pa / 100
        let int = percent / 12 * month * amount;
        int = Math.floor(int * 100) / 100;
        setInterest(int)
    }

    return (
        <AppSafeAreaView backgroundColor={"#7B61FF"}>
            <View style={styles.container}>
                <StatusBar style="light" />
                <View style={styles.body}>
                    <View style={{ alignItems: 'center', margin: 15 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', textTransform: "capitalize" }}>{docID} Target Plan</Text>
                    </View>
                    <View style={styles.vault}>
                        <View style={styles.balance}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ color: '#7B61FF', fontSize: 18 }}>₦
                                        <Text style={{ color: '#7B61FF', fontSize: 28, fontWeight: 'bold' }}>{balance.toFixed(2)}</Text>
                                    </Text>
                                    <Text style={{ marginStart: 20, }}>Due Date: {dateConverter(target.dueDate)}</Text>
                                </View>
                                {new Date().getTime() > target.dueDate ?
                                    <TouchableOpacity onPress={closeModal2} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#7B61FF', padding: 10, borderRadius: 4, height: 40 }}>
                                        <FontAwesomeIcon icon={faArrowUpFromBracket} color="white" />
                                        <Text style={{ color: 'white', marginStart: 5, fontWeight: 'bold' }}>Withdraw Target</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={closeModal} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#7B61FF', padding: 10, borderRadius: 4, height: 40 }}>
                                        <Text style={{ color: 'white', marginRight: 5, fontWeight: 'bold' }}>Fund Target</Text>
                                        <FontAwesomeIcon icon={faCirclePlus} color="white" />
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>

                        <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 15 }}>
                            <Text style={{ fontSize: 20 }}>Targets ( Up to {target.pa}% p.a )</Text>
                            <Text style={{ fontSize: 11, marginTop: 5, color: '#787A8D' }}>Disciplined savings toward a defined goal.</Text>
                        </View>
                        {target.deposites.length > 0 ?
                            <FlatList style={{ flex: 1 }}
                                data={target.deposites} renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity
                                            activeOpacity={0.6}
                                            style={{ margin: 10, padding: 10, backgroundColor: 'white', borderRadius: 8 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <Text style={{ color: 'black', fontWeight: 'bold' }}>Rent</Text>
                                                <View style={{
                                                    backgroundColor: '#8b77f0', padding: 5, borderTopLeftRadius: 100, borderBottomLeftRadius: 100, width: 70,
                                                    borderTopRightRadius: 100, alignItems: 'center', height: 30, justifyContent: 'center'
                                                }}>
                                                    <FontAwesomeIcon
                                                        icon={faLock}
                                                        color="white"
                                                    />
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: 10 }}>
                                                <View style={{ alignItems: 'center' }}>
                                                    <Text style={{ marginBottom: 5, color: '#787A8D', fontSize: 14 }}>Amount (₦)</Text>
                                                    <Text style={{ fontSize: 17, color: '#757577' }}>{item.amount}</Text>
                                                </View>
                                                <Text style={{ color: 'white', width: 1, backgroundColor: '#787A8D', marginLeft: 5, height: 40 }}></Text>
                                                <View style={{ alignItems: 'center' }}>
                                                    <Text style={{ marginBottom: 5, color: '#787A8D', fontSize: 14 }}>Total % p.a</Text>
                                                    <Text style={{ fontSize: 17, color: '#757577' }}>{item.interest}</Text>
                                                </View>
                                            </View>
                                            <View
                                                style={{
                                                    borderBottomColor: '#787A8D',
                                                    borderBottomWidth: StyleSheet.hairlineWidth,
                                                    marginBottom: 10,
                                                    marginTop: 3,
                                                }}
                                            />
                                            <View>
                                                <Text style={{ fontSize: 12, color: '#7B61FF' }}>Deposit date
                                                    <Text style={{ fontWeight: 'bold', color: '#7B61FF' }}>    {dateTime(item.date)}</Text></Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }} key={({ item }) => { item.id }} /> :
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: 'center',
                                    opacity: 0.5,
                                    zIndex: -1,
                                }}>
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
                            <View style={{ alignItems: 'center', marginBottom: 10 }}>
                                <FontAwesomeIcon
                                    icon={faBusinessTime}
                                    size={40}
                                    color="#7B61FF"
                                />
                            </View>
                            <View style={{ alignItems: 'center', marginBottom: 15 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#5e5f6d', textTransform: "capitalize" }}>{docID} Target Plan</Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 11, color: '#787A8D' }}>You can finance the expansion of your firm by saving and earning.</Text>
                            </View>
                            <View style={{ padding: 15 }}>
                                <Text style={styles.signupText}>Amount</Text>
                                <TextInput
                                    style={[styles.inputStyle, { marginBottom: 0 }]}
                                    keyboardType='numeric'
                                    placeholder='0'
                                    selectionColor={'#7B61FF'}
                                    mode='outlined'
                                    placeholderTextColor="#787A8D"
                                    onChangeText={inp => { getInterest(inp); validation(Number(inp.trim())) }}
                                />
                                {message2 != "" ? <Text style={{ marginBottom: 25, color: color }}>{message2}</Text> : null}
                                <Text style={{ fontWeight: 'bold', fontSize: 11, color: '#787A8D' }}>Interest on Deposit  {interest}</Text>
                            </View>
                            <View style={{ padding: 15 }}>
                                <TouchableOpacity onPress={() => { closeModal(); fundTarget() }} disabled={amount ? false : true}
                                    style={[styles.getStarted, { backgroundColor: amount ? '#7B61FF' : '#9c94c2', }]}>
                                    <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, }}>Fund</Text>
                                </TouchableOpacity>
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
                        <View style={{ backgroundColor: "#ebe8eb", height: 420, borderTopRightRadius: 20, borderTopLeftRadius: 20, paddingTop: 40 }}>
                            <View style={{ margin: 10, position: 'absolute', top: -40, right: "40%" }}>
                                <TouchableOpacity onPress={closeModal2} style={{ backgroundColor: "#7B61FF", padding: 15, borderRadius: 50 }}>
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        size={20}
                                        color='#fff'
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ alignItems: 'center', marginBottom: 10 }}>
                                <FontAwesomeIcon
                                    icon={faBusinessTime}
                                    size={40}
                                    color="#7B61FF"
                                />
                            </View>
                            <View style={{ alignItems: 'center', marginBottom: 15 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#5e5f6d', textTransform: "capitalize" }}>Withdraw {docID} Target Plan</Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 11, color: '#787A8D' }}>You can finance the expansion of your firm by saving and earning.</Text>
                            </View>
                            <View style={{ padding: 15 }}>
                                <Text style={styles.signupText}>All funds are sent to funding account</Text>
                            </View>
                            <View style={{ padding: 15 }}>
                                <TouchableOpacity onPress={() => { closeModal2(); withdrawTarget() }}
                                    style={styles.getStarted}>
                                    <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, }}>Withdraw Funds</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </Modal>
            </View >
        </AppSafeAreaView>
    )
}
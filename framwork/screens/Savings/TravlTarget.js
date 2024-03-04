import { FlatList, Image, ImageBackground, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/targets";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBullseye, faBusinessTime, faCirclePlus, faEye, faEyeSlash, faFaceSmile, faHandHoldingDollar, faLock, faSackDollar, faWallet, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import { useContext } from "react";
import { AppContext } from "../../../globals/AppContext";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import moment from "moment";
import { Modal } from "react-native";
import { AppSafeAreaView } from "../../components/AppSafeAreaView";


export function TravlTarget({ navigation }) {
    
    const { userUID, setPreloader, } = useContext(AppContext);
    const [showBalance, setShowBalance] = useState('');
    const [coinLock, setCoinLock] = useState([]);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [color, setColor] = useState('gray');
    const [message2, setMessage2] = useState('');

    const closeModal = () => {
        setModalVisibility(!modalVisibility);
    };

    function validation(inp) {
        if (inp > 0) {
            if (inp <= selectedCoin.coinValue) {
                setAmount(Number(inp))
                setMessage2('Amount Ok');
                setColor('#00ff84be')
            } else {
                setMessage2(`Insufficient ${selectedCoin.name} (Bal: ${selectedCoin.coinValue})`);
                setColor('#ff0000be')
                setAmount(0)
            }
        }
        else {
            setMessage2('Amount must not be empty');
            setColor('#ff0000ff')
            setAmount(0)
        }
    }

    // useEffect(() => {
    //     onSnapshot(doc(db, "vault", userUID), (doc) => {
    //         const info = doc.data().coinLock
    //         setCoinLock(info);
    //     });
    // }, []);

    // function dateConverter(endDate) {
    //     let rDate = new Date(endDate)
    //     rDate = rDate.toLocaleDateString()
    //     return moment(endDate).format('DD/MM/YYYY')
    //   }
    return (
        <AppSafeAreaView backgroundColor={"#7B61FF"}>
            <View style={styles.container}>
                <View style={styles.body}>
                    <View style={{ alignItems: 'center', margin: 15 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>Travel Target Plan</Text>
                    </View>
                    <View style={styles.vault}>
                        <View style={styles.balance}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ color: '#7B61FF', fontSize: 18 }}>$
                                        <Text style={{ color: '#7B61FF', fontSize: 28, fontWeight: 'bold' }}>20,000</Text></Text>

                                </View>

                                <TouchableOpacity onPress={closeModal}>
                                    <View style={{
                                        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                                        backgroundColor: '#7B61FF', padding: 10, borderRadius: 4
                                    }}>
                                        <Text style={{ color: 'white', marginRight: 5, fontWeight: 'bold' }}>Fund Target</Text>
                                        <FontAwesomeIcon
                                            icon={faCirclePlus}
                                            color="white"
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 15 }}>
                            <Text style={{ fontSize: 20 }}>Targets ( Up to 10% p.a )</Text>
                            <Text style={{ fontSize: 11, marginTop: 5, color: '#787A8D' }}>Disciplined savings toward a defined goal.</Text>
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.6}
                            style={{ margin: 10, padding: 10, backgroundColor: 'white', borderRadius: 8 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={{ color: 'black', fontWeight: 'bold' }}>Rent</Text>
                                <View style={{
                                    backgroundColor: '#8b77f0', padding: 5, borderTopLeftRadius: 100, borderBottomLeftRadius: 100, width: 70,
                                    borderTopRightRadius: 100, alignItems: 'center', height: 30, justifyContent: 'center'
                                }}>
                                    {/* <Text style={{ fontSize: 13, color: 'white' }}>Investing</Text> */}
                                    <FontAwesomeIcon
                                        icon={faLock}
                                        color="white"
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: 10 }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ marginBottom: 5, color: '#787A8D', fontSize: 14 }}>Amount ($)</Text>
                                    <Text style={{ fontSize: 17, color: '#757577' }}>300</Text>
                                </View>
                                <Text style={{ color: 'white', width: 1, backgroundColor: '#787A8D', marginLeft: 5, height: 40 }}></Text>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ marginBottom: 5, color: '#787A8D', fontSize: 14 }}>Total % p.a</Text>
                                    <Text style={{ fontSize: 17, color: '#757577' }}>5</Text>
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
                                    <Text style={{ fontWeight: 'bold', color: '#7B61FF' }}>    6/9/2024</Text></Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.6}
                            style={{ margin: 10, padding: 10, backgroundColor: 'white', borderRadius: 8 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={{ color: 'black', fontWeight: 'bold' }}></Text>
                                <View style={{
                                    backgroundColor: '#8b77f0', padding: 5, borderTopLeftRadius: 100, borderBottomLeftRadius: 100, width: 70,
                                    borderTopRightRadius: 100, alignItems: 'center', height: 30, justifyContent: 'center'
                                }}>
                                    {/* <Text style={{ fontSize: 13, color: 'white' }}>Investing</Text> */}
                                    <FontAwesomeIcon
                                        icon={faLock}
                                        color="white"
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: 10 }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ marginBottom: 5, color: '#787A8D', fontSize: 14 }}>Amount (₦)</Text>
                                    <Text style={{ fontSize: 17, color: '#757577' }}>300</Text>
                                </View>
                                <Text style={{ color: 'white', width: 1, backgroundColor: '#787A8D', marginLeft: 5, height: 40 }}></Text>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ marginBottom: 5, color: '#787A8D', fontSize: 14 }}>Total % p.a</Text>
                                    <Text style={{ fontSize: 17, color: '#757577' }}>5</Text>
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
                                    <Text style={{ fontWeight: 'bold', color: '#7B61FF' }}>    6/9/2024</Text></Text>
                            </View>
                        </TouchableOpacity>



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
                                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#5e5f6d' }}>Emergency Target Plan</Text>
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
                                        onChangeText={inp => validation(Number(inp.trim()))}
                                    // value={`${amount}`}
                                    />
                                    {message2 != "" ? <Text style={{ marginBottom: 25, color: color }}>{message2}</Text> : null}

                                </View>


                                <View style={{ padding: 15 }}>
                                    <TouchableOpacity
                                        style={styles.getStarted}>
                                        <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, }}>Fund</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        </AppSafeAreaView>
    )
}
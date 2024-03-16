import { FlatList, StyleSheet, Text, View } from "react-native";
import { styles } from "../../styles/targets";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFaceSmile, faLock, } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { doc, onSnapshot, runTransaction, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { useEffect } from "react";
import moment from "moment";
import { Modal } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AppContext } from "../../../globals/AppContext";
import { AppSafeAreaView } from "../../components/AppSafeAreaView";
import { formatMoney } from "../../components/FormatMoney";


export function TargetHistoryView({ navigation }) {
    const { savingsInfo, targetName } = useContext(AppContext);

    const Targethistory = savingsInfo.filter(all => all.type == "target" && all.name == targetName && Number(all.current_balance) == 0)
    useEffect(() => {
        // console.log(Targethistory);
    }, [])


    return (
        <AppSafeAreaView backgroundColor={"#7B61FF"}>
            <View style={styles.container}>
                <StatusBar style="light" />
                <View style={styles.body}>
                    <View style={{ alignItems: 'center', margin: 15 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', textTransform: "capitalize" }}>{targetName} History</Text>
                    </View>
                    <View style={styles.vault}>
                        <View style={styles.balance}>
                        </View>

                        {Targethistory.length > 0 ?
                            <FlatList style={{ flex: 1 }}
                                data={Targethistory} renderItem={({ item }) => {
                                    return (
                                        <View
                                            activeOpacity={0.6}
                                            style={{ margin: 10, padding: 10, backgroundColor: 'white', borderRadius: 8 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <Text numberOfLines={1} style={{ color: 'black', fontWeight: 'bold', flex: 1 }}></Text>
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
                                                    <Text style={{ marginBottom: 5, color: '#787A8D', fontSize: 14 }}>Target Amount (₦)</Text>
                                                    <Text style={{ fontSize: 17, color: '#757577' }}>{formatMoney(item.target)}</Text>
                                                </View>
                                                <Text style={{ color: 'white', width: 1, backgroundColor: '#787A8D', marginLeft: 5, height: 40 }}></Text>
                                                <View style={{ alignItems: 'center' }}>
                                                    <Text style={{ marginBottom: 5, color: '#787A8D', fontSize: 14, textTransform: "capitalize" }}>savings</Text>
                                                    <Text style={{ fontSize: 17, color: '#757577', }}>completed</Text>
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
                                                <Text style={{ fontSize: 12, color: '#7B61FF' }}>Deposit date:
                                                    <Text style={{ fontWeight: 'bold', color: '#7B61FF' }}> {moment(item.created_at).format('MMMM Do YYYY, h:mm:ss a')}</Text></Text>
                                            </View>
                                        </View>
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
                                <Text style={{ fontSize: 16, marginTop: 20, color: 'gray' }}>No History yet</Text>
                            </View>
                        }
                    </View>

                </View>




            </View >
        </AppSafeAreaView>
    )
}
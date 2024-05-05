import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/targetmenu";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMinus, faSquareArrowUpRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../../globals/AppContext";
import { useState } from "react";
import { AppSafeAreaView } from "../../components/AppSafeAreaView";
import { formatMoney } from "../../components/FormatMoney";


export function FixedMenu({ navigation }) {
    const { savingsInfo } = useContext(AppContext);

    const fixedBalance = () => {
        let amt = 0
        savingsInfo.filter(all => all.type == "fixed").forEach(d => {
            amt += Number(d.current_balance) + (d.status == "completed" ? 0 : Number(d.total_interest))
        })
        return amt
    }


    return (
        <AppSafeAreaView backgroundColor={"#7B61FF"}>
            <View style={styles.container}>
                <View style={styles.body}>
                    <View style={{ alignItems: 'center', margin: 15 }}>
                        {/* <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>Business Target</Text> */}
                    </View>
                    <View style={styles.vault}>

                        <View style={{ alignItems: 'center', margin: 10 }}>
                            <Text style={{ fontSize: 20 }}>Get (Up to 20% p.a)</Text>
                            <Text style={{ fontSize: 28, fontWeight: 'bold', margin: 5, color: '#7B61FF' }}>₦{formatMoney(fixedBalance())}</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <View style={{ marginLeft: 20, marginRight: 20, flex: 1, justifyContent: "center", }}>
                                <View style={{ backgroundColor: '#9582f5', marginBottom: 20, borderRadius: 50 }}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('FixedTarget')}
                                        activeOpacity={1}
                                    >

                                        <View style={{ marginTop: 58, position: 'absolute', top: -40, right: "40%", }}>
                                            <View style={{ backgroundColor: "#c6c2dd", padding: 35, borderTopLeftRadius: 48, borderTopRightRadius: 48, }}>

                                            </View>
                                        </View>
                                        <View style={{ backgroundColor: '#c6c2dd', borderRadius: 20, marginTop: 30, marginLeft: 10, marginRight: 10, padding: 20, marginBottom: 0 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>

                                                <View style={{ flex: 1 }}>
                                                    <Text style={{ fontSize: 19, color: '#7B61FF', fontWeight: 'bold' }}>My Secure Account</Text>
                                                    <Text style={{ color: '#5f5f5f' }}>Click to review your secure locks at a glance.</Text>
                                                </View>
                                                <TouchableOpacity
                                                    onPress={() => navigation.navigate('FixedTarget')}
                                                    style={{ backgroundColor: '#dcdae6', padding: 15, borderRadius: 100, }}>
                                                    <FontAwesomeIcon
                                                        icon={faSquareArrowUpRight}
                                                        color="#7B61FF"
                                                        size={30}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                    </TouchableOpacity>
                                </View>

                                <View style={{ backgroundColor: '#9582f5', marginTop: 20, padding: 0, borderRadius: 50 }}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('FixedCreate')}
                                        activeOpacity={1}
                                    >

                                        <View style={{ marginTop: 58, position: 'absolute', top: -40, right: "40%", }}>
                                            <View style={{ backgroundColor: "#c6c2dd", padding: 35, borderTopLeftRadius: 48, borderTopRightRadius: 48, }}>

                                            </View>
                                        </View>
                                        <View style={{ backgroundColor: '#c6c2dd', borderRadius: 20, marginTop: 30, marginLeft: 10, marginRight: 10, padding: 20, marginBottom: 0 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>

                                                <View style={{ flex: 1 }}>
                                                    <Text style={{ fontSize: 19, color: '#7B61FF', fontWeight: 'bold' }}>Create New Account</Text>
                                                    <Text style={{ color: '#5f5f5f' }}>Set up your secure account now avoid over spending.</Text>
                                                </View>
                                                <TouchableOpacity
                                                    onPress={() => navigation.navigate('FixedCreate')}
                                                    style={{ backgroundColor: '#dcdae6', padding: 15, borderRadius: 100, }}>
                                                    <FontAwesomeIcon
                                                        icon={faSquareArrowUpRight}
                                                        color="#7B61FF"
                                                        size={30}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>


                    </View>
                </View>
            </View>
        </AppSafeAreaView>
    )
}
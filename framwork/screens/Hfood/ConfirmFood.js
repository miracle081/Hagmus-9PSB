import { Image, ImageBackground, Pressable, ScrollView, Text, TouchableOpacity, View, Button, StyleSheet, TextInput } from "react-native";
import { styles } from "../../styles/foodintro";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { AppSafeAreaView } from "../../components/AppSafeAreaView";
import { faChevronDown, faCircleDot, faLocation, faLocationDot, faMinus, faPlus, faXmark, } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-native";
import { useContext, useState } from "react";
import { AppContext } from "../../../globals/AppContext";



export function ConfirmFood({ navigation }) {
    const { userInfo } = useContext(AppContext);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);
    const [count3, setCount3] = useState(0);
    const [count4, setCount4] = useState(0);


    // Top up increament and decreament button //
    const increaseCount = (setCount, count) => setCount(count + 1);
    const decreaseCount = (setCount, count) => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    const closeModal = () => {
        setModalVisibility(!modalVisibility);
    };

    return (
        <AppSafeAreaView >
            <View style={styles.container}>
                <View style={styles.body}>
                    <TouchableOpacity style={{ alignItems: 'center', margin: 15, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#7B61FF', marginLeft: 15, marginRight: 10 }}>Kilimanjaro</Text>
                    </TouchableOpacity>



                    <View style={{ padding: 15, margin: 5 }}>

                        <View style={{ margin: 5 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#7B61FF' }}>Top Up</Text>
                        </View>


                    </View>



                    <View style={{ flex: 1 }}>

                        <ScrollView style={{ flex: 1, marginVertical: 10 }}>
                            <View style={styles.Box}>
                                <View style={styles.boxView}>
                                    <View
                                        style={styles.boxStyle2}>
                                        <View>
                                            <View style={{ alignItems: "center", flexDirection: 'row', justifyContent: 'space-between' }}>

                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <View style={{ backgroundColor: '#eeebff', borderRadius: 8, marginRight: 8 }}>
                                                        <Image source={require('../../../assets/Kili11.png')} style={{ width: 118, height: 80 }} />
                                                    </View>
                                                    <Text style={{ color: '#042024ff', fontSize: 18, }}>Fried Rice</Text>
                                                </View>

                                                <View style={{
                                                    flexDirection: 'row', alignItems: 'center',
                                                    backgroundColor: '#d7d0fc', padding: 5, borderRadius: 8
                                                }}>
                                                    <TouchableOpacity style={{ marginRight: 20, borderWidth: 2, borderColor: '#bbadff', borderRadius: 4 }} onPress={() => decreaseCount(setCount1, count1)}>
                                                        <FontAwesomeIcon icon={faMinus} size={20} />
                                                    </TouchableOpacity>

                                                    <View>
                                                        <Text style={styles.countText}>{count1}</Text>
                                                    </View>

                                                    <TouchableOpacity style={{ marginLeft: 20, borderWidth: 2, borderColor: '#bbadff', borderRadius: 4 }} onPress={() => increaseCount(setCount1, count1)}>
                                                        <FontAwesomeIcon icon={faPlus} size={20} />
                                                    </TouchableOpacity>

                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.Box}>
                                <View style={styles.boxView}>
                                    <View
                                        style={styles.boxStyle2}>
                                        <View>
                                            <View style={{ alignItems: "center", flexDirection: 'row', justifyContent: 'space-between' }}>

                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <View style={{ backgroundColor: '#eeebff', borderRadius: 8, marginRight: 8 }}>
                                                        <Image source={require('../../../assets/water.png')} style={{ width: 118, height: 80 }} />
                                                    </View>
                                                    <Text style={{ color: '#042024ff', fontSize: 18, }}>Water</Text>
                                                </View>

                                                <View style={{
                                                    flexDirection: 'row', alignItems: 'center',
                                                    backgroundColor: '#d7d0fc', padding: 5, borderRadius: 8
                                                }}>
                                                    <TouchableOpacity style={{ marginRight: 20, borderWidth: 2, borderColor: '#bbadff', borderRadius: 4 }} onPress={() => decreaseCount(setCount2, count2)}>
                                                        <FontAwesomeIcon icon={faMinus} size={20} />
                                                    </TouchableOpacity>

                                                    <View>
                                                        <Text style={styles.countText}>{count2}</Text>
                                                    </View>

                                                    <TouchableOpacity style={{ marginLeft: 20, borderWidth: 2, borderColor: '#bbadff', borderRadius: 4 }} onPress={() => increaseCount(setCount2, count2)}>
                                                        <FontAwesomeIcon icon={faPlus} size={20} />
                                                    </TouchableOpacity>

                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.Box}>
                                <View style={styles.boxView}>
                                    <View
                                        style={styles.boxStyle2}>
                                        <View>
                                            <View style={{ alignItems: "center", flexDirection: 'row', justifyContent: 'space-between' }}>

                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <View style={{ backgroundColor: '#eeebff', borderRadius: 8, marginRight: 8 }}>
                                                        <Image source={require('../../../assets/coke.png')} style={{ width: 118, height: 80 }} />
                                                    </View>
                                                    <Text style={{ color: '#042024ff', fontSize: 18, }}>coke</Text>
                                                </View>

                                                <View style={{
                                                    flexDirection: 'row', alignItems: 'center',
                                                    backgroundColor: '#d7d0fc', padding: 5, borderRadius: 8
                                                }}>
                                                    <TouchableOpacity style={{ marginRight: 20, borderWidth: 2, borderColor: '#bbadff', borderRadius: 4 }} onPress={() => decreaseCount(setCount3, count3)}>
                                                        <FontAwesomeIcon icon={faMinus} size={20} />
                                                    </TouchableOpacity>

                                                    <View>
                                                        <Text style={styles.countText}>{count3}</Text>
                                                    </View>

                                                    <TouchableOpacity style={{ marginLeft: 20, borderWidth: 2, borderColor: '#bbadff', borderRadius: 4 }} onPress={() => increaseCount(setCount3, count3)}>
                                                        <FontAwesomeIcon icon={faPlus} size={20} />
                                                    </TouchableOpacity>

                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.Box}>
                                <View style={styles.boxView}>
                                    <View
                                        style={styles.boxStyle2}>
                                        <View>
                                            <View style={{ alignItems: "center", flexDirection: 'row', justifyContent: 'space-between' }}>

                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <View style={{ backgroundColor: '#eeebff', borderRadius: 8, marginRight: 8 }}>
                                                        <Image source={require('../../../assets/salad.png')} style={{ width: 118, height: 80 }} />
                                                    </View>
                                                    <Text style={{ color: '#042024ff', fontSize: 18, }}>salad</Text>
                                                </View>

                                                <View style={{
                                                    flexDirection: 'row', alignItems: 'center',
                                                    backgroundColor: '#d7d0fc', padding: 5, borderRadius: 8
                                                }}>
                                                    <TouchableOpacity style={{ marginRight: 20, borderWidth: 2, borderColor: '#bbadff', borderRadius: 4 }} onPress={() => decreaseCount(setCount4, count4)}>
                                                        <FontAwesomeIcon icon={faMinus} size={20} />
                                                    </TouchableOpacity>

                                                    <View>
                                                        <Text style={styles.countText}>{count4}</Text>
                                                    </View>

                                                    <TouchableOpacity style={{ marginLeft: 20, borderWidth: 2, borderColor: '#bbadff', borderRadius: 4 }} onPress={() => increaseCount(setCount4, count4)}>
                                                        <FontAwesomeIcon icon={faPlus} size={20} />
                                                    </TouchableOpacity>

                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>


                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20, justifyContent: 'center', }}>
                                <FontAwesomeIcon icon={faLocationDot} size={20} />
                                <TextInput
                                    placeholder="delivery address"
                                    selectionColor={'#7B61FF'}
                                    style={{ borderWidth: 1, width: '80%', borderRadius: 8, padding: 15, marginLeft: 5 }}
                                    value={userInfo.address}
                                />

                            </View>


                            < View style={{ padding: 15, marginTop: 20, marginTop: 0 }}>
                                <TouchableOpacity
                                    onPress={closeModal}
                                    style={styles.getStarted}>
                                    <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, color: 'white' }}>Proceed</Text>
                                </TouchableOpacity>
                            </View>


                        </ScrollView>
                    </View>

                </View>

                {/* ============== Food Modal ============== */}
                <Modal
                    visible={modalVisibility}
                    animationType="slide"
                    transparent={true}
                >
                    <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
                        <Pressable style={{ flex: 1 }} onPress={closeModal} >
                        </Pressable>
                        <View style={{ backgroundColor: "#fcfbff", height: '70%', borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                            <View style={{ alignItems: 'flex-end', margin: 5 }}>
                                <TouchableOpacity onPress={closeModal}>
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        size={30}
                                        color='#7B61FF'
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={{ padding: 0 }}>
                                <Image source={require('../../../assets/bg1food.png')} style={{ width: '100%', height: 112 }} />
                            </View>

                            <View style={{ marginTop: 20 }}>
                                <View style={{ padding: 0, alignItems: 'center' }}>
                                    <Image source={require('../../../assets/Kili11.png')} style={{ width: '50%', height: 100 }} />
                                </View>
                                <View style={{ padding: 5 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>Fried Rice</Text>

                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <FontAwesomeIcon icon={faCircleDot} color="#7B61FF" />
                                        <Text style={{ marginLeft: 5, fontSize: 17 }}>Water, Salad, Coke, Extra Chicken</Text>
                                    </View>
                                    <View style={{ borderBottomColor: '#a593fc', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 15, marginTop: 8 }} />

                                </View>

                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>N5,700</Text>
                                </View>


                                < View style={{ padding: 15, marginTop: 20, marginTop: 0 }}>
                                    <TouchableOpacity
                                        style={styles.getStarted}>
                                        <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, color: 'white' }}>Pay</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>




                        </View>
                    </View>
                </Modal>
            </View>
        </AppSafeAreaView>
    )
}
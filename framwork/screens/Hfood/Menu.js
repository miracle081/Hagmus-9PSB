import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/foodintro";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { AppSafeAreaView } from "../../components/AppSafeAreaView";
import { faArrowRight, faChevronDown, faFilter, faHandHolding, faLocationDot, faNairaSign, faPeopleGroup, faSearch, } from "@fortawesome/free-solid-svg-icons";



export function Menu({ navigation }) {
    return (
        <AppSafeAreaView >
            <View style={styles.container}>
                <View style={styles.body}>
                    <TouchableOpacity style={{ alignItems: 'center', margin: 15, flexDirection: 'row', justifyContent: 'center' }}>
                        <FontAwesomeIcon icon={faLocationDot} size={20} color="#7B61FF" />
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#7B61FF', marginLeft: 15, marginRight: 10 }}>Abuja NG</Text>
                        <FontAwesomeIcon icon={faChevronDown} size={20} color="#7B61FF" />
                    </TouchableOpacity>

                    <View style={{ alignItems: 'center', marginTop: 30, flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={[styles.FoodSearch, { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }]}>
                            <FontAwesomeIcon icon={faSearch} size={20} color="#7B61FF" />
                            <TextInput
                                placeholder="Search Restaurant"
                                selectionColor={'#7B61FF'}
                                style={styles.FoodSearch2}
                            />
                        </View>
                    </View>

                    <View style={{ padding: 15, margin: 5 }}>

                        <View style={{ margin: 5 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#7B61FF' }}>Quick Tap</Text>
                        </View>

                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <TouchableOpacity style={{ alignItems: 'center', backgroundColor: '#bcb0f3', borderRadius: 10, margin: 5 }}>
                                    <Image source={require('../../../assets/Burger.png')} style={{ width: 90, height: 75 }} />
                                    <Text style={{ color: '#042024ff', marginBottom: 8, fontSize: 14, }}>Burger</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ alignItems: 'center', backgroundColor: '#ede9ff', borderRadius: 10, margin: 5 }}>
                                    <Image source={require('../../../assets/Shawarma.png')} style={{ width: 90, height: 75 }} />
                                    <Text style={{ color: '#042024ff', marginBottom: 8, fontSize: 14, }}>Shawarma</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ alignItems: 'center', backgroundColor: '#ede9ff', borderRadius: 10, margin: 5 }}>
                                    <Image source={require('../../../assets/Pizza.png')} style={{ width: 90, height: 75, marginTop: 3 }} />
                                    <Text style={{ color: '#042024ff', marginBottom: 8, fontSize: 14, }}>Pizza</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ alignItems: 'center', backgroundColor: '#ede9ff', borderRadius: 10, margin: 5 }}>
                                    <Image source={require('../../../assets/Chips.png')} style={{ width: 90, height: 75 }} />
                                    <Text style={{ color: '#042024ff', marginBottom: 8, fontSize: 14, }}>Chips</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ alignItems: 'center', backgroundColor: '#ede9ff', borderRadius: 10, margin: 5 }}>
                                    <Image source={require('../../../assets/Wings.png')} style={{ width: 90, height: 75 }} />
                                    <Text style={{ color: '#042024ff', marginBottom: 8, fontSize: 14, }}>Wings</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ alignItems: 'center', backgroundColor: '#ede9ff', borderRadius: 10, margin: 5 }}>
                                    <Image source={require('../../../assets/Icecream.png')} style={{ width: 90, height: 75 }} />
                                    <Text style={{ color: '#042024ff', marginBottom: 8, fontSize: 14, }}>Icecream</Text>
                                </TouchableOpacity>


                            </View>

                        </ScrollView>
                    </View>



                    <View style={{ flex: 1 }}>

                        <View style={{ marginLeft: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#302e3a' }}>Recommended Restaurants</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ marginRight: 5, color: '#7B61FF' }}>See all</Text>
                                <FontAwesomeIcon icon={faArrowRight} style={{ color: '#7B61FF' }} />
                            </View>
                        </View>


                        <ScrollView style={{ flex: 1,marginVertical:10 }}>
                            <View style={styles.Box}>
                                <View style={styles.boxView}>
                                    <TouchableOpacity
                                        onPress={()=>navigation.navigate('FoodMenu')}
                                        style={[styles.boxStyle, { backgroundColor: '#ede9ff', }]}>
                                        <View style={{ alignItems: 'center' }}>
                                            <View style={{ padding: 5, alignItems: "center" }}>
                                                <Image source={require('../../../assets/Kili.png')} style={{ width: 80, height: 80 }} />
                                            </View>
                                            <View style={{ marginTop: 10, alignItems: "center" }}>
                                                <Text style={{ color: '#042024ff', marginBottom: 8, fontSize: 16, fontWeight: "bold" }}>Kilimanjaro</Text>
                                                <Text style={{ color: '#5f5f5f', marginLeft: 0, fontSize: 10 }}>
                                                    {/* <Text style={{ fontSize: 13, color: '#5f5f5f', }}>₦ 0.00</Text> */}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.boxStyle, { backgroundColor: '#ede9ff', }]}>
                                        <View style={{ alignItems: 'center' }}>
                                            <View style={{ padding: 5, alignItems: "center" }}>
                                                <Image source={require('../../../assets/chiki.png')} style={{ width: 80, height: 80 }} />
                                            </View>
                                            <View style={{ marginTop: 10, alignItems: "center" }}>
                                                <Text style={{ color: '#042024ff', marginBottom: 8, fontSize: 16, fontWeight: "bold" }}>Chicken Republic</Text>
                                                <Text style={{ color: '#5f5f5f', marginLeft: 0, fontSize: 10 }}>
                                                    {/* <Text style={{ fontSize: 13, color: '#5f5f5f', }}>₦ 0.00</Text> */}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                </View>
                            </View>

                            <View style={styles.Box}>
                                <View style={styles.boxView}>
                                    <TouchableOpacity
                                        // onPress={()=>navigation.navigate('FoodMenu')}
                                        style={[styles.boxStyle, { backgroundColor: '#ede9ff', }]}>
                                        <View style={{ alignItems: 'center' }}>
                                            <View style={{ padding: 5, alignItems: "center" }}>
                                                <Image source={require('../../../assets/pizzahut.png')} style={{ width: 80, height: 80 }} />
                                            </View>
                                            <View style={{ marginTop: 10, alignItems: "center" }}>
                                                <Text style={{ color: '#042024ff', marginBottom: 8, fontSize: 16, fontWeight: "bold" }}>Pizza Hut</Text>
                                                <Text style={{ color: '#5f5f5f', marginLeft: 0, fontSize: 10 }}>
                                                    {/* <Text style={{ fontSize: 13, color: '#5f5f5f', }}>₦ 0.00</Text> */}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.boxStyle, { backgroundColor: '#ede9ff', }]}>
                                        <View style={{ alignItems: 'center' }}>
                                            <View style={{ padding: 5, alignItems: "center" }}>
                                                <Image source={require('../../../assets/chiki.png')} style={{ width: 80, height: 80 }} />
                                            </View>
                                            <View style={{ marginTop: 10, alignItems: "center" }}>
                                                <Text style={{ color: '#042024ff', marginBottom: 8, fontSize: 16, fontWeight: "bold" }}>Chicken Republic</Text>
                                                <Text style={{ color: '#5f5f5f', marginLeft: 0, fontSize: 10 }}>
                                                    {/* <Text style={{ fontSize: 13, color: '#5f5f5f', }}>₦ 0.00</Text> */}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                </View>
                            </View>

                            <View style={styles.Box}>
                                <View style={styles.boxView}>
                                    <TouchableOpacity
                                        // onPress={()=>navigation.navigate('FoodMenu')}
                                        style={[styles.boxStyle, { backgroundColor: '#ede9ff', }]}>
                                        <View style={{ alignItems: 'center' }}>
                                            <View style={{ padding: 5, alignItems: "center" }}>
                                                <Image source={require('../../../assets/pizzahut.png')} style={{ width: 80, height: 80 }} />
                                            </View>
                                            <View style={{ marginTop: 10, alignItems: "center" }}>
                                                <Text style={{ color: '#042024ff', marginBottom: 8, fontSize: 16, fontWeight: "bold" }}>Pizza Hut</Text>
                                                <Text style={{ color: '#5f5f5f', marginLeft: 0, fontSize: 10 }}>
                                                    {/* <Text style={{ fontSize: 13, color: '#5f5f5f', }}>₦ 0.00</Text> */}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.boxStyle, { backgroundColor: '#ede9ff', }]}>
                                        <View style={{ alignItems: 'center' }}>
                                            <View style={{ padding: 5, alignItems: "center" }}>
                                                <Image source={require('../../../assets/chiki.png')} style={{ width: 80, height: 80 }} />
                                            </View>
                                            <View style={{ marginTop: 10, alignItems: "center" }}>
                                                <Text style={{ color: '#042024ff', marginBottom: 8, fontSize: 16, fontWeight: "bold" }}>Chicken Republic</Text>
                                                <Text style={{ color: '#5f5f5f', marginLeft: 0, fontSize: 10 }}>
                                                    {/* <Text style={{ fontSize: 13, color: '#5f5f5f', }}>₦ 0.00</Text> */}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                </View>
                            </View>

                        </ScrollView>
                    </View>

                </View>
            </View>
        </AppSafeAreaView>
    )
}
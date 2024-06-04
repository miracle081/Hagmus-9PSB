import { Image, ImageBackground, Pressable, ScrollView, Text,  TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/foodintro";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { AppSafeAreaView } from "../../components/AppSafeAreaView";
import { faArrowRight, faChevronDown, faLocation, faShoppingCart, faXmark, } from "@fortawesome/free-solid-svg-icons";




export function FoodMenu({ navigation }) {
  

    return (
        <AppSafeAreaView >
            <View style={styles.container}>
                <View style={styles.body}>
                    <TouchableOpacity style={{ alignItems: 'center', margin: 15, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#7B61FF', marginLeft: 15, marginRight: 10 }}>Kilimanjaro</Text>
                    </TouchableOpacity>

                   

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

                        <ScrollView style={{ flex: 1,marginVertical:10 }}>
                            <View style={styles.Box}>
                                <View style={styles.boxView}>
                                    <TouchableOpacity
                                    onPress={()=>navigation.navigate('ConfirmFood')}
                                        style={styles.boxStyle2 }>
                                        <View style={{ alignItems: 'center' }}>
                                            <View style={{ padding: 5, alignItems: "center" }}>
                                                <Image source={require('../../../assets/Kili11.png')} style={{ width: 118, height: 80 }} />
                                            </View>
                                            <View style={{alignItems: "center" }}>
                                                <Text style={{ color: '#042024ff', fontSize: 14, }}>Fried Rice</Text>
                                                <Text style={{ color: '#5f5f5f', marginLeft: 0, fontSize: 10 }}>
                                                </Text>
                                            </View>
                                            
                                        </View>
                                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginHorizontal:5}}>
                                                <Text style={{ color: '#042410ff', fontSize: 16, fontWeight: "bold" }}> ₦5,000</Text>

                                                <View style={{flexDirection:'row',alignItems:'center', backgroundColor:'#cdc3fe',padding:5,
                                                    borderTopLeftRadius:8,borderTopRightRadius:8,borderBottomRightRadius:8
                                                    }}>
                                                    <FontAwesomeIcon icon={faShoppingCart} size={13}/>
                                                    <Text style={{marginLeft:3}}>Get</Text>
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
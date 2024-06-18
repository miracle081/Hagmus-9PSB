import { FlatList, Image, ImageBackground, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/foodintro";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { AppSafeAreaView } from "../../components/AppSafeAreaView";
import { faArrowRight, faChevronDown, faLocation, faSearch, faShoppingCart, faXmark, } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../../../globals/AppContext";
import { useContext, useEffect, useState } from "react";
import { BaseURLFood } from "../../../config";
import { formatMoney } from "../../components/FormatMoney";


export function FoodMenu({ navigation }) {
    const { tokenFood, setPreloader, doc } = useContext(AppContext);
    const [vendorsFood, setVendorsFood] = useState([]);
    const [filteredVendorsFood, setfilteredVendorsFood] = useState([]);

    function getVendorFood() {
        setPreloader(true)
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${tokenFood}`
            },
            redirect: 'follow'
        };
        fetch(`${BaseURLFood}/v1/food/vendors/${doc.slug}/menu`, requestOptions)
            .then(response => response.json())
            .then(response => {
                const { data, status, message } = response;
                // console.log(data);
                setPreloader(false)
                if (status) {
                    setVendorsFood(data.menu);
                    setfilteredVendorsFood(data.menu);
                } else {
                    Alert.alert(
                        'Sorry!',
                        message,
                        [{ text: 'Try again' }]
                    )
                }
            })
            .catch(error => {
                setPreloader(false)
                console.log('error', error)
                if (error.message == "JSON Parse error: Unexpected character: <") Alert.alert("Error!", "Network error, please try again");
                else Alert.alert("Error!", error.message)
            });
    }

    useEffect(() => {
        getVendorFood()
    }, []);

    function handleSearch(inp) {
        const newVendors = vendorsFood.filter(item => item.name.toLowerCase().includes(inp.toLowerCase()));
        setfilteredVendorsFood(newVendors);
    }

    return (
        <AppSafeAreaView >
            <View style={styles.container}>
                <View style={styles.body}>
                    <TouchableOpacity style={{ alignItems: 'center', margin: 15, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#7B61FF', marginLeft: 15, marginRight: 10, textTransform: "capitalize" }}>{doc.name}</Text>
                    </TouchableOpacity>


                    <View style={{ alignItems: 'center', marginTop: 30, flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={[styles.FoodSearch, { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }]}>
                            <FontAwesomeIcon icon={faSearch} size={20} color="#7B61FF" />
                            <TextInput
                                placeholder="Search Restaurant"
                                selectionColor={'#7B61FF'}
                                style={styles.FoodSearch2}
                                onChangeText={handleSearch}
                            />
                        </View>
                    </View>

                    <View style={{ flex: 1 }}>

                        <FlatList data={filteredVendorsFood}
                            initialNumToRender={10}
                            style={{ flex: 1, padding: 5 }}
                            numColumns={2}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('ConfirmFood')}
                                        style={styles.boxStyle2}>
                                        <View style={{ alignItems: 'center' }}>
                                            <View style={{ padding: 5, alignItems: "center" }}>
                                                <Image source={require('../../../assets/Kili11.png')} style={{ width: 118, height: 80 }} />
                                            </View>
                                            <View style={{ alignItems: "center" }}>
                                                <Text style={{ color: '#042024ff', fontSize: 14, textTransform: "capitalize" }}>{item.name}</Text>
                                                <Text style={{ color: '#5f5f5f', marginLeft: 0, fontSize: 10 }}>
                                                </Text>
                                            </View>

                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 5 }}>
                                            <Text style={{ color: '#042410ff', fontSize: 16, fontWeight: "bold" }}> ₦{formatMoney(item.price)}</Text>

                                            <View style={{
                                                flexDirection: 'row', alignItems: 'center', backgroundColor: '#cdc3fe', padding: 5,
                                                borderTopLeftRadius: 8, borderTopRightRadius: 8, borderBottomRightRadius: 8
                                            }}>
                                                <FontAwesomeIcon icon={faShoppingCart} size={13} />
                                                <Text style={{ marginLeft: 3 }}>Get</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                )
                            }} key={({ item }) => { item.id }} />
                    </View>

                </View>


            </View>
        </AppSafeAreaView>
    )
}
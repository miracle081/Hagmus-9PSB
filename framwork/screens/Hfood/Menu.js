import { Alert, FlatList, Image, Modal, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/foodintro";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { AppSafeAreaView } from "../../components/AppSafeAreaView";
import { faArrowRight, faChevronDown, faFilter, faHandHolding, faLocationDot, faNairaSign, faPeopleGroup, faSearch, faXmark, } from "@fortawesome/free-solid-svg-icons";
import { BaseURLFood } from "../../../config";
import { AppContext } from "../../../globals/AppContext";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { handleError } from "../../components/HandleRequestError";



export function Menu({ navigation }) {
    const { tokenFood, setPreloader, setDoc } = useContext(AppContext);
    const [vendors, setVendors] = useState([]);
    const [filteredVendors, setfilteredVendors] = useState([]);
    const [modalVisibility, setModalVisibility] = useState(false);

    const closeModal = () => {
        setModalVisibility(!modalVisibility);
    };
    function getUserInfo() {
        setPreloader(true)
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${tokenFood}`
            },
            redirect: 'follow'
        };
        fetch(`${BaseURLFood}/v1/food/vendors`, requestOptions)
            .then(response => response.json())
            .then(response => {
                const { data, status, message } = response;
                // console.log(data);
                setPreloader(false)
                if (status) {
                    setVendors(data);
                    setfilteredVendors(data);
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
        getUserInfo()
    }, []);


    function handleSearch(inp) {
        const newVendors = vendors.filter(item => item.name.toLowerCase().includes(inp.toLowerCase()));
        setfilteredVendors(newVendors);
    }


    return (
        <AppSafeAreaView >
            <View style={styles.container}>
                <View style={styles.body}>
                    <TouchableOpacity onPress={closeModal} style={{ alignItems: 'center', margin: 15, flexDirection: 'row', justifyContent: 'center' }}>
                        <FontAwesomeIcon icon={faLocationDot} size={20} color="#7B61FF" />
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#7B61FF', marginLeft: 15, marginRight: 10 }}>Kubwa</Text>
                        <FontAwesomeIcon icon={faChevronDown} size={20} color="#7B61FF" />
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


                        <FlatList data={filteredVendors}
                            initialNumToRender={10}
                            style={{ flex: 1, padding: 5 }}
                            numColumns={2}
                            renderItem={({ item }) => {
                                return (
                                    <View style={styles.boxView}>
                                        <TouchableOpacity
                                            onPress={() => { setDoc(item); navigation.navigate('FoodMenu') }}
                                            style={[styles.boxStyle, { backgroundColor: '#ede9ff', }]}>
                                            <View style={{ alignItems: 'center' }}>
                                                <View style={{ padding: 5, alignItems: "center" }}>
                                                    <Image source={{ uri: item.logo }} style={{ width: 80, height: 80 }} />
                                                </View>
                                                <View style={{ marginTop: 10, alignItems: "center" }}>
                                                    <Text style={{ color: '#042024ff', marginBottom: 8, fontSize: 16, fontWeight: "bold" }}>{item.name}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                    </View>
                                )
                            }} key={({ item }) => { item.id }} />
                    </View>

                    <Modal
                        visible={modalVisibility}
                        animationType="slide"
                        transparent={true}
                    >
                        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
                            <Pressable style={{ flex: 1 }} onPress={closeModal} >
                            </Pressable>
                            <View style={{ backgroundColor: "#fcfbff", height: 400, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                                <View style={{ alignItems: 'flex-end', margin: 10 }}>
                                    <TouchableOpacity onPress={closeModal}>
                                        <FontAwesomeIcon
                                            icon={faXmark}
                                            size={24}
                                            color='#7B61FF'
                                        />
                                    </TouchableOpacity>
                                </View>

                                <View>

                                    <View style={{ alignItems: 'center', }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#302e3a' }}>Recommended Restaurants</Text>

                                    </View>
                                </View>

                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        </AppSafeAreaView>
    )
}
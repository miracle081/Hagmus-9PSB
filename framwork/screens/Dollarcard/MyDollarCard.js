import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, ImageBackground, FlatList, RefreshControl } from "react-native";
import { styles } from "../../styles/aboutus";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight, faArrowLeft, faCirclePlus, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faCcMastercard, faCcVisa, faFacebook, faLinkedin, faTelegram, faTwitter, faWeebly } from "@fortawesome/free-brands-svg-icons";
import { useContext } from "react";
import { AppContext } from "../../../globals/AppContext";
import { FontAwesome } from '@expo/vector-icons';

export function MyDollarCard({ navigation }) {
    const { userCards, userInfo, setCardId, getUserCards } = useContext(AppContext);


    const handleRefresh = () => {
        getUserCards()
    }

    return (
        <View style={styles.container}>

            <ImageBackground
                source={require('../../../assets/888.png')} // Replace with the path to your image
                style={{ height: 100 }}
            >
                {/* Other components can be placed inside ImageBackground */}
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        color='#7B61FF'
                        size={25}
                        style={{ marginTop: 47, marginLeft: 10 }}
                    />
                </TouchableOpacity>


            </ImageBackground>

            <ScrollView refreshControl={
                <RefreshControl refreshing={false} onRefresh={handleRefresh} />
            }>
                <View style={styles.body}>
                    <View style={{ alignItems: 'center', marginBottom: 18 }}>
                        <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#302856' }}>Virtual Dollar Cards</Text>
                        <Text style={{ color: '#302856' }}>For your online needs</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('DollarCards')}
                        style={{
                            backgroundColor: '#ffffff', padding: 15, margin: 18, borderWidth: 1, borderColor: '#7B61FF',
                            borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                        }}>
                        <Text style={{ color: '#7B61FF', fontSize: 16, marginRight: 15, fontWeight: 'bold' }}>Create New Card</Text>
                        <FontAwesomeIcon icon={faCirclePlus} color="#7B61FF" size={19} />
                    </TouchableOpacity>
                    {userCards.map((item, index) => {

                        if (item.card_status != "canceled") {
                            return (<View key={index} style={{ margin: 15, }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontSize: 13, color: '#30207e', fontWeight: 'bold' }}>V-Card </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => { setCardId(item.id); navigation.navigate('ViewCard') }}
                                    style={{ padding: 15, backgroundColor: '#c2b8f4', borderRadius: 15, margin: 15 }}>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginBottom: 30 }}>
                                        <Text style={{ color: '#14055f' }}>{userInfo.first_name} {userInfo.last_name}</Text>
                                        <Text style={{ color: '#14055f' }}>{item.card_brand}</Text>
                                    </View>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#14055f' }}>{item.card_number}</Text>
                                        {item.card_brand == "MasterCard" ? <FontAwesomeIcon icon={faCcMastercard} size={28} color="#14055f" /> :
                                            <FontAwesome name="credit-card" size={25} color="#14055f" />}
                                    </View>
                                </TouchableOpacity>
                            </View>
                            )
                        }
                    })
                    }
                </View>
            </ScrollView>
        </View>
    )
}
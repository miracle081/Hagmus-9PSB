import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/foodintro";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { AppSafeAreaView } from "../../components/AppSafeAreaView";



export function Landing({ navigation }) {
    return (
        <AppSafeAreaView backgroundColor={"#7B61FF"}>
            <View style={styles.container}>
                <View style={styles.body}>
                    <View style={{ alignItems: 'center', margin: 15 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>HFOOD</Text>
                    </View>
                    <View style={styles.vault}>

                        <View>

                        <View style={{ alignItems: 'center', marginTop: 30, }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#7B61FF', }}>Order your food</Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#7B61FF', }}>Anytime, Anywhere</Text>
                                <Text style={{ fontSize: 12, color: '#606169', marginTop: 5 }}>Instant delivery at your door step </Text>
                                <Text style={{ fontSize: 12, color: '#7B61FF', marginTop: 5 }}>order Now.</Text>
                            </View>

                            <View style={{ alignItems: 'center', marginTop:15,justifyContent:'center' }}>
                                <Image source={require('../../../assets/Hfood.png')} style={{ width: 300, height: 420 }} />
                            </View>

                           

                            < View style={{ padding: 15, marginTop: 20,marginTop:0}}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Menu')}
                                    style={styles.getStarted}>
                                    <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, color: 'white' }}>Proceed</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </AppSafeAreaView> 
    )
}
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/businesstargetinfo";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { AppSafeAreaView } from "../../components/AppSafeAreaView";


export function SpendRetainInfo({ navigation }) {
    
    return (
        <AppSafeAreaView backgroundColor={"#7B61FF"}>
            <View style={styles.container}>
                <View style={styles.body}>
                    <View style={{ alignItems: 'center', margin: 15 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>Spend and Retain</Text>
                    </View>
                    <View style={styles.vault}>

                        <View>
                            <View style={{ alignItems: 'center', margin: 40 }}>
                                <Image source={require('../../../assets/business.png')} style={{ width: 200, height: 200 }} />
                            </View>

                            <View style={{ alignItems: 'center', marginTop: 30, }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#7B61FF', }}>Spend and Retain plan</Text>
                                <Text style={{ fontSize: 12, color: '#606169', marginTop: 5 }}>Save a Percentage after each spending </Text>
                                
                            </View>

                            < View style={{ padding: 15, marginTop: 20, }}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('SpendRetain')}
                                    style={styles.getStarted}>
                                    <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, color: 'white' }}>Continue</Text>
                                </TouchableOpacity>
                            </View>

                        </View>


                    </View>
                </View>
            </View>
        </AppSafeAreaView>
    )
}
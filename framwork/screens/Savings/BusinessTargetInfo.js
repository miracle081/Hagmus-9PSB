import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/businesstargetinfo";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { AppSafeAreaView } from "../../components/AppSafeAreaView";



export function BusinessTargetInfo({ navigation }) {
    return (
        <AppSafeAreaView backgroundColor={"#7B61FF"}>
            <View style={styles.container}>
                <View style={styles.body}>
                    <View style={{ alignItems: 'center', margin: 15 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>Business Target</Text>
                    </View>
                    <View style={styles.vault}>

                        <View>
                            <View style={{ alignItems: 'center', margin: 40 }}>
                                <Image source={require('../../../assets/business.png')} style={{ width: 300, height: 300 }} />
                            </View>

                            <View style={{ alignItems: 'center', marginTop: 30, }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#7B61FF', }}>Create a Business savings plan</Text>
                                <Text style={{ fontSize: 12, color: '#606169', marginTop: 5 }}>You can finance the expansion of your business by saving and </Text>
                                <Text style={{ fontSize: 12, color: '#606169', marginTop: 5 }}>earning. Earn interest every day. Let's help you get started.</Text>
                            </View>

                            < View style={{ padding: 15, marginTop: 20 }}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('TargetDate')}
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
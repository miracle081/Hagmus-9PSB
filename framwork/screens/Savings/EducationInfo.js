import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/businesstargetinfo";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { AppSafeAreaView } from "../../components/AppSafeAreaView";

export function EducationInfo({ navigation }) {
    return (
        <AppSafeAreaView backgroundColor={"#7B61FF"}>
            <View style={styles.container}>
                <View style={styles.body}>
                    <View style={{ alignItems: 'center', margin: 15 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>Education Target</Text>
                    </View>
                    <View style={styles.vault}>

                        <View>
                            <View style={{ alignItems: 'center', margin: 40 }}>
                                <Image source={require('../../../assets/educate.png')} style={{ width: 250, height: 250 }} />
                            </View>

                            <View style={{ alignItems: 'center', marginTop: 30, padding: 1 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#7B61FF', }}>Create Education plan</Text>
                                <Text style={{ fontSize: 12, color: '#606169', marginTop: 5 }}>Educational savings provide financial
                                    security and peace of mind, ensuring that you can afford quality education for yourself or your loved ones. </Text>
                            </View>

                            < View style={{ padding: 15, marginTop: 20, }}>
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
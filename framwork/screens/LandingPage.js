import {
    View, Text, Image, StyleSheet, StatusBar, Platform, ScrollView,
    TouchableOpacity
} from "react-native";
import { Kurale_400Regular } from "@expo-google-fonts/kurale";
import { useFonts, Inter_900Black, Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";
import { Raleway_300Light } from "@expo-google-fonts/raleway";
import { Button } from "react-native-paper";

export function LandingPage({ navigation }) {
    let [Loaded] = useFonts({
        Inter_900Black,
        Inter_400Regular,
        Inter_700Bold,
        Raleway_300Light,
        Kurale_400Regular,

    });

    if (!Loaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            {/* <Text>HI</Text>  */}
            <View style={styles.imageSlide}>
                <View style={styles.imageSlide1}>
                    <ScrollView horizontal={true}>

                        <View style={styles.slidecontain1}>
                            <View>
                                <Image source={require('../../assets/lnd.png')} style={{ height: 300, width: 280, marginLeft: 20 }} />
                            </View>
                            <View style={styles.text}>
                                <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 22, marginBottom: 5, marginTop:10, color: '#050507' }}>HAGMUS</Text>
                                <Text style={{ fontFamily: 'Kurale_400Regular', fontSize: 18, color:'#050507' }}>Simplifying payments one tap at a time</Text>
                            </View>
                        </View>
                    


                    </ScrollView>
                </View>

            </View>

            <View style={styles.button}>
                <View style={styles.register}>
                    <TouchableOpacity style={styles.getStarted}
                        onPress={() => navigation.navigate('Login')}>
                        <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, color:'white'}}>Get Started</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfbff',
    },
    imageSlide: {
        height: '90%',
        justifyContent: 'center',
    },
    imageSlide1: {
        alignItems: 'center',
    },
    image: {
        height: 500,
        width: 280,
    },
    slidecontain1: {
        padding: 8,
        borderRadius: 15,
        marginLeft: 8,
        // backgroundColor: '#FFFAE7'
    },
    slidecontain2: {
        padding: 8,
        borderRadius: 15,
        marginLeft: 20,
        // backgroundColor: '#FFFAE7'
    },
    slidecontain3: {
        padding: 8,
        borderRadius: 15,
        marginLeft: 20,
        marginRight:20
        // backgroundColor: '#FFFAE7'
    },
    // slidecontain1: {
    //     backgroundColor: 'white',
    //     padding: 8,
    //     borderRadius: 15,
    //     marginLeft: 12,
    //     backgroundColor: '#F9F9F9',
    //     alignItems: 'center'
    // },
    text: {
        alignItems: 'center',
        marginLeft: 15,marginTop:15
    },
    text1: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 10
    },
    button: {
        padding: 10,
    },
    getStarted: {
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: '#7B61FF'
    },

});
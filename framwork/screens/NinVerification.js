import { Text, View, TextInput, TouchableOpacity, Alert, Image, ScrollView, StatusBar, } from "react-native";
import { AppSafeAreaView } from "../components/AppSafeAreaView";
import { styles } from "../styles/signup";



export function NinVerification({ navigation }) {

  return (
    <AppSafeAreaView>
      <StatusBar style='light' />
      <View style={styles.container}>
        <View style={{ justifyContent: "flex-end", marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : null, alignItems: 'center' }}>
          <Image source={require('../../assets/Idv.png')}
            style={{ height: 190, width: 280, }} />
        </View>
        <ScrollView>
          <View style={styles.body}>
            <View style={{  alignItems: 'center', marginTop: 5, padding: 8 }}>
              <Text style={[styles.text1, { fontSize: 20, fontWeight:'bold' }]}>NIN VERIFICATION</Text>
            </View>
            <View style={{ marginBottom: 10, paddingHorizontal: 10, marginTop: 20, alignItems:'center' }}>
              <Text style={{ color: '#230e90', }}>Verify your NIN to continue</Text>
            </View>

            <View style={styles.formContainer}>
              <TextInput
                style={styles.inputStyle}
                placeholder='Enter your NIN'
                selectionColor={'#7B61FF'}
                mode='outlined'
                placeholderTextColor={"gray"}
              />

            

              <TouchableOpacity style={styles.getStarted}>
                <Text style={{ fontSize: 16, color:'white' }}>Verify</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
        <View style={{ alignItems: 'center', height: 140, marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : null, }}>
          <Image source={require('../../assets/bgpaste.png')} style={{ height: 230, width: '100%', }} />
        </View>
      </View>
    </AppSafeAreaView>
  )
}
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, ImageBackground } from "react-native";
import { styles } from "../styles/aboutus";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight, faArrowLeft, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faLinkedin, faTelegram, faTwitter, faWeebly } from "@fortawesome/free-brands-svg-icons";

export function CardIntro({ navigation }) {
  return (
    <View style={styles.container}>

      <ImageBackground
        source={require('../../assets/888.png')} // Replace with the path to your image
        style={{ height: 200 }}
      >
        {/* Other components can be placed inside ImageBackground */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            color='#ffffff'
            size={25}
            style={{ marginTop: 47, marginLeft: 10 }}
          />
        </TouchableOpacity>


      </ImageBackground>

      <ScrollView>
        <View style={styles.body}>
          <View style={{ alignItems: 'center' ,marginBottom:20}}>
            <Image source={require('../../assets/card1.png')} style={{ width: 250, height: 375, marginBottom:5 }} />
          </View>
          <View style={{ alignItems: 'center', margin: 20 }}>
            <Text style={{ fontSize: 15, color: '#464646' }}>Your online needs, Shop and Pay Globally</Text>
          </View>


          <View
            style={{ backgroundColor: '#7B61FF', padding: 10, margin: 8, borderRadius: 8, alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 18 }}>Coming Soon...</Text>
          </View>

          {/* <TouchableOpacity
            onPress={() => navigation.navigate('DollarCards')}
            style={{ backgroundColor: '#7B61FF', padding: 10, margin: 8, borderRadius: 8, alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 15 }}>Get Dollar Card</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </View>
  )
}
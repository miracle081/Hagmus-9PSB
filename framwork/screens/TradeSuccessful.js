import { Text, View, TouchableOpacity } from "react-native";
import { AppSafeAreaView } from "../components/AppSafeAreaView";
import { styles } from "../styles/successful";
import { Kurale_400Regular } from "@expo-google-fonts/kurale";
import { Inter_400Regular } from "@expo-google-fonts/inter";
import { Quicksand_400Regular } from "@expo-google-fonts/quicksand";
import { useFonts } from 'expo-font';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { symbol } from "../components/currencySymbols";
import { useContext } from "react";
import { AppContext } from "../../globals/AppContext";

export function TradeSuccessful({ navigation, route }) {
  const { name, amount, message } = route.params
  const { userInfo } = useContext(AppContext);

  return (
    <AppSafeAreaView>
      <View style={styles.container}>
        <View>
          <View style={styles.formContainer}>
            <Image source={require("../../assets/successful.png")} style={{ width: 250, height: 250 }} />
            <View style={styles.pendingText}>
              <Text style={styles.text3}>{amount} {name}</Text>
            </View>
          </View>
          <View style={{ backgroundColor: "#6449ed3c", borderRadius: 5, padding: 10, marginHorizontal: 20 }}>
            <Text style={{ color: 'white', fontFamily: "Quicksand_400Regular", textAlign: "center" }}>{message}</Text>
          </View>
        </View>
        <View style={[styles.register, { marginTop: 10 }]}>
          <TouchableOpacity onPress={() => navigation.navigate(screen)} style={styles.getStarted}>
            <Text style={{ fontSize: 15, }}>Done</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.replace("HomePage")} style={styles.pending}>
            <Text style={styles.text1}>Back Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AppSafeAreaView>
  )
}
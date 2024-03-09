import { Text, View, TouchableOpacity, Image, } from "react-native";
import { AppSafeAreaView } from "../components/AppSafeAreaView";
import { styles } from "../styles/successful";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../globals/AppContext";

export function TradeSuccessful({ navigation, route }) {
  const { name, amount, message, screen } = route.params
  const { setPreloader } = useContext(AppContext);

  useEffect(() => {
    setPreloader(false);
  }, [])

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
          <View style={{ backgroundColor: "#6449ed31", borderRadius: 5, padding: 10, marginHorizontal: 20 }}>
            <Text style={{ color: '#6449edff', fontFamily: "Quicksand_600SemiBold", textAlign: "center" }}>{message}</Text>
          </View>
        </View>
        <View style={[styles.register, { marginTop: 10 }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.getStarted}>
            <Text style={{ fontSize: 15, }}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AppSafeAreaView>
  )
}
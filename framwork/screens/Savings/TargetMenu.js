import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/targetmenu";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMinus, faSquareArrowUpRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../../../globals/AppContext";
import { useContext, useEffect, useState } from "react";
import { AppSafeAreaView } from "../../components/AppSafeAreaView";
import { formatMoney } from "../../components/FormatMoney";


export function TargetMenu({ navigation }) {
  const { setDocID, getSavings, savingsInfo, setTargetName } = useContext(AppContext);
  const [balance, setBalance] = useState(0);

  const targetBalance = () => savingsInfo.filter(all => all.type == "target").reduce((a, c) => a + parseFloat(c.current_balance), 0)

  return (
    <AppSafeAreaView backgroundColor={"#7B61FF"}>
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={{ alignItems: 'center', margin: 15 }}>
          </View>
          <View style={styles.vault}>

            <View style={{ alignItems: 'center', margin: 10 }}>
              <Text style={{ fontSize: 20 }}>Target (Up to 15% p.a)</Text>
              <Text style={{ fontSize: 28, fontWeight: 'bold', margin: 5, color: '#7B61FF' }}>₦{formatMoney(targetBalance())}</Text>
            </View>
            <ScrollView>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setTargetName("business")
                    const rDate = savingsInfo.find(all => all.name == "business")
                    rDate ? navigation.navigate("Targets", { info: rDate }) : navigation.navigate("businesstargetinfo")
                  }}
                  activeOpacity={0.7}>
                  <View style={{ marginTop: 58, position: 'absolute', top: -40, right: "40%", }}><View style={{ backgroundColor: "#c6c2dd", padding: 35, borderTopLeftRadius: 48, borderTopRightRadius: 48, }}></View></View>
                  <View style={{ backgroundColor: '#c6c2dd', borderRadius: 20, marginTop: 30, marginLeft: 10, marginRight: 10, padding: 20, }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 19, color: '#7B61FF', fontWeight: 'bold' }}>Business</Text>
                        <Text style={{ color: '#5f5f5f' }}>Business target savings drive financial stability and strategic growth.</Text>
                      </View>
                      <View style={{ backgroundColor: '#dcdae6', padding: 15, borderRadius: 100 }}>
                        <FontAwesomeIcon icon={faSquareArrowUpRight} color="#7B61FF" size={30} />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setTargetName("emergency")
                    const rDate = savingsInfo.find(all => all.name == "emergency")
                    rDate ? navigation.navigate("Targets", { info: rDate }) : navigation.navigate("EmergencyInfo")
                  }}
                  activeOpacity={1}>
                  <View style={{ marginTop: 58, position: 'absolute', top: -40, right: "40%", }}><View style={{ backgroundColor: "#c6c2dd", padding: 35, borderTopLeftRadius: 48, borderTopRightRadius: 48, }}></View></View>
                  <View style={{ backgroundColor: '#c6c2dd', borderRadius: 20, marginTop: 30, marginLeft: 10, marginRight: 10, padding: 20, }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 19, color: '#7B61FF', fontWeight: 'bold' }}>Emergency</Text>
                        <Text style={{ color: '#5f5f5f' }}>Emergency target savings ensure financial security during unforeseen circumstances.</Text>
                      </View>
                      <View style={{ backgroundColor: '#dcdae6', padding: 15, borderRadius: 100, }}>
                        <FontAwesomeIcon icon={faSquareArrowUpRight} color="#7B61FF" size={30} />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setTargetName("travel")
                    const rDate = savingsInfo.find(all => all.name == "travel")
                    rDate ? navigation.navigate("Targets", { info: rDate }) : navigation.navigate("TravelInfo")
                  }}
                  activeOpacity={1}>
                  <View style={{ marginTop: 58, position: 'absolute', top: -40, right: "40%", }}><View style={{ backgroundColor: "#c6c2dd", padding: 35, borderTopLeftRadius: 48, borderTopRightRadius: 48, }}></View></View>
                  <View style={{ backgroundColor: '#c6c2dd', borderRadius: 20, marginTop: 30, marginLeft: 10, marginRight: 10, padding: 20, }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 19, color: '#7B61FF', fontWeight: 'bold' }}>Travel</Text>
                        <Text style={{ color: '#5f5f5f' }}>Travel target savings pave the way for fulfilling your wanderlust dreams.{'\n'}</Text>
                      </View>
                      <View style={{ backgroundColor: '#dcdae6', padding: 15, borderRadius: 100, }}>
                        <FontAwesomeIcon icon={faSquareArrowUpRight} color="#7B61FF" size={30} />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setTargetName("education")
                    const rDate = savingsInfo.find(all => all.name == "education")
                    rDate ? navigation.navigate("Targets", { info: rDate }) : navigation.navigate("EducationInfo")
                  }}
                  activeOpacity={1}>
                  <View style={{ marginTop: 58, position: 'absolute', top: -40, right: "40%", }}><View style={{ backgroundColor: "#c6c2dd", padding: 35, borderTopLeftRadius: 48, borderTopRightRadius: 48, }}></View></View>
                  <View style={{ backgroundColor: '#c6c2dd', borderRadius: 20, marginTop: 30, marginLeft: 10, marginRight: 10, padding: 20, }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 19, color: '#7B61FF', fontWeight: 'bold' }}>Education</Text>
                        <Text style={{ color: '#5f5f5f' }}>Education target savings fuel your path to knowledge and expertise.{'\n'}</Text>
                      </View>
                      <View style={{ backgroundColor: '#dcdae6', padding: 15, borderRadius: 100, }}>
                        <FontAwesomeIcon icon={faSquareArrowUpRight} color="#7B61FF" size={30} />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setTargetName("business")
                    const rDate = savingsInfo.find(all => all.name == "business")
                    rDate ? navigation.navigate("Targets", { info: rDate }) : navigation.navigate("EducationInfo")
                  }}
                  activeOpacity={1}>
                  <View style={{ marginTop: 58, position: 'absolute', top: -40, right: "40%", }}><View style={{ backgroundColor: "#c6c2dd", padding: 35, borderTopLeftRadius: 48, borderTopRightRadius: 48, }}></View></View>
                  <View style={{ backgroundColor: '#c6c2dd', borderRadius: 20, marginTop: 30, marginLeft: 10, marginRight: 10, padding: 20, }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 19, color: '#7B61FF', fontWeight: 'bold' }}>Others</Text>
                        <Text style={{ color: '#5f5f5f' }}>Having target savings empower your aspirations for a better future.{'\n'}</Text>
                      </View>
                      <View style={{ backgroundColor: '#dcdae6', padding: 15, borderRadius: 100, }}>
                        <FontAwesomeIcon icon={faSquareArrowUpRight} color="#7B61FF" size={30} />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>

              </View>
            </ScrollView>
          </View >
        </View >
      </View >
    </AppSafeAreaView>
  )
}
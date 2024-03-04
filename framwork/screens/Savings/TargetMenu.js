import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/targetmenu";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMinus, faSquareArrowUpRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../../../globals/AppContext";
import { useContext, useEffect, useState } from "react";
import { AppSafeAreaView } from "../../components/AppSafeAreaView";


export function TargetMenu({ navigation }) {
  const { vaultInfo, setDocID } = useContext(AppContext);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    let amt = 0;
    JSON.stringify(vaultInfo.business) != '{}' ? vaultInfo.business.deposites.map(d => amt += d.amount + d.interest) : null;
    JSON.stringify(vaultInfo.education) != '{}' ? vaultInfo.education.deposites.map(d => amt += d.amount + d.interest) : null;
    JSON.stringify(vaultInfo.emergency) != '{}' ? vaultInfo.emergency.deposites.map(d => amt += d.amount + d.interest) : null;
    JSON.stringify(vaultInfo.travel) != '{}' ? vaultInfo.travel.deposites.map(d => amt += d.amount + d.interest) : null;
    JSON.stringify(vaultInfo.others) != '{}' ? vaultInfo.others.deposites.map(d => amt += d.amount + d.interest) : null;
    setBalance(amt);
  }, []);
  

  return (
    <AppSafeAreaView backgroundColor={"#7B61FF"}>
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={{ alignItems: 'center', margin: 15 }}>
          </View>
          <View style={styles.vault}>

            <View style={{ alignItems: 'center', margin: 10 }}>
              <Text style={{ fontSize: 20 }}>Target (Up to 15% p.a)</Text>
              <Text style={{ fontSize: 28, fontWeight: 'bold', margin: 5, color: '#7B61FF' }}>{balance.toFixed(2)}</Text>
            </View>
            <ScrollView>
              <View>
                <TouchableOpacity onPress={() => {
                  setDocID("business");
                  if (JSON.stringify(vaultInfo.business) == '{}') {
                    navigation.navigate('BusinessTargetInfo')
                  } else {
                    navigation.navigate("Targets")
                  }
                }}
                  activeOpacity={1}>
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

                <TouchableOpacity onPress={() => {
                  setDocID("emergency");
                  if (JSON.stringify(vaultInfo.emergency) == '{}') {
                    navigation.navigate('EmergencyInfo')
                  } else {
                    navigation.navigate("Targets")
                  }
                }} activeOpacity={1}>
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

                <TouchableOpacity onPress={() => {
                  setDocID("travel");
                  if (JSON.stringify(vaultInfo.travel) == '{}') {
                    navigation.navigate('TravlInfo')
                  } else {
                    navigation.navigate("Targets")
                  }
                }} activeOpacity={1}>
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

                <TouchableOpacity onPress={() => {
                  setDocID("education");
                  if (JSON.stringify(vaultInfo.education) == '{}') {
                    navigation.navigate('EducationInfo')
                  } else {
                    navigation.navigate("Targets")
                  }
                }} activeOpacity={1}>
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

                <TouchableOpacity onPress={() => {
                  setDocID("others");
                  if (JSON.stringify(vaultInfo.others) == '{}') {
                    navigation.navigate('OthersInfo')
                  } else {
                    navigation.navigate("Targets")
                  }
                }} activeOpacity={1}>
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
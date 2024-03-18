import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/targetmenu";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowTrendUp, faArrowUpFromGroundWater, faBriefcase, faFile, faFileInvoice, faMinus, faPlaneDeparture, faRotate, faSquareArrowUpRight, faUserGraduate, faXmark } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../../../globals/AppContext";
import { useContext, useEffect, useState } from "react";
import { AppSafeAreaView } from "../../components/AppSafeAreaView";
import { formatMoney } from "../../components/FormatMoney";


export function TargetMenu({ navigation }) {
  const { setDocID, getSavings, savingsInfo, setTargetName } = useContext(AppContext);
  const [balance, setBalance] = useState(0);

  const targetBalance = () => savingsInfo.filter(all => all.type == "target").reduce((a, c) => a + parseFloat(c.current_balance), 0)
  // console.log(savingsInfo.filter(all => all.type == "target" && all.name == "business").slice(-1)[0]);

  function handleNavigation(plan) {
    setTargetName(plan)
    let rData = savingsInfo.filter(all => all.type == "target" && all.name == plan).slice(-1)[0];
    if (!rData) rData = { current_balance: 0 }
    if (plan == "business") Number(rData.current_balance) > 0 ? navigation.navigate("Targets", { info: rData }) : navigation.navigate("BusinessTargetInfo")
    if (plan == "emergency") Number(rData.current_balance) > 0 ? navigation.navigate("Targets", { info: rData }) : navigation.navigate("EmergencyInfo")
    if (plan == "travel") Number(rData.current_balance) > 0 ? navigation.navigate("Targets", { info: rData }) : navigation.navigate("TravelInfo")
    if (plan == "education") Number(rData.current_balance) > 0 ? navigation.navigate("Targets", { info: rData }) : navigation.navigate("EducationInfo")
    if (plan == "others") Number(rData.current_balance) > 0 ? navigation.navigate("Targets", { info: rData }) : navigation.navigate("OthersInfo")
    else null
  }

  return (
    <AppSafeAreaView backgroundColor={"#7B61FF"}>
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={{ alignItems: 'center', margin: 15 }}>
          </View>
          <View style={styles.vault}>

            <View style={{ alignItems: 'center', margin: 10 }}>
              <Text style={{ fontSize: 20 }}>Get (Up to 20% p.a)</Text>
              <Text style={{ fontSize: 28, fontWeight: 'bold', margin: 5, color: '#7B61FF' }}>₦{formatMoney(targetBalance())}</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('TargetHistory')}
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', margin: 10 }}>
              <FontAwesomeIcon icon={faFileInvoice} color="#7B61FF" />
              <Text style={{ color: '#7B61FF', marginLeft: 5 }}>Targets History</Text>
            </TouchableOpacity>
            <ScrollView>
              <View>
                <TouchableOpacity
                  onPress={() => handleNavigation("business")}
                  activeOpacity={0.7}>
                  {/* <View style={{ marginTop: 58, position: 'absolute', top: -40, right: "40%", }}><View style={{ backgroundColor: "#c6c2dd", padding: 35, borderTopLeftRadius: 48, borderTopRightRadius: 48, }}></View></View> */}
                  <View style={{
                    borderWidth: 1.3, borderRadius: 20, marginTop: 30, marginLeft: 10,
                    marginRight: 10, padding: 10, borderColor: '#c2baf0'
                  }}>
                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}> */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                      <View style={{ backgroundColor: '#dcdae6', padding: 8, borderRadius: 9, marginRight: 8 }}>
                        <FontAwesomeIcon icon={faBriefcase} color="#7B61FF" size={25} />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 19, color: '#7B61FF', fontWeight: 'bold' }}>Business</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Text style={{ fontSize: 13, color: '#695e9c' }}>Save for business and earn interest</Text>
                          <FontAwesomeIcon icon={faArrowTrendUp} color="#1aa308" size={20} />
                        </View>
                      </View>
                      {/* <Text style={{ color: '#5f5f5f' }}>Business target savings drive financial stability and strategic growth.</Text> */}
                    </View>
                    {/* </View> */}
                  </View>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', justifyContent:'space-evenly',alignItems:'center' }}>
                  <TouchableOpacity
                    onPress={() => handleNavigation("emergency")}
                    activeOpacity={1}>
                    <View style={{ backgroundColor: '#c6c2dd', borderRadius: 8, marginTop: 30, marginLeft: 10, marginRight: 10, padding: 30, width: 150 }}>
                      <View style={{
                        flexDirection: 'row', justifyContent: 'center', marginBottom: 10,
                      }}>
                        <View style={{ backgroundColor: '#dcdae6', padding: 8, borderRadius: 8, alignItems: 'center' }}>
                          <FontAwesomeIcon icon={faArrowUpFromGroundWater} color="#7B61FF" size={25} />
                        </View>
                      </View>

                      <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 15, color: '#7B61FF', fontWeight: 'bold' }}>Emergency</Text>

                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleNavigation("travel")}
                    activeOpacity={1}>
                    <View style={{
                      borderWidth: 2, borderRadius: 8, marginTop: 30, marginLeft: 10,
                      marginRight: 10, padding: 30, width: 150, borderColor: '#c2baf0'
                    }}>
                      <View style={{
                        flexDirection: 'row', justifyContent: 'center', marginBottom: 10,
                      }}>
                        <View style={{ backgroundColor: '#dcdae6', padding: 8, borderRadius: 8, alignItems: 'center' }}>
                          <FontAwesomeIcon icon={faPlaneDeparture} color="#7B61FF" size={25} />
                        </View>
                      </View>

                      <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 15, color: '#7B61FF', fontWeight: 'bold' }}>Travel</Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row',justifyContent:'space-evenly',alignItems:'center' }}>

                  <TouchableOpacity
                    onPress={() => handleNavigation("others")}
                    activeOpacity={1}>
                    <View style={{
                      borderWidth: 2, borderRadius: 8, marginTop: 30, marginLeft: 10,
                      marginRight: 10, padding: 30, width: 150, borderColor: '#c2baf0'
                    }}>
                      <View style={{
                        flexDirection: 'row', justifyContent: 'center', marginBottom: 10,
                      }}>
                        <View style={{ backgroundColor: '#dcdae6', padding: 8, borderRadius: 8, alignItems: 'center' }}>
                          <FontAwesomeIcon icon={faRotate} color="#7B61FF" size={25} />
                        </View>
                      </View>

                      <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 15, color: '#7B61FF', fontWeight: 'bold' }}>Others</Text>

                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleNavigation("education")}
                    activeOpacity={1}>
                    <View style={{ backgroundColor: '#c6c2dd', borderRadius: 8, marginTop: 30, marginLeft: 10, marginRight: 10, padding: 30, width: 150 }}>
                      <View style={{
                        flexDirection: 'row', justifyContent: 'center', marginBottom: 10,
                      }}>
                        <View style={{ backgroundColor: '#dcdae6', padding: 8, borderRadius: 8, alignItems: 'center' }}>
                          <FontAwesomeIcon icon={faUserGraduate} color="#7B61FF" size={25} />
                        </View>
                      </View>

                      <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 15, color: '#7B61FF', fontWeight: 'bold' }}>Education</Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

                <Image
                  source={{ uri: 'https://wenethub.com/imageslink/spn2.png' }}
                  style={{ width:'100%', height: 115, marginTop:10}}
                />

              </View>
            </ScrollView>
          </View >
        </View >
      </View >
    </AppSafeAreaView >
  )
}
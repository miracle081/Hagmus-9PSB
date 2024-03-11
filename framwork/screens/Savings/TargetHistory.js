import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/targetmenu";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFile, faFileInvoice, faMinus, faSquareArrowUpRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../../../globals/AppContext";
import { useContext, useEffect, useState } from "react";
import { AppSafeAreaView } from "../../components/AppSafeAreaView";
import { formatMoney } from "../../components/FormatMoney";


export function TargetHistory({ navigation }) {
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
              <Text style={{ fontSize: 20 }}>Target History</Text>
            </View>
            <ScrollView>
              <View>
                <TouchableOpacity
                 onPress={()=>navigation.navigate('TargetHistoryView')}
                  activeOpacity={0.7}>
                  <View style={{ marginTop: 58, position: 'absolute', top: -40, right: "40%", }}><View style={{ backgroundColor: "#c6c2dd", padding: 35, borderTopLeftRadius: 48, borderTopRightRadius: 48, }}></View></View>
                  <View style={{ backgroundColor: '#c6c2dd', borderRadius: 20, marginTop: 30, marginLeft: 10, marginRight: 10, padding: 20, }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 19, color: '#7B61FF', fontWeight: 'bold' }}>Business</Text>
                      </View>
                      <View style={{ backgroundColor: '#dcdae6', padding: 15, borderRadius: 100 }}>
                        <FontAwesomeIcon icon={faSquareArrowUpRight} color="#7B61FF" size={30} />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={1}>
                  <View style={{ marginTop: 58, position: 'absolute', top: -40, right: "40%", }}><View style={{ backgroundColor: "#c6c2dd", padding: 35, borderTopLeftRadius: 48, borderTopRightRadius: 48, }}></View></View>
                  <View style={{ backgroundColor: '#c6c2dd', borderRadius: 20, marginTop: 30, marginLeft: 10, marginRight: 10, padding: 20, }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 19, color: '#7B61FF', fontWeight: 'bold' }}>Emergency</Text>
                      </View>
                      <View style={{ backgroundColor: '#dcdae6', padding: 15, borderRadius: 100, }}>
                        <FontAwesomeIcon icon={faSquareArrowUpRight} color="#7B61FF" size={30} />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={1}>
                  <View style={{ marginTop: 58, position: 'absolute', top: -40, right: "40%", }}><View style={{ backgroundColor: "#c6c2dd", padding: 35, borderTopLeftRadius: 48, borderTopRightRadius: 48, }}></View></View>
                  <View style={{ backgroundColor: '#c6c2dd', borderRadius: 20, marginTop: 30, marginLeft: 10, marginRight: 10, padding: 20, }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 19, color: '#7B61FF', fontWeight: 'bold' }}>Travel</Text>
                      </View>
                      <View style={{ backgroundColor: '#dcdae6', padding: 15, borderRadius: 100, }}>
                        <FontAwesomeIcon icon={faSquareArrowUpRight} color="#7B61FF" size={30} />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={1}>
                  <View style={{ marginTop: 58, position: 'absolute', top: -40, right: "40%", }}><View style={{ backgroundColor: "#c6c2dd", padding: 35, borderTopLeftRadius: 48, borderTopRightRadius: 48, }}></View></View>
                  <View style={{ backgroundColor: '#c6c2dd', borderRadius: 20, marginTop: 30, marginLeft: 10, marginRight: 10, padding: 20, }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 19, color: '#7B61FF', fontWeight: 'bold' }}>Education</Text>
                       </View>
                      <View style={{ backgroundColor: '#dcdae6', padding: 15, borderRadius: 100, }}>
                        <FontAwesomeIcon icon={faSquareArrowUpRight} color="#7B61FF" size={30} />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={1}>
                  <View style={{ marginTop: 58, position: 'absolute', top: -40, right: "40%", }}><View style={{ backgroundColor: "#c6c2dd", padding: 35, borderTopLeftRadius: 48, borderTopRightRadius: 48, }}></View></View>
                  <View style={{ backgroundColor: '#c6c2dd', borderRadius: 20, marginTop: 30, marginLeft: 10, marginRight: 10, padding: 20, }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 19, color: '#7B61FF', fontWeight: 'bold' }}>Others</Text>
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
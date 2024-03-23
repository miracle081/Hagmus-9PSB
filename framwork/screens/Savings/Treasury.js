import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/vault";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight, faBullseye, faCirclePlus, faEye, faEyeSlash, faHandHolding, faHandHoldingDollar, faLock, faNairaSign, faSackDollar, faWallet } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import { AppContext } from "../../../globals/AppContext";
import { useContext } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { AppSafeAreaView } from "../../components/AppSafeAreaView";
import { formatMoney } from "../../components/FormatMoney";

const targetmenu = ["business", "education", "emergency", "travel", "others"]

export function Treasury({ navigation }) {
  const { userUID, setPreloader, carouselLinks, getSavings, savingsInfo, getMySAYS, saysInfo, } = useContext(AppContext);
  const [showBalance, setShowBalance] = useState('');
  const screenWidth = Dimensions.get('screen').width;


  useEffect(() => {
    // let amt = 0
    // vaultInfo.fixed.map(d => amt += d.amount + d.interest)
    // setBalance(amt)
    // console.log(savingsInfo);

    // console.log(saysInfo);

    getSavings();
    getMySAYS();
  }, []);

  const totalBalance = () => {
    const total = savingsInfo.reduce((a, c) => a + parseFloat(c.current_balance)+ parseFloat(c.total_interest), 0)
    return total + Number(JSON.stringify(saysInfo) != '{}' ? saysInfo.balance : 0)
  }

  const fixedBalance = () => {
    const total = savingsInfo.filter(all => all.type == "fixed").reduce((a, c) => a + Number(c.current_balance) + Number(c.total_interest), 0)
    return total || 0
  }
  const targetBalance = () => {
    const total = savingsInfo.filter(all => all.type == "target").reduce((a, c) => a + parseFloat(c.current_balance), 0)
    return total || 0
  }

  // function getFixedBalance() {
  //   let amt = 0
  //   vaultInfo.fixed.map(d => amt += d.amount + d.interest)
  //   setFixedBalance(amt);
  //   setBalance(balance + amt);
  // }

  // useEffect(() => {
  //   if (JSON.stringify(vaultInfo) != '{}') {
  //     getTargetBalance();
  //     getFixedBalance();
  //   }
  // }, [vaultInfo]);

  return (
    <AppSafeAreaView backgroundColor={'#7B61FF'} style={styles.container}>
      <View style={styles.body}>
        <View style={{ alignItems: 'center', margin: 15 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>Savings From Our Partners</Text>
        </View>
        <View style={styles.vault}>
          <View style={styles.balance}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: '#787A8D', }}> Total Balance</Text>
              </View>

              <TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  {/* <Text style={{ color: '#787A8D', marginRight: 3 }}>Add Funds</Text>
                  <FontAwesomeIcon
                    icon={faCirclePlus}
                    color="#7B61FF"
                  /> */}
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ color: '#7B61FF', fontSize: 17 }}>₦ <Text style={{ marginTop: 5, fontSize: 30, color: '#7B61FF', }}>{formatMoney(totalBalance())}</Text></Text>
              {/* <Text style={{ color: 'green' }}>₦ <Text style={{ marginTop: 5, fontSize: 20, color: 'green', }}>{vaultInfo.vaultBalance.toFixed(2)}</Text></Text> */}
            </View>
          </View>

          <View style={styles.savingsplan}>
            <View style={styles.boxView}>

              <TouchableOpacity
                onPress={() => savingsInfo.filter(all => all.type == "fixed").length > 0 ? navigation.navigate('FixedMenu') : navigation.navigate('FixedInfo')}
                style={[styles.boxStyle, { backgroundColor: '#dcd5fb5e', }]}>
                <View style={{ alignItems: 'center' }}>
                  <View style={{ padding: 5, alignItems: "center" }}>
                    <FontAwesomeIcon
                      icon={faLock}
                      color="#6245f5"
                      size={30}
                    />
                  </View>
                  <View style={{ marginTop: 10, alignItems: "center" }}>
                    <Text style={{ color: '#0a0523', marginBottom: 8, fontWeight: 'bold', fontSize: 17 }}>Secure Lock</Text>
                    <Text style={{ color: '#5f5f5f', marginLeft: 0, fontSize: 10 }}>₦
                      <Text style={{ fontSize: 13, color: '#5f5f5f', }}> {formatMoney(fixedBalance())}</Text></Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('TargetMenu')}
                style={[styles.boxStyle, { backgroundColor: '#fee6f888', }]}>
                <View style={{ alignItems: 'center' }}>
                  <View style={{ padding: 5, alignItems: "center" }}>
                    <FontAwesomeIcon
                      icon={faBullseye}
                      color="#ad0380"
                      size={30}
                    />
                  </View>
                  <View style={{ marginTop: 10, alignItems: "center" }}>
                    <Text style={{ color: '#091e04ff', marginBottom: 8, fontWeight: 'bold', fontSize: 17 }}>Targets</Text>
                    <Text style={{ color: '#5f5f5f', marginLeft: 0, fontSize: 10 }}>₦
                      <Text style={{ fontSize: 13, color: '#5f5f5f', }}> {formatMoney(targetBalance())}</Text>
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.savingsplan}>
            <View style={styles.boxView}>
              <TouchableOpacity
                onPress={() => JSON.stringify(saysInfo) != '{}' ? navigation.navigate('SpendRetain') : navigation.navigate('SpendRetainInfo')}
                style={[styles.boxStyle, { backgroundColor: '#eafdff82', }]}>
                <View style={{ alignItems: 'center' }}>
                  <View style={{ padding: 5, alignItems: "center" }}>
                    <FontAwesomeIcon
                      icon={faNairaSign}
                      color="#027d88"
                      size={30}
                    />
                  </View>
                  <View style={{ marginTop: 10, alignItems: "center" }}>
                    <Text style={{ color: '#042024ff', marginBottom: 8, fontSize: 16, fontWeight: "bold" }}>Spend & Retain</Text>
                    <Text style={{ color: '#5f5f5f', marginLeft: 0, fontSize: 10 }}>₦
                      <Text style={{ fontSize: 13, color: '#5f5f5f', }}> {formatMoney(JSON.stringify(saysInfo) != '{}' ? saysInfo.balance : 0)}</Text>
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>


              <View onPress={() => navigation.navigate('Coinlock')}
                style={[styles.boxStyle, { backgroundColor: '#f9e3feff', }]}>
                <View style={{ alignItems: 'center' }}>
                  <View style={{ padding: 5, alignItems: "center" }}>
                    <FontAwesomeIcon
                      icon={faWallet}
                      color="#7d01a0ff"
                      size={30}
                    />
                  </View>
                  <View style={{ marginTop: 10, alignItems: "center" }}>
                    <Text style={{ color: '#222204ff', marginBottom: 8, fontSize: 15, fontWeight: 'bold' }}>Flexible Save</Text>
                    <Text style={{ fontSize: 13, color: '#5f5f5f', }}>Coming soon...</Text>
                  </View>
                </View>
              </View>


            </View>
          </View>


          <View style={{
            flexDirection: 'row', justifyContent: 'space-between',
            backgroundColor: '#d6cefe5e', padding: 10, margin: 8, borderRadius: 8, alignItems: 'center'
          }}>
            <View style={{ padding: 5, justifyContent: "center", alignItems: "center" }}>
              <FontAwesomeIcon
                icon={faNairaSign}
                color="#6040fc"
                style={{ position: "absolute", top: 10, left: 16 }}
                size={13}
              />
              <FontAwesomeIcon
                icon={faHandHolding}
                color="#6040fc"
                size={30}
              />
            </View>

            <View style={{ marginTop: 8, alignItems: 'center' }}>
              <Text style={{ color: '#6040fc', fontSize: 15, fontWeight: "bold" }}>Loan Box</Text>
              <Text style={{ fontSize: 11, color: '#5f5f5f', }}>Coming soon</Text>
            </View>

            <View style={{ padding: 5, }}>
              <FontAwesomeIcon
                icon={faAngleRight}
                color="#7B61FF"
                size={30}
              />
            </View>
          </View>

          <View style={{ flex: 1, marginVertical: 15, }}>
            <Carousel
              loop
              width={screenWidth}
              height={200}
              autoPlay={true}
              data={carouselLinks}
              scrollAnimationDuration={4000}
              renderItem={({ index }) => (
                <View
                  style={{ margin: 5 }}
                >
                  <Image
                    style={{
                      width: '99%',
                      height: 150,
                      borderRadius: 10,
                    }}
                    source={carouselLinks[index]} />
                </View>
              )}
            />
          </View>

        </View>
      </View>
    </AppSafeAreaView>
  )
}
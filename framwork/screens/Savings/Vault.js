import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/vault";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight, faBullseye, faCirclePlus, faEye, faEyeSlash, faHandHoldingDollar, faLock, faSackDollar, faWallet } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import { AppContext } from "../../../globals/AppContext";
import { useContext } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { AppSafeAreaView } from "../../components/AppSafeAreaView";

const targetmenu = ["business", "education", "emergency", "travel", "others"]
export function Vault({ navigation }) {
  const { userUID, setPreloader, carouselLinks, setVaultInfo, vaultInfo } = useContext(AppContext);
  const [showBalance, setShowBalance] = useState('');
  const [balance, setBalance] = useState(0);
  const [fixedBalance, setFixedBalance] = useState(0);
  const [targetBalance, setTargetBalance] = useState(0);
  const screenWidth = Dimensions.get('screen').width;

  useEffect(() => {
    onSnapshot(doc(db, "vault", userUID), (doc) => {
      const info = doc.data()
      setVaultInfo(info);
    });
  }, []);
  

  function getTargetBalance() {
    let amt = 0;
    JSON.stringify(vaultInfo.business) != '{}' ? vaultInfo.business.deposites.map(d => amt += d.amount + d.interest) : null;
    JSON.stringify(vaultInfo.education) != '{}' ? vaultInfo.education.deposites.map(d => amt += d.amount + d.interest) : null;
    JSON.stringify(vaultInfo.emergency) != '{}' ? vaultInfo.emergency.deposites.map(d => amt += d.amount + d.interest) : null;
    JSON.stringify(vaultInfo.travel) != '{}' ? vaultInfo.travel.deposites.map(d => amt += d.amount + d.interest) : null;
    JSON.stringify(vaultInfo.others) != '{}' ? vaultInfo.others.deposites.map(d => amt += d.amount + d.interest) : null;
    setTargetBalance(amt)
    setBalance(balance + amt);
  }

  function getFixedBalance() {
    let amt = 0
    vaultInfo.fixed.map(d => amt += d.amount + d.interest)
    setFixedBalance(amt);
    setBalance(balance + amt);
  }

  useEffect(() => {
    if (JSON.stringify(vaultInfo) != '{}') {
      getTargetBalance();
      getFixedBalance();
    }
  }, [vaultInfo]);

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
                <Text style={{ color: '#787A8D', }}>Treasury Balance</Text>
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
              <Text style={{ color: '#7B61FF', fontSize: 17 }}>₦ <Text style={{ marginTop: 5, fontSize: 30, color: '#7B61FF', }}>{balance.toFixed(2)}</Text></Text>
              {/* <Text style={{ color: 'green' }}>₦ <Text style={{ marginTop: 5, fontSize: 20, color: 'green', }}>{vaultInfo.vaultBalance.toFixed(2)}</Text></Text> */}
            </View>
          </View>

          <View style={styles.savingsplan}>
            <View style={styles.boxView}>
              <TouchableOpacity onPress={() => navigation.navigate('Coinlock')}
                style={[styles.boxStyle, { backgroundColor: '#7b61ff5e', }]}>
                <View style={{ alignItems: 'center' }}>
                  <View style={{ padding: 5, alignItems: "center" }}>
                    <FontAwesomeIcon
                      icon={faLock}
                      color="#6245f5"
                      size={30}
                    />
                  </View>
                  <View style={{ marginTop: 10, alignItems: "center" }}>
                    <Text style={{ color: '#6040fc', marginBottom: 8, fontSize: 15, fontWeight: 'bold' }}>Coin Lock</Text>
                    <Text style={{ fontSize: 13, color: '#5f5f5f', }}>BTC, ETH ...</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('TargetMenu')}
                style={[styles.boxStyle, { backgroundColor: '#8bfc6f5e', }]}>
                <View style={{ alignItems: 'center' }}>
                  <View style={{ padding: 5, alignItems: "center" }}>
                    <FontAwesomeIcon
                      icon={faBullseye}
                      color="#2abb06ff"
                      size={30}
                    />
                  </View>
                  <View style={{ marginTop: 10, alignItems: "center" }}>
                    <Text style={{ color: '#2abb06ff', marginBottom: 8, fontWeight: 'bold', fontSize: 17 }}>Targets</Text>
                    <Text style={{ color: '#5f5f5f', marginLeft: 8, fontSize: 10 }}>₦
                      <Text style={{ fontSize: 13, color: '#5f5f5f', }}> {targetBalance.toFixed(2)}</Text></Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.savingsplan}>
            <View style={styles.boxView}>
              <View
                // onPress={() => navigation.navigate('UsdSavings')}
                style={[styles.boxStyle, { backgroundColor: '#5cbeff5e', }]}>
                <View style={{ alignItems: 'center' }}>
                  <View style={{ padding: 5, alignItems: "center" }}>
                    <FontAwesomeIcon
                      icon={faHandHoldingDollar}
                      color="#019db8ff"
                      size={30}
                    />
                  </View>
                  <View style={{ marginTop: 10, alignItems: "center" }}>
                    <Text style={{ color: '#019db8ff', marginBottom: 8, fontSize: 16, fontWeight: "bold" }}>USD Savings</Text>
                    <Text style={{ fontSize: 11, color: '#5f5f5f', }}>Coming soon</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => vaultInfo.fixed.length == 0 ? navigation.navigate('FixedInfo') : navigation.navigate('FixedMenu')}
                style={[styles.boxStyle, { backgroundColor: '#a6b10944', }]}>
                <View style={{ alignItems: 'center' }}>
                  <View style={{ padding: 5, alignItems: "center" }}>
                    <FontAwesomeIcon
                      icon={faWallet}
                      color="#a09d01ff"
                      size={30}
                    />
                  </View>
                  <View style={{ marginTop: 10, alignItems: "center" }}>
                    <Text style={{ color: '#a09d01ff', marginBottom: 8, fontWeight: 'bold', fontSize: 17 }}>Fixed Savings</Text>
                    <Text style={{ color: '#5f5f5f', marginLeft: 8, fontSize: 10 }}>₦
                      <Text style={{ fontSize: 13, color: '#5f5f5f', }}> {fixedBalance.toFixed(2)}</Text></Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>


          <View style={{
            flexDirection: 'row', justifyContent: 'space-between',
            backgroundColor: '#7b61ff5e', padding: 10, margin: 8, borderRadius: 8, alignItems: 'center'
          }}>
            <View style={{ padding: 5, flexDirection: 'row', }}>
              <FontAwesomeIcon
                icon={faHandHoldingDollar}
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
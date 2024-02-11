import { faEye, faEyeSlash, faCoins, faCircleDollarToSlot, faPiggyBank, faVault, faCubes, faFile, faClockRotateLeft, faAngleRight, faDollar, faMoneyBill, faXmark, faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useContext, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Platform, StatusBar, Dimensions, Pressable, TextInput } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { AppContext } from "../../globals/AppContext";
import { styles } from "../styles/wallets";
import { symbol } from "../components/currencySymbols";
import { SafeAreaView } from "react-native-safe-area-context";
import { Modal } from "react-native";
import { db } from "../../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { formatDecimal } from "../components/numberToFixed";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { AppSafeAreaView } from "../components/AppSafeAreaView";

export function Wallets({ navigation }) {
  const { tradeRates, spotBalance, userInfo, carouselLinks, earnBalance, BTC, userUID, setPreloader } = useContext(AppContext);
  const fundingBalance = userInfo.usdt + userInfo.ngn / (tradeRates.ngn.buyRate || 1)
  const [showBalance, setShowBalance] = useState();
  const [ngnAmount, setNgnAmount] = useState(0);
  const [UsdtAmount, setUsdtAmount] = useState(0);
  const [balance, setBalance] = useState(fundingBalance + spotBalance + earnBalance);
  const [modalVisibility, setModalVisibility] = useState(false)
  const [modalVisibility2, setModalVisibility2] = useState(false)
  const screenWidth = Dimensions.get('screen').width;
  const [disable, setdisable] = useState(true);
  const [color, setColor] = useState('gray');
  const [message, setMessage] = useState('');
  const [successModal, setSuccessModal] = useState(false);

  const closeModal = () => {
    setModalVisibility(!modalVisibility);
  };
  const closeModal2 = () => {
    setModalVisibility2(!modalVisibility2);
  };

  function getInputValue(input) {
    const limit = 100
    if (input >= limit) {
      if (input < userInfo.ngn) {
        const outcome = Number(input) / tradeRates["ngn"].buyRate
        setUsdtAmount(formatDecimal(outcome, 2))
        setMessage('Amount Ok');
        setColor('#02904bff')
        setdisable(false)
        setNgnAmount(input)
      } else {
        setMessage(`Insufficient Balace (Bal: ${userInfo.ngn})`);
        setColor('#ff0000be')
        setdisable(true)
        setNgnAmount(0)
        setUsdtAmount(0)
      }
    }
    else {
      setdisable(true)
      setMessage(`Amount must be above ${symbol("ngn")}${limit}`);
      setColor('#ff0000ff')
      setUsdtAmount(0)
      setNgnAmount("")
    }
  }

  function fundUSD() {
    if (ngnAmount < userInfo.ngn) {
      setPreloader(true)
      updateDoc(doc(db, "users", userUID), {
        ngn: Number(userInfo.ngn) - Number(ngnAmount),
        usdt: Number(userInfo.usdt) + Number(UsdtAmount)
      })
        .then(() => {
          setSuccessModal(true)
          setPreloader(false)
        }).catch(() => {
          console.log(e);
          setPreloader(false)
          ToastApp('Something went wrong, please try again', "LONG");
        })
    }
    else {
      setdisable(true)
      setMessage(`Amount must be above ${symbol(asset)}${limit}`);
      setColor('#ff0000ff')
      setUsdtAmount(0)
      setNgnAmount("")
    }
  }

  return (
  <AppSafeAreaView>
      <View style={styles.container}>
      <StatusBar backgroundColor={"#21242D"} />
      <View style={styles.body}>
        <View>
          <View style={styles.accountHold}>
            <View style={styles.accountBal}>
              <View style={styles.hideBal}>
                <View style={styles.currencyFlag}>
                  <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#d5d7e7', marginRight: 10 }}>Total Balance</Text>
                </View>
                <TouchableOpacity onPress={() => {
                  if (showBalance) {
                    setShowBalance(false);
                  } else {
                    setShowBalance(true);
                  }
                }}>
                  <FontAwesomeIcon
                    icon={showBalance ? faEye : faEyeSlash}
                    color='#d5d7e7'
                    size={18}
                    style={styles.eye}
                  />
                </TouchableOpacity>
              </View>


              <View style={styles.mainBal}>
                <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'white', }}>{symbol(userInfo.countryCurrency)}</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'white' }}>
                  {showBalance ? Number(userInfo.ngn).toFixed(2) : '****'}</Text>
              </View>
              <Text style={{ fontWeight: 'bold', fontSize: 14, color: 'green', }}>{showBalance ?symbol("usdt")+Number(userInfo.usdt).toFixed(2): '****'}</Text>
            </View>
            
          </View>

          <View>
          <View style={styles.actionButton}>
              <TouchableOpacity
                onPress={closeModal}>
                <View style={styles.button2}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 15, color: '#28243d' }}>
                      Fund</Text>
                    {/* <Image source={require('../../assets/usflag.jpg')} style={{ width: 15, height: 15, borderRadius: 100, marginLeft: 5 }} /> */}
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity 
               onPress={closeModal2}>
                <View style={styles.button2}>
                 <View style={{flexDirection:'row',alignItems:'center'}}>
                 <Text style={{ fontSize: 15, color: '#28243d',marginRight:5 }}>
                    Transfer</Text>
                    <FontAwesomeIcon icon={faPaperPlane} color="#7B61FF"/>
                 </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      
      <ScrollView >
        <View style={styles.portfolioHold}>
          <View style={{
            flexDirection: 'row', justifyContent: 'space-between',
            margin: 10, alignItems: 'center'
          }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#28243d' }}>Portfolio</Text>
          </View>
          <View style={{ padding: 10 }}>
            <View
              // onPress={() => navigation.navigate('Spot')}
              style={{ marginBottom: 20 }}>
              <View style={styles.portfolio}>
                <View style={styles.News}>
                  <View style={{ marginRight: 10 }}>
                    <View>
                      {/* <Image source={require('../../assets/usflag.jpg')} style={{ width: 30, height: 30, borderRadius: 100 }} /> */}
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#28243d', fontWeight: 'bold', fontSize: 16 }}>USD</Text>
                  </View>
                </View>
                <View>
                  <Text style={{ color: '#28243d', fontWeight: 'bold', fontSize: 17 }}> {symbol("usdt")}{(userInfo.usdt).toFixed(2)}</Text>
                </View>
              </View>
            </View>

            <View
              // onPress={() => navigation.navigate('Funding')}
              style={{ marginBottom: 20 }}>
              <View style={styles.portfolio}>
                <View style={styles.News}>
                  <View style={{ marginRight: 10 }}>
                    <View>
                      <Image source={require('../../assets/ngnflag.png')} style={{ width: 30, height: 30, borderRadius: 100 }} />
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#28243d', fontWeight: 'bold', fontSize: 16 }}>NGN</Text>
                  </View>
                </View>
                <View>
                  <Text style={{ color: '#28243d', fontWeight: 'bold', fontSize: 17 }}>{symbol("ngn")}{(userInfo.ngn).toFixed(2)}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Earn')}
              style={{ marginBottom: 13 }}>
              <View style={styles.portfolio}>
                <View style={styles.News}>
                  <View style={{ marginRight: 10 }}>
                    <FontAwesomeIcon
                      icon={faPiggyBank}
                      color='#7B61FF'
                      size={30}
                    />
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#28243d', fontWeight: 'bold', fontSize: 16 }}>Earn</Text>
                  </View>
                </View>
                <View>
                  <Text style={{ color: '#28243d', fontWeight: 'bold', fontSize: 17 }}>{symbol(userInfo.defaultCurrency)}{(earnBalance * tradeRates[userInfo.defaultCurrency].buyRate).toFixed(2)}</Text>
                </View>
              </View>
            </TouchableOpacity>

          </View>
        </View>

        <View style={{ flex: 1, marginVertical: 10,}}>
          <Carousel
            loop
            width={screenWidth}
            height={170}
            autoPlay={true}
            data={carouselLinks}
            scrollAnimationDuration={2000}
            renderItem={({ index }) => (
              <View
                style={{ margin: 1 }}
              >
                <Image
                  style={{
                    width: '100%',
                    height: 170,
                    borderRadius: 10,
                  }}
                  source={carouselLinks[index]} />
              </View>
            )}
          />
        </View>
      </ScrollView>
      </View>


      {/* ============== fund Modal ============== */}
      <Modal
        visible={modalVisibility}
        animationType="slide"
        transparent={true}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
          <Pressable style={{ flex: 1 }} onPress={closeModal} >
          </Pressable>
          <View style={{ backgroundColor: "#eeeff4", height: 350, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
            <View style={{ alignItems: 'flex-end', margin: 10 }}>
              <TouchableOpacity onPress={closeModal}>
                <FontAwesomeIcon
                  icon={faXmark}
                  size={24}
                  color='#7B61FF'
                />
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ color: '#787A8D', margin: 10, fontWeight: "bold", fontSize: 13 }}>From NGN to USD</Text>

              <View style={{ marginBottom: 20 }}>
                <View style={{ padding: 7, flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../assets/ngnflag.png')} style={{ width: 25, height: 25, marginRight: 7, borderRadius: 100 }} />
                  <TextInput
                    style={styles.inputStyle}
                    keyboardType='numeric'
                    selectionColor={'grey'}
                    placeholderTextColor='#787A8D'
                    placeholder='Amount'
                    onChangeText={inp => getInputValue(Number(inp.trim()))}
                    color='grey'
                    fontWeight='bold'
                  />
                </View>
                <Text style={{ color: color, marginStart: 55, fontSize: 12 }}>{message}</Text>
              </View>

              <View>
                <View style={{ padding: 7, flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                  {/* <Image source={require('../../assets/usflag.jpg')} style={{ width: 25, height: 25, marginRight: 7, borderRadius: 100 }} /> */}
                  <TextInput
                    style={styles.inputStyle}
                    keyboardType='numeric'
                    selectionColor={'grey'}
                    placeholderTextColor='#787A8D'
                    value={`${UsdtAmount}`}
                    editable={false}
                    color='grey'
                    fontWeight='bold'
                  />
                </View>
              </View>

            </View>
            <View style={{ margin: 10 }}>
              <TouchableOpacity disabled={disable} onPress={() => { closeModal(); fundUSD() }}
                style={[styles.getStart, { backgroundColor: disable ? "#c5bcef" : '#7B61FF', marginBottom: 10 }]}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', }}>Fund</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

       {/* ============== Transfer ============== */}
       <Modal
        visible={modalVisibility2}
        animationType="slide"
        transparent={true}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
          <Pressable style={{ flex: 1 }} onPress={closeModal2} >
          </Pressable>
          <View style={{ backgroundColor: "#eeeff4", height: 400, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
            <View style={{ alignItems: 'flex-end', margin: 10 }}>
              <TouchableOpacity onPress={closeModal2}>
                <FontAwesomeIcon
                  icon={faXmark}
                  size={24}
                  color='#7B61FF'
                />
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>
              <View>
              <Text style={{ color: '#787A8D', margin: 10, fontWeight: "bold" }}>Transfer</Text>

              <View style={{ padding: 10 }}>

                <TouchableOpacity
                  onPress={() => navigation.navigate('HagmusTransfer')}
                  style={{ backgroundColor: '#d2d7ef', padding: 15, borderRadius: 8, marginBottom: 20 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', color: '#111532', marginRight: 8, fontSize: 18 }}>To HagmusPay</Text>
                    <View style={{ backgroundColor: '#7B61FF', padding: 5, borderTopLeftRadius: 8, borderTopRightRadius: 100, borderBottomRightRadius: 100 }}>
                      <Text style={{ fontSize: 13 }}>Free</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('BankTransfer')}
                  style={{ backgroundColor: '#d2d7ef', padding: 15, borderRadius: 8, marginBottom: 20, marginTop: 15 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', color: '#111532', marginRight: 8, fontSize: 18 }}>To Bank</Text>
                    <FontAwesomeIcon icon={faBuildingColumns} color='#7B61FF' size={22} />
                  </View>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  onPress={() => navigation.navigate('BorderTransfer')}
                  style={{ backgroundColor: '#d2d7ef', padding: 15, borderRadius: 8, marginBottom: 20, marginTop: 15 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', color: '#111532', marginRight: 8, fontSize: 18 }}>Make Border Transfer</Text>
                    <FontAwesomeIcon icon={faPaperPlane} color='#7B61FF' size={22} />
                  </View>
                </TouchableOpacity> */}
              </View>


            </View>

            </View>

          </View>
        </View>
      </Modal>

      {
        successModal ?
          <Modal visible={successModal} >
            <View style={mstyles.container}>
              <View>
                <View style={mstyles.formContainer}>
                  <Image source={require("../../assets/successful.png")} style={{ width: 250, height: 250 }} />
                  <View style={mstyles.pendingText}>
                    <Text style={mstyles.text3}>{symbol("ngn")}{ngnAmount}</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: "#6449ed3c", borderRadius: 5, padding: 10, marginHorizontal: 20 }}>
                  <Text style={{ color: 'white', textAlign: 'center' }}>{`USD has been funded with ${symbol("usdt")}${UsdtAmount}`}</Text>
                </View>
              </View>
              <View style={[mstyles.register, { marginTop: 10 }]}>
                <TouchableOpacity onPress={() => { setSuccessModal(false); setNgnAmount(0); setUsdtAmount(0) }}
                  style={mstyles.getStarted}>
                  <Text style={{ fontSize: 15, }}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          : null
      }
    </View>
  </AppSafeAreaView>
  )
}
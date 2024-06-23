import { useContext, useEffect, useState, useCallback } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, FlatList, Pressable, Linking, ImageBackground, Dimensions, Platform, } from "react-native";
import { AppSafeAreaView } from "../components/AppSafeAreaView";
import { styles } from "../styles/homepage";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Earn } from './Earn';
import { CardIntro } from './CardIntro';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDoubleRight, faAngleRight, faArrowDown, faArrowUp, faBank, faBowlFood, faBowlRice, faBuildingColumns, faChartPie, faContactBook, faFileInvoice, faHeadset, faMobileScreenButton, faNairaSign, faPlus, faPlusCircle, faReceipt, faRotate, faSackDollar, faSquarePhone, faTelevision, faTicket, faTicketAlt, faTriangleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { AppContext } from '../../globals/AppContext';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import { db, storage } from '../../firebase/firebase';
import { RefreshControl } from 'react-native';
import { getDownloadURL, ref } from 'firebase/storage';
import { Settings } from './Settings';
import { symbol } from '../components/currencySymbols';
import { P2pModal } from '../components/P2pModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../components/Theme';
import { baseURL, coingeckoAPIKey } from '../../config';
import Constants from 'expo-constants';
import { ToastApp } from '../components/Toast';
import { faAddressBook, faCreditCard, faFutbolBall, faLightbulb, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import Carousel from 'react-native-reanimated-carousel';
import { handleError } from '../components/HandleRequestError';
import { MyDollarCard } from './Dollarcard/MyDollarCard';
import { formatMoney } from '../components/FormatMoney';
import { Treasury } from './Savings/Treasury';
import { Ionicons } from '@expo/vector-icons';
import { faWhatsappSquare } from '@fortawesome/free-brands-svg-icons';


const installedAppVersion = Constants.expoConfig.version

function HomeScreen({ navigation }) {
  const {
    userUID, setWelcomeModal, welcomeModal, getAccountInfo, carouselLinks,
    setReferralBonus, profileImage, setProfileImage, token, getUserInfo, accountInfo,
    setPreloader, userInfo, notification, getMySAYS, getUserCards
  } = useContext(AppContext);

  const [showBalance, setShowBalance] = useState('');
  const [appVersion, setAppVersion] = useState("");
  const [adsCatigory, setAdsCatigory] = useState('');
  const [appIsReady, setAppIsReady] = useState(false);
  const [homeCoins, setHomeCoins] = useState([]);
  const [otherCoins, setOtherCoins] = useState([]);
  const screenWidth = Dimensions.get('screen').width;

  const [modalVisibility, setModalVisibility] = useState(false);
  const [modalVisibility2, setModalVisibility2] = useState(true);
  const [modalVisibility3, setModalVisibility3] = useState(false);
  const [modalVisibility4, setModalVisibility4] = useState(false)
  const [modalVisibility5, setModalVisibility5] = useState(false)




  function getAppVersion() {
    setPreloader(true)
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch(`${baseURL}/api/app-version`, requestOptions)
      .then(response => response.json())
      .then(response => {
        // console.log(response);
        setAppVersion(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    // setPreloader(false)
    // getMySAYS();
    // onSnapshot(doc(db, "admin", "zlICMjBKgTSOknW1TsMk"), (doc) => {
    //   const info = doc.data()
    //   setAppVersion(info.appVersion);
    // });

    getAccountInfo()
    getUserCards();
    getAppVersion();
  }, []);

  useEffect(() => {
    async function setAsyncItem() {
      try {
        const objInfo = JSON.stringify(userInfo)
        await AsyncStorage.setItem("userInfo", objInfo)
      } catch (error) {
        // console.log(error);
      }
    };
    setAsyncItem();
  }, [userInfo]);

  const closeModal4 = () => {
    setModalVisibility4(!modalVisibility4);
  };
  const closeModal5 = () => {
    setModalVisibility5(!modalVisibility5);
  };

  const closeModal = () => {
    setModalVisibility(!modalVisibility);
  };
  const updateModal = () => setModalVisibility2(!modalVisibility2);

  useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    } else {
      return null;
    }
  }, [appIsReady]);

  const openPlayStore = () => {
    const packageName = 'com.hagmussend.dev';

    // Linking.openURL(`market://details?id=${packageName}`)
    Linking.openURL('https://apps.apple.com/us/app/hagmus/id6473706399')
    // Linking.openURL('https://play.google.com/store/apps/details?id=com.hagmussend.dev&hl=en&gl=US')
      .catch((error) => {
        console.error('Failed to open Play Store:', error);
      });
  };

  const handleRefresh = () => {
    getUserCards()
    getAccountInfo();
    getUserInfo();
  }

  return (
    <AppSafeAreaView>
      <View style={styles.container}>
        <StatusBar style='light' animated />
        <View style={styles.body}>
          <ScrollView showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={handleRefresh} />
            }
          >
            <View style={styles.header}>
              <View style={styles.profileImg}>
                <Pressable onPress={() => navigation.navigate("Settings")}>
                  <Image source={profileImage} style={styles.img}
                    defaultSource={require('../../assets/person.png')}
                  />
                </Pressable>
                <View>
                  {/* <Text style={{ fontSize: 18, color: 'black', fontFamily: "EBGaramond_700Bold" }}>
                    Hi, {userInfo.username}
                  </Text> */}
                  <Text style={{ fontSize: 18, color: 'black', fontFamily: "EBGaramond_700Bold" }}>
                    Hi, {userInfo.first_name}
                  </Text>
                  <Text style={{ fontSize: 10, fontFamily: "EBGaramond_700Bold", color: '#49494d' }}>Welcome, let's settle the bills!</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => navigation.navigate("HelpSupport")}>
                  <View style={{
                    alignItems: 'center', position: "relative", marginRight: 14, flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                    <FontAwesomeIcon
                      icon={faHeadset}
                      color="#7b61ff"
                      size={23}
                      style={{ marginRight: 10 }}
                    />
                    <FontAwesomeIcon
                      icon={faWhatsappSquare}
                      color="green"
                      size={25}
                    />
                  </View>
                </TouchableOpacity>

                {/* <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
                  <View style={{ alignItems: 'center', position: "relative", marginRight: 0 }}>
                    <View style={{ backgroundColor: "#7B61FF", zIndex: 11, borderRadius: 50, position: "absolute", right: 0, top: 0 }}>
                      <Text style={{
                        fontSize: 10, padding: 3, paddingVertical: 0,
                        color: 'white', fontWeight: 'bold',
                      }}>{notification.length}</Text>
                    </View>
                    <FontAwesomeIcon
                      icon={faBell}
                      color="black"
                      size={20}
                    />
                  </View>
                </TouchableOpacity> */}
              </View>
            </View>
            <View style={{ marginTop: 15, }}>
              <ImageBackground borderRadius={10}
                source={require('../../assets/bal2.png')}
                style={{ width: '100%', height: 100, }}
              >
                <View style={styles.accountHold}>
                  <View style={styles.accountBal}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                      <View style={styles.hideBal}>
                        <View style={styles.currencyFlag}>
                          <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#e9eaf2', marginRight: 10 }}>Total Balance</Text>
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
                            color='#e9eaf2'
                            size={18}
                          />
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity onPress={() => navigation.navigate("History")} style={{ flexDirection: "row", alignItems: "center" }}>
                        <FontAwesomeIcon icon={faFileInvoice} color='#e9eaf2' size={15} />
                        <Text style={{ fontSize: 12, color: '#e9eaf2', }}>History</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <View>
                        <View style={styles.mainBal}>
                          <Text style={{ marginTop: 8, color: '#e9eaf2', fontSize: 17 }}>₦</Text>
                          <Text style={{ fontWeight: 'bold', fontSize: 30, color: '#e9eaf2', }}>{symbol(userInfo.countryCurrency)}</Text>
                          <Text style={{ fontWeight: 'bold', fontSize: 30, color: '#e9eaf2' }}>
                            {showBalance ? formatMoney(accountInfo.account_balance) : '****'}</Text>
                        </View>
                        {/* <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#AED2FF', }}> {showBalance ? symbol("usdt") + Number(userInfo.usdt).toFixed(2) : '****'}</Text> */}
                      </View>
                      {/* <TouchableOpacity
                    onPress={() => { setAdsCatigory("buy"), closeModal() }}
                    style={{ backgroundColor: '#f0f0f3', padding: 5, borderRadius: 100, width: "25%", height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <FontAwesomeIcon icon={faPlusCircle} color='#7B61FF' />
                    <Text style={{ fontSize: 13, alignItems: 'center', fontWeight: 'bold', marginLeft: 5, color: '#7B61FF' }}>Fund</Text>
                  </TouchableOpacity> */}
                    </View>

                  </View>

                </View>
              </ImageBackground>
            </View>
            <View>
              {/* Menu section begins */}
              <View style={{ backgroundColor: '#f8f8f8', padding: 0, borderRadius: 8, marginBottom: 20, }}>
                {/* <View style={{ marginBottom: 10 }}>
                  <Text style={{ fontWeight: 'bold' }}>Money Transfer</Text>
                </View> */}
                <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', padding: 10 }}>


                  <TouchableOpacity
                    onPress={() => { setAdsCatigory("buy"), closeModal() }}
                    style={{
                      backgroundColor: '#cec5ff', padding: 6, width: '50%',
                      alignItems: 'center', borderRadius: 10, marginRight: 5,
                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ color: 'white', marginRight: 5, color: '#7B61FF', fontSize: 16 }}>Deposit</Text>
                      <View style={{ backgroundColor: '#fcfbff', borderRadius: 100, padding: 5 }}>
                        <FontAwesomeIcon icon={faPlusCircle} color='#7B61FF' />
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={closeModal4}
                    style={{
                      backgroundColor: '#cec5ff', padding: 6, width: '50%',
                      alignItems: 'center', borderRadius: 10, borderWidth: 2, borderColor: '#cec5ff'
                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ color: 'white', marginRight: 5, color: '#7B61FF', fontSize: 16 }}>Transfer</Text>
                      <View style={{ backgroundColor: 'white', borderRadius: 100, padding: 5 }}>
                        <FontAwesomeIcon icon={faArrowUp} color='#7B61FF' />
                      </View>
                    </View>
                  </TouchableOpacity>



                  {/* <TouchableOpacity onPress={() => navigation.navigate("BorderTransfer")} style={{ alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#e3e0f0', padding: 10, borderRadius: 40 }}>
                      <FontAwesomeIcon icon={faBuildingColumns} size={25} color='#7B61FF' />
                    </View>
                    <Text style={{ fontSize: 13 }}>To Bank</Text>
                  </TouchableOpacity> */}

                  {/* <TouchableOpacity
                    onPress={() => navigation.navigate('HagmusTransfer')}
                    style={{ alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#e3e0f0', padding: 10, borderRadius: 40 }}>
                      <FontAwesomeIcon icon={faAddressBook} size={25} color='#7B61FF' />
                    </View>
                    <View style={{
                      margin: 10, position: 'absolute', top: -15, backgroundColor: '#FF7000', right: "-70%", borderTopRightRadius: 10,
                      borderBottomRightRadius: 10, borderTopLeftRadius: 10, width: 40,
                    }}>
                      <Text style={{
                        fontSize: 7, padding: 3,
                      }}>Free</Text>
                    </View>
                    <Text style={{ fontSize: 13 }}>Hagmus</Text>
                  </TouchableOpacity> */}

                  {/* <TouchableOpacity style={{ alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#e3e0f0', padding: 10, borderRadius: 40 }}>
                      <FontAwesomeIcon icon={faPaperPlane} size={25} color='#7B61FF' />
                    </View>
                    <Text style={{ fontSize: 13 }}>Border Pay</Text>
                  </TouchableOpacity> */}

                </View>
              </View>




              {/* V section begins */}
              <View style={{ backgroundColor: '#f8f8f8', padding: 0, borderRadius: 8, }}>
                <View style={{ marginBottom: 10 }}>
                  <Text style={{ fontWeight: 'bold' }}>Quick Tap</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', padding: 5 }}>

                  <TouchableOpacity
                    onPress={() => navigation.navigate("Airtime")}
                    style={{
                      alignItems: 'center', backgroundColor: '#ece9fb', padding: 20,
                      width: 100, marginRight: 5, borderRadius: 8
                    }}>

                    <View style={{ backgroundColor: '#ffffff', padding: 10, borderRadius: 40 }}>
                      <FontAwesomeIcon icon={faSquarePhone} size={25} color='#7B61FF' />
                    </View>
                    {/* <View style={{
                      margin: 10, position: 'absolute', top: -15, backgroundColor: '#FF7000', right: "-75%", borderTopRightRadius: 10,
                      borderBottomRightRadius: 10, borderTopLeftRadius: 10, width: 40,
                    }}>
                      <Text style={{
                        fontSize: 7, padding: 3,
                      }}>Up to 8%</Text>
                    </View> */}
                    <Text style={{ fontSize: 13 }}>Airtime</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate("Data")}
                    style={{
                      alignItems: 'center', backgroundColor: '#ece9fb', padding: 20,
                      width: 103, borderRadius: 8
                    }}>
                    <View style={{ backgroundColor: '#ffffff', padding: 10, borderRadius: 40 }}>
                      <FontAwesomeIcon icon={faMobileScreenButton} size={25} color='#7B61FF' />
                    </View>
                    <Text style={{ fontSize: 13 }}>Data</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate("Tv")}
                    style={{
                      alignItems: 'center', backgroundColor: '#ece9fb', padding: 20,
                      width: 100, borderRadius: 8
                    }}>
                    <View style={{ backgroundColor: '#ffffff', padding: 10, borderRadius: 40 }}>
                      <FontAwesomeIcon icon={faTelevision} size={25} color='#7B61FF' />
                    </View>
                    <Text style={{ fontSize: 13 }}>Tv</Text>
                  </TouchableOpacity>

                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', padding: 5, marginTop: 10 }}>
                  <TouchableOpacity
                    onPress={closeModal5}
                    style={{
                      alignItems: 'center', backgroundColor: '#ece9fb', padding: 20,
                      width: 100, borderRadius: 8
                    }}>
                    <View style={{ backgroundColor: '#ffffff', padding: 10, borderRadius: 40 }}>
                      <FontAwesomeIcon icon={faFutbolBall} size={25} color='#7B61FF' />
                    </View>
                    <Text style={{ fontSize: 13 }}>Fund Bet</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Electricity")}
                    style={{
                      alignItems: 'center', backgroundColor: '#ece9fb', padding: 20,
                      width: 103, borderRadius: 8
                    }}>
                    <View style={{ backgroundColor: '#ffffff', padding: 10, borderRadius: 40 }}>
                      <FontAwesomeIcon icon={faLightbulb} size={25} color='#7B61FF' />
                    </View>
                    {/* <View style={{
                      margin: 10, position: 'absolute', top: -15, backgroundColor: '#FF7000', right: "-38%", borderTopRightRadius: 10,
                      borderBottomRightRadius: 10, borderTopLeftRadius: 10, width: 40,
                    }}>
                      <Text style={{
                        fontSize: 7, padding: 3,
                      }}>Up to 9%</Text>
                    </View> */}
                    <Text style={{ fontSize: 13, }}>Electricity</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                  // onPress={closeModal5}
                    onPress={()=> navigation.navigate ('Landing')}
                    style={{
                      alignItems: 'center', backgroundColor: '#ece9fb', padding: 20,
                      width: 100, borderRadius: 8
                    }}>
                    <View style={{ backgroundColor: '#ffffff', padding: 10, borderRadius: 40 }}>
                      <FontAwesomeIcon icon={faBowlRice} size={25} color='#7B61FF' />
                    </View>
                    <Text style={{ fontSize: 13 }}>HFood</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity onPress={() => navigation.navigate("Portfolio")} style={{
                borderWidth: 2, borderColor: '#d7d1f4', borderRadius: 8, padding: 8,
                marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <Text>Portfolio Tracker</Text>
                <FontAwesomeIcon icon={faChartPie} size={20} color='#7B61FF' />
              </TouchableOpacity>

              {/* ============== carousel zone ============== */}
              <View style={{ flex: 1, marginVertical: 10, }}>
                <Carousel
                  loop
                  width={screenWidth - 20}
                  height={170}
                  autoPlay={true}
                  data={carouselLinks}
                  scrollAnimationDuration={2000}
                  renderItem={({ index }) => (
                    <View
                      style={{ flexDirection: "row", justifyContent: "center" }}
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
            </View>
          </ScrollView>
        </View>
      </View>

      {/* ============== Transfer Modal ============== */}
      <Modal
        visible={modalVisibility4}
        animationType="slide"
        transparent={true}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
          <Pressable style={{ flex: 1 }} onPress={closeModal4} >
          </Pressable>
          <View style={{ backgroundColor: "#fcfbff", height: 300, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
            <View style={{ alignItems: 'flex-end', margin: 10 }}>
              <TouchableOpacity onPress={closeModal4}>
                <FontAwesomeIcon
                  icon={faXmark}
                  size={24}
                  color='#7B61FF'
                />
              </TouchableOpacity>
            </View>

            <View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ color: '#493c86', margin: 10, fontWeight: "bold", fontSize: 25 }}>Send Money</Text>
              </View>

              <TouchableOpacity
                onPress={() => { closeModal4(); navigation.navigate("BorderTransfer") }}
                style={{
                  flexDirection: 'row', justifyContent: 'space-between',
                  alignItems: 'center', padding: 10, borderWidth: 2, margin: 13, borderRadius: 8,
                  borderColor: '#7B61FF', backgroundColor: '#7B61FF'
                }}>
                <Text style={{ color: 'white', fontSize: 18 }}>Send to Bank</Text>
                <View style={{ backgroundColor: "white", borderRadius: 100, padding: 8 }}>
                  <FontAwesomeIcon icon={faBank} color='#7B61FF' />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => { closeModal4(); navigation.navigate('HagmusTransfer') }}
                style={{
                  flexDirection: 'row', justifyContent: 'space-between',
                  alignItems: 'center', padding: 10, borderWidth: 2, margin: 13, borderRadius: 8,
                  borderColor: '#7B61FF', backgroundColor: '#7B61FF'
                }}>
                <Text style={{ color: 'white', fontSize: 18 }}>To Hagmus User</Text>
                <View style={{ backgroundColor: "white", borderRadius: 100, padding: 8 }}>
                  <FontAwesomeIcon icon={faContactBook} color='#7B61FF' />
                </View>
              </TouchableOpacity>



            </View>

          </View>
        </View>
      </Modal>



      {/* ============== Ticket Coming soon Modal ============== */}
      <Modal
        visible={modalVisibility5}
        animationType="slide"
        transparent={true}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
          <Pressable style={{ flex: 1 }} onPress={closeModal5} >
          </Pressable>
          <View style={{ backgroundColor: "#fcfbff", height: 400, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
            <View style={{ alignItems: 'flex-end', margin: 10 }}>
              <TouchableOpacity onPress={closeModal5}>
                <FontAwesomeIcon
                  icon={faXmark}
                  size={24}
                  color='#7B61FF'
                />
              </TouchableOpacity>
            </View>

            <View>

              <View style={{alignItems:'center',}}>
                <Image source={require('../../assets/comingsoon.png')} style={{ width: 300, height: 300 }} />

              </View>
            </View>

          </View>
        </View>
      </Modal>

      {/* ============== Welcome modal ============== */}
      {userInfo.userStatus == "unverified" ?
        <Modal
          visible={welcomeModal}
          animationType="slide"
          transparent={true}
        >
          <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.856)" }}>
            <View style={{ flex: 1 }} ></View>
            <View style={{ backgroundColor: "#16171D", borderRadius: 20, marginHorizontal: 20 }}>
              <View style={{ alignItems: 'flex-end', margin: 10, marginBottom: 0 }}>
                <TouchableOpacity onPress={() => setWelcomeModal(false)}>
                  <FontAwesomeIcon
                    icon={faXmark}
                    size={24}
                    color='#7B61FF'
                  />
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: "center", marginBottom: 20 }}>
                <Image source={require("../../assets/icon.png")} style={{ width: 80, height: 80, }} />
                <Text style={{ color: "white", fontSize: 18, fontWeight: 'bold', }}>Welcome to Hagmus</Text>
                <Text style={{ color: "white", lineHeight: 20, fontSize: 14, width: "90%", marginVertical: 10 }}>Your account has just been created successfully. Your account need to be verified before any trade or transaction of any kind will be made</Text>
                <TouchableOpacity onPress={() => { navigation.navigate('Kyc'), setWelcomeModal(false) }} style={[styles.button, { width: 200, marginVertical: 15, backgroundColor: "#7B61FF" }]}>
                  <Text style={{ fontWeight: 'bold', fontSize: 13, color: 'white' }}>Verify Account</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 1 }} ></View>
          </View>
        </Modal> : null
      }

      {/* ============== App Version modal ============== */}
      {/* https://play.google.com/store/apps/details?id=com.hagmus.dev */}

      {appVersion != "" ?
        installedAppVersion != appVersion[Platform.OS] ?
          <Modal
            visible={modalVisibility2}
            transparent={true}
          >
            <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.856)" }}>
              <View style={{ flex: 1 }} ></View>
              <View style={{ backgroundColor: "#fefefe", borderRadius: 20, marginHorizontal: 20 }}>
                <View style={{ alignItems: "center", marginBottom: 20 }}>
                  <Image source={require("../../assets/icon.png")} style={{ width: 80, height: 80, }} />
                  <Text style={{ fontSize: 18, fontWeight: 'bold', }}>New Update Available!</Text>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: "gray", lineHeight: 20, fontSize: 14, width: "90%", marginVertical: 10 }}>Your Hagmus app is outdated {"\n"}upgrade to the latest version.</Text>
                  </View>
                  <TouchableOpacity onPress={() => { openPlayStore('Kyc'), updateModal() }} style={[styles.button, { width: 200, marginVertical: 15, backgroundColor: "#7B61FF" }]}>
                    <Text style={{ fontWeight: 'bold', fontSize: 13, color: 'white' }}>Update now</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flex: 1 }} ></View>
            </View>
          </Modal> : null :
        null
      }

      <P2pModal visible={modalVisibility} onPress={closeModal} adsCatigory={adsCatigory} />

    </AppSafeAreaView>
  )
}

const Tab = createBottomTabNavigator();

export function HomePage() {
  const { userCards } = useContext(AppContext);

  return (
    <Tab.Navigator
      style={{ backgroundColor: "black" }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size, }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          }
          else if (route.name === 'Treasury') {
            iconName = focused ? 'diamond' : 'diamond-outline';
          }
          else if (route.name === 'CardIntro' || route.name === "MyDollarCard") {
            iconName = focused ? 'card' : 'card-outline';
          }
          else if (route.name === 'Earn') {
            iconName = focused ? 'cash' : 'cash-outline';
          }
          else if (route.name === 'Settings') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#7B61FF',
        tabBarInactiveTintColor: '#787A8D',
        tabBarActiveBackgroundColor: 'white',
        tabBarInactiveBackgroundColor: 'white',
        tabBarStyle: { backgroundColor: "white", borderTopColor: "white" }
      })}
    >
      <Tab.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name='Earn' component={Earn} options={{ headerShown: false }} />
      {userCards.length > 0 ?
        <Tab.Screen name='MyDollarCard' component={MyDollarCard} options={{ headerShown: false, title: "Card" }} /> :
        <Tab.Screen name='CardIntro' component={CardIntro} options={{ headerShown: false, title: "Card" }} />
      }
      <Tab.Screen name='Treasury' component={Treasury} options={{ headerShown: false }} />
      <Tab.Screen name='Settings' component={Settings} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}
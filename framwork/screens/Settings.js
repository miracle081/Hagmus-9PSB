import {
  faCircleQuestion, faArrowLeft, faGem, faShare, faUser,
  faAngleRight, faExclamationCircle, faCreditCard, faGift, faMoneyBill1Wave,
  faCircleInfo, faMoneyBillTrendUp, faTriangleExclamation, faUserAlt, faUserCircle,
  faXmark, faLock, faBell, faUserSlash, faCircleCheck, faFilePen, faRightLeft, faGears, faCheck, faCheckCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import {
  View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, ActivityIndicator,
  Pressable, Modal, Alert, Share, Button
} from "react-native";
import { db } from "../../firebase/firebase";
import { AppContext } from "../../globals/AppContext";
import { styles } from "../styles/settings";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { ToastApp } from "../components/Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppSafeAreaView } from "../components/AppSafeAreaView";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { theme } from "../components/Theme";
import { copyToClipboard } from "../components/ClipBoard";


export function Settings({ navigation }) {
  const { userUID, profileImage, userInfo, setUserInfo, setUserUID, setPreloader, accountInfo, setToken } = useContext(AppContext);
  const [modalVisibility, setModalVisibility] = useState(false);

  const closeModal = () => {
    setModalVisibility(!modalVisibility);
  };

  //Share App content begins
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          `Download and install Hagmus today to enjoy fast and relyable payment service.\nHere's my referral tag: \n@ ${userInfo.username}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  //Share App content Ends

  useEffect(() => {
    // setPreloader(false)
  }, [])

  function shortName() {
    if ("first_name" in userInfo) {
      return userInfo.first_name.charAt(0) + userInfo.last_name.charAt(0)
    }
  }

  async function logout() {
    setPreloader(true)
    try {
      await AsyncStorage.removeItem("userInfo")
      setTimeout(() => {
        setPreloader(false)
        setUserInfo({});
        setToken("")
        navigation.replace('LandingPage')
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AppSafeAreaView style={styles.container} >
      <ExpoStatusBar style="light" />
      <View style={styles.body}>

        <View style={[styles.status, { borderRadius: 50, backgroundColor: "#007a02", position: "absolute", top: 0, right: 10 }]}>
          <FontAwesomeIcon icon={faCheckCircle} color="white" size={15} />
          <Text style={{ fontSize: 13, color: 'white', marginRight: 5 }}>  {userInfo.kyc_level} of 2 Verified</Text>
        </View>
        <View style={styles.hideBal}>
          <View onPress={() => navigation.navigate('ProfileSettings')}
            style={{ width: 80, height: 80, backgroundColor: "#7B61FF40", borderRadius: 60, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ fontSize: 30, color: "#7B61FF", fontFamily: theme.fonts.Quicksand_700Bold, letterSpacing: 1.3 }}>{shortName()}</Text>
          </View>
          <View>
            <Text style={{ fontSize: 25, fontWeight: "bold", marginRight: 5 }}>  {userInfo.first_name} {userInfo.last_name}</Text>
            {/* <View style={styles.status}>
              <FontAwesomeIcon icon={faUserCircle} color="white" size={15} />
            </View> */}

          </View>
        </View>
      </View>

      <View style={{ margin: 13, backgroundColor: '#edecf4', marginBottom: 0, padding: 10, borderRadius: 5 }}>
        <Text>Account Number</Text>
        <View style={{ flexDirection: 'row', marginTop: 5 }}>
          <Text style={{ fontSize: 19, color: 'black', fontWeight: 'bold' }} selectable>{accountInfo.account_number}</Text>
          <TouchableOpacity onPress={() => copyToClipboard(accountInfo.account_number)}>
            <FontAwesomeIcon icon={faCopy} style={{ marginLeft: 10 }} color="#776e9d" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderBottomColor: '#ceccdf',
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginBottom: 0,
            marginTop: 5
          }}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15 }}>
          <Text style={{ fontSize: 13, }}>Bank </Text>
          <Text>{accountInfo.bank_name}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
          <Text style={{ fontSize: 13, }}>Account Name</Text>
          <Text>{accountInfo.account_name}</Text>
        </View>
      </View>




      <ScrollView>

        <View style={styles.portfolioHold}>


          <View style={{ padding: 10, borderRadius: 8 }}>
            <TouchableOpacity onPress={onShare} activeOpacity={0.8}
              style={{ marginBottom: 15 }}>
              <View style={styles.portfolio}>
                <View style={styles.News}>
                  <View style={{ marginRight: 10 }}>
                    <FontAwesomeIcon icon={faRightLeft} color="#776e9d" size={18} />
                  </View>
                  <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>Referral Tag</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 16, marginEnd: 5 }}>{userInfo.username}</Text>
                  <FontAwesomeIcon icon={faShare} color="#776e9d" size={14} />
                </View>
              </View>
            </TouchableOpacity>
            <View style={{ borderBottomColor: '#e5e3ee', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 15 }} />

            <TouchableOpacity onPress={() => navigation.navigate('ProfileSettings')}
              style={{ marginBottom: 15 }}>
              <View style={styles.portfolio}>
                <View style={styles.News}>
                  <View style={{ marginRight: 10 }}>
                    <FontAwesomeIcon icon={faUser} color="#776e9d" size={18} />
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>Profile Setting</Text>
                  </View>
                </View>
                <FontAwesomeIcon icon={faAngleRight} color="black" size={18} />
              </View>
            </TouchableOpacity>
            <View style={{ borderBottomColor: '#e5e3ee', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 15 }} />

            <TouchableOpacity
              onPress={() => navigation.navigate("Referral")}
              style={{ marginBottom: 13 }}>
              <View style={styles.portfolio}>
                <View style={styles.News}>
                  <View style={{ marginRight: 10 }}>
                    <FontAwesomeIcon icon={faGift} color="#776e9d" size={18} />
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>Bonus</Text>
                  </View>
                </View>
                <FontAwesomeIcon icon={faAngleRight} color="black" size={18} />
              </View>
            </TouchableOpacity>
            <View style={{ borderBottomColor: '#e5e3ee', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 15 }} />

            {userInfo.is_pin_set == 0 ?
              <TouchableOpacity
                onPress={() => navigation.navigate("SetPin")}
                style={{ marginBottom: 13 }}>
                <View style={styles.portfolio}>
                  <View style={styles.News}>
                    <View style={{ marginRight: 10 }}>
                      <FontAwesomeIcon icon={faGears} color="#776e9d" size={18} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>Set Transaction Pin</Text>
                    </View>
                  </View>
                  <FontAwesomeIcon icon={faAngleRight} color="black" size={18} />
                </View>
              </TouchableOpacity> :
              <TouchableOpacity
                onPress={() => navigation.navigate("ChangePin")}
                style={{ marginBottom: 13 }}>
                <View style={styles.portfolio}>
                  <View style={styles.News}>
                    <View style={{ marginRight: 10 }}>
                      <FontAwesomeIcon icon={faGears} color="#776e9d" size={18} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>Manage Transaction Pin</Text>
                    </View>
                  </View>
                  <FontAwesomeIcon icon={faAngleRight} color="black" size={18} />
                </View>
              </TouchableOpacity>
            }
            <View style={{ borderBottomColor: '#e5e3ee', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 15 }} />

            <TouchableOpacity
              onPress={() => navigation.navigate('PasswordReset')}
              style={{ marginBottom: 13 }}>
              <View style={styles.portfolio}>
                <View style={styles.News}>
                  <View style={{ marginRight: 10 }}>
                    <FontAwesomeIcon icon={faLock} color="#776e9d" size={18} />
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>Reset Password</Text>
                  </View>
                </View>
                <FontAwesomeIcon icon={faAngleRight} color="black" size={18} />
              </View>
            </TouchableOpacity>
            <View style={{ borderBottomColor: '#e5e3ee', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 15 }} />

            <TouchableOpacity
              onPress={() => navigation.navigate('BvnVerify')}
              style={{ marginBottom: 13 }}>
              <View style={styles.portfolio}>
                <View style={styles.News}>
                  <View style={{ marginRight: 10 }}>
                    <FontAwesomeIcon icon={faFilePen} color="#776e9d" size={18} />
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>Account Limits</Text>
                  </View>
                </View>
                <FontAwesomeIcon icon={faAngleRight} color="black" size={18} />
              </View>
            </TouchableOpacity>
            <View style={{ borderBottomColor: '#e5e3ee', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 15 }} />
          </View>



        </View>

        <View style={styles.portfolioHold}>
          <View style={{
            flexDirection: 'row', justifyContent: 'space-between',
            margin: 10, alignItems: 'center'
          }}>
            <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'black' }}>About & Support</Text>

          </View>

          <View style={{ padding: 10, borderRadius: 8 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('HelpSupport')}
              style={{ marginBottom: 15 }}>
              <View style={styles.portfolio}>
                <View style={styles.News}>
                  <View style={{ marginRight: 10 }}>
                    <FontAwesomeIcon icon={faCircleQuestion} color="#776e9d" size={18} />
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>Help & Support</Text>
                  </View>
                </View>
                <FontAwesomeIcon icon={faAngleRight} color="black" size={18} />
              </View>
            </TouchableOpacity>
            <View style={{ borderBottomColor: '#e5e3ee', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 15 }} />
            <TouchableOpacity
              onPress={() => navigation.navigate('AboutUs')}
              style={{ marginBottom: 13 }}>
              <View style={styles.portfolio}>
                <View style={styles.News}>
                  <View style={{ marginRight: 10 }}>
                    <FontAwesomeIcon icon={faCircleInfo} color="#776e9d" size={18} />
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>About</Text>
                  </View>
                </View>
                <FontAwesomeIcon icon={faAngleRight} color="black" size={18} />
              </View>
            </TouchableOpacity>
            <View style={{ borderBottomColor: '#e5e3ee', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 15 }} />
            <TouchableOpacity
              onPress={() => navigation.navigate('DeleteAcct')}
              style={{ marginBottom: 13 }}>
              <View style={styles.portfolio}>
                <View style={styles.News}>
                  <View style={{ marginRight: 10 }}>
                    <FontAwesomeIcon icon={faUserSlash} color="red" size={18} />
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: 'red', fontSize: 14, fontWeight: 'bold' }}>Delete My Account</Text>
                  </View>
                </View>
                <FontAwesomeIcon icon={faAngleRight} color="black" size={18} />
              </View>
            </TouchableOpacity>
            <View style={{ borderBottomColor: '#e5e3ee', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 15 }} />
          </View>
        </View>


        <TouchableOpacity onPress={closeModal} style={{ margin: 15, backgroundColor: '#de4040', padding: 10, alignItems: 'center', borderRadius: 8 }}>
          <Text style={{ color: '#f9f7f7', fontSize: 15, fontWeight: 'bold', }}>Logout</Text>
        </TouchableOpacity>

        {/* logout  modal  */}
        <Modal
          visible={modalVisibility}
          animationType="slide"
          transparent={true}
        >
          <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
            <Pressable style={{ flex: 1 }} onPress={closeModal} >
            </Pressable>
            <View style={{ height: 200, backgroundColor: "#fcfbff", borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
              <View style={{ alignItems: 'flex-end', margin: 10 }}>
                <TouchableOpacity onPress={closeModal}>
                  <FontAwesomeIcon
                    icon={faXmark}
                    size={24}
                    color='#787A8D'
                  />
                </TouchableOpacity>
              </View>
              <View>

                <View style={{ alignItems: 'center', marginBottom: 10 }}>
                  <Text>Are you sure you want to log out</Text>
                </View>
                <View style={{
                  alignItems: 'center', marginTop: 20, margin: 15, padding: 0,
                  borderRadius: 8
                }}>
                  <TouchableOpacity onPress={() => { closeModal(); logout() }} style={{
                    backgroundColor: '#de4040', width: '100%', alignItems: 'center', padding: 10, borderRadius: 8
                  }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Yes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        {/* <Modal
          visible={modalVisibility}
          animationType="slide"
          transparent={true}
        >
          <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
            <Pressable style={{ flex: 1 }} onPress={closeModal} >
            </Pressable>
            <View style={{ backgroundColor: "#16171D", borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
              <View style={{ alignItems: 'flex-end', margin: 10 }}>
                <TouchableOpacity onPress={closeModal}>
                  <FontAwesomeIcon
                    icon={faXmark}
                    size={24}
                    color='#787A8D'
                  />
                </TouchableOpacity>
              </View>
              <View>

                <View style={{ marginLeft: 5 }}>
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Change default Currency</Text>
                </View>
                <TouchableOpacity onPress={() => { changeCurrency("usdt"); closeModal() }}>
                  <View style={{ margin: 10, padding: 5, flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../../assets/usflag.jpg')} style={styles.assetflag} />
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>USD</Text>
                  </View>
                </TouchableOpacity>
                <View style={{ borderBottomColor: 'grey', borderBottomWidth: StyleSheet.hairlineWidth, margin: 10 }} />

                <TouchableOpacity onPress={() => { changeCurrency("ngn"); closeModal() }}>
                  <View style={{ margin: 10, padding: 5, flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../../assets/ngnflag.png')} style={styles.assetflag} />
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>NGN</Text>
                  </View>
                </TouchableOpacity>
                <View style={{ borderBottomColor: 'grey', borderBottomWidth: StyleSheet.hairlineWidth, margin: 10 }} />
              </View>
            </View>
          </View>
        </Modal> */}
      </ScrollView >
    </AppSafeAreaView >
  )
}
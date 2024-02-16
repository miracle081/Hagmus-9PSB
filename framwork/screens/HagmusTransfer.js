import { faAngleRight, faArrowLeft, faCheckCircle, faChevronRight, faFaceSadCry, faFaceSmile, faScroll, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Pressable, FlatList, Image, Modal, Alert, ScrollView, } from "react-native";
import { styles } from "../styles/hagmustransfer";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../globals/AppContext";
import { addDoc, collection, doc, getDocs, onSnapshot, query, runTransaction, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { ToastApp } from "../components/Toast";
import { dateTime, generateRef } from "../components/DateTime";
import { AppSafeAreaView } from "../components/AppSafeAreaView";
import { symbol } from "../components/currencySymbols";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { PinTransactionModal } from "../components/PinModal";
import { baseURL } from "../../config";
import { handleError } from "../components/HandleRequestError";

export function HagmusTransfer({ navigation }) {
  const { userUID, setPreloader, userInfo, accountInfo, pin, setPin, token } = useContext(AppContext);
  const [activity, setActivity] = useState(false);
  const [message, setmessage] = useState('');
  const [modalVisibility, setModalVisibility] = useState(false);
  const [modalVisibility2, setModalVisibility2] = useState(false);
  const [pinModalVisibility, setPinMetModalVisibility] = useState(false);
  const [userName, setuserName] = useState('');
  const [userCoins, setUserCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState({ id: "", name: "", symbol: "", img: null, coinValue: 0, docId: "", rank: 0 });
  const [mColor, setmColor] = useState('gray');
  const [amount, setAmount] = useState(0);
  const [recieverCoin, setRecieverCoin] = useState([{ docId: "", coinValue: 0 }]);
  const [allUsers, setallUsers] = useState([{ userName: '' }]);
  const [recieverInfo, setrecieverInfo] = useState({ userName: '', uid: "", fname: "", lname: '' });
  const [color, setColor] = useState('gray');
  const [message2, setMessage2] = useState('');
  const [narration, setNarration] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [actName, setActName] = useState({});

  // useEffect(() => {
  //   setPreloader(false)
  // }, [])

  const closeModal2 = () => {
    setModalVisibility2(!modalVisibility2);
  };
  const pinModal = () => {
    setPinMetModalVisibility(!pinModalVisibility);
  };

  function verifyName(accountNumber) {
    setPreloader(true)

    const data = {
      bank_code: "HAGMUS",
      account_number: accountNumber
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${token}`
      },
      body: JSON.stringify(data),
      redirect: 'follow'
    };

    fetch(baseURL + "/api/transfers/verify-account", requestOptions)
      .then(response => response.json())
      .then(response => {
        const { data, status, message } = response;
        if (status == "success") {
          const accountName = data.accountName
          const sessionId = data.sessionId
          setActName({ name: accountName, color: "#00C566", sessionId })
        } else {
          setActName({ name: message, color: "#ff0000be", })
        }
        handleError(status, message);
        setPreloader(false)
      })
      .catch(error => {
        setPreloader(false);
        console.log('error', error)
      });

  }

  function transfer() {
    setPreloader(true)
    const data = {
      saveBeneficiary: false,
      nameEnquiryReference: actName.sessionId,
      debitAccountNumber: accountInfo.account_number,
      beneficiaryBankCode: "HAGMUS",
      beneficiaryAccountNumber: accountNumber,
      amount: amount,
      narration: narration,
      pin,
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${token}`
      },
      body: JSON.stringify(data),
      redirect: 'follow'
    };

    fetch(baseURL + "/api/transfers", requestOptions)
      .then(response => response.json())
      .then(response => {
        const { data, status, message } = response;
        // console.log(response);
        setPreloader(false)
        if (status == "success") {
          setAmount(0)
          setPin("")
          navigation.navigate("Successful", {
            name: "",
            amount: `${symbol("ngn")}${amount}`,
            message: `${symbol("ngn")}${amount} has been transfered to ${actName.name} successfully`,
            screen: "HagmusTransfer"
          })
        }
        handleError(status, message);
      })
      .catch(error => {
        setPreloader(false)
        console.log('error', error)
      });

  }


  function validation(input) {
    const limit = selectedCoin.name == 'ngn' ? 100 : 1
    if (input >= limit) {
      if (input < userInfo[selectedCoin.name]) {
        setAmount(Number(input))
        setMessage2('Amount Ok');
        setColor('#02904bff')
      } else {
        setMessage2(`Insufficient Balace (Bal: ${userInfo.ngn})`);
        setColor('#ff0000be')
        setAmount(0)
      }
    }
    else {
      setMessage2(`Amount must be above ${symbol(selectedCoin.name)}${limit}`);
      setColor('#ff0000ff')
      setAmount(0)
    }
  }

  function btnVal() {
    if (amount > 0 || accountNumber.length == 10) {
      return (
        <TouchableOpacity onPress={() => { closeModal2() }}
          style={styles.getStarted}>
          <Text style={{ fontSize: 16, }}>Next</Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <View style={[styles.getStarted, { backgroundColor: "#9d8fdf" }]}>
          <Text style={{ fontSize: 16, }}>Next</Text>
        </View>
      )
    }
  }

  return (
    <AppSafeAreaView style={styles.container}>
      <View style={styles.body}>
        <View style={{ margin: 10, flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              size={20}
              color='#787A8D'
              style={{ marginRight: '10%' }}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, color: 'black', }}>Transfer To HagmusPay</Text>
        </View>

        <ScrollView>
          <View style={{
            flexDirection: 'row', alignItems: 'center', backgroundColor: '#cfc8f0',
            padding: 5, borderRadius: 8, marginTop: 6, justifyContent: 'center', marginHorizontal: 15
          }}>
            <FontAwesomeIcon icon={faClock} color="#5a3def" />
            <Text style={{ fontWeight: 'bold', fontSize: 11, color: '#5a3def', marginLeft: 5 }}>Credited in 60s Guaranteed</Text>
          </View>

          <View>
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity onPress={() => navigation.navigate('Airtime')}>
                <Image source={require('../../assets/BONUSF.png')} style={{ height: 150, width: 410, }} />
              </TouchableOpacity>
            </View>
            <View style={{ margin: 15, backgroundColor: '#f6f5f9', padding: 15, borderRadius: 8 }}>

              <Text style={styles.signupText}>Recipient Account</Text>
              <TextInput
                style={[styles.inputStyle, { marginBottom: 0 }]}
                keyboardType='number-pad'
                placeholder='Enter 10 digits Account Number'
                selectionColor={'#7B61FF'}
                mode='outlined'
                placeholderTextColor='#999aa5'
                onChangeText={inp => { setAccountNumber(inp); inp.length == 10 ? verifyName(inp) : null }}
              />
              {"name" in actName ?
                <Text style={{ fontSize: 15, color: actName.color }}>{actName.name}</Text> : null
              }

              <Text style={[styles.signupText, { marginTop: 15 }]}>Amount</Text>
              <TextInput
                style={styles.inputStyle}
                keyboardType='numeric'
                placeholder='0'
                selectionColor={'#7B61FF'}
                mode='outlined'
                placeholderTextColor="#999aa5"
                onChangeText={inp => setAmount(Number(inp.trim()))}
              />

              <Text style={[styles.signupText, { marginTop: 15 }]}>Narration (Optional)</Text>
              <TextInput
                style={styles.inputStyle}
                placeholder='Narration'
                selectionColor={'#7B61FF'}
                mode='outlined'
                placeholderTextColor="#999aa5"
                onChangeText={inp => setNarration(inp.trim())}
              />
            </View>

            {btnVal()}
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('History')}
            activeOpacity={0.5}
            style={{
              backgroundColor: '#f6f5f9', margin: 10, padding: 10, borderRadius: 8,
              flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ marginRight: 8, backgroundColor: 'white', padding: 6, borderRadius: 8 }}>
                <FontAwesomeIcon icon={faScroll} size={20} color="#312183" />
              </View>
              <View>
                <Text>Transaction History</Text>
              </View>
            </View>
            <FontAwesomeIcon icon={faChevronRight} color="#312183" />
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* =============== Confirmation Modal =============== */}
      {modalVisibility2 ?
        <Modal
          visible={modalVisibility2}
          animationType="slide"
          transparent={true}
        >
          <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
            <Pressable style={{ flex: 1 }} onPress={closeModal2} >
            </Pressable>
            <View style={{ backgroundColor: "#16171D", borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
              <View style={{ alignItems: 'flex-end', margin: 10, marginBottom: 0 }}>
                <TouchableOpacity onPress={closeModal2}>
                  <FontAwesomeIcon
                    icon={faXmark}
                    size={24}
                    color='#787A8D'
                  />
                </TouchableOpacity>
              </View>
              <Text style={{
                color: 'white', fontWeight: 'bold', marginTop: 0,
                fontSize: 17, margin: 10, textAlign: "center"
              }}>Confirm Details</Text>
              <View>
                <Text style={{ backgroundColor: '#21242D', marginHorizontal: 10, padding: 7, borderRadius: 10, color: "#ffffffab" }}>
                  Confirm the transfer details are correct before you proceed to avoid mistakes. Successful transfers cannot be reversed.
                </Text>

                <View style={{ marginVertical: 10 }}>
                  <View style={{ margin: 10, flexDirection: "row", justifyContent: "center" }}>
                    <View style={{ alignItems: "center", justifyContent: "center" }}>

                      <Image source={require("../../assets/icon.png")} style={{ width: 40, height: 40, borderRadius: 100, }} />
                      <Text style={{ color: '#e0e0e1', fontSize: 14, marginStart: 3 }}>HagmusPay</Text>
                    </View>
                  </View>
                  <View style={{ margin: 10, flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ color: '#949597', fontSize: 14, }}>Account Number</Text>
                    <Text style={{ color: '#e0e0e1', fontSize: 14, marginStart: 3, fontWeight: "bold" }}>{accountNumber}</Text>
                  </View>
                  <View style={{ margin: 10, flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ color: '#949597', fontSize: 14, }}>Account Name</Text>
                    <View style={{ alignItems: "flex-end", flex: 1 }}>
                      {/* <FontAwesomeIcon icon={faCheckCircle} color="#7B61FF" /> */}
                      <Text style={{ color: '#e0e0e1', fontSize: 14, marginStart: 3, flex: 1 }}> {actName.name}</Text>
                    </View>
                  </View>
                  <View style={{ margin: 10, flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ color: '#949597', fontSize: 14, }}>Amount</Text>
                    <Text style={{ color: '#e0e0e1', fontSize: 14, marginStart: 3, fontWeight: "bold" }}>{symbol("ngn")}{amount}</Text>
                  </View>
                  <View style={{ margin: 10, flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ color: '#949597', fontSize: 14, }}>Fee</Text>
                    <Text style={{ color: '#e0e0e1', fontSize: 14, marginStart: 3, fontWeight: "bold" }}>{symbol("ngn")}{0}</Text>
                  </View>
                  <TouchableOpacity onPress={() => { closeModal2(), pinModal() }}
                    style={styles.getStarted}>
                    <Text style={{ fontSize: 16, }}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        : null
      }
      {/* ================= Pin Modal ================= */}
      <PinTransactionModal visibility={pinModalVisibility} onClose={pinModal} onVerify={() => { pinModal(); transfer() }} />

    </AppSafeAreaView>
  )
}
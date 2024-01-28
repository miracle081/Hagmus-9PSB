import { faAngleRight, faArrowLeft, faCheckCircle, faFaceSadCry, faFaceSmile, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Pressable, FlatList, Image, Modal, Alert, } from "react-native";
import { styles } from "../styles/hagmustransfer";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../globals/AppContext";
import { addDoc, collection, doc, getDocs, onSnapshot, query, runTransaction, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { ToastApp } from "../components/Toast";
import { dateTime, generateRef } from "../components/DateTime";
import { AppSafeAreaView } from "../components/AppSafeAreaView";

export function BankTransfer({ navigation }) {
  const { userUID, setPreloader, userInfo } = useContext(AppContext);
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
  const [Pin, setPin] = useState('');

  useEffect(() => {
    setPreloader(true)
    onSnapshot(collection(db, 'users'), (onSnap) => {
      const allData = [];
      onSnap.forEach(item => {
        const itemData = item.data();
        allData.push(itemData);
      })
      setallUsers(allData)
      setPreloader(false)
    })
    const q = collection(db, 'userCoins');
    const filter = query(q, where('UID', '==', userUID));
    onSnapshot(filter, (onSnap) => {
      const allData = [];
      onSnap.forEach(item => {
        const itemData = item.data();
        allData.push({ ...itemData, docId: item.id });
      })
      setUserCoins(allData);
    });
  }, []);

  const closeModal = () => {
    setModalVisibility(!modalVisibility);
  };
  const closeModal2 = () => {
    setModalVisibility2(!modalVisibility2);
  };
  const pinModal = () => {
    setPinMetModalVisibility(!pinModalVisibility);
  };

  function checkUserName(userN) {
    setActivity(true)
    setmessage("")
    if (userN.length > 3) {
      const dbAPIvalue = allUsers.filter(i => i.userName == userN)
      if (dbAPIvalue.length === 1) {
        setmColor("gray")
        setTimeout(() => {
          setActivity(false)
          setmessage(`${dbAPIvalue[0].fname} ${dbAPIvalue[0].lname}`)
          setmColor("#00C566")
        }, 2000);
        setuserName(userN)
        setrecieverInfo(dbAPIvalue[0])
      }
      else if (dbAPIvalue.length === 0) {
        setmessage("")
        setTimeout(() => {
          setActivity(false)
          setmessage("No user with this username")
        }, 2000);
        setuserName('')
        setmColor("#FF403B")
        setrecieverInfo({ userName: '', uid: "", fname: "", lname: '' })
      }
      else {
        setmessage("")
        setTimeout(() => {
          setActivity(false)
        }, 2000);
        setuserName('')
        setmColor("#FF403B")
        setrecieverInfo({ userName: '', uid: "", fname: "", lname: '' })
      }
    } else {
      setmessage("")
      setTimeout(() => {
        setActivity(false)
        setmessage("username must be 4 characters and above")
      }, 500);
      setuserName('')
      setmColor("#FF403B")
      setrecieverInfo({ userName: "", uid: "", fname: "", lname: '' })
    }
  }

  async function confirmation() {
    setPreloader(true)
    const q = collection(db, 'userCoins');
    const filter = query(q, where('UID', '==', recieverInfo.uid), where('coinName', '==', selectedCoin.name));
    const querySnapshot = await getDocs(filter)
    const rCoin = [];
    querySnapshot.forEach(item => {
      const itemData = item.data();
      rCoin.push({ ...itemData, docId: item.id });
    })
    setRecieverCoin(rCoin)
    setPreloader(false)
    setModalVisibility2(true)

  }

  async function send() {
    setModalVisibility2(false)
    setPreloader(true)
    if (userInfo.userStatus == "verified") {
      try {
        await runTransaction(db, (transaction) => {
          transaction.update(doc(db, 'userCoins', selectedCoin.docId), { coinValue: Number(selectedCoin.coinValue) - Number(amount) },)
          return Promise.resolve()
        })
        if (recieverCoin.length == 0) {
          addDoc(collection(db, 'userCoins'), {
            UID: recieverInfo.uid,
            dataID: new Date().getTime(),
            coinName: selectedCoin.name,
            coinID: selectedCoin.id,
            image: selectedCoin.img,
            symbol: selectedCoin.symbol,
            coinValue: amount,
            date: dateTime(),
            rank: selectedCoin.rank
          })
            .then(() => {
              addDoc(collection(db, 'histories'), {
                category: "transfer",
                UID: recieverInfo.uid,
                dataID: new Date().getTime(),
                coinName: selectedCoin.name,
                image: selectedCoin.img,
                symbol: selectedCoin.symbol,
                coinValue: amount,
                date: dateTime(),
                description: `${userInfo.first_name} ${userInfo.last_name}.`,
                transType: "received",
                refID: generateRef(15),
              })
              addDoc(collection(db, 'histories'), {
                category: "transfer",
                UID: userUID,
                dataID: new Date().getTime(),
                coinName: selectedCoin.name,
                image: selectedCoin.img,
                symbol: selectedCoin.symbol,
                coinValue: amount,
                date: dateTime(),
                description: `${recieverInfo.fname} ${recieverInfo.lname}.`,
                refID: generateRef(15),
                transType: "sent"
              })
                .then(() => {
                  setSelectedCoin({ id: "", name: "", symbol: "", img: null, coinValue: 0, docId: "", rank: 0 })
                  setuserName("")
                  setAmount(0)
                  setPreloader(false)
                  navigation.navigate("Successful", {
                    name: selectedCoin.name,
                    amount,
                    message: `${amount}${selectedCoin.symbol.toUpperCase()} has been transfered to ${recieverInfo.fname} ${recieverInfo.lname} successfuly`,
                    screen: "HagmusTransfer"
                  })
                })
                .catch(() => {
                  setPreloader(false)
                  ToastApp('Something went wrong, please try again', "LONG");
                })
            })
            .catch(() => {
              setPreloader(false)
              ToastApp('Something went wrong, please try again', "LONG");
            })
        }
        else {
          await runTransaction(db, (transaction) => {
            transaction.update(doc(db, 'userCoins', recieverCoin[0].docId), { coinValue: Number(recieverCoin[0].coinValue) + amount },)
            return Promise.resolve()
          })
            .then(() => {
              addDoc(collection(db, 'histories'), {
                category: "transfer",
                UID: recieverInfo.uid,
                dataID: new Date().getTime(),
                coinName: selectedCoin.name,
                image: selectedCoin.img,
                symbol: selectedCoin.symbol,
                coinValue: amount,
                date: dateTime(),
                description: `${userInfo.first_name} ${userInfo.last_name}`,
                refID: generateRef(15),
                transType: "received"
              })
              addDoc(collection(db, 'histories'), {
                category: "transfer",
                UID: userUID,
                dataID: new Date().getTime(),
                coinName: selectedCoin.name,
                image: selectedCoin.img,
                symbol: selectedCoin.symbol,
                coinValue: amount,
                date: dateTime(),
                description: `${recieverInfo.fname} ${recieverInfo.lname}`,
                refID: generateRef(15),
                transType: "sent"
              })
                .then(() => {
                  setPreloader(false)
                  setSelectedCoin({ id: "", name: "", symbol: "", img: null, coinValue: 0, docId: "", rank: 0 })
                  setuserName("")
                  setAmount(0)
                  setModalVisibility2(false)
                  navigation.navigate("Successful", {
                    name: selectedCoin.name,
                    amount,
                    message: `${amount}${selectedCoin.symbol.toUpperCase()} has been transfered to ${recieverInfo.fname} ${recieverInfo.lname} successfuly`,
                    screen: "HagmusTransfer"
                  })
                })
                .catch(() => {
                  setModalVisibility2(false)
                  setPreloader(false)
                  ToastApp('Something went wrong, please try again', "LONG");
                })
            })
            .catch(() => {
              setPreloader(false);
              ToastApp('Something went wrong, please try again', "LONG");
              setModalVisibility2(false)
            })
        }

      } catch {
        setPreloader(false)
      }
    } else if (userInfo.userStatus == "pending") {
      Alert.alert("Failed", "Your documents are under review.")
    }
    else {
      Alert.alert("Failed", "Please verify your account to continue this process",
        [{ text: "Verify Account", onPress: () => navigation.navigate("Kyc") }]
      )
    }

  }

  function validation(inp) {
    if (inp > 0) {
      if (inp <= selectedCoin.coinValue) {
        setAmount(Number(inp))
        setMessage2('Amount Ok');
        setColor('#02904bff')
      } else {
        setMessage2(`Insufficient ${selectedCoin.name} (Bal: ${selectedCoin.coinValue})`);
        setColor('#ff0000be')
        setAmount(0)
      }
    }
    else {
      setMessage2('Amount must not be empty');
      setColor('#ff0000ff')
      setAmount(0)
    }
  }

  function btnVal() {
    if (userName === "" || amount <= 0) {
      return (
        <View style={[styles.getStarted, { backgroundColor: "#494D58" }]}>
          <Text style={{ fontSize: 16, }}>Next</Text>
        </View>
      )
    } else {
      return (
        <TouchableOpacity onPress={confirmation}
          style={styles.getStarted}>
          <Text style={{ fontSize: 16, }}>Next</Text>
        </TouchableOpacity>
      )
    }
  }

  function pinVerification() {
    if (Pin === userInfo.pin) {
      pinModal()
      send();
    }
    else {
      ToastApp("Incorrect PIN, Please try again", "LONG")
    }
  }

  return (
    <AppSafeAreaView style={styles.container}>
      <View style={styles.body}>
        <View style={{ margin: 14 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              size={20}
              color='#787A8D'
              style={{ marginRight: '30%' }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', marginBottom: 15 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 23, color: 'white' }}>Send To Bank</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 11, color: '#787A8D' }}>Make local transfer fast</Text>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('HagmusTfHistory')}
            activeOpacity={0.5}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "flex-end", marginEnd: 10 }}>
              <Text style={{ color: '#7B61FF' }}>Transfer History</Text>
              <FontAwesomeIcon
                icon={faAngleRight}
                color="#7B61FF"
                size={18}
                style={{ marginTop: 4 }}
              />
            </View>
          </TouchableOpacity>
          <View style={{ margin: 15 }}>

          <Text style={styles.signupText}>Send</Text>
            <TouchableOpacity onPress={closeModal}
              activeOpacity={0.5}
            >
              <View style={{
                backgroundColor: '#21242D', padding: 14.5, flexDirection: 'row',
                alignItems: 'center', justifyContent: 'space-between', borderRadius: 5, marginBottom: 25
              }}>
                {selectedCoin.img == null && selectedCoin.name == "" ?
                  <Text style={{ color: '#787A8D', fontSize: 15 }}>Select Bank</Text> :
                  <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: selectedCoin.img }} style={{ width: 20, height: 20 }} />
                    <Text style={{ color: '#c1c2cb', fontSize: 14, marginStart: 3 }}>{selectedCoin.name} (Amt: {selectedCoin.coinValue.toFixed(5)})</Text>
                  </View>
                }
                <FontAwesomeIcon
                  icon={faAngleRight}
                  color={"#787A8D"}
                />
              </View>
            </TouchableOpacity>

            <Text style={styles.signupText}>Account number</Text>
            <TextInput
              style={[styles.inputStyle, { marginBottom: 0 }]}
              keyboardType='visible-password'
              placeholder='0'
              selectionColor={'#7B61FF'}
              mode='outlined'
              placeholderTextColor='#787A8D'
              onChangeText={inp => checkUserName(inp.trim().toLowerCase())}
            />
            {mColor == "#00C566" ?
              <View style={[styles.getStarted, { borderRadius: 70, padding: 5 }]}>
                <Text style={{ fontSize: 16, color: "white" }}>{message}</Text>
              </View>
              :
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}>
                {activity ? <ActivityIndicator size={15} color="green" /> : null}
                {message != "" ? <Text style={{ color: mColor, fontSize: 13, marginStart: 2 }}>{message}</Text> : null}
              </View>
            }

           

            <Text style={styles.signupText}>Amount</Text>
            <TextInput
              style={[styles.inputStyle, { marginBottom: 0 }]}
              keyboardType='numeric'
              placeholder='0'
              selectionColor={'#7B61FF'}
              mode='outlined'
              placeholderTextColor="#787A8D"
              onChangeText={inp => validation(Number(inp.trim()))}
            // value={`${amount}`}
            />
            {message2 != "" ? <Text style={{ marginBottom: 25, color: color }}>{message2}</Text> : null}
          </View>

          {btnVal()}
        </View>
      </View>

      {/* ================ Assets Modal ============= */}
      <Modal
        visible={modalVisibility}
        animationType="slide"
        transparent={true}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
          <Pressable style={{ flex: 1 }} onPress={closeModal} >
          </Pressable>
          <View style={{ backgroundColor: "#16171D", height: 450, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
            <View style={{ alignItems: 'flex-end', margin: 10 }}>
              <TouchableOpacity onPress={closeModal}>
                <FontAwesomeIcon
                  icon={faXmark}
                  size={24}
                  color='#787A8D'
                />
              </TouchableOpacity>
            </View>
            <View style={{ marginLeft: 5 }}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15, margin: 10 }}>Avaliable Assets on Spot</Text>
            </View>
            <View style={{ padding: 10, flex: 1 }}>
              {
                userCoins.length > 0 ?
                  <FlatList data={userCoins.sort((a, b) => a.rank - b.rank)} style={{ flex: 1 }}
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity onPress={() => {
                          setSelectedCoin({
                            id: item.coinID, docId: item.docId, rank: item.rank,
                            name: item.coinName, symbol: item.symbol, img: item.image, coinValue: item.coinValue,
                          })
                          validation(0)
                          closeModal()
                        }} style={{ marginBottom: 13 }}>
                          <View style={styles.portfolio}>
                            <View style={styles.News}>
                              <View style={{ marginRight: 10 }}>
                                <Image source={{ uri: item.image }} style={styles.newsImg} />
                              </View>
                              <View>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>{item.coinName}</Text>
                                <Text style={{ color: 'grey', fontSize: 11, textTransform: "uppercase" }}>{item.symbol}</Text>
                              </View>
                            </View>
                            <View>
                              <Text style={{ color: '#ffffffb7', fontWeight: 'bold', fontSize: 13 }}>{item.coinValue.toFixed(4)}</Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      )
                    }} key={({ item }) => { item.id }} /> :
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: 'center',
                      opacity: 0.5,
                      zIndex: -1,
                    }}>
                    <FontAwesomeIcon icon={faFaceSadCry} color="gray" size={120} />
                    <Text style={{ fontSize: 16, marginTop: 20, color: '#ffffffb7' }}>No Assets on Spot</Text>
                  </View>
              }
            </View>
          </View>
        </View>
      </Modal>

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
                  <View style={{ margin: 10, flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ color: '#949597', fontSize: 14, }}>Asset</Text>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                      <Image source={{ uri: selectedCoin.img }} style={{ width: 20, height: 20 }} />
                      <Text style={{ color: '#e0e0e1', fontSize: 14, marginStart: 3 }}> {selectedCoin.name}</Text>
                    </View>
                  </View>
                  <View style={{ margin: 10, flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ color: '#949597', fontSize: 14, }}>Username</Text>
                    <Text style={{ color: '#e0e0e1', fontSize: 14, marginStart: 3, fontWeight: "bold" }}>@{userName}</Text>
                  </View>
                  <View style={{ margin: 10, flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ color: '#949597', fontSize: 14, }}>Name</Text>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                      <FontAwesomeIcon icon={faCheckCircle} color="#7B61FF" />
                      <Text style={{ color: '#e0e0e1', fontSize: 14, marginStart: 3 }}> {recieverInfo.fname} {recieverInfo.lname}</Text>
                    </View>
                  </View>
                  <View style={{ margin: 10, flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ color: '#949597', fontSize: 14, }}>Amount</Text>
                    <Text style={{ color: '#e0e0e1', fontSize: 14, marginStart: 3, fontWeight: "bold" }}>${amount}</Text>
                  </View>
                  <TouchableOpacity onPress={() => { setModalVisibility2(false), send() }}
                    style={styles.getStarted}>
                    <Text style={{ fontSize: 16, }}>Next</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        : null
      }
      {/* ================= Pin Modal ================= */}
      {/* <Modal
        visible={pinModalVisibility}
        animationType="slide"
        transparent={true}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
          <Pressable style={{ flex: 1 }} onPress={pinModal} >
          </Pressable>
          <View style={{ backgroundColor: "#16171D", height: 450, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
            <View style={{ alignItems: 'flex-end', margin: 10 }}>
              <TouchableOpacity onPress={pinModal}>
                <FontAwesomeIcon
                  icon={faXmark}
                  size={24}
                  color='#787A8D'
                />
              </TouchableOpacity>
            </View>
            <View style={{ marginLeft: 5 }}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15, margin: 10 }}>Avaliable Assets on Spot</Text>
            </View>
            <View style={{ padding: 10, flex: 1 }}>
              <Text style={styles.signupText}>Verify with your transaction PIN</Text>
              <TextInput
                style={[styles.inputStyle, { marginBottom: 0 }]}
                keyboardType='number-pad'
                placeholder='PIN'
                selectionColor={'#7B61FF'}
                mode='outlined'
                placeholderTextColor='#787A8D'
                onChangeText={inp => setPin(inp.trim().toLowerCase())}
              />
              <TouchableOpacity disabled={Pin.length === 4 ? false : true} onPress={pinVerification}
                style={styles.getStarted}>
                <Text style={{ fontSize: 16, }}>Verify</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal> */}
    </AppSafeAreaView>
  )
}
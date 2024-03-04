import { faAngleRight, faArrowLeft, faCalendar, faCalendarAlt, faCalendarDays, faCheckCircle, faFaceSadCry, faFaceSmile, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Pressable, FlatList, Image, Modal, Alert, } from "react-native";
import { styles } from "../../styles/hagmustransfer";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../globals/AppContext";
import { addDoc, collection, doc, onSnapshot, query, runTransaction, updateDoc, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import DateTimePicker from '@react-native-community/datetimepicker';
import { ToastApp } from "../../components/Toast";
import { dateTime, generateRef } from "../../components/DateTime";
import moment from "moment";


export function CreatePlan({ navigation }) {
  const { userUID, setPreloader, userInfo } = useContext(AppContext);
  const [activity, setActivity] = useState(false);
  const [message, setmessage] = useState('');
  const [modalVisibility, setModalVisibility] = useState(false);
  const [modalVisibility2, setModalVisibility2] = useState(false);
  const [pinModalVisibility, setPinMetModalVisibility] = useState(false);
  const [userName, setuserName] = useState('');
  const [userCoins, setUserCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState({ coinName: "", symbol: "", image: null, coinValue: 0, docId: "", rank: 0 });
  const [amount, setAmount] = useState(0);
  const [recieverCoin, setRecieverCoin] = useState([{ docId: "", coinValue: 0 }]);
  const [color, setColor] = useState('gray');
  const [message2, setMessage2] = useState('');
  const [dateVisibility, setDateVisibility] = useState(false);
  const [endDate, setEndDate] = useState("");
  const [coinLock, setCoinLock] = useState([]);

  useEffect(() => {
    setPreloader(true)
    const q = collection(db, 'userCoins');
    const filter = query(q, where('UID', '==', userUID));
    onSnapshot(filter, (onSnap) => {
      const allData = [];
      onSnap.forEach(item => {
        const itemData = item.data();
        allData.push({ ...itemData, docId: item.id });
      })
      setUserCoins(allData);
      setPreloader(false)
    });
    onSnapshot(doc(db, "vault", userUID), (doc) => {
      const info = doc.data().coinLock
      setCoinLock(info);
    });
  }, []);

  const closeModal = () => {
    setModalVisibility(!modalVisibility);
  };
  const closeModal2 = () => {
    setModalVisibility2(!modalVisibility2);
  };

  async function lockCoin() {
    setPreloader(true)
    try {
      await runTransaction(db, (transaction) => {
        transaction.update(doc(db, 'userCoins', selectedCoin.docId), { coinValue: Number(selectedCoin.coinValue) - Number(amount) },)
        return Promise.resolve()
      })
        .then(() => {
          updateDoc(doc(db, "vault", userUID), {
            coinLock: [...coinLock, {
              docId: selectedCoin.docId,
              dataID: new Date().getTime(),
              coinName: selectedCoin.coinName,
              image: selectedCoin.image,
              symbol: selectedCoin.symbol,
              coinValue: amount,
              endDate,
            }]
          })
            .then(() => {
              setPreloader(false)
              setSelectedCoin({ coinName: "", symbol: "", image: null, coinValue: 0, docId: "", rank: 0 })
              setAmount(0)
              navigation.goBack();
            })
            .catch(() => {
              setPreloader(false)
              ToastApp('Something went wrong, please try again', "LONG");
            })
        })
        .catch(() => {
          setPreloader(false);
          ToastApp('Something went wrong, please try again', "LONG");
        })

    } catch {
      setPreloader(false)
    }
  }

  function validation(inp) {
    if (inp > 0) {
      if (inp <= selectedCoin.coinValue) {
        setAmount(Number(inp))
        setMessage2('Amount Ok');
        setColor('#00ff84be')
      } else {
        setMessage2(`Insufficient ${selectedCoin.coinName} (Bal: ${selectedCoin.coinValue})`);
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
    if (endDate === "" || amount <= 0) {
      return (
        <View style={[styles.getStarted, { backgroundColor: "#7b61ff5e" }]}>
          <Text style={{ fontSize: 16, }}>Next</Text>
        </View>
      )
    } else {
      return (
        <TouchableOpacity onPress={closeModal2}
          style={styles.getStarted}>
          <Text style={{ fontSize: 16, }}>Next</Text>
        </TouchableOpacity>
      )
    }
  }

  const onChange = (returnDate) => {
    setDateVisibility(!dateVisibility)
    const currentDate = new Date().getTime();
    const timeS = returnDate.nativeEvent.timestamp
    if (timeS > currentDate) {
      setEndDate(timeS);
    } else {
      setEndDate("");
      ToastApp("Please select end data");
    }
  };

  function dateConverter() {
    let rDate = new Date(endDate)
    rDate = rDate.toLocaleDateString()
    return moment(endDate).format('DD/MM/YYYY')
  };
  

 

  return (
    <View style={styles.container}>
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
          <Text style={{ fontWeight: 'bold', fontSize: 23, color: 'white' }}>Lock Asset</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 11, color: '#787A8D' }}>Lock Crypto and unlock on a due date</Text>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('HagmusTfHistory')}
            activeOpacity={0.5}
          >
          </TouchableOpacity>
          <View style={{ margin: 15 }}>


            <Text style={styles.signupText}>Asset</Text>
            <TouchableOpacity onPress={closeModal}
              activeOpacity={0.5}
            >
              <View style={{
                backgroundColor: '#21242D', padding: 14.5, flexDirection: 'row',
                alignItems: 'center', justifyContent: 'space-between', borderRadius: 5, marginBottom: 25
              }}>
                {selectedCoin.image == null && selectedCoin.coinName == "" ?
                  <Text style={{ color: '#787A8D', fontSize: 15 }}>Select Crypto</Text> :
                  <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: selectedCoin.image }} style={{ width: 20, height: 20 }} />
                    <Text style={{ color: '#c1c2cb', fontSize: 14, marginStart: 3 }}>{selectedCoin.coinName} (Amt: {selectedCoin.coinValue.toFixed(5)})</Text>
                  </View>
                }
                <FontAwesomeIcon
                  icon={faAngleRight}
                  color={"#787A8D"}
                />
              </View>
            </TouchableOpacity>

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

            {dateVisibility ?
              <DateTimePicker
                mode={'date'}
                value={new Date()}
                onChange={d => onChange(d)}
              />
              : null}

            <Text style={[styles.signupText, { marginTop: 15 }]}>Date</Text>
            <View style={{ position: "relative" }}>
              <Pressable onPress={() => setDateVisibility(true)}>
                <Text style={[styles.inputStyle, { paddingVertical: 15 }]}>{endDate == "" ? "Select end date" : dateConverter()}</Text>
              </Pressable>
              <TouchableOpacity onPress={() => setDateVisibility(true)} style={styles.calenderIcon}>
                <FontAwesomeIcon icon={faCalendarAlt} color="white" />
              </TouchableOpacity>
            </View>
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
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15, margin: 10 }}>Select Assets to lock</Text>
            </View>
            <View style={{ padding: 10, flex: 1 }}>
              {
                userCoins.length > 0 ?
                  <FlatList data={userCoins.sort((a, b) => a.rank - b.rank)} style={{ flex: 1 }}
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity onPress={() => {
                          setSelectedCoin(item)
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
                Confirm lock details before you proceed to avoid mistakes. Successful locked asset cannot be reversed.
              </Text>

              <View style={{ marginVertical: 10 }}>
                <View style={{ margin: 10, flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ color: '#949597', fontSize: 14, }}>Asset</Text>
                  <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <Image source={{ uri: selectedCoin.image }} style={{ width: 20, height: 20 }} />
                    <Text style={{ color: '#e0e0e1', fontSize: 14, marginStart: 3 }}> {selectedCoin.name}</Text>
                  </View>
                </View>
                <View style={{ margin: 10, flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ color: '#949597', fontSize: 14, }}>Amount</Text>
                  <Text style={{ color: '#e0e0e1', fontSize: 14, marginStart: 3, fontWeight: "bold" }}>{amount}</Text>
                </View>
                <View style={{ margin: 10, flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ color: '#949597', fontSize: 14, }}>Due Date</Text>
                  <Text style={{ color: '#e0e0e1', fontSize: 14, marginStart: 3 }}>{dateConverter()}</Text>
                </View>
                <TouchableOpacity onPress={() => { closeModal2(), lockCoin() }}
                  style={styles.getStarted}>
                  <Text style={{ fontSize: 16, }}>Lock Asset</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}
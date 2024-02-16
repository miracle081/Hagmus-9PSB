import { faAngleRight, faArrowLeft, faBank, faCheckCircle, faChevronRight, faFaceSadCry, faFaceSmile, faScroll, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Pressable, FlatList, Image, Modal, Alert, ScrollView, } from "react-native";
import { styles } from "../styles/hagmustransfer";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../globals/AppContext";
import { ToastApp } from "../components/Toast";
import { AppSafeAreaView } from "../components/AppSafeAreaView";
import { symbol } from "../components/currencySymbols";
import axios from "axios";
import { faAddressBook } from "@fortawesome/free-regular-svg-icons";
import { handleError } from "../components/HandleRequestError";
import { baseURL } from "../../config";
import { PinTransactionModal } from "../components/PinModal";

export function BorderTransfer({ navigation }) {
  const { token, setPreloader, userInfo, accountInfo, pin, setPin } = useContext(AppContext);
  const [message, setmessage] = useState('');
  const [modalVisibility, setModalVisibility] = useState(false);
  const [modalVisibility2, setModalVisibility2] = useState(false);
  const [pinModalVisibility, setPinMetModalVisibility] = useState(false);
  const [selectedBank, setSelectedBank] = useState({ bankCode: "", name: "", img: null, });
  const [amount, setAmount] = useState(0);
  const [narration, setNarration] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankList, setBankList] = useState([]);
  const [filteredBanks, setFilteredBanks] = useState([]);
  const [actName, setActName] = useState({});



  useEffect(() => {
    setPreloader(true)
    function fetchBankList() {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: {
          authorization: `bearer ${token}`
        }
      };

      fetch(baseURL + "/api/transfers/banks", requestOptions)
        .then(response => response.json())
        .then(response => {
          const { data, status, message } = response
          if (status == "success") {
            // console.log(data); 
            setBankList(data)
            setFilteredBanks(data)
          }
          handleError(status, message);
          setPreloader(false)
        })
        .catch(error => {
          setPreloader(false)
          console.log('error', error)
          Alert.alert("Error!", error.message)
        });
    }
    fetchBankList();
  }, []);

  function verifyName(accountNumber) {
    setPreloader(true)

    const data = {
      bank_code: selectedBank.bankCode,
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
        setPreloader(false)
        console.log('error', error)
        Alert.alert("Error!", error.message)
      });

    // const authOptions = {
    //   method: 'POST',
    //   url: 'https://api.safehavenmfb.com/oauth2/token',
    //   headers: { accept: 'application/json', 'content-type': 'application/json' },
    //   data: {
    //     grant_type: 'client_credentials',
    //     client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    //     client_assertion: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0ZWNtdXMub3JnIiwic3ViIjoiMjAwNGQyM2I2MDMxODhkOTJhNjg1OThhNWYwMTI1NWUiLCJhdWQiOiJodHRwczovL2FwaS5zYWZlaGF2ZW5tZmIuY29tIiwiaWF0IjoxNzAyNzQwMjI0LCJleHAiOjE5MDI3NDA4MjR9.wLLK8VJTQCxvL_K9f0kk2aqt5KCi-wMifyJJ_9ZVt7nV4Gk1IIeieRFuxBsy2bhu-LyO2TvPR71z5cnt49HSEsJQ0WZ7ElRg9mE4BIGHqcqVVuFZc1SaKLAebwClH8NQ7wSypB5SHpSFG7Mo3tD5J0IgInvaxyQGZAUSyUtLpXc',
    //     client_id: '2004d23b603188d92a68598a5f01255e'
    //   }
    // };

    // axios
    //   .request(authOptions)
    //   .then(response => {
    //     const { data } = response
    //     if ("access_token" in data) {
    //       fetchBankList(data.access_token, data.ibs_client_id)
    //       const nameOptions = {
    //         method: 'POST',
    //         url: 'https://api.safehavenmfb.com/transfers/name-enquiry',
    //         headers: {
    //           accept: 'application/json',
    //           ClientID: data.ibs_client_id,
    //           'content-type': 'application/json',
    //           authorization: `Bearer ${data.access_token}`
    //         },
    //         data: {
    //           bankCode: selectedBank.bankCode,
    //           accountNumber
    //         }
    //       };
    //       axios
    //         .request(nameOptions)
    //         .then(function (response) {
    //           console.log(response.data);
    //           if ("data" in response.data) {
    //             const accountName = response.data.data.accountName
    //             const sessionId = response.data.data.sessionId
    //             setActName({ name: accountName, color: "#00C566", sessionId })
    //           } else {
    //             setActName({ name: response.data.message, color: "#ff0000be", })
    //           }
    //           setPreloader(false)
    //         })
    //         .catch(function (error) {
    //           setPreloader(false)
    //           console.error(error);
    //         });
    //     } else {
    //       setPreloader(false)
    //       ToastApp("Unable to authenticate")
    //     }
    //   })
    //   .catch(error => {
    //     setPreloader(false)
    //     console.error(error);
    //   });
  }

  function transfer() {
    setPreloader(true)
    const data = {
      saveBeneficiary: false,
      nameEnquiryReference: actName.sessionId,
      debitAccountNumber: accountInfo.account_number,
      beneficiaryBankCode: selectedBank.bankCode,
      beneficiaryAccountNumber: accountNumber,
      amount: amount,
      narration: narration,
      pin
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
        console.log(response);
        setPreloader(false)
        if (status == "success") {
          setAmount(0)
          setPin("")
          navigation.navigate("Successful", {
            name: "",
            amount: `${symbol("ngn")}${amount}`,
            message: `${symbol("ngn")}${amount} has been transfered to ${actName.name} successfuly`,
            screen: "BorderTransfer"
          })
        }
        handleError(status, message);
      })
      .catch(error => {
        setPreloader(false)
        console.log('error', error)
        Alert.alert("Error!", error.message)
      });

  }

  const closeModal = () => {
    setModalVisibility(!modalVisibility);
  };
  const closeModal2 = () => {
    setModalVisibility2(!modalVisibility2);
  };
  const pinModal = () => {
    setPinMetModalVisibility(!pinModalVisibility);
  };

  function btnVal() {
    if (amount > 0 || accountNumber.length == 10) {
      return (
        <TouchableOpacity onPress={() => setModalVisibility2(true)}
          style={styles.getStarted}>
          <Text style={{ fontSize: 16, }}>Next</Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <View style={[styles.getStarted, { backgroundColor: "#9d8fdf" }]}>
          <Text style={{ fontSize: 16, color: 'white' }}>Next</Text>
        </View>
      )
    }
  }

  const handleSearch = (input) => {
    const newData = bankList.filter(bank => {
      return bank.bankCode.includes(input.toUpperCase()) || bank.name.includes(input.toUpperCase())
    })
    setFilteredBanks(newData);
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
          <Text style={{ fontWeight: 'bold', fontSize: 23, color: 'black' }}>Send Money Faster</Text>
        </View>

        <ScrollView style={{ flex: 1 }}>
          <View style={{
            backgroundColor: '#f6f5f9', margin: 8, borderRadius: 10, padding: 10
          }}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontWeight: 'bold', color: '#7B61FF' }}>Quick Tap</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, marginBottom: 10 }}>

              <TouchableOpacity onPress={() => setSelectedBank({ name: "HAGMUS", bankCode: "HAGMUS", img: "https://wenethub.com/imageslink/webuse.png" })}>
                <Image
                  source={{ uri: 'https://wenethub.com/imageslink/webuse.png' }}
                  style={{ width: 40, height: 40, borderRadius: 8 }} />
                <View style={{
                  margin: 10, position: 'absolute', top: -15, backgroundColor: '#FF7000', right: "-100%", borderTopRightRadius: 10,
                  borderBottomRightRadius: 10, borderTopLeftRadius: 10, width: 40,
                }}>
                  <Text style={{
                    fontSize: 9, width: 30, padding: 3,
                  }}>Free</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedBank({ name: "UNITED BANK FOR AFRICA", bankCode: "000004", img: "https://wenethub.com/imageslink/uba.png" })}>
                <Image
                  source={{ uri: 'https://wenethub.com/imageslink/uba.png' }}
                  style={{ width: 40, height: 40, borderRadius: 8 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedBank({ name: "FIRST BANK OF NIGERIA", bankCode: "000016", img: "https://wenethub.com/imageslink/firstbank.png" })}>
                <Image
                  source={{ uri: 'https://wenethub.com/imageslink/firstbank.png' }}
                  style={{ width: 40, height: 40, borderRadius: 8 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedBank({ name: "ZENITH BANK", bankCode: "000015", img: "https://wenethub.com/imageslink/zenith.png" })}>
                <Image
                  source={{ uri: 'https://wenethub.com/imageslink/zenith.png' }}
                  style={{ width: 40, height: 40, borderRadius: 8 }} />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, }}>
              <TouchableOpacity onPress={() => setSelectedBank({ name: "GTBANK PLC", bankCode: "000013", img: "https://wenethub.com/imageslink/gtb.png" })}>
                <Image
                  source={{ uri: 'https://wenethub.com/imageslink/gtb.png' }}
                  style={{ width: 40, height: 40, borderRadius: 8 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedBank({ name: "ACCESS BANK", bankCode: "000014", img: "https://wenethub.com/imageslink/Access.png" })}>
                <Image
                  source={{ uri: 'https://wenethub.com/imageslink/Access.png' }}
                  style={{ width: 40, height: 40, borderRadius: 8 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedBank({ name: "FIRST CITY MONUMENT BANK", bankCode: "000003", img: "https://wenethub.com/imageslink/fcmb.png" })}>
                <Image
                  source={{ uri: 'https://wenethub.com/imageslink/fcmb.png' }}
                  style={{ width: 40, height: 40, borderRadius: 8 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedBank({ name: "STANBIC IBTC BANK", bankCode: "000012", img: "https://wenethub.com/imageslink/stanbic.jpeg" })}>
                <Image
                  source={{ uri: 'https://wenethub.com/imageslink/stanbic.jpeg' }}
                  style={{ width: 40, height: 40, borderRadius: 8 }} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ backgroundColor: '#f6f5f9', borderRadius: 8, marginHorizontal: 8 }}>

            <View style={{ margin: 15 }}>

              {/* <Text style={styles.signupText}>Select Bank</Text> */}
              <TouchableOpacity onPress={closeModal}
                activeOpacity={0.5}
              >
                <View style={{
                  padding: 10, flexDirection: 'row', borderBottomWidth: 0.8, borderColor: '#cac3ee',
                  alignItems: 'center', justifyContent: 'space-between', borderRadius: 5, marginBottom: 25
                }}>
                  {selectedBank.img == null && selectedBank.name == "" ?
                    <Text style={{ color: '#999aa5', fontSize: 15 }}>Select Bank</Text> :
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                      {selectedBank.img == null ?
                        <FontAwesomeIcon icon={faBank} color="#7B61FF" size={17} /> :
                        <Image source={{ uri: selectedBank.img }} style={{ width: 35, height: 35, borderRadius: 50 }} />
                      }
                      <Text style={{ color: '#2e2e2e', fontSize: 14, marginStart: 10, textTransform: "uppercase" }}>{selectedBank.name}</Text>
                    </View>
                  }
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    color={"#787A8D"}
                  />
                </View>
              </TouchableOpacity>

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
              <Text>Transaction History</Text>
            </View>
            <FontAwesomeIcon icon={faChevronRight} color="#312183" />
          </TouchableOpacity>


        </ScrollView>

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
          <View style={{ backgroundColor: "#e4e2eb", height: 550, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
            <View style={{ alignItems: 'flex-end', margin: 10 }}>
              <TouchableOpacity onPress={closeModal}>
                <FontAwesomeIcon
                  icon={faXmark}
                  size={24}
                  color='#787A8D'
                />
              </TouchableOpacity>
            </View>
            <View style={{ padding: 10, flex: 1 }}>
              <TextInput
                style={[styles.inputStyle, { paddingVertical: 5, backgroundColor: "transparent", marginBottom: 10 }]}
                placeholder='Search Bank'
                selectionColor={'#7B61FF'}
                mode='outlined'
                placeholderTextColor="#787A8D"
                onChangeText={inp => handleSearch(inp.trim())}
              />
              <FlatList data={filteredBanks} style={{ flex: 1, }}
                initialNumToRender={5}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity onPress={() => {
                      setSelectedBank({ name: item.name, bankCode: item.bankCode, img: item.logoImage })
                      closeModal()
                    }} style={{ marginBottom: 13 }}>
                      <View style={styles.portfolio}>
                        <View style={styles.News}>
                          {
                            item.logoImage == null ?
                              <View style={{ marginRight: 10, backgroundColor: '#7b61ff27', borderRadius: 100, padding: 10 }}>
                                <FontAwesomeIcon icon={faBank} color="#7B61FF" size={20} />
                              </View>
                              :
                              <Image source={{ uri: item.logoImage }} style={{ width: 40, height: 40, borderRadius: 100, marginRight: 10 }} />
                          }
                          <View>
                            <Text style={{ color: '#0c0323', fontWeight: 'bold', fontSize: 14 }}>{item.name}</Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
                }} key={({ item }) => { item.id }} />
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
                  <View style={{ margin: 10, flexDirection: "row", justifyContent: "center" }}>
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                      {
                        selectedBank.img == null ?
                          <View style={{ backgroundColor: '#7b61ff27', borderRadius: 100, padding: 10, marginBottom: 5 }}>
                            <FontAwesomeIcon icon={faBank} color="#7B61FF" size={30} />
                          </View>
                          :
                          <Image source={{ uri: selectedBank.img }} style={{ width: 40, height: 40, borderRadius: 100, }} />
                      }
                      {/* <Image source={selectedBank.img} style={{ width: 50, height: 50, borderRadius: 50 }} /> */}
                      <Text style={{ color: '#e0e0e1', fontSize: 14, marginStart: 3 }}>{selectedBank.name}</Text>
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
                  <TouchableOpacity onPress={() => { setModalVisibility2(false), pinModal() }}
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

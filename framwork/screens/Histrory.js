import { View, Text, FlatList, TouchableOpacity, Pressable, } from "react-native";
import { styles } from "../styles/history";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faBank, faCheckCircle, faFaceSmile, faLightbulb, faXmark, } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../globals/AppContext";
import { useState } from "react";
import { symbol } from "../components/currencySymbols";
import { StatusBar } from "expo-status-bar";
import { baseURL } from "../../config";
import { handleError } from "../components/HandleRequestError";
import { dateTime } from "../components/DateTime";
import { theme } from "../components/Theme";
import { formatMoney } from "../components/FormatMoney";
import { ServicesIcons } from "../components/ServicesIcon";
import { Modal } from "react-native";

export function History({ navigation }) {
  const { setDocID, setPreloader, token } = useContext(AppContext);
  const [histories, setHistories] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false)

  const closeModal = () => {
    setModalVisibility(!modalVisibility);
  };

  async function fetchVariation(net) {
    setPreloader(true)
    const requestOptions = {
      method: 'GET',
      headers: {
        authorization: `bearer ${token}`
      },
      redirect: 'follow'
    };
    fetch(`${baseURL}/api/transactions`, requestOptions)
      .then(response => response.json())
      .then(response => {
        const { data, status, message } = response;
        // console.log(data);
        setPreloader(false)
        if (status == "success") {
          setHistories(data)
        }
        handleError(status, message);
      })
      .catch(error => {
        setPreloader(false)
        console.log('error', error)
      });
  }

  useEffect(() => {
    setPreloader(true)
    fetchVariation()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={{ margin: 18 }}>

      </View>
      <View style={{ margin: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            size={20}
            color={'#787A8D'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        {histories.length > 0 ?
          <FlatList style={{ flex: 1 }}
            data={histories} renderItem={({ item }) => {
              const icon = ServicesIcons.find(all => all.name == item.category)
              // console.log(item.category);
              return (
                <View
                  onPress={closeModal}
                  style={{ marginBottom: 5 }}>
                  <View
                    onPress={() => { navigation.navigate('HistoryDetails'); setDocID(item.docId) }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ marginRight: 10, backgroundColor: icon.background, borderRadius: 100, padding: 10 }}>
                          <FontAwesomeIcon icon={icon.icon} color={icon.color} size={20} style={{ transform: [{ rotate: icon.rotate + 'deg' }] }} />
                        </View>
                        <View>
                          <Text style={{ color: '#3b3c43', fontSize: 15, textTransform: "capitalize" }}>{item.category == "transfer" ? "Deposit" : item.category}</Text>
                          <Text style={{ color: '#787A8D', fontSize: 11 }}>{dateTime(item.created_at)}</Text>
                        </View>
                      </View>
                      <View style={{ alignItems: "flex-end" }}>
                        <Text style={{ color: '#3b3c43', fontSize: 14, fontFamily: theme.fonts.Quicksand_700Bold }}>{item.type == "credit" ? "+" : "-"} {symbol("ngn")}{formatMoney(Number(item.amount))}</Text>
                        <Text style={{ color: item.type == "credit" ? '#00C566' : '#FF403B', fontSize: 12 }}>{item.status}</Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      borderBottomColor: '#787a8d2e',
                      borderBottomWidth: 0.4,
                      marginBottom: 15,
                      marginTop: 8,
                    }}
                  />
                </View>
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
            <FontAwesomeIcon icon={faFaceSmile} color="gray" size={120} />
            <Text style={{ fontSize: 16, marginTop: 20, color: 'gray' }}>No History yet</Text>
          </View>
        }
      </View>

      <Modal
        visible={modalVisibility}
        animationType="slide"
        transparent={true}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
          <Pressable style={{ flex: 1 }} onPress={closeModal} >
          </Pressable>
          <View style={{ backgroundColor: "#fcfbff", height: 550, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
            <View style={{ alignItems: 'flex-end', margin: 10 }}>
              <TouchableOpacity onPress={closeModal}>
                <FontAwesomeIcon
                  icon={faXmark}
                  size={24}
                  color='#7B61FF'
                />
              </TouchableOpacity>
            </View>

            <View style={{ margin: 20, }}>
              <View style={{ alignItems: 'center' }}>
                <View style={{ backgroundColor: '#fff1b9', padding: 8, borderRadius: 100 }}>
                  <FontAwesomeIcon icon={faLightbulb} color="#ffcc00" size={25} />
                </View>
                <Text style={{ marginTop: 8, fontSize: 18 }}>Electricity</Text>
                <Text style={{ marginTop: 8, fontSize: 30, fontWeight: 'bold' }}>-₦5,000</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                  <FontAwesomeIcon icon={faCheckCircle} color="#169544" />
                  <Text style={{ marginLeft: 5, color: '#169544' }}>Successful</Text>
                </View>
              </View>

              <View style={{
                marginTop: 18, borderWidth: 1, borderRadius: 8, padding: 10,
                flexDirection: 'row', justifyContent: 'space-between', borderColor: 'grey'
              }}>
                <Text style={{ color: 'grey' }}>Token</Text>
                <Text style={{ fontSize: 15 }}>1543 7262 6735 8365 846</Text>
              </View>

              <View>
                <Text>Transaction Details</Text>
              </View>


            </View>

          </View>
        </View>
      </Modal>


    </View>
  )
}
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, FlatList } from "react-native";
import { styles } from "../styles/history";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight, faArrowLeft, faFaceSmile, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../../globals/AppContext";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export function HagmusTfHistory({ navigation }) {
  const { userUID, setDocID, setPreloader } = useContext(AppContext);
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    setPreloader(true)
    const q = collection(db, 'histories');
    const filter = query(q,
      where('UID', '==', userUID),
      where('category', '==', "transfer"),
    );
    onSnapshot(filter, (onSnap) => {
      const all = [];
      onSnap.forEach(item => {
        const itemData = item.data();
        all.push({ ...itemData, docId: item.id });
      })
      // console.log(all);
      setHistories(all.sort((a, b) => b.dataID - a.dataID))
      setPreloader(false)
    });

  }, [])
  return (
    <View style={styles.container}>
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
              return (
                <>
                  <TouchableOpacity
                    onPress={() => { navigation.navigate("TransferDetails"); setDocID(item.docId) }}
                  >
                    <View style={{ marginBottom: 15 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image source={{ uri: item.image }}
                            style={styles.img} />
                          <View>
                            <Text style={{ color: 'white', fontSize: 15 }}>{item.coinName} {item.transType}</Text>
                            <Text style={{ color: '#787A8D', fontSize: 12 }}>{item.description}</Text>
                          </View>
                        </View>
                        <View style={{ alignItems: "flex-end", }}>
                          <Text style={{ color: item.transType == "received" ? '#00C566' : '#FF403B', fontSize: 15 }}>{item.coinValue}</Text>
                          <Text style={{ color: '#787A8D', fontSize: 12 }}>{item.date}</Text>
                        </View>
                      </View>
                      <View
                        style={{
                          borderBottomColor: '#787A8D',
                          borderBottomWidth: StyleSheet.hairlineWidth,
                          marginBottom: 15,
                          marginTop: 8,
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                </>)
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
            <Text style={{ fontSize: 16, marginTop: 20, color: 'gray' }}>No Transfer History yet</Text>
          </View>
        }
      </View>
    </View>
  )
}
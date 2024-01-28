import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faArrowLeft, faShareNodes } from "@fortawesome/free-solid-svg-icons"
import { styles } from "../styles/transferdetails"
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../globals/AppContext";

export function TransferDetails({ navigation }) {
  const {  setPreloader, docID } = useContext(AppContext);
  const [detials, setDetials] = useState({ symbol: "", coinValue: 0, coinName: "", image: null, });

  useEffect(() => {
    setPreloader(false)
    onSnapshot(doc(db, "histories", docID), (doc) => {
      setDetials(doc.data())
      setPreloader(false)
    })
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={{ margin: 15 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack('')}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              size={23}
              color='#787A8D'
            />
          </TouchableOpacity>
        </View>
        <Text style={{ color: 'white', fontSize: 19, margin: 10, fontWeight: 'bold' }}>Transfer Details</Text>

        <View style={{ alignItems: 'center' }}>
          <Image source={{ uri: detials.image }}
            style={styles.img} />
          <Text style={{ color: '#787A8D', fontSize: 25, fontWeight: 'bold' }}>
            <Text style={{ color: detials.transType == "received" ? '#00C566' : '#FF403B' }}>
              {detials.transType == "received" ? '+' : '-'}{detials.coinValue} </Text>
            {detials.symbol.toUpperCase()} from Spot
          </Text>
        </View>
        <View style={{ margin: 10, backgroundColor: '#21242D', padding: 10, borderRadius: 5 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
            <Text style={{ color: 'white', fontSize: 15 }}>Status</Text>
            <Text style={{ color: '#787A8D', fontSize: 15 }}>SUCCESS</Text>
          </View>
          <View style={{ borderBottomColor: '#16171D', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 15, marginTop: 8, }} />

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
            <Text style={{ color: 'white', fontSize: 15 }}>Recipient</Text>
            <Text style={{ color: '#787A8D', fontSize: 15 }}>{detials.description}</Text>
          </View>
          <View style={{ borderBottomColor: '#16171D', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 15, marginTop: 8, }} />

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
            <Text style={{ color: 'white', fontSize: 15 }}>Coin name</Text>
            <Text style={{ color: '#787A8D', fontSize: 15 }}>{detials.coinName}</Text>
          </View>
          <View style={{ borderBottomColor: '#16171D', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 15, marginTop: 8, }} />

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
            <Text style={{ color: 'white', fontSize: 15 }}>Fee</Text>
            <Text style={{ color: '#787A8D', fontSize: 15 }}>0.00</Text>
          </View>
          <View style={{ borderBottomColor: '#16171D', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 15, marginTop: 8, }} />

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
            <Text style={{ color: 'white', fontSize: 15 }}>Date</Text>
            <Text style={{ color: '#787A8D', fontSize: 15 }}>{detials.date}</Text>
          </View>
          <View style={{ borderBottomColor: '#16171D', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 15, marginTop: 8, }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
            <Text style={{ color: 'white', fontSize: 15 }}>Reference ID</Text>
            <Text style={{ color: '#787A8D', fontSize: 15 }}>{detials.refID}</Text>
          </View>
          <View style={{ borderBottomColor: '#16171D', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 15, marginTop: 8, }} />

        </View>
        <View style={{ alignItems: 'center', margin: 15 }}>
          <TouchableOpacity>
            <FontAwesomeIcon
              icon={faShareNodes}
              color='#7B61FF'
              size={30}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
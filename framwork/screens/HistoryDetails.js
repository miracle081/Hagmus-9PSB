import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faArrowLeft, faShareNodes } from "@fortawesome/free-solid-svg-icons"
import { styles } from "../styles/transferdetails"
import { useContext } from "react";
import { AppContext } from "../../globals/AppContext";
import { useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useState } from "react";
import { symbol } from "../components/currencySymbols";

export function HistoryDetails({ navigation }) {
  const { userUID, setPreloader, docID } = useContext(AppContext);
  const [detials, setDetials] = useState({ asset: "", coinValue: 0, amount: 0 });

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
              size={20}
              color='#787A8D'
            />
          </TouchableOpacity>
        </View>
        <Text style={{ color: 'white', fontSize: 19, margin: 10, fontWeight: 'bold' }}>Transaction Details</Text>

        <View style={{ alignItems: 'center' }}>
          <Image source={{ uri: detials.image }}
            style={styles.img} />
          <Text style={{ color: '#787A8D', fontSize: 25, fontWeight: 'bold' }}>You {detials.transType} {Number(detials.coinValue).toFixed(3)} {String(detials.symbol).toUpperCase()}</Text>
        </View>
        <View style={{ margin: 10, backgroundColor: '#21242D', padding: 10, borderRadius: 5 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
            <Text style={{ color: 'white', fontSize: 15 }}>Status</Text>
            <Text style={{ color: '#787A8D', fontSize: 15 }}>SUCCESS</Text>
          </View>
          {/* <View style={{ borderBottomColor: '#16171D', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 15, marginTop: 8, }} /> */}

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
            <Text style={{ color: 'white', fontSize: 15 }}>Coin name</Text>
            <Text style={{ color: '#787A8D', fontSize: 15 }}>{detials.coinName}</Text>
          </View>
          {/* <View style={{ borderBottomColor: '#16171D', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 15, marginTop: 8, }} /> */}

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
            <Text style={{ color: 'white', fontSize: 15 }}>Amount</Text>
            <Text style={{ color: '#787A8D', fontSize: 15 }}>{symbol(detials.asset)}{detials.amount.toFixed(2)}</Text>
          </View>
          {/* <View style={{ borderBottomColor: '#16171D', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 15, marginTop: 8, }} /> */}

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
            <Text style={{ color: 'white', fontSize: 15 }}>Fee</Text>
            <Text style={{ color: '#787A8D', fontSize: 15 }}>{symbol(detials.asset)}0.00</Text>
          </View>
          {/* <View style={{ borderBottomColor: '#16171D', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 15, marginTop: 8, }} /> */}

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
            <Text style={{ color: 'white', fontSize: 15 }}>Description</Text>
            <Text style={{ color: '#787A8D', fontSize: 15 }}>{String(detials.asset).toUpperCase()} to {String(detials.symbol).toUpperCase()}</Text>
          </View>
          {/* <View style={{ borderBottomColor: '#16171D', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 15, marginTop: 8, }} /> */}


          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
            <Text style={{ color: 'white', fontSize: 15 }}>Reference ID</Text>
            <Text style={{ color: '#787A8D', fontSize: 15 }}>{detials.refID}</Text>
          </View>
          {/* <View style={{ borderBottomColor: '#16171D', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 15, marginTop: 8, }} /> */}

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
            <Text style={{ color: 'white', fontSize: 15 }}>Date</Text>
            <Text style={{ color: '#787A8D', fontSize: 15 }}>{detials.date}</Text>
          </View>
          {/* <View style={{ borderBottomColor: '#16171D', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 15, marginTop: 8, }} /> */}

        </View>

      </View>
    </View>
  )
}
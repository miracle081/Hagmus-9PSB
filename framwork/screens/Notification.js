import { faArrowLeft, faAngleRight, faEnvelope, faEnvelopeOpen, faXmark, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList, Pressable } from "react-native";
import { styles } from "../styles/notification";
import { Modal } from "react-native";
import { useContext } from "react";
import { AppContext } from "../../globals/AppContext";
import { useState } from "react";

export function Notification({ navigation }) {
  const { notification } = useContext(AppContext);
  const [modalVisibility, setModalVisibility] = useState(false)
  const [info, setInfo] = useState({})

  const closeModal = () => {
    setModalVisibility(!modalVisibility);
  };
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={{ marginTop:30, flexDirection: 'row', alignItems: 'center', marginLeft:5}}>
          <TouchableOpacity onPress={() => navigation.goBack('')}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              size={25}
              color='#787A8D'
              style={{ marginRight: '30%' }}
            />
          </TouchableOpacity>
        </View>
        <View style={{alignItems:'center'}}>
            <Text style={{ fontWeight: 'bold', fontSize: 19, color: '#0b0e21' }}>Notifications</Text>
          </View>
      </View>

      <View style={styles.portfolioHold}>
        <View style={{ padding: 10, borderRadius: 8, flex: 1 }}>
          <FlatList data={notification} style={{ flex: 1 }} renderItem={({ item }) => {
            return (
              <>
                <TouchableOpacity onPress={() => {
                  setInfo({ message: item.message, title: item.title })
                  closeModal()
                }}>
                  <View style={styles.portfolio}>
                    <View style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:'#ccc5ed',padding:8,borderRadius:8 }}>
                      <View>
                        <Text style={{ color: '#000000', fontSize: 16, fontWeight: 'bold' }} numberOfLines={1}>{item.title}</Text>
                        <Text style={{ color: '#0b0e21', fontSize: 13 }} numberOfLines={1} >{item.message}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    borderBottomColor: '#d6d7e3',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    marginBottom: 15
                  }}
                />
              </>
            )
          }} key={({ item }) => { item.id }} />
        </View>
      </View>

      <Modal
        visible={modalVisibility}
        animationType="slide"
        transparent={true}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
          <Pressable style={{ flex: 1 }} onPress={closeModal} >
          </Pressable>
          <View style={{ backgroundColor: "#16171D", borderTopRightRadius: 20, borderTopLeftRadius: 20,paddingBottom:30 }}>
            <View style={{ alignItems: 'flex-end', margin: 10 }}>
              <TouchableOpacity onPress={closeModal}>
                <FontAwesomeIcon
                  icon={faXmark}
                  size={24}
                  color='#787A8D'
                />
              </TouchableOpacity>
            </View>
            <View style={{ padding: 10 }}>
              <Text style={{
                color: "white", fontWeight: 'bold', fontSize: 20, textAlign: "center", textTransform: "capitalize"
              }}>{info.title}</Text>
              <Text style={{ color: '#9596a2', fontSize: 15, marginTop:10,lineHeight:23, letterSpacing:1 }}>{info.message}</Text>
            </View>

          </View>
        </View>
      </Modal>
    </View>
  )
}
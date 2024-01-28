import { faArrowLeft, faAngleRight, faEnvelope, faEnvelopeOpen, faCopy, faEdit, faFaceSadTear, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, } from "react-native";
import { styles } from "../styles/notification";
import { Modal } from "react-native";
import { useContext } from "react";
import { AppContext } from "../../globals/AppContext";

export function WithdrawalMethod({ navigation }) {
  const { userInfo } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={{ marginTop:30, flexDirection: 'row', alignItems: 'center', marginLeft:5 }}>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              size={25}
              color='#787A8D'
              style={{ marginRight: '30%' }}
            />
          </TouchableOpacity>
        </View>
        <View style={{alignItems:'center'}}>
            <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>Withdrawal Method</Text>
          </View>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View style={styles.portfolioHold}>
          {userInfo.bankDetails.bank != "" && userInfo.bankDetails.accountNumber != "" ?
            <View style={{ padding: 10, borderRadius: 8 }}>
              <View style={{ marginBottom: 15 }}>
                <View style={styles.portfolio}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                      <Text style={{ color: '#787A8D', fontSize: 16 }}>Bank : {userInfo.bankDetails.bank}</Text>
                      <Text style={{ color: '#787A8D', fontSize: 16, marginTop: 5 }}>Account Name : {userInfo.bankDetails.accountName}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text selectable style={{ color: '#787A8D', fontSize: 16, marginTop: 5, marginRight: 10 }}>Account Number : {userInfo.bankDetails.accountNumber}</Text>
                        <TouchableOpacity>
                          <FontAwesomeIcon
                            icon={faCopy}
                            color="#7B61FF"
                            size={18}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>

              </View>
              <View
                style={{
                  borderBottomColor: 'grey',
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  marginBottom: 15
                }}
              />

            </View>
            : <View
              style={{
                height: Dimensions.get("screen").height / 1.5,
                justifyContent: "center",
                alignItems: 'center',
                opacity: 0.5,
                zIndex: -1,
              }}>
              <FontAwesomeIcon icon={faFaceSadTear} color="gray" size={120} />
              <Text style={{ fontSize: 16, marginTop: 20, color: 'gray' }}>No Withdrawal Method added yet</Text>
            </View>
          }

        </View>
      </ScrollView >

      <View style={{ margin: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('BankDetails')}
          style={styles.getStarted}>
          <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, }}>Add Bank</Text>
        </TouchableOpacity>
      </View>
    </View >
  )
}
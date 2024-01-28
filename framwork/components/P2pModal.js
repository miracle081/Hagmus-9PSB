import { Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { faAngleRight, faCircleDown, faCreditCard, faPeopleArrows, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { AppContext } from '../../globals/AppContext';
import { faCopy } from '@fortawesome/free-regular-svg-icons';

export function P2pModal({ visible, onPress, adsCatigory }) {
    const { accountInfo } = useContext(AppContext);
    const navigation = useNavigation()
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
        >
            <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
                <Pressable style={{ flex: 1 }} onPress={onPress} >
                </Pressable>
                <View style={{ backgroundColor: "#fcfbff", borderTopRightRadius: 20, height: 230, borderTopLeftRadius: 20 }}>
                    <View style={{ alignItems: 'flex-end', margin: 10 }}>
                        <TouchableOpacity onPress={onPress}>
                            <FontAwesomeIcon
                                icon={faXmark}
                                size={24}
                                color='#2f40de'
                            />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <View style={{ marginBottom: 15, backgroundColor: '#f4f3f5', marginHorizontal: 8, padding: 10, borderRadius: 5, marginTop: 9 }}>
                            <Text>Account Number</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5 }}>
                                <Text style={{ fontSize: 19, color: 'black', fontWeight: 'bold' }} selectable>{accountInfo.account_number}</Text>
                                <TouchableOpacity style={{ backgroundColor: 'green', padding: 5, flexDirection: 'row', alignItems: 'center', borderRadius: 8 }}>
                                    <FontAwesomeIcon icon={faCopy} style={{ marginRight: 5 }} color="#f6f5fc" />
                                    <Text style={{ color: '#f6f5fc' }}>Copy</Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    borderBottomColor: '#ceccdf',
                                    borderBottomWidth: StyleSheet.hairlineWidth,
                                    marginBottom: 0,
                                    marginTop: 5
                                }}
                            />
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15 }}>
                                <Text style={{ fontSize: 13, }}>Bank </Text>
                                <Text>{accountInfo.bank_name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                                <Text style={{ fontSize: 13, }}>Account Name</Text>
                                <Text>{accountInfo.account_name}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    assetflag: {
        width: 30,
        height: 30,
        marginRight: 10,
        borderRadius: 90,
        borderColor: "#7b61ff89",
        borderWidth: 1,
    },
})
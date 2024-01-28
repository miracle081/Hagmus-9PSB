import { BackHandler, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-native'

export function ModalAlert({ visible, message, message2, onClose, btnText }) {

    const handleBackButton = () => {
        onClose();
        return true;
    };
    useEffect(() => {
        if (visible) {
            BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        }

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        };
    }, [visible]);

    return (
        <View>
            <Modal
                visible={visible}
                transparent={true}
            >
                <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
                    <Pressable style={{ flex: 1 }}></Pressable>
                    <View style={styles.card}>
                        <Text style={styles.body}>{message || "!"}</Text>
                        <Text style={styles.body}>{message2 || ""}</Text>
                        <View style={styles.btnView}>
                            <TouchableOpacity style={styles.btn} onPress={onClose} >
                                <Text style={{ fontSize: 17, }}>{btnText || "Ok"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Pressable style={{ flex: 1 }}></Pressable>
                </View>
            </Modal >
        </View >
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#16171D",
        borderRadius: 10,
        margin: 20,
        padding: 15
    },
    body: {
        color: "white",
        fontSize: 18,
        marginTop: 5,
    },
    btnView: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 10
    },
    btn: {
        backgroundColor: "#7B61FF",
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 15
    }


})
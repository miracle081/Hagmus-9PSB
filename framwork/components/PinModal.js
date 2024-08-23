import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useContext } from "react";
import { KeyboardAvoidingView, Modal, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AppContext } from "../../globals/AppContext";
import { theme } from "./Theme";
import { useNavigation } from "@react-navigation/native";
// import SmoothPinCodeInput from "react-native-smooth-pincode-input";


export function PinTransactionModal({ visibility, onClose, onVerify, }) {
    const { pin, setPin, userInfo } = useContext(AppContext);
    const navigation = useNavigation();


    return (
        <Modal
            visible={visibility}
            animationType="slide"
            transparent={true}
        >
            <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.575)" }}>
                <Pressable style={{ flex: 1 }} onPress={onClose} >
                </Pressable>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                >
                    <View style={{ backgroundColor: "#ffffff", height: 300, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                        <View style={{ alignItems: 'flex-end', margin: 10 }}>
                            <TouchableOpacity onPress={onClose}>
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    size={24}
                                    color='#7B61FF'
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ padding: 15, flex: 1 }}>
                            <Text style={{ color: "#7B61FF", fontSize: 20, fontFamily: theme.fonts.Quicksand_700Bold, textAlign: "center", marginBottom: 30 }}>Transaction PIN</Text>
                            {/* <View style={{ marginTop: 10, alignItems: "center", justifyContent: "center" }}>
                                <SmoothPinCodeInput
                                    value={pin}
                                    onTextChange={inp => setPin(inp)}
                                    password={true}
                                    autoFocus
                                    cellStyle={{ marginLeft: 10, borderRadius: 10, backgroundColor: "transparent", borderWidth: 1, borderColor: '#7b61ff39', }}
                                    cellStyleFocused={{ borderColor: '#7b61ff', }}
                                    containerStyle={{ marginLeft: 10 }}
                                />
                            </View> */}
                            <TextInput
                                style={[styles.inputStyle, { marginBottom: 0 }]}
                                keyboardType='numeric'
                                placeholder='PIN'
                                selectionColor={'#7B61FF'}
                                mode='outlined'
                                placeholderTextColor='#787A8D'
                                onChangeText={inp => setPin(inp.trim().toLowerCase())}
                                secureTextEntry
                            />
                            <TouchableOpacity disabled={pin.length === 4 ? false : true} onPress={onVerify}
                                style={[styles.getStarted, { backgroundColor: pin.length === 4 ? '#7b61ff' : '#7B61FF70', }]}>
                                <Text style={{ fontSize: 16, color: "white" }}>Pay</Text>
                            </TouchableOpacity>
                            {userInfo.is_pin_set == 0 ?
                                <TouchableOpacity onPress={() => navigation.navigate("SetPin")}>
                                    <Text style={{ fontSize: 16, color: "#7B61FF", marginTop: 10 }}>Set Transaction Pin</Text>
                                </TouchableOpacity> :
                                <TouchableOpacity onPress={() => navigation.navigate("ForgottenPin")}>
                                    <Text style={{ fontSize: 16, color: "#7B61FF", marginTop: 10 }}>Forgotten Pin</Text>
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    )
}

export const styles = StyleSheet.create({
    inputStyle: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 7,
        backgroundColor: '#dcdce2',
        color: 'black',
        fontSize: 14,
        borderWidth: 1,
        borderColor: '#cac3ee'
    },
    getStarted: {
        padding: 13,
        marginTop: 15,
        alignItems: 'center',
        borderRadius: 8,

    },
});
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, TextInput, image, Pressable, Alert } from "react-native";
import { styles } from "../styles/aboutus";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight, faArrowLeft, faBookOpenReader, faChevronDown, faCircleQuestion, faCreditCard, faEnvelope, faGlobe, faHome, faIdCard, faMessage, faSquareCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faLinkedin, faReadme, faTelegram, faTwitter, faWeebly } from "@fortawesome/free-brands-svg-icons";
import { ModalAlert } from "../components/ModalAlert";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../globals/AppContext";
import * as ImagePicer from "expo-image-picker";
import { ToastApp } from "../components/Toast";
import { Modal } from "react-native";
import { baseURL } from "../../config";
import { handleError } from "../components/HandleRequestError";
import { Picker } from "@react-native-picker/picker";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { uriToBlob } from "../components/UriToBlob";

export function BvnVerify({ navigation }) {
        const { userUID, setDocID, setPreloader, userInfo, token, getUserInfo } = useContext(AppContext);
        const [modalVisibility, setModalVisibility] = useState(false)
        const [modalVisibility2, setModalVisibility2] = useState(false)
        const [otp, setOtp] = useState('');
        const [bvn, setBvn] = useState('');
        const [dob, setDob] = useState('');
        const [otp_id, setOtp_id] = useState('');
        const [id_expiry, setId_expiry] = useState('');
        const [id_number, setId_number] = useState('');
        const [selectedIDType, setSelectedIDType] = useState('');
        const [frontID, setFrontID] = useState(null);
        const [backID, setBackID] = useState(null);
        const [proofOfAddress, setProofOfAddress] = useState(null);

        const closeModal = () => {
                setModalVisibility(!modalVisibility);
        };
        const closeModal2 = () => {
                setModalVisibility2(!modalVisibility2);
        };

        useEffect(() => {
                // setPreloader(false)
                //   console.log(userInfo);
        }, [])



        function verifyBVN() {
                setPreloader(true)
                const formdata = {
                        bvn: bvn,
                        date_of_birth: userInfo.dob,
                        phone_number: userInfo.phone,
                        otp,
                        otp_id,
                }
                const requestOptions = {
                        method: 'POST',
                        headers: {
                                'content-type': 'application/json',
                                authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify(formdata),
                        redirect: 'follow'
                };

                fetch(baseURL + "/api/profile/verify-bvn", requestOptions)
                        .then(response => response.json())
                        .then(response => {
                                const { data, status, message } = response;
                                setPreloader(false)
                                getUserInfo();
                                // console.log(response);
                                if (status == "success") {
                                        closeModal();
                                        Alert.alert(
                                                'Success',
                                                message,
                                        )
                                }
                                handleError(status, message);
                        })
                        .catch(error => {
                                setPreloader(false)
                                console.log('error', error)
                        });
        }

        function sendBvnOtp() {
                setPreloader(true)
                const formdata = {
                        phone_number: userInfo.phone,
                }
                const requestOptions = {
                        method: 'POST',
                        headers: {
                                'Content-Type': 'application/json',
                                authorization: `bearer ${token}`
                        },
                        body: JSON.stringify(formdata),
                        redirect: 'follow'
                };

                fetch(baseURL + "/api/profile/bvn-otp", requestOptions)
                        .then(response => response.json())
                        .then(response => {
                                const { data, status, message } = response;
                                setPreloader(false)
                                console.log(response);
                                if (status == "success") {
                                        closeModal();
                                        setOtp_id(data.otpId)
                                }
                                handleError(status, message);
                        })
                        .catch(error => {
                                setPreloader(false)
                                console.log('error', error)
                        });
        }

        function upgradeToTier3() {
                setPreloader(true)
                var formdata = new FormData();
                formdata.append("id_number", id_number);
                formdata.append("id_type", selectedIDType);
                formdata.append("id_expiry", id_expiry);
                formdata.append("id_front", frontID);
                formdata.append("id_back", backID);
                // formdata.append("id_selfie", fileInput.files[0]);
                formdata.append("id_proof_of_address", proofOfAddress);

                var requestOptions = {
                        method: 'POST',
                        body: formdata,
                        headers: {
                                authorization: `Bearer ${token}`
                        },
                        redirect: 'follow'
                };

                fetch(baseURL + "/api/profile/upload-documents", requestOptions)
                        .then(response => response.json())
                        .then(response => {
                                console.log("request", formdata);
                                const { data, status, message } = response;
                                setPreloader(false)
                                // console.log(response);
                                if (status == "success") {
                                        setOtp_id(data.otpId)
                                }
                                handleError(status, message);
                        })
                        .catch(error => console.log('error', error));
        }

        const readFile = async (uri, tapID) => {
                try {
                        // Read file content using react-native-fs
                        const content = await RNFS.readFile(uri, 'utf8');
                        console.log(content);
                        if (tapID == "front") setFrontID(content)
                        if (tapID == "back") setBackID(content)
                        if (tapID == "proofOfAddress") setProofOfAddress(content)
                } catch (error) {
                        console.error('Error reading file:', error);
                        return null;
                }
        };

        const pickID = async (tapID) => {
                let result = await ImagePicer.launchImageLibraryAsync({
                        mediaType: ImagePicer.MediaTypeOptions.Images,
                        allowsEditing: false,
                        aspect: [4, 6],
                        quality: 1,
                });
                if (!result.canceled) {
                        const { uri, type } = result.assets[0]
                        // console.log(uri);
                        if (type === 'image') {
                                if (tapID == "front") setFrontID(uri)
                                if (tapID == "back") setBackID(uri)
                                if (tapID == "proofOfAddress") setProofOfAddress(uri)
                        }
                        else {
                                Alert.alert("File", "Can't select this type of file.")
                        }
                }
        }

        return (
                <View style={styles.container}>
                        <View style={{ margin: 18 }}>

                        </View>
                        <View style={{ margin: 10 }}>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                        <FontAwesomeIcon
                                                icon={faArrowLeft}
                                                size={25}
                                                color={'#787A8D'}
                                        />
                                </TouchableOpacity>
                        </View>
                        <ScrollView>
                                <View style={styles.body}>

                                        <View>

                                                <View style={{ backgroundColor: '#edecf5', padding: 5, margin: 10, borderRadius: 8 }}>
                                                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                                                <View>
                                                                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#6e51ff' }}>Account Tier</Text>
                                                                </View>

                                                                <View style={{
                                                                        backgroundColor: '#ffffff', padding: 0, borderRadius: 8, alignItems: 'center',
                                                                        flexDirection: 'row', justifyContent: 'center'
                                                                }}>
                                                                        <Image source={require('../../assets/medal.png')} style={{ width: 20, height: 20, }} />
                                                                        <Text style={{ fontWeight: 'bold', fontSize: 13, color: '#6e51ff', marginRight: 5 }}>Tier {userInfo.kyc_level}</Text>
                                                                </View>
                                                        </View>
                                                </View>


                                                <View style={{ backgroundColor: '#6e51ff', padding: 15, margin: 10, borderRadius: 8 }}>

                                                        <View style={{
                                                                padding: 0, borderRadius: 8,
                                                                flexDirection: 'row', alignItems: 'center'
                                                        }}>
                                                                <Image source={require('../../assets/medal.png')} style={{ width: 35, height: 35, }} />
                                                                <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white' }}>Tier 1</Text>
                                                        </View>
                                                        <View style={{ borderBottomColor: '#e5e3ee', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 15 }} />
                                                        <View>
                                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                        <Text style={{ fontSize: 15, color: 'white', marginTop: 10 }}>Daily Transaction Limit:</Text>
                                                                        <Text style={{ fontSize: 16, color: 'white', marginTop: 3, fontWeight: 'bold' }}>₦0.00</Text>
                                                                </View>
                                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                        <Text style={{ fontSize: 15, color: 'white', marginTop: 10 }}>Maximum Account Balance:</Text>
                                                                        <Text style={{ fontSize: 16, color: 'white', marginTop: 3, fontWeight: 'bold' }}>₦300,000</Text>
                                                                </View>

                                                        </View>
                                                </View>

                                                <TouchableOpacity onPress={() => { sendBvnOtp() }} disabled={userInfo.kyc_level == "2"}
                                                        style={{ backgroundColor: userInfo.kyc_level == "2" ? "#6e51ff" : '#b8adf1', padding: 15, margin: 10, borderRadius: 8 }}>
                                                        <View style={{}}>
                                                                <View style={{
                                                                        padding: 0, borderRadius: 8,
                                                                        flexDirection: 'row', alignItems: 'center'
                                                                }}>
                                                                        <Image source={require('../../assets/medal.png')} style={{ width: 35, height: 35, }} />
                                                                        <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white' }}>Tier 2</Text>
                                                                </View>
                                                                <View style={{ borderBottomColor: '#e5e3ee', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 15 }} />
                                                                <View>
                                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                                <Text style={{ fontSize: 15, color: 'white', marginTop: 10 }}>Daily Transaction Limit:</Text>
                                                                                <Text style={{ fontSize: 16, color: 'white', marginTop: 3, fontWeight: 'bold' }}>₦300,000</Text>
                                                                        </View>
                                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                                <Text style={{ fontSize: 15, color: 'white', marginTop: 10 }}>Maximum Account Balance:</Text>
                                                                                <Text style={{ fontSize: 16, color: 'white', marginTop: 3, fontWeight: 'bold' }}>Unlimited</Text>
                                                                        </View>

                                                                </View>

                                                        </View>
                                                </TouchableOpacity>

                                                {/* <TouchableOpacity
                                                        onPress={closeModal2}
                                                        style={{ backgroundColor: '#b8adf1', padding: 15, margin: 10, borderRadius: 8 }}>
                                                        <View style={{}}>
                                                                <View style={{
                                                                        padding: 0, borderRadius: 8,
                                                                        flexDirection: 'row', alignItems: 'center'
                                                                }}>
                                                                        <Image source={require('../../assets/medal.png')} style={{ width: 35, height: 35, }} />
                                                                        <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white' }}>Tier 3</Text>
                                                                </View>
                                                                <View style={{ borderBottomColor: '#e5e3ee', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 15 }} />
                                                                <View>
                                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                                <Text style={{ fontSize: 15, color: 'white', marginTop: 10 }}>Daily Transaction Limit:</Text>
                                                                                <Text style={{ fontSize: 16, color: 'white', marginTop: 3, fontWeight: 'bold' }}>₦500,000,000</Text>
                                                                        </View>
                                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                                <Text style={{ fontSize: 15, color: 'white', marginTop: 10 }}>Maximum Account Balance:</Text>
                                                                                <Text style={{ fontSize: 16, color: 'white', marginTop: 3, fontWeight: 'bold' }}>Unlimited</Text>
                                                                        </View>

                                                                </View>

                                                        </View>
                                                </TouchableOpacity> */}





                                                {/* 
                                                <TouchableOpacity style={[styles.getStarted, { padding: 8, margin: 10 }]}>
                                                        <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, color: 'white', fontWeight: 'bold' }}>Upgrade</Text>
                                                </TouchableOpacity> */}

                                                {/* <TouchableOpacity style={{ padding: 8 }}>
                                                        <TouchableOpacity onPress={BankAuth} disabled={bvn == "" ? true : false}
                                                                style={styles.getStarted}>
                                                                <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, color: 'white', fontWeight: 'bold' }}>Upgrade to Tier 2</Text>
                                                        </TouchableOpacity>
                                                </TouchableOpacity> */}
                                        </View>


                                </View>
                        </ScrollView>

                        {/* ============== BVN Modal ============== */}

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

                                                <View style={{ marginTop: 0, padding: 15 }}>
                                                        <View style={{ alignItems: 'center', marginBottom: 20 }}>
                                                                <Text style={{ fontWeight: 'bold', color: '#2e3144', fontSize: 18 }}>Tier 2 Upgrade</Text>
                                                        </View>
                                                        <ScrollView>
                                                                <TextInput
                                                                        style={[styles.inputStyle, { marginBottom: 20, color: "gray" }]}
                                                                        keyboardType='numeric'
                                                                        placeholder='OTP'
                                                                        selectionColor={'grey'}
                                                                        mode='outlined'
                                                                        placeholderTextColor='#787A8D'
                                                                        onChangeText={inp => setOtp(inp.trim())}
                                                                />
                                                                <TextInput
                                                                        style={[styles.inputStyle, { marginBottom: 20, color: "#0f1018" }]}
                                                                        keyboardType='numeric'
                                                                        placeholder='Enter BVN'
                                                                        selectionColor={'grey'}
                                                                        mode='outlined'
                                                                        placeholderTextColor='#787A8D'
                                                                        onChangeText={inp => setBvn(inp.trim())}
                                                                />
                                                                <TextInput
                                                                        style={[styles.inputStyle, { marginBottom: 20, color: "gray" }]}
                                                                        keyboardType='default'
                                                                        placeholder='Enter Date of Birth'
                                                                        selectionColor={'grey'}
                                                                        mode='outlined'
                                                                        placeholderTextColor='#787A8D'
                                                                        value={userInfo.dob}
                                                                        editable={false}
                                                                />
                                                                {/* <TextInput
                                                                        style={[styles.inputStyle, { marginBottom: 20, color: "gray" }]}
                                                                        keyboardType='numeric'
                                                                        placeholder='Date of Birth'
                                                                        selectionColor={'grey'}
                                                                        mode='outlined'
                                                                        placeholderTextColor='#787A8D'
                                                                        onChangeText={inp => setBvn(inp.trim())}
                                                                />
                                                                <TextInput
                                                                        style={[styles.inputStyle, { marginBottom: 20, color: "gray" }]}
                                                                        keyboardType='numeric'
                                                                        placeholder='BVN'
                                                                        selectionColor={'grey'}
                                                                        mode='outlined'
                                                                        placeholderTextColor='#787A8D'
                                                                        onChangeText={inp => setBvn(inp.trim())}
                                                                /> */}
                                                        </ScrollView>
                                                        <TouchableOpacity onPress={() => { closeModal(); verifyBVN() }} style={styles.getStarted}>
                                                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Upgrade</Text>
                                                        </TouchableOpacity>
                                                </View>

                                        </View>
                                </View>
                        </Modal >
                        {/* ============== Tier3 Modal2 ============== */}

                        <Modal Modal
                                visible={modalVisibility2}
                                animationType="slide"
                                transparent={true}
                        >
                                <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
                                        <Pressable style={{ flex: 1 }} onPress={closeModal2} >
                                        </Pressable>
                                        <View style={{ backgroundColor: "#fcfbff", height: 550, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                                                <View style={{ alignItems: 'flex-end', margin: 10 }}>
                                                        <TouchableOpacity onPress={closeModal2}>
                                                                <FontAwesomeIcon
                                                                        icon={faXmark}
                                                                        size={24}
                                                                        color='#7B61FF'
                                                                />
                                                        </TouchableOpacity>
                                                </View>

                                                <View style={{ marginTop: 0, padding: 15 }}>
                                                        <View style={{ alignItems: 'center', marginBottom: 20 }}>
                                                                <Text style={{ fontWeight: 'bold', color: '#2e3144', fontSize: 18 }}>Tier 3 Upgrade</Text>
                                                        </View>
                                                        <ScrollView>
                                                                {/* <TouchableOpacity style={{
                                                                        borderWidth: 1, borderColor: 'grey', marginBottom: 15,
                                                                        padding: 15, borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
                                                                }}>
                                                                <FontAwesomeIcon icon={faChevronDown} color="#504973" />
                                                        </TouchableOpacity> */}
                                                                <Text>Select ID Type</Text>
                                                                <View style={{
                                                                        borderWidth: 1, borderColor: 'grey', marginBottom: 15, borderRadius: 8,
                                                                }}>


                                                                        <Picker

                                                                                placeholder="Select ID Type"
                                                                                selectedValue={selectedIDType}
                                                                                onValueChange={(itemValue) => setSelectedIDType(itemValue)}
                                                                        >
                                                                                <Picker.Item label="National ID Card" value="nin" />
                                                                                <Picker.Item label="International Passport" value="passport" />
                                                                                <Picker.Item label="Driver's License" value="driver" />
                                                                        </Picker>
                                                                </View>
                                                                <TextInput
                                                                        style={[styles.inputStyle, { marginTop: 0, marginBottom: 10, color: "gray" }]}
                                                                        keyboardType='default'
                                                                        placeholder='Input ID number'
                                                                        selectionColor={'grey'}
                                                                        mode='outlined'
                                                                        placeholderTextColor='#787A8D'
                                                                        onChangeText={inp => setId_number(inp.trim())}
                                                                />
                                                                <TextInput
                                                                        style={[styles.inputStyle, { marginTop: 10, marginBottom: 10, color: "gray" }]}
                                                                        keyboardType='default'
                                                                        placeholder='Expiry Date e.g 2024/07/09'
                                                                        selectionColor={'grey'}
                                                                        mode='outlined'
                                                                        placeholderTextColor='#787A8D'
                                                                        onChangeText={inp => setId_expiry(inp.trim())}
                                                                />

                                                                <TouchableOpacity onPress={() => pickID("front")} style={{ borderWidth: 1, borderColor: 'grey', marginBottom: 15, padding: 10, borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                        <Text>Upload Front ID</Text>
                                                                        {frontID == null ? <FontAwesomeIcon icon={faIdCard} color="#504973" /> : <FontAwesomeIcon icon={faCheckCircle} color="#028200" />}
                                                                </TouchableOpacity>
                                                                <TouchableOpacity onPress={() => pickID("back")} style={{ borderWidth: 1, borderColor: 'grey', marginBottom: 15, padding: 10, borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                        <Text>Upload Back ID</Text>
                                                                        {backID == null ? <FontAwesomeIcon icon={faCreditCard} color="#504973" /> : <FontAwesomeIcon icon={faCheckCircle} color="#028200" />}
                                                                </TouchableOpacity>
                                                                <TouchableOpacity onPress={() => pickID("proofOfAddress")} style={{ borderWidth: 1, borderColor: 'grey', marginBottom: 15, padding: 10, borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                        <Text>Upload Proof of Address</Text>
                                                                        {proofOfAddress == null ? <FontAwesomeIcon icon={faHome} color="#504973" /> : <FontAwesomeIcon icon={faCheckCircle} color="#028200" />}
                                                                </TouchableOpacity>


                                                        </ScrollView>
                                                        <TouchableOpacity style={styles.getStarted} onPress={() => { closeModal2(); upgradeToTier3() }}>
                                                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Upgrade</Text>
                                                        </TouchableOpacity>
                                                </View>

                                        </View>
                                </View>
                        </Modal >
                </View >
        )
}



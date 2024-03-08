import * as React from 'react';
import { useContext, useEffect, useState, useCallback } from 'react';
import { Text, View, TextInput, Alert, TouchableOpacity, Image, Pressable, ScrollView, ActivityIndicator, Dimensions, } from "react-native";
import { AppContext } from '../../globals/AppContext';
import { AppSafeAreaView } from "../components/AppSafeAreaView";
import { styles } from "../styles/profilesettings";
import { useFonts, Inter_900Black, Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleRight, faArrowLeft, faCalendarAlt, faCamera, faCameraAlt, faCameraRetro, faCameraRotate, faImage, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-native';
import * as ImagePicer from "expo-image-picker";
import { StyleSheet } from 'react-native';
import { collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { db, imgStorage, storage } from '../../firebase/firebase';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ToastApp } from '../components/Toast';
import moment from 'moment/moment';
import { getDownloadURL, ref } from 'firebase/storage';
import * as FileSystem from 'expo-file-system';
import { uriToBlob } from '../components/UriToBlob';
import { baseURL } from '../../config';
import { handleError } from '../components/HandleRequestError';


export function ProfileSettings({ navigation }) {
  const { setPreloader, profileImage, userInfo, token, getAccountInfo } = useContext(AppContext);
  const [image, setImage] = useState({ uri: null, file: {} });
  const [modalVisibility, setModalVisibility] = useState(false);
  const [preVisibility, setpreVisibility] = useState(false);
  const [imageMD, setimageMD] = useState(false);
  const [fName, setfName] = useState('');
  const [lName, setlName] = useState('');
  const [address, setaddress] = useState('');
  const [phone, setphone] = useState('');
  const width = Dimensions.get("screen").width

  useEffect(() => {
    // setPreloader(false)
  }, []);

  const closeModal = () => {
    setModalVisibility(!modalVisibility);
  };
  const previewModal = () => {
    setpreVisibility(!preVisibility);
  };

  const imageModal = () => {
    setimageMD(!imageMD);
  };

  const selectImage = async (type) => {
    if (type === "gallery") {
      let result = await ImagePicer.launchImageLibraryAsync({
        mediaType: ImagePicer.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 4],
        quality: 1,
      },)


      if (!result.canceled) {

        const { uri, type } = result.assets[0]
        if (type === 'image') {
          setImage({ file: result.assets[0], uri })
          setpreVisibility(true)
        }
        else {
          Alert.alert("File", "Can't select this type of file.")
          setImage(null)
          setpreVisibility(false)
        }
      }

    }
    else if (type === "camera") {
      let result = await ImagePicer.launchCameraAsync({
        mediaType: ImagePicer.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
      if (!result.canceled) {
        const { uri, type } = result.assets[0]
        if (type === 'image') {
          setImage(uri)
          setpreVisibility(true)
        }
        else {
          setImage(null)
          Alert.alert("File", "Can't select this type of file.")
          setpreVisibility(false)
        }
      }
    }
    else {
      null
    }
  }

  async function uplaod() {
    const formdata = new FormData();
    formdata.append("profile_picture", image.file,);

    const requestOptions = {
      method: 'POST',
      headers: {
        'content-Type': 'multipart/form-data',
        authorization: `bearer ${token}`
      },
      body: formdata,
      redirect: 'follow'
    };

    fetch(baseURL + "/api/profile/update-picture", requestOptions)
      .then(response => response.json())
      .then(response => {
        const { data, status, message } = response;
        // console.log(response);
        setPreloader(false)
        if (status == "success") {
          Alert.alert(
            'Profile Image!',
            message,
          )
        }
        handleError(status, message);
        getAccountInfo();
      })
      .catch(error => {
        setPreloader(false)
        console.log('error', error)
        if (error.message == "JSON Parse error: Unexpected character: <") Alert.alert("Error!", "Network error, please try again");
                    else Alert.alert("Error!", error.message)
      });
  }

  const uploadImage = async () => {
    setpreVisibility(false);
    setPreloader(true);
    uplaod()

  }

  return (
    <AppSafeAreaView>
      <View style={styles.container}>
        <View style={styles.body}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              color="#787A8D"
              size={18}
              style={{ margin: 10 }}
            />
          </TouchableOpacity>
          {/* <ScrollView > */}
          <View style={styles.header}>
            <View style={{ position: "relative" }}>
              <View onPress={imageModal}>
                <Image source={profileImage} style={styles.ProfileImage}
                  defaultSource={require('../../assets/person.png')}
                />
              </View>
              {/* <TouchableOpacity onPress={closeModal} style={styles.BtnIcon}>
                <FontAwesomeIcon icon={faCameraRetro} color="#16171D" size={15} />
              </TouchableOpacity> */}
            </View>
          </View>

          <ScrollView>

            <View style={styles.formContainer}>
              <Text style={styles.signupText}>First Name</Text>
              <TextInput
                style={styles.inputStyle}
                keyboardType='default'
                placeholder='Last name on ID'
                autoCapitalize='words'
                mode='outlined'
                value={userInfo.first_name}
              />

              <Text style={styles.signupText}>Last Name</Text>
              <TextInput
                style={styles.inputStyle}
                keyboardType='default'
                placeholder='Last name on ID'
                mode='outlined'
                autoCapitalize='words'
                onChangeText={(text) => setlName(text.trim())}
                editable={false}
                value={userInfo.last_name}
              />

              <Text style={styles.signupText}>Phone</Text>
              <TextInput
                style={styles.inputStyle}
                keyboardType='number-pad'
                placeholder='Phone'
                mode='outlined'
                onChangeText={(text) => setphone(text)}
                editable={false}
                value={userInfo.phone}
              />

              <Text style={styles.signupText}>Date of birth</Text>
              <View >
                <Text style={[styles.inputStyle, { paddingVertical: 10 }]}>{userInfo.dob || "MM/DD/YYYY"}</Text>
              </View>

              <Text style={styles.signupText}>Address</Text>
              <TextInput
                style={styles.inputStyle}
                keyboardType='default'
                placeholder='Address'
                mode='outlined'
                editable={false}
                value={userInfo.address}
              />

              <Text style={styles.signupText}>Email</Text>
              <TextInput
                style={styles.inputStyle}
                keyboardType='default'
                mode='outlined'
                editable={false}
                value={userInfo.email}
              />

            </View>
          </ScrollView>
        </View>


        {/* <=======================> Image Methods <=======================> */}
        <Modal
          visible={modalVisibility}
          animationType="slide"
          transparent={true}
        >
          <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
            <Pressable style={{ flex: 1 }} onPress={closeModal} >
            </Pressable>
            <View style={{ backgroundColor: "#16171D", height: 170, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
              <View style={{ alignItems: 'flex-end', margin: 10 }}>
                <TouchableOpacity onPress={closeModal}>
                  <FontAwesomeIcon
                    icon={faXmark}
                    size={24}
                    color="#7B61FF"
                  />
                </TouchableOpacity>
              </View>
              <View>

                <TouchableOpacity onPress={() => {
                  closeModal()
                  selectImage("gallery")
                }}>
                  <View style={{ margin: 10, marginTop: 0, padding: 5, flexDirection: "row", }}>
                    <FontAwesomeIcon
                      icon={faImage}
                      color="#7B61FF"
                      size={25}
                    />
                    <Text style={{ fontSize: 15, paddingLeft: 5, color: "white" }}>Gallery</Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    borderBottomColor: '#7B61FF',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    margin: 10, marginTop: 0
                  }}
                />
                <TouchableOpacity onPress={() => {
                  closeModal()
                  selectImage("camera")
                }}>
                  <View style={{ margin: 10, marginTop: 0, padding: 5, flexDirection: "row" }}>
                    <FontAwesomeIcon
                      icon={faCameraRetro}
                      color="#7B61FF"
                      size={25}
                    />
                    <Text style={{ fontSize: 15, paddingLeft: 5, color: "white" }}>
                      Camera
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

            </View>

          </View>
        </Modal>

        {/* <====================> Preview Image before Uploading <====================> */}
        <Modal
          visible={preVisibility}
          transparent={true}
        >
          <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
            <Pressable style={{ flex: 1 }} onPress={previewModal} >
            </Pressable>
            <View style={{ backgroundColor: '#16171D', height: 500, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
              <View style={{ alignItems: 'flex-end', margin: 10 }}>
                <TouchableOpacity onPress={previewModal}>
                  <FontAwesomeIcon
                    icon={faXmark}
                    size={24}
                    color='grey'
                  />
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: 'center', padding: 5, justifyContent: 'center' }}>
                <Image source={{ uri: image.uri }} style={{ width: 300, height: 300, borderRadius: 400, }} />
              </View>
              <TouchableOpacity onPress={() => { uploadImage(); previewModal() }}
                style={[styles.getStarted, { marginHorizontal: 10 }]}>
                <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, }}>Upload Image</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* ============================> Profile Modal <============================ */}
        <Modal
          visible={imageMD}
          animationType="slide"
          transparent={true}
        >
          <View style={{ flex: 1, backgroundColor: "#16171df4" }}>
            <Pressable style={{ flex: 1 }} onPress={imageModal} >
            </Pressable>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Image source={profileImage}
                style={{ width: width - 5, height: width - 5 }}
              />
            </View>
            <Pressable style={{ flex: 1 }} onPress={imageModal} >
            </Pressable>
          </View>
        </Modal>
      </View >
    </AppSafeAreaView >
  )
}
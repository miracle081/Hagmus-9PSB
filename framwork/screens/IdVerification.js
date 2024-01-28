import { useContext, useState, } from 'react';
import { Text, View, TouchableOpacity, Alert, Modal, Pressable, StyleSheet } from "react-native";
import { AppSafeAreaView } from "../components/AppSafeAreaView";
import { styles } from "../styles/idverification";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faIdCard, faImage, faUpload } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../../globals/AppContext';
import * as ImagePicer from "expo-image-picker";
import { imgStorage } from '../../firebase/firebase';
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
import { ImageBackground } from 'react-native';
import { ToastApp } from '../components/Toast';
import { uriToBlob} from '../components/UriToBlob';

export function IdVerification({ navigation }) {
  const { userUID, setPreloader, setID } = useContext(AppContext);
  const [frontID, setFrontID] = useState(null);
  const [backID, setBackID] = useState(null);
  const [modalVisibilityFID, setModalVisibilityFID] = useState(false);
  const [modalVisibilityBID, setModalVisibilityBID] = useState(false);
  const [uploadMethodFID, setUploadMethodFID] = useState(null);

  // Selecting a file from device labrary
  const selectFID = async (type) => {
    if (type === "gallery") {
      let result = await ImagePicer.launchImageLibraryAsync({
        mediaType: ImagePicer.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 6],
        quality: 1,
      });
      if (!result.canceled) {
        const { uri, type } = result.assets[0]
        if (type === 'image') {
          setFrontID(uri);
        }
        else {
          Alert.alert("File", "Can't select this type of file.")
        }
      }

    }
    else if (type === "camera") {
      let result = await ImagePicer.launchCameraAsync({
        mediaType: ImagePicer.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 6],
        quality: 1,
      });
      if (!result.canceled) {
        const { uri, type } = result.assets[0]
        if (type === 'image') {
          setFrontID(uri)
        }
        else {
          Alert.alert("File", "Can't select this type of file.")
        }
      }
    }
    else {
      setUploadMethodFID("")
    }
  }
  const selectBID = async (type) => {
    if (type === "gallery") {
      let result = await ImagePicer.launchImageLibraryAsync({
        mediaType: ImagePicer.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 6],
        quality: 1,
      });
      if (!result.canceled) {
        const { uri, type } = result.assets[0]
        if (type === 'image') {
          setBackID(uri)
        }
        else {
          Alert.alert("File", "Can't select this type of file.")
        }
      }

    }
    else {
      setUploadMethodFID("")
    }
  }

  const uploadID = async () => {
    // let fileName = imageURL.substring(imageURL.lastIndexOf(".") + 1)
    setPreloader(true)
    try {
      const frontIDBlob = await uriToBlob(frontID);
      const backIDBlob = await uriToBlob(backID);
      await imgStorage().ref().child(`usersIDCards/${userUID}/frontID${userUID}`).put(frontIDBlob);
      await imgStorage().ref().child(`usersIDCards/${userUID}/backID${userUID}`).put(backIDBlob);
      ToastApp("Your ID has been uploaded successfully")
      setPreloader(false)
      navigation.navigate("Kyc")
      setID(frontID)
    } catch (error) {
      setPreloader(false);
      console.log(error);
      ToastApp("Failed to upload ID. Please try again")
    }
  }

  const closeModalFID = () => {
    setModalVisibilityFID(!modalVisibilityFID);
  };
  const closeModalBID = () => {
    setModalVisibilityBID(!modalVisibilityBID);
  };

  return (
    <AppSafeAreaView>
      <View style={styles.container}>
        <View style={styles.body}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              icon={faChevronLeft}
              color='#787A8D'
              size={20}
              style={{ marginTop: 10 }}
            />
          </TouchableOpacity>
          <View style={styles.header}>
            <Text style={styles.text1}>Verify Account</Text>
          </View>
          <View style={styles.formContainer}>

            <Text style={{ color: '#787A8D', fontFamily: 'Inter_400Regular', marginBottom: 5, fontWeight: 'bold', fontSize: 20 }}>
              Upload Image of ID Card
            </Text>


            <View style={styles.selectId}>
              <ImageBackground
                borderRadius={6}
                source={{ uri: frontID }}
                style={styles.idHold}>
                {frontID != null ?
                  <Pressable style={styles.idBtn}
                    onPress={() => setFrontID(null)}
                  >
                    <FontAwesomeIcon
                      icon={faXmark}
                      size={24}
                      color='#b9b4b4'
                    />
                  </Pressable>
                  : null}
                <TouchableOpacity
                  style={{ backgroundColor: '#54545456', borderRadius: 6 }}
                  onPress={closeModalFID}
                >
                  <View style={styles.id}>
                    <FontAwesomeIcon
                      icon={faIdCard}
                      color='white'
                      size={25}
                    />
                    <Text style={{ color: 'white', marginLeft: 6 }}>Upload front page</Text>
                  </View>
                </TouchableOpacity>
              </ImageBackground>

              <ImageBackground
                borderRadius={6}
                source={{ uri: backID }}
                style={styles.idHold}>
                {backID != null ?
                  <Pressable style={styles.idBtn}
                    onPress={() => setBackID(null)}
                  >
                    <FontAwesomeIcon
                      icon={faXmark}
                      size={24}
                      color='#b9b4b4'
                    />
                  </Pressable>
                  : null}
                <TouchableOpacity
                  style={{ backgroundColor: '#54545456', borderRadius: 6 }}
                  onPress={closeModalBID}
                >
                  <View style={styles.id}>
                    <FontAwesomeIcon
                      icon={faCreditCard}
                      color='white'
                      size={25}
                    />
                    <Text style={{ color: 'white', marginLeft: 6 }}>Upload back page</Text>
                  </View>
                </TouchableOpacity>
              </ImageBackground>

              {/* ========================= FRONT ID MODAL START ==================== */}
              <Modal
                style={styles.modal}
                visible={modalVisibilityFID}
                animationType="slide"
                transparent={true}
              >
                <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
                  <Pressable style={{ flex: 1 }} onPress={closeModalFID} >
                  </Pressable>
                  <View style={{ backgroundColor: "#16171D", height: 170, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                    <View style={{ alignItems: 'flex-end', margin: 10 }}>
                      <TouchableOpacity onPress={closeModalFID}>
                        <FontAwesomeIcon
                          icon={faXmark}
                          size={24}
                          color='#787A8D'
                        />
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity onPress={() => {
                        closeModalFID()
                        selectFID("gallery")
                      }}>
                        <View style={{ margin: 10, marginTop: 0, padding: 5, flexDirection: "row", }}>
                          <FontAwesomeIcon
                            icon={faImage}
                            color='#7B61FF'
                            size={25}
                          />
                          <Text style={{ color: 'white', fontSize: 15, paddingLeft: 5 }}>Gallery</Text>
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
                        closeModalFID()
                        selectFID("camera")
                      }}>
                        <View style={{ margin: 10, marginTop: 0, padding: 5, flexDirection: "row" }}>
                          <FontAwesomeIcon
                            icon={faCameraRetro}
                            color='#7B61FF'
                            size={25}
                          />
                          <Text style={{ color: 'white', fontSize: 15, paddingLeft: 5 }}>
                            Camera
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                  </View>
                </View>
              </Modal>
              {/* ========================= FRONT ID MODAL STAENDRT ==================== */}

              {/* ========================= BACK ID MODAL START ==================== */}
              <Modal
                style={styles.modal}
                visible={modalVisibilityBID}
                animationType="slide"
                transparent={true}
              >
                <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
                  <Pressable style={{ flex: 1 }} onPress={closeModalBID} >
                  </Pressable>
                  <View style={{ backgroundColor: "#16171D", height: 170, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                    <View style={{ alignItems: 'flex-end', margin: 10 }}>
                      <TouchableOpacity onPress={closeModalBID}>
                        <FontAwesomeIcon
                          icon={faXmark}
                          size={24}
                          color='#787A8D'
                        />
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity onPress={() => {
                        closeModalBID()
                        selectBID("gallery")
                      }}>
                        <View style={{ margin: 10, marginTop: 0, padding: 5, flexDirection: "row", }}>
                          <FontAwesomeIcon
                            icon={faImage}
                            color='#7B61FF'
                            size={25}
                          />
                          <Text style={{ color: 'white', fontSize: 15, paddingLeft: 5 }}>Gallery</Text>
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
                        closeModalBID()
                        selectBID("camera")
                      }}>
                        <View style={{ margin: 10, marginTop: 0, padding: 5, flexDirection: "row" }}>
                          <FontAwesomeIcon
                            icon={faCameraRetro}
                            color='#7B61FF'
                            size={25}
                          />
                          <Text style={{ color: 'white', fontSize: 15, paddingLeft: 5 }}>
                            Camera
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                  </View>
                </View>
              </Modal>
              {/* ========================= BACK ID MODAL END ==================== */}

            </View>

            <View style={styles.idRequire}>

              <View style={styles.list}>
                <FontAwesomeIcon
                  icon={faCheck}
                  color='green'
                />
                <Text style={{ color: '#787A8D', fontSize: 15, margin: 8 }}>
                  Government-Issued
                </Text>
              </View>

              <View style={styles.list}>
                <FontAwesomeIcon
                  icon={faCheck}
                  color='green'
                />
                <Text style={{ color: '#787A8D', fontSize: 15, margin: 8 }}>
                  Original full-size, unedited document
                </Text>
              </View>

              <View style={styles.list}>
                <FontAwesomeIcon
                  icon={faCheck}
                  color='green'
                />
                <Text style={{ color: '#787A8D', fontSize: 15, margin: 8 }}>
                  Place documents against a single-colored background
                </Text>
              </View>

              <View style={styles.list}>
                <FontAwesomeIcon
                  icon={faCheck}
                  color='green'
                />
                <Text style={{ color: '#787A8D', fontSize: 15, margin: 8 }}>
                  Readable, well-lit, colored images
                </Text>
              </View>

              <View style={styles.list}>
                <FontAwesomeIcon
                  icon={faXmark}
                  color='red'
                />
                <Text style={{ color: '#787A8D', fontSize: 15, margin: 8 }}>
                  No fake copy of document
                </Text>
              </View>

              <View style={styles.list}>
                <FontAwesomeIcon
                  icon={faXmark}
                  color='red'
                />
                <Text style={{ color: '#787A8D', fontSize: 15, margin: 8 }}>
                  No edited or expired documents
                </Text>
              </View>

            </View>
          </View>
          <View style={styles.register}>
            {frontID != null & backID != null ?
              <TouchableOpacity
                onPress={uploadID}
                style={styles.getStarted}>
                <Text style={{ fontSize: 16, }}>Upload</Text>
              </TouchableOpacity>
              : null}
          </View>

        </View>
      </View>
    </AppSafeAreaView>
  )
}
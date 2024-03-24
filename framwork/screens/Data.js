import { useContext, useEffect, useState, } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, Pressable, FlatList, Alert, } from "react-native";
import { AppSafeAreaView } from "../components/AppSafeAreaView";
import { styles } from "../styles/airtime";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faCaretDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-native';
import { AppContext } from '../../globals/AppContext';
import { symbol } from '../components/currencySymbols';
import { formatDecimal } from '../components/numberToFixed';
import { baseURL } from '../../config';
import { handleError } from '../components/HandleRequestError';
import { PinTransactionModal } from '../components/PinModal';

const networkList = [
    { name: "MTN", id: "mtn-data", image: "https://wenethub.com/imageslink/mtnlogo.png" },
    { name: "Glo", id: "glo-data", image: "https://wenethub.com/imageslink/glo.jpg" },
    { name: "Airtel", id: "airtel-data", image: "https://wenethub.com/imageslink/airtel.jpg" },
    { name: "9Moble", id: "etisalat-data", image: "https://wenethub.com/imageslink/9mobile.png" },
    // { name: "Smile", id: "smile-direct", image: "https://wenethub.com/imageslink/SMA.jpg" },
    // { name: "Spectranet", id: "spectranet", image: "https://wenethub.com/imageslink/SPREC.png" },
]

const quickTap = {
    MTN: [
        { name: "100MB", days: "24 Hours", variation_amount: "100.00", variation_code: "mtn-10mb-100" },
        { name: "200MB", days: "3 days", variation_amount: "200.00", variation_code: "mtn-50mb-200" },
        { name: "1GB", days: "1 days", variation_amount: "350.00", variation_code: "mtn-1gb-350" },
        { name: "1GB", days: "7 days", variation_amount: "600.00", variation_code: "mtn-1gb-600" },
        { name: "1.2GB", days: "30 days", variation_amount: "1000.00", variation_code: "mtn-1200mb-1000" },
        { name: "2.5GB", days: "2 days", variation_amount: "600.00", variation_code: "mtn-2-5gb-600" },
        { name: "3GB", days: "30 days", variation_amount: "1600.00", variation_code: "mtn-3gb-1600" },
        { name: "4GB", days: "30 days", variation_amount: "2000.00", variation_code: "mtn-4gb-2000" },
        { name: "5GB", days: "7 days", variation_amount: "1500.00", variation_code: "mtn-5gb-1500" },
        { name: "10GB", days: "30 days", variation_amount: "3500.00", variation_code: "mtn-data-3500" },
        { name: "12GB", days: "30 days", variation_amount: "4000.00", variation_code: "mtn-12gb-4000" },
        { name: "20GB", days: "30 days", variation_amount: "5500.00", variation_code: "mtn-20gb-5500" },
    ],
    Glo: [
        { name: "150MB", days: "1 day", variation_amount: "100.00", variation_code: "glo100" },
        { name: "350MB", days: "2 days", variation_amount: "200.00", variation_code: "glo200" },
        { name: "1.35GB", days: "14 days", variation_amount: "500.00", variation_code: "glo500" },
        { name: "2.9GB", days: "30 days", variation_amount: "1000.00", variation_code: "glo1000" },
        { name: "4.1GB", days: "30 days", variation_amount: "1500.00", variation_code: "glo1500" },
        { name: "5.8GB", days: "30 days", variation_amount: "2000.00", variation_code: "glo2000" },
        { name: "7GB", days: "7 day", variation_amount: "1500.00", variation_code: "glo1500x" },
        { name: "10GB", days: "30 days", variation_amount: "3000.00", variation_code: "glo3000" },
        { name: "13.25GB", days: "30 days", variation_amount: "4000.00", variation_code: "glo4000" },
        { name: "18.25GB", days: "30 days", variation_amount: "5000.00", variation_code: "glo5000" },
        { name: "50GB", days: "30 days", variation_amount: "10000.00", variation_code: "glo10000" },
        { name: "225GB", days: "30 days", variation_amount: "30000.00", variation_code: "glo30000" },
        { name: "425GB", days: "90 days", variation_amount: "50000.00", variation_code: "glo50000" },
    ],
    Airtel: [
        { name: "40MB", days: "1 Day", variation_amount: "50.00", variation_code: "airt-50" },
        { name: "200MB", days: "3 Days", variation_amount: "200.00", variation_code: "airt-200" },
        { name: "100MB", days: "1 Day", variation_amount: "100.00", variation_code: "airt-100" },
        { name: "750MB", days: "7 Days", variation_amount: "500.00", variation_code: "airt-500" },
        { name: "1.2GB ", days: "30 Days", variation_amount: "1000.00", variation_code: "airt-1000" },
        { name: "2GB", days: "1 day", variation_amount: "500.00", variation_code: "airt-500x" },
        { name: "3GB", days: "30 Days", variation_amount: "1500.00", variation_code: "airt-1500" },
        { name: "5GB", days: "7 Days", variation_amount: "1500.00", variation_code: "airt-1500-2" },
        { name: "6GB", days: "30 Days", variation_amount: "2500.00", variation_code: "airt-2500" },
        { name: "10GB", days: "30 Days", variation_amount: "3000.00", variation_code: "airt-3000" },
        { name: "15GB", days: "30 Days", variation_amount: "4000.00", variation_code: "airt-4000" },
        { name: "30GB", days: "30 Days", variation_amount: "8000.00", variation_code: "airt-8000" },
    ],
    "9Moble": [
        { name: "200MB", days: "1 day", variation_amount: "100.00", variation_code: "eti-100" },
        { name: "650MB", days: "1 day", variation_amount: "200.00", variation_code: "eti-200" },
        { name: "2GB +100MB", days: "3 days", variation_amount: "500.00", variation_code: "eti-500" },
        { name: "18.5GB", days: "30 days", variation_amount: "4000.00", variation_code: "eti-4000" },
        { name: "9.5GB", days: "30 days", variation_amount: "2000.00", variation_code: "eti-2000" },
        { name: "50GB", days: "30 days", variation_amount: "10000.00", variation_code: "eti-10000" },
        { name: "24GB", days: "30 days", variation_amount: "5000.00", variation_code: "eti-5000" },
        { name: "6.5GB", days: "30 days", variation_amount: "1200.00", variation_code: "eti-1200" },
        { name: "50MB", days: "1 day", variation_amount: "50.00", variation_code: "eti-50" },
        { name: "7GB", days: "7 days", variation_amount: "1500.00", variation_code: "eti-1500" },
        { name: "1GB + 100MB", days: "1 day", variation_amount: "300.00", variation_code: "eti-300" },
        { name: "35 GB", days: "30 days", variation_amount: "7000.00", variation_code: "eti-7000" },
    ]
}

export function Data({ navigation }) {
    const { setPreloader, token, pin, setPin, userInfo, getAccountInfo, } = useContext(AppContext);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [modalVisibility2, setModalVisibility2] = useState(false);
    const [service, setService] = useState({ amount: 0, cashBack: 0, variation_code: "", data: "" });
    const [network, setNetwork] = useState(networkList[0]);
    const [phone, setPhone] = useState(userInfo.phone);
    const [variation, setVariation] = useState('');

    async function fetchVariation(net) {
        setPreloader(true)
        const requestOptions = {
            method: 'GET',
            headers: {
                authorization: `bearer ${token}`
            },
            redirect: 'follow'
        };
        fetch(`${baseURL}/api/vas/billers/${net || "mtn-data"}/plans`, requestOptions)
            .then(response => response.json())
            .then(response => {
                const { data, status, message } = response;
                setPreloader(false)
                if (status == "success") {
                    // console.log(data);
                    setVariation(data)
                }
                handleError(status, message);
            })
            .catch(error => {
                setPreloader(false)
                console.log('error', error)
            });
    }

    useEffect(() => {
        // console.log(service);
        fetchVariation()
    }, [])


    async function buyData() {
        setPreloader(true)
        const data = {
            phone_number: phone,
            network: network.id,
            amount: String(service.amount),
            plan_code: service.variation_code,
            pin,
        };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${token}`
            },
            body: JSON.stringify(data),
            redirect: 'follow'
        };

        fetch(baseURL + "/api/vas/data/pay", requestOptions)
            .then(response => response.json())
            .then(response => {
                const { data, status, message } = response;
                // console.log(response);
                setPreloader(false)
                if (status == "success") {
                    setPin("")
                    getAccountInfo();
                    navigation.navigate("Successful", {
                        name: "",
                        amount: `${symbol("ngn")}${service.amount}`,
                        message: `${service.data} ${network.name} was bought successfully`,
                        screen: "Data"
                    })
                }
                handleError(status, message);
            })
            .catch(error => {
                setPreloader(false)
                console.log('error', error)
                if (error.message == "JSON Parse error: Unexpected character: <") Alert.alert("Error!", "Network error, please try again");
                else Alert.alert("Error!", error.message)
            });
    }

    const closeModal = () => {
        setModalVisibility(!modalVisibility);
    };
    const closeModal2 = () => {
        setModalVisibility2(!modalVisibility2);
    };

    const [pinModalVisibility, setPinMetModalVisibility] = useState(false);
    const pinModal = () => {
        setPinMetModalVisibility(!pinModalVisibility);
    };

    const [viewAll, setViewAll] = useState(false);
    const ViewAllModal = () => {
        setViewAll(!viewAll);
    };

    return (
        <AppSafeAreaView backgroundColor={"#e4e2eb"}>
            <View style={styles.container}>
                <View style={styles.body}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            color='#787A8D'
                            size={25}
                        />
                    </TouchableOpacity>
                    {/* <ScrollView> */}
                    <View style={styles.header}>
                        <Text style={styles.text1}>Data</Text>
                    </View>


                    <View style={{}}>
                        <Image source={require('../../assets/lkdnd.png')} style={{ width: '100%', height: 90, marginBottom: 10, borderRadius: 8 }} />
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#f1f1f5', padding: 10, borderRadius: 8, }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={closeModal}
                                style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={{ uri: network.image }} style={{ width: 40, height: 40, borderRadius: 100, marginRight: 5 }} />
                                <FontAwesomeIcon icon={faCaretDown} color='grey' />
                            </TouchableOpacity>
                            <Text style={{ borderLeftWidth: 2, borderColor: '#7B61FF', height: 30, marginLeft: 14 }}></Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <TextInput
                                style={styles.inputStyle}
                                keyboardType='phone-pad'
                                placeholder='Input Number'
                                selectionColor={'grey'}
                                onChangeText={inp => setPhone(inp.trim())}
                                value={`${phone}`}
                            />
                        </View>
                    </View>

                    {/* Top Up */}
                    <View style={{ backgroundColor: '#f1f1f5', padding: 0, borderRadius: 8, marginTop: 18, flex: 1 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, marginBottom: 15 }}>
                            <TouchableOpacity style={{ borderBottomWidth: 6, borderColor: '#5541b7', borderRadius: 8 }}>
                                <Text style={{ color: '#282244', fontWeight: 'bold', fontSize: 15 }}>Hot</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={ViewAllModal} style={{ flexDirection: 'row', alignItems: "center", gap: 5, borderWidth: 1, borderColor: '#5541b7', borderRadius: 8, paddingHorizontal: 10 }}>
                                <Text style={{ color: '#5541b7', fontSize: 14 }}>View All</Text>
                            </TouchableOpacity>
                        </View>

                        {/* <FlatList data={variation}
                            initialNumToRender={10}
                            style={{ flex: 1 }}
                            renderItem={({ item }) => {
                                const cashBack = formatDecimal(Number(item.variation_amount) * 2 / 100, 2);
                                const amount = item.variation_amount
                                // console.log(item);
                                return (
                                    <TouchableOpacity onPress={() => console.log(item)}
                                        style={{ flexDirection: "row", alignItems: 'center', justifyContent: "space-between", backgroundColor: '#dcdcdc7e', padding: 15, borderRadius: 8, marginTop: 5, paddingVertical: 10, flex: 1, }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontSize: 14, color: '#343434', fontWeight: "bold" }}>{item.name}</Text>
                                            <Text style={{ fontSize: 13, color: '#1f8805', marginTop: 5 }}>{symbol("ngn")}{amount}</Text>
                                            <Text style={{ fontSize: 11, marginBottom: 2, color: '#5541b7' }}>+₦{cashBack} bonus</Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => { setService({ amount: Number(amount), variation_code: item.variation_code, cashBack, data: item.name }); closeModal2() }}
                                            style={[styles.getStarted, { borderRadius: 50, padding: 5, paddingHorizontal: 15, marginTop: 0 }]}>
                                            <Text style={{ fontSize: 12, color: "white" }}>Buy</Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                )
                            }} key={({ item }) => { item.id }} /> */}

                        <FlatList data={quickTap[network.name]}
                            initialNumToRender={10}
                            style={{ flex: 1 }}
                            numColumns={3}
                            renderItem={({ item }) => {
                                const cashBack = formatDecimal(Number(item.variation_amount) * 2 / 100, 2);
                                const amount = item.variation_amount
                                return (
                                    <TouchableOpacity onPress={() => { setService({ amount: Number(amount), variation_code: item.variation_code, cashBack, data: item.name + " - " + item.days }); closeModal2() }}
                                        style={{ backgroundColor: '#dcdcdc7e', padding: 15, borderRadius: 8, marginTop: 5, paddingVertical: 5, flex: 1, marginHorizontal: 2 }}>
                                        <View style={{ flex: 1, alignItems: "center", marginBottom: 5 }}>
                                            <Text style={{ fontSize: 16, color: '#343434', fontWeight: "bold" }}>{item.name}</Text>
                                            <Text style={{ fontSize: 13, color: '#1f8805', marginTop: 5 }}>{symbol("ngn")}{amount}</Text>
                                            <Text style={{ fontSize: 11, marginBottom: 2, color: '#5541b7' }}>+₦{cashBack} bonus</Text>
                                        </View>
                                        <View
                                            // onPress={() => { setService({ amount: Number(amount), variation_code: item.variation_code, cashBack, data: item.name }); closeModal2() }}
                                            style={[styles.getStarted, { borderRadius: 50, padding: 5, paddingHorizontal: 15, marginTop: 0 }]}>
                                            <Text style={{ fontSize: 12, color: "white" }}>{item.days}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }} key={({ item }) => { item.id }} />
                    </View>

                    {/* </ScrollView> */}
                </View>


                {/* ============== Network provider modal ============== */}
                <Modal
                    visible={modalVisibility}
                    animationType="slide"
                    transparent={true}
                >
                    <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
                        <Pressable style={{ flex: 1 }} onPress={closeModal} >
                        </Pressable>
                        <View style={{ backgroundColor: "#eeeff4", height: 350, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                            <View style={{ alignItems: 'flex-end', margin: 10 }}>
                                <TouchableOpacity onPress={closeModal}>
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        size={24}
                                        color='#7B61FF'
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={{ color: '#787A8D', margin: 10, fontWeight: "bold" }}>Select Network</Text>

                                <View style={{ padding: 10, flex: 1 }}>
                                    <FlatList data={networkList}
                                        style={{ flex: 1 }}
                                        renderItem={({ item }) => {
                                            return (
                                                <TouchableOpacity onPress={() => { setNetwork(item); closeModal(); fetchVariation(item.id) }}
                                                    style={{ backgroundColor: '#d2d7ef', padding: 4, borderRadius: 8, marginTop: 10 }}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Image source={{ uri: item.image }} style={{ width: 40, height: 40, borderRadius: 100, marginRight: 5 }} />
                                                        <Text style={{ fontWeight: 'bold', color: '#111532', marginRight: 8, fontSize: 18 }}>{item.name}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        }} key={({ item }) => { item.id }} />
                                </View>
                            </View>

                        </View>
                    </View>
                </Modal>

                {/* ============== Confirm Payment modal ============== */}
                <Modal
                    visible={modalVisibility2}
                    animationType="slide"
                    transparent={true}
                >
                    <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
                        <Pressable style={{ flex: 1 }} onPress={closeModal2} >
                        </Pressable>
                        <View style={{ backgroundColor: "#eeeff4", height: 350, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                            <View style={{ alignItems: 'flex-end', margin: 10 }}>
                                <TouchableOpacity onPress={closeModal2}>
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        size={24}
                                        color='#7B61FF'
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={{ padding: 10 }}>
                                <View style={{ padding: 10, }}>
                                    <View style={{ alignItems: 'center', marginBottom: 8 }}>
                                        <Text>₦<Text style={{ fontSize: 25 }}>{service.amount}</Text></Text>
                                        <Text style={{ fontSize: 16, marginVertical: 10 }}>{service.data}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                        <Text style={{ color: "#727272" }}>Product</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image source={{ uri: network.image }} style={{ width: 30, height: 30, borderRadius: 100, marginRight: 5 }} />
                                            <Text style={{ color: "#727272" }}>{network.name}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                        <Text style={{ color: "#727272" }}>Amount</Text>
                                        <Text style={{ color: "#727272" }}>₦{service.amount}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                        <Text style={{ color: "#727272" }}>Bonus</Text>
                                        <Text style={{ color: "#309900" }}>₦{service.cashBack} Cashback</Text>
                                    </View>
                                </View>
                                <View style={styles.register}>
                                    <TouchableOpacity onPress={() => { closeModal2(); pinModal() }} style={styles.getStarted}>
                                        <Text style={{ fontSize: 16, color: 'white' }}>Continue</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* ============== View All Data modal ============== */}
                <Modal
                    visible={viewAll}
                    animationType="slide"
                    transparent={true}
                >
                    <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
                        <Pressable style={{ flex: 1 }} onPress={ViewAllModal} >
                        </Pressable>
                        <View style={{ backgroundColor: "#eeeff4", height: 650, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                            <View style={{ alignItems: 'flex-end', margin: 10 }}>
                                <TouchableOpacity onPress={ViewAllModal}>
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        size={24}
                                        color='#7B61FF'
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={{ padding: 10, flex: 1 }}>
                                <FlatList data={variation}
                                    initialNumToRender={10}
                                    style={{ flex: 1 }}
                                    renderItem={({ item }) => {
                                        const cashBack = formatDecimal(Number(item.variation_amount) * 2 / 100, 2);
                                        const amount = item.variation_amount
                                        // console.log(item);
                                        return (
                                            <TouchableOpacity onPress={() => { setService({ amount: Number(amount), variation_code: item.variation_code, cashBack, data: item.name }); ViewAllModal(); closeModal2() }}
                                                style={{ flexDirection: "row", alignItems: 'center', justifyContent: "space-between", backgroundColor: '#dcdcdc7e', padding: 15, borderRadius: 8, marginTop: 5, paddingVertical: 10, flex: 1, }}>
                                                <View style={{ flex: 1 }}>
                                                    <Text style={{ fontSize: 14, color: '#343434', fontWeight: "bold" }}>{item.name}</Text>
                                                    <Text style={{ fontSize: 13, color: '#1f8805', marginTop: 5 }}>{symbol("ngn")}{amount}</Text>
                                                    <Text style={{ fontSize: 11, marginBottom: 2, color: '#5541b7' }}>+₦{cashBack} bonus</Text>
                                                </View>
                                                <TouchableOpacity
                                                    onPress={() => { setService({ amount: Number(amount), variation_code: item.variation_code, cashBack, data: item.name }); ViewAllModal(); closeModal2() }}
                                                    style={[styles.getStarted, { borderRadius: 50, padding: 5, paddingHorizontal: 15, marginTop: 0 }]}>
                                                    <Text style={{ fontSize: 12, color: "white" }}>Buy</Text>
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                        )
                                    }} key={({ item }) => { item.id }} />
                            </View>
                        </View>
                    </View>
                </Modal>

                <PinTransactionModal visibility={pinModalVisibility} onClose={pinModal} onVerify={() => { pinModal(); buyData() }} />
            </View>
        </AppSafeAreaView>
    )
}

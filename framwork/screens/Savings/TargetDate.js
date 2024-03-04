import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/businesstargetinfo";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Checkbox } from "react-native-paper";
import { useState } from "react";
import { getFutureTimestamp } from "../../components/DateTime";
import moment from "moment";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { AppContext } from "../../../globals/AppContext";
import { useContext } from "react";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { AppSafeAreaView } from "../../components/AppSafeAreaView";


// const options = [
//     { days: 60, label: '2 months', pa: 10 },
//     { days: 90, label: '3 months', pa: 11 },
//     { days: 120, label: '4 months', pa: 12 },
//     { days: 150, label: '5 months', pa: 13 },
//     { days: 180, label: '6 months', pa: 14 },
//     { days: 210, label: '7 months', pa: 15 },
//     { days: 240, label: '8 months', pa: 16 },
//     { days: 270, label: '9 months', pa: 17 },
//     { days: 300, label: '10 months', pa: 18 },
//     { days: 330, label: '11 months', pa: 19 },
//     { days: 365, label: '12 months', pa: 20 },
// ];

export function TargetDate({ navigation }) {
    const { userUID, setPreloader, docID, targetRates, vaultInfo } = useContext(AppContext);
    const [days, setDays] = useState(0);
    const [pa, setPa] = useState(0);

    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionPress = (optionIndex, d, pa) => {
        setSelectedOption(optionIndex);
        setDays(d);
        setPa(pa);
    };

    function dateConverter() {
        const timeS = getFutureTimestamp(days)
        let rDate = new Date(timeS)
        rDate = rDate.toLocaleDateString()
        return moment(timeS).format('DD/MM/YYYY')
    }

    function createTarget() {
        setPreloader(true)
        updateDoc(doc(db, "vault", userUID), {
            [docID]: {
                dateCreated: new Date().getTime(),
                days,
                deposites: [],
                dueDate: getFutureTimestamp(days),
                pa,
            }
        })
            .then(() => {
                setPreloader(false)
                navigation.navigate('Targets')
            })
            .catch(() => {
                setPreloader(false)
                ToastApp('Something went wrong, please try again', "LONG");
            })
    }

    
    return (
        <AppSafeAreaView backgroundColor={"#7B61FF"}>
            <View style={styles.container}>
                <View style={styles.body}>
                    <View style={{ alignItems: 'center', margin: 15 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>Set Target duration</Text>
                    </View>
                    <View style={styles.vault}>

                        <View style={{ marginTop: 20, padding: 5 }}>
                            <View>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ color: '#787A8D' }}>Easily accomplish your financial goal</Text>
                                </View>
                                <ScrollView>
                                    {targetRates.map((option, index) => (
                                        <TouchableOpacity key={index} onPress={() => handleOptionPress(index, option.days, option.pa)}
                                            style={{ alignItems: 'center', flexDirection: 'row', padding: 5, paddingBottom: 2, justifyContent: "space-between" }}
                                        >
                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <Checkbox
                                                    status={selectedOption === index ? 'checked' : 'unchecked'}
                                                    onPress={() => handleOptionPress(index, option.days, option.pa)}
                                                    color='#7B61FF'
                                                />
                                                <Text style={{ fontSize: 13, color: '#46464d' }}>End in {option.days} days - ({option.month} months)</Text>
                                            </View>
                                            <Text style={{ fontSize: 15, color: '#7B61FF', fontWeight: "bold" }}>{option.pa}% p.a</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>

                            {JSON.stringify(vaultInfo[docID]) != '{}' ?
                                < View style={{ padding: 15, marginTop: 10, flexDirection: "row", alignItems: "center" }}>
                                    <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 14, }}>{docID} Target has been Created </Text>
                                    <FontAwesomeIcon icon={faCheckCircle} color="#7B61FF" />
                                </View>
                                :
                                days ?
                                    <>
                                        <Text style={{ marginTop: 10, marginStart: 20, }}>Due Date: {dateConverter()}</Text>
                                        < View style={{ padding: 15, marginTop: 10 }}>
                                            <TouchableOpacity onPress={createTarget}
                                                style={styles.getStarted}>
                                                <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, color: 'white' }}>Create Target</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                    :
                                    null
                            }
                        </View>
                    </View>
                </View>
            </View>
        </AppSafeAreaView>
    )
}
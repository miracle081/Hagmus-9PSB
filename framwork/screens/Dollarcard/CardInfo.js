import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, ImageBackground, Pressable, TextInput } from "react-native";
import { styles } from "../../styles/aboutus";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faCircleArrowDown, faCirclePlus, faCreditCard, faCreditCardAlt, faSquareArrowUpRight, faXmark, } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-native";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../globals/AppContext";
import { baseURL } from "../../../config";
import { formatMoney } from "../../components/FormatMoney";
import { handleError } from "../../components/HandleRequestError";

export function CardInfo({ navigation }) {
    const { cardId, userInfo, setPreloader, token } = useContext(AppContext);
    const [modalVisibility, setModalVisibility] = useState(false)
    const [cardInfo, setCardInfo] = useState({ card_balance: { currentBalance: 0, availableBalance: 0 }, })

    const closeModal = () => {
        setModalVisibility(!modalVisibility);
    };

    function getCardInfo() {
        setPreloader(true)
        const requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: {
                authorization: `bearer ${token}`
            }
        };

        fetch(baseURL + "/api/cards/" + cardId, requestOptions)
            .then(response => response.json())
            .then(result => {
                const { data, status, message } = result
                setPreloader(false)
                console.log(result);
                if (status == "success") {
                    setCardInfo(data)
                    setPreloader(false)
                }
                handleError(status, message);
            })
            .catch(error => {
                setPreloader(false)
                console.log('error', error)
            });
    }

    useEffect(() => {
        // setPreloader(false)
        getCardInfo()
    }, []);


    return (
        <View style={styles.container}>

        </View>
    )
}
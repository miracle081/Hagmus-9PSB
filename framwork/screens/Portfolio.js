import { Alert, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../globals/AppContext';
import { baseURL } from '../../config';
import { handleError } from '../components/HandleRequestError';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatMoney } from '../components/FormatMoney';
import { symbol } from '../components/currencySymbols';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDown, faMoneyBill, faWallet } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import moment from 'moment';
import { YearMonthPicker } from '../components/YearMonthPicker';
import { PieChart} from "react-native-gifted-charts";

export function Portfolio() {
    const { setPreloader, token } = useContext(AppContext);
    const [histories, setHistories] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [date, setDate] = useState(new Date());

    function filterTransactionsByMonth(transactions, targetMonth) {
        const returned = transactions.filter(transaction => {
            const transactionDate = new Date(transaction.created_at);
            const transactionMonth = transactionDate.getMonth();
            const transactionYear = transactionDate.getFullYear();

            const targetDate = new Date(targetMonth);
            const targetMonthIndex = targetDate.getMonth();
            const targetYear = targetDate.getFullYear();

            return transactionMonth === targetMonthIndex && transactionYear === targetYear;
        });
        // console.log(returned);
        setHistories(returned)
    }

    async function fetchVariation() {
        setPreloader(true)
        const requestOptions = {
            method: 'GET',
            headers: {
                authorization: `bearer ${token}`
            },
            redirect: 'follow'
        };
        fetch(`${baseURL}/transactions`, requestOptions)
            .then(response => response.json())
            .then(response => {
                const { data, status, message } = response;
                // console.log(data);
                setPreloader(false)
                if (status == "success") {
                    // console.log(data);
                    filterTransactionsByMonth(data, new Date().getTime())
                    setTransactions(data)
                }
                handleError(status, message);
            })
            .catch(error => {
                setPreloader(false)
                console.log(error);
                if (error.message == "JSON Parse error: Unexpected character: <") Alert.alert("Error!", "Network error, please try again");
                else Alert.alert("Error!", error.message)
            });
    }

    useEffect(() => {
        setPreloader(true)
        fetchVariation();
    }, [])

    function moneyIn() {
        return histories.filter(all => all.type == "credit").reduce((a, c) => a + parseFloat(c.amount), 0)
    }
    function moneyOut() {
        return histories.filter(all => all.type == "debit").reduce((a, c) => a + parseFloat(c.amount), 0)
    }

    const data = [
        {
            name: "Transfar",
            value: histories.filter(all => all.category == "withdrawal").reduce((a, c) => a + parseFloat(c.amount), 0),
            color: "#7B61FF",
            gradientCenterColor: "#a290f8",
        },
        {
            name: "Airtime",
            value: histories.filter(all => all.category == "airtime").reduce((a, c) => a + parseFloat(c.amount), 0),
            color: "#009FFF",
            gradientCenterColor: "#006DFF",
        },
        {
            name: "Data",
            value: histories.filter(all => all.category == "data").reduce((a, c) => a + parseFloat(c.amount), 0),
            color: "#93FCF8",
            gradientCenterColor: "#3BE9DE",
        },
        {
            name: "Electricity",
            value: histories.filter(all => all.category == "electricity").reduce((a, c) => a + parseFloat(c.amount), 0),
            color: "#BDB2FA",
            gradientCenterColor: "#8F80F3",
        },
        {
            name: "TV",
            value: histories.filter(all => all.category == "cable_tv").reduce((a, c) => a + parseFloat(c.amount), 0),
            color: "#FFA5BA",
            gradientCenterColor: "#FF7F97",
        }
    ];

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 0) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    const [dateVisibility, setDateVisibility] = useState(false);
    const onChange = (year, month) => {
        filterTransactionsByMonth(transactions, new Date(year, month).getTime())
        setDate(new Date(year, month));
        // console.log(new Date(year, month).getTime());
        setDateVisibility(false);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ padding: 20, flex: 1 }}>
                <View style={{ alignItems: 'center', marginBottom: 10 }}>
                    <Text style={{ fontSize: 20 }}>Portfolio</Text>
                </View>

                {dateVisibility ?
                    <YearMonthPicker
                        visible={dateVisibility}
                        onChange={onChange}
                        onClose={() => setDateVisibility(false)}
                    />
                    : null}

                <View style={{ alignItems: "flex-end", marginBottom: 10 }}>
                    <TouchableOpacity onPress={() => setDateVisibility(true)}
                        style={{ borderColor: "#7B61FF", borderWidth: 1, padding: 5, paddingHorizontal: 10, borderRadius: 10, flexDirection: "row", gap: 8, alignItems: "center" }}>
                        <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 14, color: "#7B61FF" }}>{moment(date).format('MMMM, YYYY')}</Text>
                        <FontAwesomeIcon icon={faAngleDown} size={15} color='#7B61FF' />
                    </TouchableOpacity>
                </View>

                <View style={{
                    borderWidth: 1, padding: 5, borderRadius: 8, flexDirection: 'row', alignItems: 'center',
                    justifyContent: 'space-between', borderColor: '#d7d1f4', marginBottom: 15
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faWallet} color='#7B61FF' />
                        <Text style={{ fontSize: 16, marginLeft: 5 }}>Money In: </Text>
                    </View>
                    <Text style={{ fontSize: 16, color: '#040111' }}>{symbol("ngn")}{formatMoney(moneyIn())}</Text>
                </View>
                <View style={{
                    borderWidth: 1, padding: 5, borderRadius: 8, flexDirection: 'row', alignItems: 'center',
                    justifyContent: 'space-between', borderColor: '#d7d1f4'
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faPaperPlane} color='#7B61FF' />
                        <Text style={{ fontSize: 16, marginLeft: 5 }}>Money Out: </Text>
                    </View>
                    <Text style={{ fontSize: 16, color: '#040111' }}>{symbol("ngn")}{formatMoney(moneyOut())}</Text>
                </View>
                <View style={{ marginTop: 20, padding: 16, borderRadius: 20, backgroundColor: '#232B5D', }}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Statistics</Text>

                    <View style={{ padding: 20, alignItems: 'center' }}>
                        <PieChart
                            data={data}
                            donut
                            showGradient
                            sectionAutoFocus
                            radius={90}
                            innerRadius={60}
                            innerCircleColor={'#232B5D'}
                        />
                    </View>

                    <FlatList
                        data={data} renderItem={({ item }) => {
                            // console.log(item);
                            return (
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: "space-between" }}>
                                    <View style={{ alignItems: 'center', flexDirection: "row" }}>
                                        <View style={{ marginRight: 10, backgroundColor: item.color, borderRadius: 50, padding: 10 }}></View>
                                        <Text style={{ color: '#a6c6fe', fontSize: 15, textTransform: "capitalize" }}>{item.name}</Text>
                                    </View>
                                    <Text style={{ color: '#ffffff', fontSize: 15, }}>{symbol("ngn")}{formatMoney(item.value)}</Text>
                                </View>
                            )
                        }} key={({ item }) => { item.id }} />
                </View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})
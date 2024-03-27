import { Alert, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../globals/AppContext';
import { baseURL } from '../../config';
import { handleError } from '../components/HandleRequestError';
import { AppSafeAreaView } from '../components/AppSafeAreaView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PieChart } from 'react-native-chart-kit';
import { formatMoney } from '../components/FormatMoney';
import { symbol } from '../components/currencySymbols';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDown, faMoneyBill, faWallet } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import MonthPicker from 'react-native-month-year-picker';
import moment from 'moment';
import { ToastApp } from '../components/Toast';
import { YearMonthPicker } from '../components/YearMonthPicker';

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
        fetch(`${baseURL}/api/transactions`, requestOptions)
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
            transactions: histories.filter(all => all.category == "withdrawal").reduce((a, c) => a + parseFloat(c.amount), 0),
            color: "#7B61FF",
        },
        {
            name: "Airtime",
            transactions: histories.filter(all => all.category == "airtime").reduce((a, c) => a + parseFloat(c.amount), 0),
            color: "#bb0802",
        },
        {
            name: "Data",
            transactions: histories.filter(all => all.category == "data").reduce((a, c) => a + parseFloat(c.amount), 0),
            color: "#8b0187",
        },
        {
            name: "Electricity",
            transactions: histories.filter(all => all.category == "electricity").reduce((a, c) => a + parseFloat(c.amount), 0),
            color: "#c68e01",
        },
        {
            name: "TV",
            transactions: histories.filter(all => all.category == "cable_tv").reduce((a, c) => a + parseFloat(c.amount), 0),
            color: "#0024da",
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
        <SafeAreaView>
            <View style={{ padding: 20 }}>
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
                <View style={{ alignItems: "center" }}>
                    <PieChart
                        data={data}
                        width={Dimensions.get("screen").width - 40}
                        height={Dimensions.get("screen").width - 70}
                        chartConfig={chartConfig}
                        accessor={"transactions"}
                        backgroundColor={"transparent"}
                        // paddingLeft={"15"}
                        center={[90, 0]}
                        absolute={false}
                        hasLegend={false}
                    />
                </View>
                <FlatList
                    data={data} renderItem={({ item }) => {
                        // console.log(item);
                        return (
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: "space-between" }}>
                                <View style={{ alignItems: 'center', flexDirection: "row" }}>
                                    <View style={{ marginRight: 10, backgroundColor: item.color, borderRadius: 50, padding: 15 }}></View>
                                    <Text style={{ color: '#3b3c43', fontSize: 15, textTransform: "capitalize" }}>{item.name}</Text>
                                </View>
                                <Text style={{ color: '#040111', fontSize: 15, }}>{symbol("ngn")}{formatMoney(item.transactions)}</Text>
                            </View>
                        )
                    }} key={({ item }) => { item.id }} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})
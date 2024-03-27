import moment from "moment";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, FlatList, Modal, StyleSheet } from "react-native";

export const YearMonthPicker = ({ visible, onClose, onChange }) => {
    const [selectYear, setSelectYear] = useState(new Date().getFullYear());
    const [selectMonth, setSelectMonth] = useState(new Date().getMonth());
    const [years, setYears] = useState([]);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handleMonthPress = (monthIndex) => {
        setSelectMonth(monthIndex);
        onChange(selectYear, monthIndex);
    };

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();

        const yearsArray = [];
        for (let year = 2024-1; year <= currentYear; year++) {
            yearsArray.push(year);
        }
        setYears(yearsArray);


        if (selectYear === currentYear) {
            setSelectMonth(currentMonth);
        } else {
            setSelectMonth(null);
        }
    }, [selectYear]);


    const handleYearPress = (year) => {
        setSelectYear(year);
        if (selectYear === new Date().getFullYear()) {
            const currentMonth = new Date().getMonth();
            setSelectMonth(currentMonth);
            // onChange(year, currentMonth);
        } else {
            // onChange(year, selectMonth);
        }
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={{ flexDirection: "row", flex: 1 }}>
                        <FlatList style={styles.list}
                            data={months.slice(0, selectYear === new Date().getFullYear() ? new Date().getMonth() + 1 : months.length)}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity onPress={() => handleMonthPress(index)}
                                        style={{ borderColor: "gray", borderWidth: 1, padding: 5, margin: 5, borderRadius: 5, backgroundColor: selectMonth === months.indexOf(item) ? "#7b61ff" : "transparent" }}>
                                        <Text style={{ color: selectMonth === months.indexOf(item) ? "white" : "gray", fontWeight: "bold", fontSize: 16, }}>{item}</Text>
                                    </TouchableOpacity>
                                );
                            }}
                            keyExtractor={(item) => item}
                        />
                        <FlatList style={styles.list}
                            data={years}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity onPress={() => handleYearPress(item)}
                                        style={{ borderColor: "gray", borderWidth: 1, padding: 5, margin: 5, borderRadius: 5, backgroundColor: selectYear === item ? "#7b61ff" : "transparent" }}>
                                        <Text style={{ color: selectYear === item ? "white" : "gray", fontWeight: "bold", fontSize: 16, }}>{item}</Text>
                                    </TouchableOpacity>
                                );
                            }}
                            keyExtractor={(item) => item.toString()}
                        />
                    </View>
                    <TouchableOpacity onPress={onClose} style={styles.getStarted}>
                        <Text style={{ fontSize: 16, color: "white" }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        width: "80%",
        height: 500
    },
    list: {
        marginBottom: 20,
        flex: 1
    },
    itemText: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 10,
    },
    getStarted: {
        padding: 10,
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: "#7B61FF"
    },
});


import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Platform, View } from "react-native";

export function AppSafeAreaView({ children, backgroundColor }) {
    return (
        <>
            <SafeAreaView style={[styles.safeArea, { backgroundColor: backgroundColor || "#fcfbff" }]} >
                {children}
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        //  marginTop:Platform.OS === 'android' ? StatusBar.currentHeight : null,
        //  marginHorizontal:10 473d7c  
    }
});
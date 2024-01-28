import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

export function Web({ navigation, route }) {
    const { uri } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={'light-content'} backgroundColor={"#000000"} />
            <View style={{ margin: 10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        size={20}
                        color={'#787A8D'}
                    />
                </TouchableOpacity>
            </View>

            <View style={{ width: "100%", height: "100%" }}>
                <WebView source={{ uri }} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
    }
})
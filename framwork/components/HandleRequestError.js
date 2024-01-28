import { Alert } from "react-native"

export function handleError(status, message) {
    if (status == "success") {
        return null
    } else if (status == "error") {
        Alert.alert(
            'Access denied',
            message,
            [{ text: 'Try again' }]
        )
    } else {
        Alert.alert(
            'Sorry!',
            "Something went wrong",
            [{ text: 'Try again' }]
        )
    }
}
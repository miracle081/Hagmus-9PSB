import { Alert } from "react-native"

export function handleError(status, message) {
    if (status == "success") {
        return null
    } else if (status == "error" || status == false) {
        Alert.alert(
            'An error occurred',
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
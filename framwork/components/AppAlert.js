import { Alert } from 'react-native'

export function AppAlert() {
    Alert.alert(
        'Alert Title',
        'Alert message goes here',
        [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],

        {
           userInterfaceStyle:{
            backgroundColor:"red"
           }
        }
    );
}

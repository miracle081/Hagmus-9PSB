import { useEffect, useContext } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { AppContext } from '../../globals/AppContext';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export function PushNotification() {
    const { setExpoPushToken } = useContext(AppContext);

    useEffect(() => {
        registerForPushNotificationsAsync()
            .then(token => {
                // console.log(token);
                setExpoPushToken(token)
            })
            .catch(e => console.log(e))
    }, []);

    async function registerForPushNotificationsAsync() {
        let token;

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                console.log('Failed to get push token for push notification!');
                return;
            }

            token = (await Notifications.getExpoPushTokenAsync({ projectId: '26ea77e6-edb7-44a4-a81f-55522083acd0' })).data;
            // console.log(token);
        } else {
            console.log('Must use physical device for Push Notifications');
        }

        return token;
    }
}

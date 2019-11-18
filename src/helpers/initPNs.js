import PushNotification from '@aws-amplify/pushnotification';
import { Analytics } from 'aws-amplify';
import { Platform } from 'react-native';

export function initPushNotifications() {
    console.log("Initializing Push Notifications.");
    PushNotification.onNotification((notification) => {
        console.log("In app notification: ", notification);
    });

    PushNotification.onRegister((token) => {
        console.log("REGISTERING THE ENDPOINTS NOW!");
        let channel = '';
        if (Platform.OS == 'android') {
            channel = 'GCM';
        } else {
            channel = 'APNS';
        }
        console.log("In app registration for push notifications: ", token);
        Analytics.updateEndpoint({
            address: token,
            // channelType: channel,
            // userId: id,
            // attributes: {
            //     username: username,
            // },
        }).then((data) => {
            console.log("Success updating endpoint: ", data);
        }).catch((error) => {
            console.log("Error updating endpoint: ", error);
        })
    });

    PushNotification.onNotificationOpened((notification) => {
        console.log("This notification was opened: ", notification);
    });

    let channel = '';
        if (Platform.OS == 'android') {
            channel = 'GCM';
        } else {
            channel = 'APNS';
        }

    // it appears that the aws sdk's auto call updateEndpoint when we configure Amplify.
    // all of the cached items are: enpointId, userId, a device token (address).
    // NOTE: you will see the first two when printing with debug, the device token you will only see
    // onRegister.
    Analytics.updateEndpoint({
        channelType: channel,
    }).then((data) => {
        console.log("Success updating endpoint: ", data);
    }).catch((error) => {
        console.log("Error updating endpoint: ", error);
    });
}
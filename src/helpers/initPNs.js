import PushNotification from '@aws-amplify/pushnotification';
import { Analytics } from 'aws-amplify';

export function initPushNotifications() {
    PushNotification.onNotification((notification) => {
        console.log("In app notification: ", notification);
    });

    PushNotification.onRegister((token) => {
        console.log("In app registration for push notifications: ", token);
        Analytics.updateEndpoint({
            address: token,
            channelType: 'GCM',
            userId: 'us-east-1:96b5eadb-23aa-4ec2-8d42-08ab049dc98f',
        }).then((data) => {
            console.log("Success updating endpoint: ", data);
        }).catch((error) => {
            console.log("Error updating endpoint: ", error);
        })
    });

    PushNotification.onNotificationOpened((notification) => {
        console.log("This notification was opened: ", notification);
    });
}
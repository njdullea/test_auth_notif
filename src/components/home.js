import React from 'react';
import { StyleSheet, Text, View, Button, Platform } from 'react-native';
import { Auth, Analytics } from 'aws-amplify';
import { initPushNotifications } from '../helpers/initPNs';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const user = navigation.getParam('user', 'Unauthenticated');
        console.log("This is the user: ", user.username);
        this.updateUserEndpoint(user);
    }

    // At this point the endpoint already has the endpointId and the device token which
    // are saved in the aws cache and will be added automatically when we call updateEndpoint.
    // 
    // Now that we have logged in, we need to call update endpoint and the user federeted id will be 
    // added to the cache.
    //
    // The channelType is not part of the aws stuff, so we will need to add it in everytime we update the
    // endpoint.
    // 
    // When we need to send specific notifications we will need to also add attributes for the three times of
    // notifications, possibly username? but we should be fine w federated identify, which is the userId
    updateUserEndpoint = (user) => {
        // If we want to add the user's username use these next two lines:
        const current_user_info = await Auth.currentUserInfo();
        console.log("Current User Info: ", current_user_info);
        console.log("Update Endpoint user: ", JSON.stringify(user));
        // let channel = '';
        // if (Platform.OS == 'android') {
        //     channel = 'GCM';
        // } else {
        //     channel = 'APNS';
        // }
        Analytics.updateEndpoint({
            // At this point each endpoint will have the device token, and the user id, which 
            // is enough to check the 
            // attributes: {},
            // channelType: channel,
            // optOut: 'NONE',
            // userId: user.username,

        }).then((data) => { console.log("Updated User Endpoint: ", data)});
    }
    
    handleSignOut = () => {
        console.log("Handle Sign Out.");
        Auth.signOut()
            .then(() => this.props.navigation.navigate('SignIn'))
            .catch(err => console.log("Error signing out: ", err));
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Welcome to Test Home!</Text>
                <Button
                    title='Sign Out'
                    onPress={ this.handleSignOut }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
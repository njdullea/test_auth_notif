import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Auth, Analytics } from 'aws-amplify';
// import { initPushNotifications } from '../helpers/initPNs';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const user = navigation.getParam('user', 'Unauthenticated');
        console.log("This is the user: ", user.username);
        // this.updateUserEndpoint(user);
        this.configurePushNotifications(user);
    }

    // updateUserEndpoint = (user) => {
    //     console.log("Update Endpoint user: ", JSON.stringify(user));
    //     Analytics.updateEndpoint({
    //         // address: user.username,
    //         // attributes: {},
    //         // channelType: 'GCM',
    //         // optOut: 'NONE',
    //     }).then((data) => { console.log("Updated User Endpoint: ", data)});
    // }

    configurePushNotifications = async (user) => {
        console.log("Configure push notifications for user: ", JSON.stringify(user));
        // const cognito_user = Auth.CognitoIdentity.getId;
        // console.log("--------------- cognito user: ", cognito_user);
        // const current_authenticated_user = await Auth.currentAuthenticatedUser();
        // console.log("Current Authenticated User: ", current_authenticated_user);
        // const current_credentials = await Auth.currentCredentials();
        // console.log("Current Credentials: ", current_credentials);
        // const current_user_credentials = await Auth.currentUserCredentials();
        // console.log("Current user credentials: ", current_user_credentials);
        const current_user_info = await Auth.currentUserInfo();
        console.log("Current User Info: ", current_user_info);
        // const current_user_pool_user = await Auth.currentUserPoolUser();
        // console.log("Current user pool user: ", current_user_pool_user);

        
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
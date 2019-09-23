import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Auth, Analytics } from 'aws-amplify';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const user = navigation.getParam('user', 'Unauthenticated');
        console.log("This is the user: ", user.username);
        this.updateUserEndpoint(user);
    }

    updateUserEndpoint = (user) => {
        Analytics.updateEndpoint({
            address: user.username,
            attributes: {},
        }).then(() => { console.log("Updated User Endpoint")});
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
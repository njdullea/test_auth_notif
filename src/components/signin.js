import React from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { Input, Button } from "react-native-elements";
import { Auth } from 'aws-amplify';

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
        }
    }

    handleSignIn = () => {
        console.log("Handle Sign In");
        const { email, password } = this.state;
        Auth.signIn(email, password)
            // On success, go to home page
            .then(user => this.goToHomeAndPassUserAtts(user))
            // On failure, display error in console
            .catch(err => console.log(err));
    }

    autoSignIn = () => {
        console.log("Handle Sign In");
        const { email, password } = this.state;
        Auth.signIn('ndullea@trinity.edu', 'Cassidy1')
            // On success, go to home page
            .then(user => this.goToHomeAndPassUserAtts(user))
            // On failure, display error in console
            .catch(err => console.log(err));
    }

    goToHomeAndPassUserAtts = (user) => {
        console.log("Go to home and pass user atts");
        this.props.navigation.navigate('Home', {
            user: user
        });
    }

    goToSignUp = () => {
        this.props.navigation.navigate('SignUp');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Welcome to test!</Text>
                <Input
                label="Email"
                leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                onChangeText={
                    // Set this.state.email to the value in this Input box
                    (value) => this.setState({ email: value })
                }
                placeholder="my@email.com"
                />
                <Input
                label="Password"
                leftIcon={{ type: 'font-awesome', name: 'lock' }}
                onChangeText={
                    // Set this.state.email to the value in this Input box
                    (value) => this.setState({ password: value })
                }
                placeholder="p@ssw0rd123"
                secureTextEntry
                />
                <Button
                title='Submit'
                onPress={ this.handleSignIn }
                />
                <Button
                title='Sign Up'
                onPress = { this.goToSignUp }
                />
                <Button
                title='Auto Sign In'
                onPress = { this.autoSignIn }
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
    }
});
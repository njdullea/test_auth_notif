import React from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { Input, Button } from "react-native-elements";
import { Auth } from 'aws-amplify';

export default class Authentication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            confirmCode: '',
            modalVisible: false,
        }
    }

    handleSignUp = () => {
        console.log("Handle Sign Up");
        // show the current state object
        // alert(JSON.stringify(this.state));
        const { name, email, password, confirmPassword } = this.state;
        console.log("Name: ", name, " email: ", email);
        // Make sure passwords match
        if (password === confirmPassword) {
            Auth.signUp({
                username: email,
                password,
                attributes: { name, email },
                })
                // On success, show Confirmation Code Modal
                .then(() => this.setState({ modalVisible: true }))
                // On failure, display error in console
                .catch(err => console.log(err));
        } else {
            alert('Passwords do not match.');
        }
    }

    handleConfirmationCode = () => {
        console.log("Handle Confirmation Code.");
        const { email, confirmationCode } = this.state;
        Auth.confirmSignUp(email, confirmationCode, {})
            .then(() => {
                this.setState({ modalVisible: false });
                this.props.navigation.navigate('Home')
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Welcome to test!</Text>
                <Input
                label="Name"
                leftIcon={{ type: "font-awesome", name: "user" }}
                onChangeText={
                    (value) => this.setState({name: value})
                }
                placeholder="my@email.com"
                />
                <Input
                label="Email"
                leftIcon={{ type: "font-awesome", name: "envelope" }}
                onChangeText={
                    (value) => this.setState({email: value})
                }
                placeholder="my@email.com"
                />
                <Input
                label="Password"
                leftIcon={{ type: "font-awesome", name: "lock" }}
                placeholder="p@ssw0rd123"
                onChangeText={
                    (value) => this.setState({password: value})
                }
                placeholder="my@email.com"
                secureTextEntry
                />
                <Input
                label="Confirm Password"
                leftIcon={{ type: "font-awesome", name: "lock" }}
                placeholder="p@ssw0rd123"
                onChangeText={
                    (value) => this.setState({confirmPassword: value})
                }
                placeholder="my@email.com"
                secureTextEntry
                />
                <Button 
                title="Submit"
                onPress={ this.handleSignUp }
                />
                <Modal
                visible={ this.state.modalVisible }
                >
                    <View
                    style={ styles.container }
                    >
                        <Input
                        label="Confirmation Code"
                        leftIcon={{ type: 'font-awesome', name: 'lock' }}
                        onChangeText={
                            // Set this.state.confirmationCode to the value in this Input box
                            (value) => this.setState({ confirmationCode: value })
                        }
                        />
                        <Button
                        title='Submit'
                        onPress={ this.handleConfirmationCode }
                        />
                    </View>
                </Modal>
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
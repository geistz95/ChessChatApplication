import React from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/firestore';




export default class ChatRoomScreen extends React.Component (props) {
    //we pass the props from the stack navigator which contains the chatRoomID
    
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            newMessage: ''
        };
        const chatRoomID = route.params;
    }
    //This gets the messages from the firebase database 
    listenForMessages = () => {
        //this gets all the messages and refers back to the collections back into the firebase database using the ID passed through the stack navigator
        const chatroomMessagesRef = firebase.firestore().collection('chatrooms').doc(chatRoomID).collection('messages');
        //this piece of code listens for changes inside the chatroom and updates accordingly
        const stuff = chatroomMessagesRef.orderBy('timestamp').onSnapshot((snapshot) => {
            const messages = [];
            snapshot.forEach((child) => {
                messages.push({ text: child.val().text, key: child.key });
            });
            this.setState({ messages });
        });
    };
    //This function saves the messages into the firebase database
    sendMessage = () => {
        if (this.state.newMessage.trim() !== '') {
            firebase.database().ref('messages').push({ text: this.state.newMessage });
            this.setState({ newMessage: '' });
        }
    };
    
    render() {
        return (
            <View style={styles.container}>
            <FlatList
                    data={this.state.messages}
                    renderItem={({ item }) => <Text>{item.text}</Text>}
                />
            <TextInput
                style={styles.input}
                placeholder="Type a message"
                value={this.state.newMessage}
                onChangeText={(text) => this.setState({ newMessage: text })}
            />
            <Button title="Send" onPress={this.sendMessage} />
        </View>
        )
        }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: 'white',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10
    }
});
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NewsCard from './CardComponent.js'

export default class HomeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userData: null,
            newsInfo:{
                title:"Sample Title",
                imageUrl:"https://helloworld.org/someimageuri",
                description:"blah blah lorem ips.......",
                link:"https://www.chess.com/news"
            },
            generalChatRoomId:"29Su32102",
            chatRoom1Id:"32dkk92s01"
          };
          this.retrieveUserData(); 

        }



    retrieveUserData = async () => {
        try {
            //this retrieves the data from the cache
            const userDataJSON = await AsyncStorage.getItem('userData');
            if (userDataJSON !== null) {
            const userData = JSON.parse(userDataJSON);
            }
        } catch (error) {
            throw new Error("Error getting from cache");
        }
    };
    //Use the buttons to redirect to the wanted screen, for the chatrooms I pass along a document id to read so it can read different ones depending on which one the user has selected
    handleGoToGeneralChatroom=()=>{
        this.props.navigation.navigate('Chatrooms', this.state.generalChatRoomId);
    }
    
    handleGoToChatRoom1=()=>{
        this.props.navigation.navigate('Chatrooms', this.state.chatRoom1Id);
    }

    handleGoToUserProfile=()=>{
        this.props.navigation.navigate('UserScreen');
    }
    
    handleSignOut=()=>{
        firebase.auth().signOut();
        this.props.navigation.navigate('SignInScreen');
    }

    render(){
        return(
            <View style={styles.container}>
                <Text styles={styles.textbox}>Welcome {userData.name}!</Text>
                <Text styles={styles.textbox}>The latest chess news here! Check it out!</Text>
                <NewsCard newsItem={this.state.newsInfo}/>
                <View style={styles.containerRow}>
                    <View style={styles.containerBorder}>
                        <Text styles={styles.textbox}>General Chatroom</Text>
                        <Button styles={styles.button} onPress={this.handleGoToGeneralChatroom}/>
                    </View>
                    <View style={styles.containerBorder}>
                        <Text styles={styles.textbox}>ChatRoom1</Text>
                        <Button styles={styles.button} onPress={this.handleGoToChatRoom1}/>
                    </View>
                </View>
                <View style={styles.containerRow}>
                    <Text styles={styles.textbox}>User profile</Text>
                    <Button styles={styles.button} onPress={this.handleGoToUserProfile}/>
                </View>
                <View>
                    <Button styles={styles.button} title='Sign out' onPress={this.handleSignOut}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    textbox:{
        alignItems:center,
        justifyContent:center,
        borderRadius:18,
        padding:5,
        margin:2,
        fontWeight:bold
    },
    button: {
        backgroundColor: '#3498db',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 6,
        alignSelf: 'center',
        marginVertical: 10,
        borderWidth:3
    },
    textinput:{
        alignItems:center,
        justifyContent:center,
        borderRadius:18,
        backgroundColor:'gray',
        padding:10,
        margine:5
    },
    containerRow:{
        justifyContent:'center',
        alignItems:'center',
        flex:2
    },
    containerBorder:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:2
    }
})
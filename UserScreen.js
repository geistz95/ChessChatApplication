import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const UserProfile = () => {
  const [user, setUser] = useState(null);
  //holds persistent data from firebase
  const {email} = this.props.route.params; 
  const userData={
    userEmailInfo:this.props.email,
    userName:"",
    profileUrl:"",
    player_id:0,
    status:"",
    name:"",
    location:"",
    fide:0
  }
  //holds the fetchdata
  const fetchData={
    userName:"",
    profileUrl:"",
    player_id:0,
    status:"",
    name:"",
    location:"",
    fide:0
  }
  //this function fetches the user information saved inside firebase database
  constGetUser=async (userId) =>{
    try{
        const savedInfo=firebase.firestore().collections('users').doc(userId);
        const docSnapshot = await userDocRef.get();
        if(docSnapshot.exists){
            userData=docSnapshot.data();
        }else{
            console.log('No user data exists for user ' + userId);
        }
    }
    catch(error){
        console.error('Error fetching data from google');
    }
    //this piece of code will store the user info as a Json, so it is cached and can be accessed by any page in the app
    try {
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        console.log('User data stored successfully');
      } catch (error) {
        console.error('Error storing user data:', error);
      }
}

  useEffect(() => {
    // Check if a user is currently signed in
    const unsubscribe = firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        // User is signed in
        setUser(currentUser);
      } else {
        // No user is signed in
        setUser(null);
      }
    });

    return () => {
      // Unsubscribe the auth listener on component unmount
      unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
      // Redirect user to the sign-in screen or another appropriate screen after signing out
    } catch (error) {
      // Handle sign-out errors
      console.error(error);
    }
  };

  const handleUpdateInfo = ()=>{
    fetch('https://api.chess.com/pub/player/${userName}')
    .then(response=>{
        if(!response.ok){
            throw new Error('Network response failed');
        }
        return response.json();
    })
    .then(data=>{
        if(data && Object.keys(data).length !== 0) {
            // Extract specific fields from the data
            //I'm not completely sure if I am able to ignore extra data 
            //like in springboot like this.
            fetchData=data;
            userData.location=fetchData.location;
            userData.name=fetchData.name;
            userData.player_id=fetchData.player_id;
            userData.profileUrl=fetchData.profileUrl;
            userData.userName=fetchData.userName;
            userData.fide=fetchData.fide;
        }else{
            throw new Error('Data cannot be read properly')
        }
    })
    .catch(error=>{
        //handles any error that is thrown
        console.error(error);
    })
  }
  
  const handleBackToChatrooms =()=>{
    this.props.navigation.navigate("UserHome");
  }

  const handleBackToHomeScreen=()=>{
    this.props.navigation.navigate("Home");
  }


  return (
    //The user ? ternary checks if there is a user signed in or not
    <View>
      <Text>User Profile</Text>
      {user ? (
        //This displays the user information gotten from chess.com
        //The update username/enter username is very sloppily thrown in here, I was running out of time but I could have made another component/screen to deal with the logic of this
        <View>
          <Text style = {styles.textbox}>Hi {userData.name} !</Text>
          <Text style = {styles.textbox}>Profile </Text>
          <Text style = {styles.textbox}>Location : {userData.location}</Text>
          <Text style = {styles.textbox}>Status : {userData.status}</Text>
          <Text style = {styles.textbox}>FIDE Rating : {userData.fide}</Text>
          <Text style = {styles.textbox}>Your Chess.Com Profile Link : {userData.profileUrl}</Text>
          <TextInput>placeHolder = "Enter your username" value={userData.userName}</TextInput>
          <View>
            <Button style={styles.button} onClick={handleBackToHomeScreen}>Home</Button>
            <Button style={styles.button} onClick={handleBackToChatrooms}> Go to Chatrooms </Button>
            <TextInput>placeHolder = "Enter your username" value={userData.userName}</TextInput>
            <Button style={styles.button} onClick={handleUpdateInfo}>Edit Account Info</Button>
            <Button style={styles.button} onClick={handleSignOut}>Sign Out</Button>
          </View>
        </View>
      ) : (
        <View>No user signed in</View>
      )}
    </View>
  );
};

export default UserProfile;

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
    },
    textinput:{
        alignItems:center,
        justifyContent:center,
        borderRadius:18,
        backgroundColor:'gray',
        padding:10,
        margine:5
    }
})
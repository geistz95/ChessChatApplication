
import './App.css';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native'; 
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/auth'; 

export default class SignInScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '', 
            password: '' 
            //this stores the user's information
        };
    }
    //This function uses the boxes filled out by the user to 
    handleSignIn = () => {
        const { email, password } = this.state; 
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                this.props.navigation.navigate('UserHome');
            }).catch(error => {
                console.log(error);
                //handles sign in errors
            });
        }
    // This function uses the boxes filled out by the user to make an account
    handleSignUp = () => {
        const { email, password } = this.state; 
        firebase.auth().createUserWithEmailAndPassword(email,password)
            .then (()=>{
                this.props.navigation.navigate("UserHome");
            })
            .catch(error=>{
                console.log(error);
                //handles sign up errors
            })
    }

    //This functions handles the sign in token through google
    handleSignInWithGoogle = async () => {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            const result = await firebase.auth().signInWithPopup(provider);
            const user = result.user;
        
            if (user && user.email) {
              // Access the user's email address
              const userEmail = user.email;
              console.log('User Email:', {email:userEmail});
        
              // Continue with navigation or other actions
              this.props.navigation.navigate('UserHome');
            } else {
              console.error('User email not available');
              // Handle scenario where user email is not available
            }
          } catch (error) {
            console.error('Google sign-in error:', error);
            // Handle Google sign-in errors 
          }
      }

    render(){
        return(
            <View style={styles.container}>
                <TextInput>
                    style={}
                    placeHolder="Input Email"
                    value={this.state.password}
                    onChangeText={email => this.setState({email})}
                </TextInput>
                <TextInput style={styles.inputBox}>
                    style={}
                    placeholder="Password"
                    secureTextEntry
                    value={this.state.password}
                    onChangeText={password=>this.setState({password})}
                </TextInput>
                <View style={styles.buttonView}>
                    <Button style={styles.button}>
                        title="Login"
                        onPress={this.handleSignIn}
                    </Button>
                    <Button style={styles.button}>
                        title="Sign Up"
                        onPress={this.handleSignUp}
                    </Button>
                    <Button style={styles.button}>
                        title="Sign in with Google"
                        onPress={this.handleSignInWithGoogle}
                    </Button>
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
    inputBox:{
        height: 40,
        marginBottom: 10,
        padding: 10,
        borderWidth:1
    },
    button:{
        alignContent:'center',
        borderRadius:18,
        width:200,
        height:125,
        backgroundColor:'gray'
    },
    buttonView:{
        flex:2,
        justifyContent:'center',
        alignItems:'center'
    }
})
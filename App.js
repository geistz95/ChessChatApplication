import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {firebaseConfig} from './firebaseConfig';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

export default function ChatApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Sign-In" component={SignInScreen}/>
        <Stack.Screen name="Home" componenet={HomeScreen}/>
        <Stack.Screen name="UserScreen" component={UserProfile} />
        <Stack.Screen name="Chatrooms" component={ChatRoomScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
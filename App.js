import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen } from './src/screens'
//Below: google Auth related imports;
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from "firebase/auth";
import { auth } from "./firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";


WebBrowser.maybeCompleteAuthSession(); //capture when the user initiates sign-in, and redirect to modal browser screen within the app.
const Stack = createStackNavigator();

export default function App() {
  //google sign in
  const [userInfo, setUserInfo] = useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: '956198339505-25itce7d2n0fmhcqv9s540obeqr75dim.apps.googleusercontent.com',
    androidClientId: '956198339505-7g5bm1jt4vvd714f9921nc809llpvd2o.apps.googleusercontent.com',
  });

  //if Google.useAuthRequest response === success --> extract id_token --> create a GoogleAuthProvider credential --> sign in through Firebase Auth (signInWithCredential)
  useEffect(()=>{
    if(response?.type == "success"){
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response])

// If user is authenticated --> update userInfo state var --> unsubscribe the auth listener (performance)
  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, async(user)=>{
      if(user){
        console.log(JSON.stringify(user, null, 2))
        setUserInfo(user);
      } else {
        console.log("not authenticated")
      }
    });
    return() => unsub(); //unmount after sign-in attempt
  }, []);

  return userInfo ? <HomeScreen /> : <LoginScreen promptAsync={promptAsync} />
}
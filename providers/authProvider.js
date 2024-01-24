import { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-auth-session/providers/google';
// import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from 'firebase/auth';
import { auth } from '../firebaseConfig';

// WebBrowser.maybeCompleteAuthSession();
const AuthContext = createContext();

function AuthProvider({ children }) {
  //-- Capture authenticated user
  const [userInfo, setUserInfo] = useState();



  //-- Check async storage for auth key on app load
  const checkLocalStorage = async () => {
    try{
      const userJSON = await AsyncStorage.getItem("@userKey");
      const userData = userJSON ? JSON.parse(userJSON) : null;
      setUserInfo(userData);
    } catch(e){
      console.warn("error accessing local storage", e.message)
    }
  };


  //-- Sign out from App (remove user state and clear async storage)
  const signOutUser = async () => {
    try{
    await AsyncStorage.removeItem("@userKey");
    setUserInfo(null)
    } catch(e){
      console.log("error signing out", e.message)
    }
  }


  //-- Initiate google auth with Google.useAuthRequest()
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: '956198339505-25itce7d2n0fmhcqv9s540obeqr75dim.apps.googleusercontent.com',
    androidClientId: '956198339505-7g5bm1jt4vvd714f9921nc809llpvd2o.apps.googleusercontent.com',
  });


  //-- Triggered when google response obj changes during authentication process (Google Sign in)
  useEffect(() => {
    checkLocalStorage();
    if (response?.type === 'success') { //if Google.useAuthRequest == success
      const { id_token } = response.params; //extract user id_token
      const credential = GoogleAuthProvider.credential(id_token); //generate googleAuth credential
      signInWithCredential(auth, credential); //sign in through firebase auth
    }
  }, [response]);


  //-- Set up auth state change listener to listen for sign-in/sign-out (Triggered once)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserInfo(user); //update state var
        await AsyncStorage.setItem('@userKey', JSON.stringify(user)); //Set userKey in local storage
        console.log("user set in storage");
      } else {
        console.log('not authenticated');
      }
    });
    return () => unsub(); // unmount after sign-in attempt
  }, []);



  //**** Email/Password Auth ****
  //-- TODO: Migrate from login/register screen

  return <AuthContext.Provider value={{ userInfo, promptAsync, setUserInfo, signOutUser }}>{children}</AuthContext.Provider>;
}


function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('Not inside the Provider');
  return context;
}

export { AuthContext, AuthProvider, useAuth };


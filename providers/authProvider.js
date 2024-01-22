import { createContext, useState, useContext, useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google';
// import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from 'firebase/auth';
import { auth } from '../firebaseConfig';

// WebBrowser.maybeCompleteAuthSession();
const AuthContext = createContext();

function AuthProvider({ children }) {
  //-- Capture authenticated user
  const [userInfo, setUserInfo] = useState();

  //-- Initiate google auth with Google.useAuthRequest()
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: '956198339505-25itce7d2n0fmhcqv9s540obeqr75dim.apps.googleusercontent.com',
    androidClientId: '956198339505-7g5bm1jt4vvd714f9921nc809llpvd2o.apps.googleusercontent.com',
  });


  //-- Triggered when google response obj changes during authentication process (Google Sign in)
  useEffect(() => {
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
        setUserInfo(user);
      } else {
        console.log('not authenticated');
      }
    });
    return () => unsub(); // unmount after sign-in attempt
  }, []);



  //**** Email/Password Auth ****
  //-- 

  return <AuthContext.Provider value={{ userInfo, promptAsync, setUserInfo }}>{children}</AuthContext.Provider>;
}


function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('Not inside the Provider');
  return context;
}

export { AuthContext, AuthProvider, useAuth };


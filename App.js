import 'react-native-gesture-handler';
import React from 'react';
import { View } from 'react-native';
import { LoginScreen, HomeScreen } from './src/screens';
// import * as WebBrowser from 'expo-web-browser';
import { AuthProvider, useAuth } from './providers/authProvider';


// WebBrowser.maybeCompleteAuthSession();

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

//Conditional app entry point 
function AppContent() {
  const { userInfo } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {userInfo ? <HomeScreen /> : <LoginScreen />}
    </View>
  );
}
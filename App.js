import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { View } from 'react-native';
import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens';
// import * as WebBrowser from 'expo-web-browser';
import { AuthProvider, useAuth } from './providers/authProvider';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'


const Stack = createStackNavigator();
// WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [user, setUser] = useState(null) //for manual entry

  return(
    <NavigationContainer>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </NavigationContainer>
  );
}

//Conditional app entry point 
function AppContent() {
  const { userInfo } = useAuth();

  return (
      <Stack.Navigator>
        { userInfo ? (
          <Stack.Screen name="Home" component={HomeScreen}/> 
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
  );
}
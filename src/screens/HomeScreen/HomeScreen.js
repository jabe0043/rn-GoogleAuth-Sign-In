import React from 'react'
import { Text, View, SafeAreaView, Pressable } from 'react-native'
import { AuthProvider, useAuth } from '../../../providers/authProvider';

// User Sign out
import { auth } from '../../../firebaseConfig'; //reference to my apps auth service 
import { signOut } from "firebase/auth"; 

export default function HomeScreen({ navigation }) {
    const { userInfo, promptAsync, setUserInfo } = useAuth();

    if(userInfo){
        console.log('user authenticated:', JSON.stringify({
            //replace with userInfo to see all obj properties
            displayName: userInfo.displayName,
            email: userInfo.email,
            uid: userInfo.uid
        }, null, 2));
    }
    
    return (
        <SafeAreaView>
            <Text style={{color: "red"}}>Home Screen</Text>
            <Pressable
                onPress={() => {
                    signOut(auth)
                    .then(() => {
                        setUserInfo(null)
                    })
                    .catch((error) => {console.log("Error signing out", error)});                
                }}
            >
                <Text>Log Out</Text>
            </Pressable>
        </SafeAreaView>
    )
}


import React from 'react'
import { Text, View, SafeAreaView } from 'react-native'
import { AuthProvider, useAuth } from '../../../providers/authProvider';


export default function HomeScreen() {
    const { userInfo, promptAsync } = useAuth();

    console.log('USER SIGNED IN:', JSON.stringify({
        //replace with userInfo for all obj properties
        displayName: userInfo.displayName,
        email: userInfo.email,
        uid: userInfo.uid
    }, null, 2));
    
    return (
        <SafeAreaView>
            <Text style={{color: "red"}}>Home Screen</Text>
        </SafeAreaView>
    )
}


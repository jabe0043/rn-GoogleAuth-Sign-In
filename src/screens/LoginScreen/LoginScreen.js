import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { AuthProvider, useAuth } from '../../../providers/authProvider';

// Firebase email/password auth (manual sign in -- move to authProvider.js)
import { auth } from '../../../firebaseConfig'; //reference to my apps auth service 
import { signInWithEmailAndPassword } from "firebase/auth"; 


export default function LoginScreen({ navigation }) { 
    //-- Google sign in
    const { userInfo, promptAsync } = useAuth();

    //-- Manual sign in state vars
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //-- Sign in with email/password
    const onLoginPress = () => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("USER SIGN IN:", user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.warn(errorCode, errorMessage);
        });
    }

    //-- Navigate to registration page
    const onFooterLinkPress = () => {
        navigation.navigate('Register')
    }

    return (
        <SafeAreaView style={styles.container}>
                <KeyboardAwareScrollView style={{ flex: 1, width: '100%' }} keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/icon.png')}
                />

                {/* Manual Sign in */}
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>


                {/* Google Sign in */}
                <View >
                    <TouchableOpacity 
                        style={[styles.button, styles.googleBtn]}
                        onPress={() => promptAsync()} 
                    >
                        <Text style={styles.buttonTitle}>Sign in with Google</Text>
                    </TouchableOpacity>
                </View>

                </KeyboardAwareScrollView>
        </SafeAreaView>
    )    
}
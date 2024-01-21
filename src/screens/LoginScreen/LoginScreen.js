import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';

export default function LoginScreen({ navigation, promptAsync }) { 

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonContainer}>
                <KeyboardAwareScrollView
                    style={{ flex: 1, width: '100%' }}
                    keyboardShouldPersistTaps="always">
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => promptAsync()} 
                    >
                        <Text style={styles.buttonTitle}>Sign in with Google</Text>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>
            </View>
        </SafeAreaView>
    )    
}
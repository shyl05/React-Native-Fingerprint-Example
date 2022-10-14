/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button, useTheme} from 'react-native-paper';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

const About = () =>{

    const theme = useTheme();

    const rnBiometrics = new ReactNativeBiometrics();

    useEffect(()=>{
        rnBiometrics.isSensorAvailable()
        .then((resultObject) => {
            const { available, biometryType } = resultObject;

            if (available && biometryType === BiometryTypes.TouchID) {
                console.log('TouchID is supported');
            } else if (available && biometryType === BiometryTypes.FaceID) {
                console.log('FaceID is supported');
            } else if (available && biometryType === BiometryTypes.Biometrics) {
                console.log('Biometrics is supported');
            } else {
                console.log('Biometrics not supported');
            }
        });
    },[]);

    const checkKeys  = () =>{
        rnBiometrics.biometricKeysExist()
        .then((resultObject) => {
        const { keysExist } = resultObject;

        if (keysExist) {
            console.log('Keys exist');
        } else {
            console.log('Keys do not exist or were deleted');
            createKeys();
        }
        });
    };

    const createKeys = () =>{
        rnBiometrics.createKeys()
        .then((resultObject) => {
            const { publicKey } = resultObject;
            console.log(publicKey);
            promptFingerprint();
        });
    };

    const promptFingerprint = () =>{
        let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString();
        let payload = epochTimeSeconds + 'some message';

        rnBiometrics.createSignature({
            promptMessage: 'Sign in',
            payload: payload,
        })
        .then((resultObject) => {
            const { success, signature } = resultObject;
            if (success) {
                console.log(signature);
            }
        });
    };


    return (
        <View style={styles.HomeContainer}>
            <Button style={styles.biometBtn} color={theme.colors.background} icon="fingerprint" mode="contained" onPress={checkKeys}>
                Biometric
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    HomeContainer:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    biometBtn:{
        backgroundColor: '#d6d61c',
    },
})

export default About;

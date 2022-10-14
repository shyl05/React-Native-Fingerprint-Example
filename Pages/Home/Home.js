/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme,Text, Button, Portal, Dialog, Paragraph} from 'react-native-paper';
import TouchID from 'react-native-touch-id';

const Home = () =>{

    const theme = useTheme();

    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const [biometricType, setBiometricType] = React.useState();

    useEffect(()=>{
        TouchID.isSupported()
        .then(type => setBiometricType(type));
    },[]);

    const clickHandler = () => {
        TouchID.isSupported()
        .then(authenticate)
        .catch(error => {
            console.log('TouchID not supported');
        });
    };

    function authenticate() {
        return TouchID.authenticate()
        .then(success => {
            console.log('Authenticated Successfully');
            showDialog();
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <View style={styles.HomeContainer}>
            <Text style={styles.Heading}>Home {biometricType}</Text>
            <Button style={styles.biometBtn} color={theme.colors.background} icon="fingerprint" mode="contained" onPress={clickHandler}>
                Biometric
            </Button>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Alert</Dialog.Title>
                    <Dialog.Content>
                    <Paragraph>This is simple dialog</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                    <Button onPress={hideDialog}>Done</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
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
    Heading: {
        height: 30,
        fontSize: 20,
        margin: 20,
    },
    biometBtn:{
        backgroundColor: '#d6d61c',
    },
});

export default Home;

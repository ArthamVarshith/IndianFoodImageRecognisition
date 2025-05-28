import React, {useEffect} from 'react'
import {StyleSheet, View, Text, Image} from 'react-native'

const SplashScreen = ({navigation}) => {

    useEffect(() => {
        const timer=setTimeout(() => {
            navigation.replace('IntroScreen');
        },2000)

        return () => clearTimeout(timer);
    },[navigation]);

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../assets/Logo.png')}/>
            <Image style={styles.text} source={require('../assets/Group.png')}/>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FCFCD7",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        position: "absolute"
    },
    text: {
        marginTop: 40
    }
})
import React from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'

const IntroScreen = ({navigation}) => {

    return (
        <View style={styles.container}>
            <Image style={styles.intro_image}source={require('../assets/Intro_Image.png')}/>
            <Text style={styles.theme}>Snap, Tap, and Map your Dish</Text>
            <Text style={styles.text}>Effortlessly identify and learn about your favorite Indian 
                dishes with just a snap. Dive into a world of delicious flavors, 
                detailed descriptions, and nutritional insights.</Text>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('HomeScreen')}>
                <Text style={styles.buttonText}>Explore</Text>
            </TouchableOpacity>
        </View>
    )
}

export default IntroScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FCFCD7',
        flex:1
    },
    intro_image: {
        position: 'absolute',
        width: 300,
        height: 300,
        alignSelf: 'center',
        marginTop: 50
    },
    theme: {
        fontFamily: "LatoBold",
        fontSize: 24,
        alignSelf: 'center',
        marginTop: 370
    },
    text: {
        alignSelf: 'center',
        marginTop: 20,
        fontSize: 16,
        fontFamily: 'MonRegular',
        marginLeft: 20,
        marginRight: 20,
        textAlign: 'center'
    },
    button: {
        backgroundColor: "#DC143C",
        alignSelf: 'center',
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 20,
        marginTop: 30,
        borderColor: '#FFD700',
        borderWidth: 1,
    },
    buttonText: {
        color: '#F5F5F5',
        fontFamily: 'MonRegular',
        fontSize: 18
    }
})
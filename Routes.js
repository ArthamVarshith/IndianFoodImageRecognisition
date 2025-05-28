import React from "react";
import { View,Text} from "react-native";
import {createStackNavigator} from '@react-navigation/stack'
import SplashScreen from "../Screens/SplashScreen";
import IntroScreen from "../Screens/IntroScreen";
import HomeScreen from "../Screens/HomeScreen"
import ResultScreen from "../Screens/ResultScreen"

const Routes = () => {

    const Stack = createStackNavigator();

    return(
        <Stack.Navigator>
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}}/>
            <Stack.Screen name="IntroScreen" component={IntroScreen} options={{headerShown: false}}/>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name="ResultScreen" component={ResultScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

export default Routes
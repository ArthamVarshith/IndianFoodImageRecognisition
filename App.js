import { StyleSheet,View,TouchableOpacity,Image,TextInput,Button } from 'react-native';
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import * as Font from "expo-font";
import Routes from './Route/Routes';
import { NavigationContainer } from '@react-navigation/native';

let customFonts = {
  LatoBold: require('./assets/Fonts/Lato-Bold.ttf'),
  LatoBlack: require('./assets/Fonts/Lato-Black.ttf'),
  LatoRegular: require('./assets/Fonts/Lato-Regular.ttf'),
  MonBold: require('./assets/Fonts/static/Montserrat-Black.ttf'),
  MonRegular: require('./assets/Fonts/static/Montserrat-Regular.ttf'),
  MonMedium: require('./assets/Fonts/static/Montserrat-Medium.ttf')
};

export default class App extends React.Component {
  state= {
    fontsLoaded: false,
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    if (!this.state.fontsLoaded) {
      return null;
    }

    return (
      <NavigationContainer>
        <Routes/>
      </NavigationContainer>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

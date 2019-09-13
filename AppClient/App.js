import React from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View,Dimensions,I18nManager} from 'react-native';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import reducers from './src/reducers/reducers'
import  ReduxThunk from 'redux-thunk';
import {AppLoading,Updates } from "expo";
import * as  Font from "expo-font";
import deviceStorage from './src/Services/deviceStorage'
import { createRootNavigator } from "./router";
import {LOGIN_SUCCESS} from "./src/Components/actions/types";
import Spinner from "./src/Components/common/Spinner";
import NetworkError from "./src/Components/common/NetworkError";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      appready: false,
      data: null,
      user: null,
      error: null,
      signedIn: false
    };
    this.loadJWT = deviceStorage.loadJWT.bind(this);
  }
  loadfonts = async ()=>{
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    await this.loadJWT();
  }

  mixFunction=()=>{
    this.setState({error: null});
    this.loadJWT();
  };
  render() {
    console.log(I18nManager.isRTL);
    if (!this.state.appready) {
      return (
          <AppLoading startAsync={this.loadfonts} onFinish={() => {
            this.setState({appready: true},()=>{
                  I18nManager.forceRTL(true);


            }
            )}}/>
      )
    } else {
      const Layout = createRootNavigator(this.state.signedIn);
      const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
      if (this.state.user) {
        store.dispatch({
          type: LOGIN_SUCCESS,
          payload: this.state.user
        });
      }
      return (
          <Provider store={store}>
            {this.state.error && <NetworkError error={this.state.error}/>}
            {!this.state.error && <Layout data={this.state.data} user={this.state.user}/>}
          </Provider>
      );
      if (this.state.error) {
        return <View style={styles.loading}>
          <TouchableOpacity onPress={() => {
            this.mixFunction()
          }}>
            <Text>{this.state.error}</Text>
          </TouchableOpacity>
        </View>

      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
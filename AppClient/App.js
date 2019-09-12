import React from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View,Dimensions} from 'react-native';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import reducers from './src/reducers/reducers'
import {YellowBox} from 'react-native';
import  ReduxThunk from 'redux-thunk';
import * as  Font  from "expo-font";
import deviceStorage from './src/Services/deviceStorage'
import { createRootNavigator } from "./router";
import {LOGIN_SUCCESS} from "./src/Components/actions/types";

YellowBox.ignoreWarnings([
  'Remote debugger',
  console.disableYellowBox = true
])
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      loading: false,
      user: null,
      error: null,
      signedIn: false
    };
    this.loadJWT = deviceStorage.loadJWT.bind(this);
    this.loadJWT();

  }
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });

  }
  mixFunction=()=>{
    this.setState({error: null});
    this.loadJWT();
  };
  render() {
    const Layout = createRootNavigator(this.state.signedIn);
    if (this.state.loading) {
      const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
      if(this.state.user){
        store.dispatch({
          type:LOGIN_SUCCESS,
          payload: this.state.user
        })
      }
      return (
          <Provider store={store}>
            <Layout data={this.state.data} user ={this.state.user}/>
          </Provider>
      );
    }
    else{
      if(this.state.error){
        return <View style={styles.loading}>
          <TouchableOpacity onPress={() => {this.mixFunction()}}>
            <Text>{this.state.error}</Text>
          </TouchableOpacity>
        </View>
      }

      else {
        return <View style={styles.loading}>
          <ActivityIndicator size="large" color="#000"/>
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
  loading:{
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: ((Dimensions.get('window').height)/4)*3
  }
});
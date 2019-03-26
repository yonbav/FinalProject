import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import reducers from './src/reducers/reducers'
import {YellowBox} from 'react-native';
import  ReduxThunk from 'redux-thunk';
import RouterComp from "./src/RouterComp";
import { Font, AppLoading } from "expo";
import deviceStorage from './src/Services/deviceStorage'

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
      user: null
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

  render() {
    if (this.state.loading) {
      if (this.state.data) {
        return (
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
              <RouterComp token="1" user ={this.state.user}/>
            </Provider>
        );
      } else {
        return (
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
              <RouterComp token="0"/>
            </Provider>
        );
      }
    }
    else{
      return <Text>'Loading...'</Text>
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

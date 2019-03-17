import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import reducers from './src/reducers/reducers'
import {YellowBox} from 'react-native';
import  ReduxThunk from 'redux-thunk';
import RouterComp from "./src/RouterComp";
import { Font, AppLoading } from "expo";


YellowBox.ignoreWarnings([
  'Remote debugger',
  console.disableYellowBox = true
])
export default class App extends React.Component {
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
  }
  render() {
    return (
        <Provider store={createStore(reducers,{},applyMiddleware(ReduxThunk))}>
          <RouterComp />
        </Provider>
    );
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

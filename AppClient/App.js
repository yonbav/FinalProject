import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
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

        return (
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
              <RouterComp data={this.state.data} user ={this.state.user}/>
            </Provider>
        );
    }
    else{
      return <View style={styles.loading}>
        <ActivityIndicator size="large" color="#000" />
      </View>
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
    paddingTop: 550
  }
});

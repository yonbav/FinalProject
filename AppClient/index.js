/** @format **/

import {AppRegistry, Text, View} from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import reducers from './src/reducers/reducers'
import {YellowBox} from 'react-native';
import  ReduxThunk from 'redux-thunk';
import RouterComp from "./src/RouterComp";

const App = () => (
    <Provider store={createStore(reducers,{},applyMiddleware(ReduxThunk))}>
        <RouterComp />
    </Provider>

);


AppRegistry.registerComponent('AppClient', () => App);

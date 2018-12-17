/** @format */

import {AppRegistry, Text, View} from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import reducers from './src/reducers/reducers'
import {YellowBox} from 'react-native';
import LoginForm from "./src/Components/LoginForm";
import  ReduxThunk from 'redux-thunk';
YellowBox.ignoreWarnings([
    'Remote debugger',
])

const App = () => (
    <Provider store={createStore(reducers,{},applyMiddleware(ReduxThunk))}>
        <LoginForm />
    </Provider>
);

AppRegistry.registerComponent('FP', () => App);

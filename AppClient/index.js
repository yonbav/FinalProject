/** @format */

import {AppRegistry, Text, View} from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import reducers from './src/reducers/reducers'
import LoginForm from './src/Components/LoginForm'
import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings([
    'Remote debugger',
])

const App = () => (
    <Provider store={createStore(reducers)}>
        <LoginForm/>
    </Provider>
);

AppRegistry.registerComponent('FP', () => App);

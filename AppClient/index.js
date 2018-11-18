/** @format */

import {AppRegistry, Text,View } from 'react-native';
import React from 'react';
import Header from './src/Components/Header/Header.js'
import Album from './src/Components/Album/Album.js'


const App = () => (
<View>
<Header name='d'/>
<Album/>
</View>
);

AppRegistry.registerComponent('aaa', () => App);

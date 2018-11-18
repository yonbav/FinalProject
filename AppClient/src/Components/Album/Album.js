

import { Text, View} from 'react-native';
import React,{Component} from 'react';

import axios from '../../../axios';

class Album extends Component{
state = {album: []}
componentWillMount(){
axios.get('https://rallycoding.herokuapp.com/api/music_albums').then(response => this.setState({album:response.data}) );

}

renderalbum () {
return this.state.album.map(album => <Text key={album.id}> {album.title} </Text>);
}

render(){

 return (
 <View>
{this.renderalbum()}
   </View>
 );

}
}

export default Album;
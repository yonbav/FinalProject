

import { Text, View,ScrollView} from 'react-native';
import React,{Component} from 'react';
import  AlbumDet from './AlbumDet';
import axios from '../../../axios';

class Album extends Component{
state = {album: []
}
componentWillMount(){
axios.get('https://rallycoding.herokuapp.com/api/music_albums').then(response => this.setState({album:response.data}) );

}

renderalbum () {
return this.state.album.map(album =>
    <AlbumDet key={album.title} album = {album} />);
}

render(){

 return (
     <ScrollView>
        {this.renderalbum()}
     </ScrollView>
 );

}
}

export default Album;
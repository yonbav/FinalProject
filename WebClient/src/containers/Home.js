import React, { Component } from 'react';
import LoginForm from '../components/LoginForm'
import YouTube from 'react-youtube';

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {}
    }

    
    componentDidMount() {
        window.scroll(0,0);
    }

    render() {
        const opts = {
          height: '390',
          width: '640',
          playerVars: {
            autoplay: 1
          }
        };

        return (
            <div id="home">
                <LoginForm />
                <div style={{display:"flex", justifyContent:"center"}}>
                    <YouTube
                        videoId="_9QSx85H_Z8"
                        opts={opts}
                        onReady={this._onReady}
                    />                    
                </div>
            </div>
        )
    }
}

export default Home;

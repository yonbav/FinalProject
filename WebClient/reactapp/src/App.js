import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import configureStore from './store/configureStore';
import './sass/app.scss';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import RouteApp from './containers/RouteApp'

library.add(fab, fas);
export const store = configureStore ();

class App extends Component {
    
    constructor(props){
        super(props);
        this.state = {};
    }

    render() {
        return (
        <div id="app-container">
            <Provider store={store}>
                <Router>
                    <Route path="/" component={RouteApp} />
                </Router>
            </Provider>
        </div>
        );
    }
}

export default App;

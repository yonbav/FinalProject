import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Switch} from 'react-router-dom';

import { NotificationContainer, NotificationManager } from 'react-notifications';
import Header from '../components/Header'
import ImageSlider from '../components/ImageSlider'
import Splash from '../components/Splash'

import {
    hideMessage,
    showFullLoader,
    hideFullLoader,
} from '../store/actions';

import Home from './Home';

import AddUser from './Users/AddUser';
import EditUser from './Users/EditUser';
import UsersList from './Users/UsersList';
import LoadUsersExcel from './Users/LoadUsersExcel';

import AddImportantMessage from './ImportantMessages/AddImportantMessage';
import EditImportantMessage from './ImportantMessages/EditImportantMessage';
import ImportantMessagesList from './ImportantMessages/ImportantMessagesList';

import AddDailyBriefing from './DailyBriefings/AddDailyBriefing';
import EditDailyBriefing from './DailyBriefings/EditDailyBriefing';
import DailyBriefingsList from './DailyBriefings/DailyBriefingsList';

import ImportantInfoList from './ImportantInfo/ImportantInfoList';
import EditImportantInfo from './ImportantInfo/EditImportantInfo';

import MessageReadByList from './ReadBy/MessageReadByList';
import BriefingReadByList from './ReadBy/BriefingReadByList';

class RouterApp extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    componentWillMount(){
        
    }

    componentDidMount(){
    }

    componentDidUpdate () {
        
    }

    componentWillReceiveProps(newProps){
        if (newProps.message && newProps.message.isShowMsg) {
            this.props.hideMessage ();
        }
        if (!this.props.clientsData && newProps.clientsData){
            this.props.hideFullLoader();
        }
    }

    render() {

        const { message } = this.props;

        return (            
            <div>
                <div id="app-main">
                    <Splash/>
                    <Header/>
                    <ImageSlider/>
                    <main id="app-content">
                        <Switch>
                            <Route exact path="/" component={Home}/>
                        </Switch>
                        <Switch>
                            <Route exact path="/Users" component={UsersList}/>
                            <Route exact path="/Users/UsersList" component={UsersList}/>
                            <Route exact path="/Users/AddUser" component={AddUser}/>
                            <Route exact path="/Users/EditUser/:id" component={EditUser}/>
                            <Route exact path="/Users/LoadUsersExcel" component={LoadUsersExcel}/>
                        </Switch>
                        <Switch>
                            <Route exact path="/DailyBriefings" component={DailyBriefingsList}/>
                            <Route exact path="/DailyBriefings/AddDailyBriefing" component={AddDailyBriefing}/>
                            <Route exact path="/DailyBriefings/EditDailyBriefing/:id" component={EditDailyBriefing}/>
                            <Route exact path="/DailyBriefings/DailyBriefingsList" component={DailyBriefingsList}/>
                        </Switch>
                        <Switch>
                            <Route exact path="/ImportantMessages" component={ImportantMessagesList}/>
                            <Route exact path="/ImportantMessages/AddImportantMessage" component={AddImportantMessage}/>
                            <Route exact path="/ImportantMessages/EditImportantMessage/:id" component={EditImportantMessage}/>
                            <Route exact path="/ImportantMessages/ImportantMessagesList" component={ImportantMessagesList}/>
                        </Switch>
                        <Switch>
                            <Route exact path="/ImportantInfo" component={ImportantInfoList}/>
                            <Route exact path="/ImportantInfo/ImportantInfoList" component={ImportantInfoList}/>
                            <Route exact path="/ImportantInfo/EditImportantInfo/:id" component={EditImportantInfo}/>
                        </Switch>
                        <Switch>
                            <Route exact path="/readby/ImportantMessage/:id" component={MessageReadByList}/>
                            <Route exact path="/readby/DailyBriefing/:id" component={BriefingReadByList}/>
                        </Switch>
                    </main>
                    {message && message.isShowMsg && message.data.type === 'error' && NotificationManager.error (message.data.msg, 'Error')}
                    {message && message.isShowMsg && message.data.type === 'success' && NotificationManager.success (message.data.msg, 'Success')}
                    {message && message.isShowMsg && message.data.type === 'warning' && NotificationManager.warning (message.data.msg, 'Warning')}
                    <NotificationContainer />
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    const { message} = state.ui;
    return {message}
};
export default withRouter(connect(mapStateToProps, {
    hideMessage,
    showFullLoader,
    hideFullLoader,
})(RouterApp));
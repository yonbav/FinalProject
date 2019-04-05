import React from 'react';
import {withRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Header from '../components/Header'
import StatusBar from '../components/StatusBar'
import ImageSlider from '../components/ImageSlider'
import Splash from '../components/Splash'
import {
    hideMessage,
    showFullLoader,
    hideFullLoader,
    getAllClient,
    logDisplayProperties,
    getBusinessDay,
    getStoreStatus,
    getEmployeeCount,
    getOpenHours,
    getVersion,
    getStoreName,
} from '../store/actions';
import Monitor from './Monitor';

class RouterApp extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    componentWillMount(){
        
    }

    componentDidMount(){
        if (!this.props.clientsData){
            this.props.showFullLoader('Loading data...');
            this.props.getAllClient();
        }
        setInterval(()=>{
            this.props.getAllClient();
        }, 10000);
        this.props.logDisplayProperties();
        this.props.getBusinessDay();
        this.props.getStoreStatus();
        this.props.getOpenHours();
        this.props.getEmployeeCount();
        this.props.getVersion();
        this.props.getStoreName();
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
                    <ImageSlider />
                    <main id="app-content">
                        <Switch>
                            <Route exact path="/" component={Monitor}/>
                        </Switch>
                    </main>
                    <StatusBar/>
                    {message && message.isShowMsg && message.data.type === 'error' && NotificationManager.error (message.data.msg, 'Error')}
                    {message && message.isShowMsg && message.data.type === 'success' && NotificationManager.success (message.data.msg, 'Success')}
                    {message && message.isShowMsg && message.data.type === 'warning' && NotificationManager.warning (message.data.msg, 'Warning')}
                    <NotificationContainer />
                </div>
            </div>
        );
    }
}


const mapStateToProps = ({ui, user, monitor}) => {
    const { authUser } = user;
    const { message} = ui;
    const { clientsData} = monitor;
    return {authUser, message, clientsData}
};
export default withRouter(connect(mapStateToProps, {
    hideMessage,
    showFullLoader,
    hideFullLoader,
    getAllClient,
    logDisplayProperties,
    getBusinessDay,
    getStoreStatus,
    getOpenHours,
    getEmployeeCount,
    getVersion,
    getStoreName
})(RouterApp));
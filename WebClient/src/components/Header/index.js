import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux';
import DropdownItem from './DropdownItem';
import { logout } from '../../store/api';
import { toggleLoginForm, logoutSuccess, showFullLoader, hideFullLoader, showMessage } from '../../store/actions'

class Header extends Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.loginClick = this.loginClick.bind(this);
        this.logoutClick = this.logoutClick.bind(this);
    }

    loginClick()
    {
        if (!this.props.loggedUser){
            this.props.toggleLoginForm()
        }
    }

    logoutClick()
    {
        this.props.showFullLoader();
        logout({id:this.props.loggedUser_id})
        .then((res) => {
            if (!res.data.success) {
                this.props.showMessage({err:"error", msg:"Logout failed"});
                return;
            }
            this.props.history.push('/')
            this.props.logoutSuccess()
        }).catch(err => {
            this.props.showMessage({err:"error", msg:"Logout failed"})
        }).finally(() =>{
            this.props.hideFullLoader();
        })
    }

    render() {
        let headerButtons;

        if (!this.props.loggedUser)
        {
            headerButtons = <div><button className="btn btn-warning btn-sm mr-3" onClick={this.loginClick}>Login</button></div>
        }
        else
        {
            headerButtons = <div className="row justify-content-center align-self-cente">
                <div><button className="btn btn-warning" onClick={this.logoutClick}>Logout</button></div>
                <DropdownItem MainLabel="Users"
                    Label_1="Add User" Link_1="/Users/AddUser"
                    Label_2="Manage Users" Link_2="/Users/UsersList"
                    Label_3="Load Excel" Link_3="/Users/LoadUsersExcel"/>
                <DropdownItem MainLabel="Daily Briefing"
                    Label_1="Add Daily Briefing" Link_1="/DailyBriefings/AddDailyBriefing"
                    Label_2="Manage Daily Briefings" Link_2="/DailyBriefings/DailyBriefingsList" />
                <DropdownItem MainLabel="Messages"
                    Label_1="Add Message" Link_1="/ImportantMessages/AddImportantMessage"
                    Label_2="Manage Messages" Link_2="/ImportantMessages/ImportantMessagesList" />
                <DropdownItem MainLabel="Important Info"
                    Label_2="Manage Important Info" Link_2="/ImportantInfo/ImportantInfoList" />
            </div>
        }

        return ( 
            <div id="header" className="d-flex px-2 text-white">
                <div className="mr-auto">
                    <h5 className="mb-0 mt-2">{!this.props.loggedUser ? 'Welcome To Kravitz Manager' : 'Hello, ' + this.props.loggedUser.firstname }</h5>
                    <div>
                        <small><Link to="/">Home</Link></small>
                        <small style={{margin:'20px'}} className="font-italic">version {this.props.version ? this.props.version : "1.0.0"}</small>
                    </div>
                </div>    
                {headerButtons}
            </div>
        )
    }
}

const mapStateToProps = ({ users }) => {
    const {loggedUser} = users;
    return {loggedUser};
};

const mapDispatchToProps = (dispatch) => {
    return {
        showFullLoader: () => { dispatch(showFullLoader()) },
        hideFullLoader: () => { dispatch(hideFullLoader()) },
        logoutSuccess: () => { dispatch(logoutSuccess()) },
        toggleLoginForm: () => { dispatch(toggleLoginForm()) },
        showMessage: (typ, msg) => { dispatch(showMessage(typ, msg)) },
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
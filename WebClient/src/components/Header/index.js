import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import DropdownItem from './DropdownItem';
import { toggleLoginForm, logoutSuccess } from '../../store/actions'

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
        this.props.history.push('/')
        this.props.logoutSuccess()
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
                <button className="btn btn-warning btn-sm mr-3" onClick={this.logoutClick}>Logout</button>
                <DropdownItem MainLabel="Users"
                    Label_1="Add User" Link_1="/Users/AddUser"
                    Label_2="Users List" Link_2="/Users/UsersList"
                    Label_3="Load Excel" Link_3="/Users/LoadUsersExcel"/>
                <DropdownItem MainLabel="Daily Briefing"
                    Label_1="Add Daily Briefing" Link_1="/DailyBriefings/AddDailyBriefing"
                    Label_2="All Daily Briefing" Link_2="/DailyBriefings/DailyBriefingsList" />
                <DropdownItem MainLabel="Important Messages"
                    Label_1="Add Message" Link_1="/ImportantMessages/AddImportantMessage"
                    Label_2="All Messages" Link_2="/ImportantMessages/ImportantMessagesList" />
            </div>
        }

        return ( 
            <div id="header" className="d-flex px-2 text-white">
                <div className="mr-auto">
                    <h5 className="mb-0 mt-2">{!this.props.loggedUser ? 'Welcome To Kravitz Manager' : 'Hello, ' + this.props.loggedUser.firstname }</h5>
                    <div>
                        <small style={{margin:'20px'}} className="font-italic">version {this.props.version}</small>
                        <small className="font-italic">{this.props.storeName}</small>
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
export default withRouter(connect(mapStateToProps, {
    logoutSuccess,
    toggleLoginForm
})(Header));
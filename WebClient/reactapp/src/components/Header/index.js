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
        if (!this.props.authUser){
            this.props.toggleLoginForm()
        }
    }

    logoutClick()
    {
        this.props.logoutSuccess()
    }

    render() {
        let headerButtons;

        if (!this.props.authUser)
        {
            headerButtons = <button className="btn btn-warning btn-sm mr-3 btn-header" onClick={this.loginClick}>Login</button>
        }
        else
        {
            headerButtons = <div className="row justify-content-center align-self-cente">
                <button className="btn btn-warning btn-sm mr-3 btn-header" onClick={this.logoutClick}>Logout</button>
                <DropdownItem MainLabel="Users" Label_1="Add User" Label_2="Users List" Label_3="Load Excel"/>
                <DropdownItem MainLabel="Daily Briefing" Label_1="Add Daily Briefing" Label_2="All Daily Briefing"/>
                <DropdownItem MainLabel="Important Messages" Label_1="Add Message" Label_2="All Messages"/>
            </div>
        }

        return ( 
            <div id="header" className="d-flex px-2 text-white">
                <div className="mr-auto">
                    <h5 className="mb-0 mt-2">{!this.props.authUser ? 'Welcome To Kravitz Manager' : 'Hello, Michal'}</h5>
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

const mapStateToProps = ({status, user }) => {
    const {version, storeName} = status;
    const {authUser} = user;
    return {version, authUser, storeName};
};
export default withRouter(connect(mapStateToProps, {
    logoutSuccess,
    toggleLoginForm
})(Header));
import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import {
    toggleBSDateForm,
    logoutSuccess,
    loadStoreData,
    loadPosConfig,
} from '../../store/actions'

class Menu extends Component {
    
    constructor(props) {
        super(props)
        this.state = {}
        this.logout = this.logout.bind(this);
        this.loadStoreData = this.loadStoreData.bind(this);
        this.loadPosConfig = this.loadPosConfig.bind(this);
        this.editBusinessDate = this.editBusinessDate.bind(this);
    }
    
    logout(){
        this.props.logoutSuccess();
    }

    loadStoreData(){
        this.props.loadStoreData();
    }

    loadPosConfig(){
        this.props.loadPosConfig();
    }

    editBusinessDate(){
        this.props.toggleBSDateForm();
    }

    render() {
        return (
            <div className="btn-group">
                <button type="button" className="btn btn-info btn-sm dropdown-toggle" 
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" 
                    style={{margin: '15px 0', width: '180px'}}>Menu</button>
                <div className="dropdown-menu">
                    <ul className=" text-white p-0 m-0">
                        <li className="dropdown-item pointer" onClick={this.loadStoreData}>Get Stroe Data</li>    
                        <li className="dropdown-item pointer" onClick={this.loadPosConfig}>Get Pos Config</li>
                        {this.props.authUser && <li className="dropdown-item inactive">Sync From Pos</li>}
                        {this.props.authUser && <li className="dropdown-item pointer" onClick={this.editBusinessDate}>Edit Business Date</li>}
                        {this.props.authUser && <li className="dropdown-item pointer" onClick={this.logout}>Logout</li>}    
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({user}) => {
    const {authUser} = user;
    return { authUser };
};
export default withRouter(connect(mapStateToProps, {
    toggleBSDateForm,
    logoutSuccess,
    loadStoreData,
    loadPosConfig,
})(Menu));

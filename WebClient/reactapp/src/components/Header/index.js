import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import Menu from '../Menu'
import { toggleLoginForm } from '../../store/actions'

class Header extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        
        return ( 
            <div id="header" className="d-flex px-2 text-white">
                <div className="mr-auto">
                    <h5 className="mb-0 mt-2">McDonalds IL Server Configurator</h5>
                    <div>
                        <small style={{margin:'20px'}} className="font-italic">version {this.props.version}</small>
                        <small className="font-italic">{this.props.storeName}</small>
                    </div>
                </div>
                <button className="btn btn-info btn-sm mr-3" style={{margin: '15px 0', width: '150px'}}
                    onClick={() => {
                        if (!this.props.authUser){
                            this.props.toggleLoginForm()
                        }
                    }}>{this.props.authUser ? 'Admin' : 'Login'}
                </button>
                <Menu/>
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
    toggleLoginForm
})(Header));
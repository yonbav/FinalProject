import React, { Component } from 'react'
import { Button, Modal, ModalBody} from 'reactstrap';
import { Textbox } from 'react-inputs-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import {
    toggleLoginForm,
    loginSuccess,
    showMessage,
} from '../../store/actions'

import {
    login
} from '../../store/api'

import {
    Constants
} from '../../Common'

class LoginForm extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            loader: false,
            userName: "",
            password: "",
            validate: false,
        }
        this.loginAction = this.loginAction.bind(this)
    }

    loginAction(){
        this.setState({validate: true});
        if(this.state.userName === "" || this.state.password === ""){
            return;
        }
        this.setState({loader: true})
        login({
            Username: this.state.userName,
            Password: this.state.password
        }).then(data => {
            this.setState({loader: false})
            if(data.ErrorCode === 0){
                this.props.showMessage({ 
                    type: 'success',
                    msg: 'Login success.'
                })
                this.props.loginSuccess({
                    token: data.Token
                })
                this.props.toggleLoginForm();
            }else{
                this.props.showMessage({ 
                    type: 'error',
                    msg: Constants.ERROR_MESSAGES[data.ErrorCode]
                })
            }
        }).catch(error => {
            this.setState({loader: false})
            this.props.showMessage({ 
                type: 'error',
                msg: 'Login fail.'
            })
            console.log('login error', error)
        })
    }
    
    render() {
        const {
            loader, 
            validate, 
            userName,
            password,
        } = this.state;

        const {
            isOpenLoginForm,
        } = this.props

        return (
            <Modal isOpen={isOpenLoginForm} toggle={this.props.toggleLoginForm} className={this.props.className}>
                <ModalBody>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div style={{position: 'absolute', right: '10px', top: '10px'}}>
                                    <FontAwesomeIcon className="pointer" icon="times" onClick={this.props.toggleLoginForm}/>
                                </div>
                                <h1 className="my-4 text-center">Login</h1>
                                <div className="form-group mb-2">
                                    <label className="small" htmlFor="userName">User Name</label>
                                    <Textbox id="userName" name="userName" type="text" validate = {validate} value={userName} 
                                        placeholder='User Name'
                                        customStyleInput={{height: '45px', width: '300px'}}
                                        tabIndex="1"
                                        onChange={(userName, e) => {
                                            this.setState({userName: userName });
                                        }}
                                        onBlur={(e) => {}}
                                        validationOption={{
                                            name: 'User Name',
                                            check: true,
                                            required: true,
                                        }}
                                    />
                                </div>
                                <div className="form-group mb-5">
                                    <label className="small" htmlFor="password">Password</label>
                                    <Textbox id="password" name="password" type="password" validate = {validate} value={password} 
                                        placeholder='Password'
                                        customStyleInput={{height: '45px', width: '300px'}}
                                        tabIndex="2"
                                        onChange={(password, e) => {
                                            this.setState({password: password });
                                        }}
                                        onBlur={(e) => {}}
                                        validationOption={{
                                            name: 'Password',
                                            check: true,
                                            required: true,
                                        }}
                                    />
                                </div>
                                <div className="text-center">
                                    <Button className="btn btn-info btn-sm mb-4" style={{width: '200px', height: '40px'}} onClick={this.loginAction}>Login</Button>{' '}
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                { loader && <div style={{position:'absolute', top: '5px', left: '10px'}}>
                    <div className="loader">
                        <svg className="circular" viewBox="25 25 50 50">
                            <circle className="path" cx="50" cy="50" r="10" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
                        </svg>
                    </div>
                </div>}
            </Modal>
        )
    }
}

const mapStateToProps = ({ui}) => {
    const {isOpenLoginForm} = ui;
    return {isOpenLoginForm};
}

export default withRouter(connect(mapStateToProps, {
    toggleLoginForm,
    loginSuccess,
    showMessage,
})(LoginForm));

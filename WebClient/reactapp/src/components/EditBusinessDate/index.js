import React, { Component } from 'react'
import { Button, Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import Switch from 'react-switch';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';

import {
    toggleBSDateForm,
    showMessage,
    getBusinessDay,
    getStoreStatus,
    logoutSuccess,
} from '../../store/actions'

import {
    highAuthOpenDay,
    startClose
} from '../../store/api'

import {
    Constants
} from '../../Common'

import moment from 'moment';

class EditBusinessDate extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loader: false,
            businessDay: new Date(),
            storeStatus: true,
        }
        this.submitAction = this.submitAction.bind(this)
        this.onChangeStatus = this.onChangeStatus.bind(this)
    }

    onChangeStatus(event){
        this.setState({
            storeStatus: event
        })
    }

    submitAction(){
        if (this.state.storeStatus){
            this.highAuthOpenDayProcess()
        }else{
            this.startCloseProcess();
        }
    }

    highAuthOpenDayProcess(){
        this.setState({loader: true})
        highAuthOpenDay({
            Token: this.props.authUser.token,
            BusinessDate: moment(this.state.businessDay).format('MM-DD-YYYY')
        }).then(data => {
            this.setState({loader: false})
            if(data.ErrorCode === 0){
                this.props.showMessage({ 
                    type: 'success',
                    msg: 'Business Date setting success.'
                })
                this.props.toggleBSDateForm();
                this.props.getBusinessDay();
                this.props.getStoreStatus();
            }else{
                if (data.ErrorCode === 2){
                    this.props.toggleBSDateForm();
                    this.props.logoutSuccess();
                }
                this.props.showMessage({ 
                    type: 'error',
                    msg: Constants.ERROR_MESSAGES[data.ErrorCode]
                })
            }
        }).catch(error => {
            this.setState({loader: false})
            this.props.showMessage({ 
                type: 'error',
                msg: 'Business Date setting fail.'
            })
            console.log('login error', error)
        })
    }

    startCloseProcess(){
        this.setState({loader: true})
        startClose().then(data => {
            this.setState({loader: false})
            this.props.showMessage({ 
                type: 'success',
                msg: 'Close start success.'
            })
            this.props.toggleBSDateForm();
            this.props.getBusinessDay();
            this.props.getStoreStatus();
        }).catch(error => {
            this.setState({loader: false})
            this.props.showMessage({ 
                type: 'error',
                msg: 'Close start fail.'
            })
            console.log('login error', error)
        })
    }

    componentWillReceiveProps(newProps){
        if (!this.props.isOpenBSDateForm){
            this.setState({
                businessDay: newProps.businessDay,
                storeStatus: newProps.storeStatus.toLowerCase() === 'open' ? true : false,
            })
        }
    }
    
    render() {
        return (
            <Modal isOpen={this.props.isOpenBSDateForm} toggle={this.props.toggleBSDateForm} className={this.props.className} id="edit-address">
                <ModalHeader toggle={this.props.toggleBSDateForm}>Edit business date</ModalHeader>
                <ModalBody>
                    <div className="row py-3">
                        <div className="col-5 text-right pt-1">Business Date:</div>
                        <div className="col-7">
                            <div className="form-group">
                                <DayPickerInput
                                    formatDate={formatDate}
                                    parseDate={parseDate}
                                    value={this.state.businessDay}
                                    placeholder="DD/MM/YYYY"
                                    format="DD/MM/YYYY"
                                    onDayChange={(businessDay, modifiers) => {
                                        this.setState({
                                            businessDay: businessDay,
                                        });
                                    }}
                                    dayPickerProps={{
                                        selectedDays: this.state.businessDay,
                                        disabledDays: {
                                            daysOfWeek: [0, 6],
                                        },
                                        localeUtils: MomentLocaleUtils, 
                                        locale: 'en'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 text-right">Status:</div>
                        <div className="col-7">
                            <div className="form-group">
                                <Switch
                                    onChange={this.onChangeStatus}
                                    onClick={this.onChangeStatus}
                                    checked={this.state.storeStatus}
                                    offColor="#ff0000"
                                    id="storeStatus"
                                />
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-info btn-sm" style={{width: '200px', height: '40px'}} onClick={this.submitAction}>Submit</Button>
                </ModalFooter>
                { this.state.loader && <div style={{position:'absolute', bottom: '5px', left: '10px'}}>
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

const mapStateToProps = ({status, ui, user}) => {
    const {
        authUser
    } = user;
    const { 
        businessDay,
        storeStatus
    } = status;
    const {
        isOpenBSDateForm,
    } = ui
    return {authUser, businessDay, storeStatus, isOpenBSDateForm}
};

export default withRouter(connect(mapStateToProps, {
    toggleBSDateForm,
    showMessage,
    getBusinessDay,
    getStoreStatus,
    logoutSuccess,
})(EditBusinessDate));


import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import Indicator from '../Indicator'
import moment from 'moment';

class StatusBar extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    render() {
        return ( 
            <div id="statusbar" className="d-flex px-3 py-1 text-white font-14">
                <div className="mr-auto">
                    <span style={{minWidth: '215px', display: 'inline-block'}}>BusinessDay: {moment(this.props.businessDay, 'DD/MM/YYYY').format('DD-MM-YYYY')} {this.props.storeStatus}&nbsp;&nbsp;&nbsp;</span>
                    <span style={{minWidth: '185px', display: 'inline-block'}}>Open Hours: {this.props.openHours.OpenTime}-{this.props.openHours.CloseTime}&nbsp;&nbsp;&nbsp;</span>
                    <span style={{minWidth: '120px', display: 'inline-block'}}>Employee: {this.props.employeeCount}&nbsp;&nbsp;&nbsp;</span>
                </div>
                <div>
                    <span style={{minWidth: '210px', display: 'inline-block'}}>PosConfig:&nbsp;&nbsp;
                        <span className={`${this.props.posConfigDate.toLowerCase() === "loading..." ? 'text-white' : 'text-success'} ${this.props.errorPosConfig ? 'text-danger' : ''}`}>
                        {this.props.posConfigDate}</span>&nbsp;&nbsp;&nbsp;</span>
                    <span style={{minWidth: '210px', display: 'inline-block'}}>StoreData:&nbsp;&nbsp;
                        <span className={`${this.props.storeDataDate.toLowerCase() === "loading..." ? 'text-white' : 'text-success'} ${this.props.errorStoreData ? 'text-danger' : ''}`}>
                        {this.props.storeDataDate}</span>&nbsp;&nbsp;&nbsp;</span>
                </div>
                {
                     this.props.loader > 0 && 
                     <div style={{position:'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)'}}>
                        <Indicator/>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = ({status, ui}) => {
    const { 
        businessDay, 
        storeStatus,
        openHours, 
        employeeCount,
        posConfigDate,
        storeDataDate,
        errorPosConfig,
        errorStoreData,
    } = status;
    const {
        loader,
    } = ui;
    return { 
        businessDay, 
        storeStatus,
        openHours,
        employeeCount,
        posConfigDate,
        storeDataDate,
        errorPosConfig,
        errorStoreData,
        loader,
    };
};
export default withRouter(connect(mapStateToProps, {})(StatusBar));
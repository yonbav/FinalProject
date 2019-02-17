import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { 
    showFullLoader,
    hideFullLoader,
} from '../../store/actions'
import Head from './Head'
import Body from './Body'
import {Constants} from '../../Common';

class Table extends Component {

    constructor(props){
        super(props);
        this.state = {
            monitorData: this.initData(),
        }
    }

    componentDidMount(){

    }

    componentWillReceiveProps(newProps){
        this.dataFormat(newProps.clientsData);
    }

    componentDidUpdate(){
        window.fixTable(document.getElementById('sticky_table'))
    }

    initData(){
        let initClientData = [];
        for(let i = 0; i < 10; i++){
            initClientData.push({
                Machine: String(i + 1),
                PosType: "",
                Ip: "",
                Status: "",
                Network: "",
                Printer: "",
                Vx: "",
                Scanner: "",
                FingerPrint: "",
                CouchDB: "",
                ClientState: "",
                COD: "",
                Runner: "",
                Drawer: "",
                Version: "",
                TestingUnitResult: "",
                TerminalId: "",
                FreeSpace: "",
                CPUUsage: "",
                TotalMemory: "",
                UsedMemory: ""
            })
        }
        let initData = [];
        Object.keys(initClientData[0]).forEach(key => {
            let rowData = [key];
            initClientData.forEach((element, index) => {
                rowData.push(element[key]);
            });
            initData.push(rowData);
        })
        return initData;
    }

    dataFormat(originData){
        let tempData = [];
        if (originData === null || originData === undefined ||originData.length === 0){
            return;
        }
        Object.keys(originData[0]).forEach(key => {
            let rowData = [key];
            originData.forEach((element, index) => {
                rowData.push(element[key]);
            });
            tempData.push(rowData);
        })
        Constants.ADMIN_LINK_KEYS.forEach((key) => {
            let rowData = [key];
            originData.forEach(() => {
                rowData.push(Constants.ADMIN_LINK_LABELS[key]);
            });
            tempData.push(rowData);
        })
        this.setState({
            monitorData: tempData
        })
    }

    render() {
        return (
            <div id="sticky_table" className="fixed-table-container">
                <table className="table">
                    <Head monitorData={this.state.monitorData}/>
                    <Body monitorData={this.state.monitorData}/>
                </table>
            </div>
        )
    }
}

const mapStateToProps = ({user, monitor}) => {
    const { authUser } = user;
    const { clientsData } = monitor;
    return { authUser, clientsData}
};

export default withRouter(connect(mapStateToProps, {
    showFullLoader,
    hideFullLoader,
})(Table));

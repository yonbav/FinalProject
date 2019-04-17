import React, { Component } from 'react'
import {Constants} from '../../Common';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import DlgContent from '../Dialog/DlgContent';
import LinkCellContent from './LinkCellContent';

import {
    showMessage,
    hideMessage,
    showIndicator,
    hideIndicator,
    toggleDlg,
} from '../../store/actions'

import {
    getPosConfig,
    restartClient,
    forcePcRestart,
} from '../../store/api'

class LinkCell extends Component {

    constructor(props) {
        super(props)
        this.state = {
            
        }
        this.action = this.action.bind(this);
    }

    action(){
        switch(this.props.actionType.toLowerCase()){
            case Constants.DATA_KEYS.VIEW_CONFIG:
                this.displayPosConfig();
                break;
            case Constants.DATA_KEYS.EXPORT_LOGS:
                this.exportLogs();
                break;
            case Constants.DATA_KEYS.RESTART_CLIENT:
                this.restartClient();
                break;
            case Constants.DATA_KEYS.PC_RESTART:
                this.pcRestart();
                break;
            case Constants.DATA_KEYS.PRINTER:
                this.printerAction();
                break;
            case Constants.DATA_KEYS.COUCHDB:
                this.couchDBAction();
                break;
            case Constants.DATA_KEYS.COD:
                this.codAction();
                break;
            case Constants.DATA_KEYS.IP:
                this.ipAction();
                break;
            case Constants.DATA_KEYS.RUNNER:
                this.runnerAction();
                break;
            default:
                break;
        }
    }

    displayPosConfig()
    {
        if(!this.props.clientsData || !this.props.clientsData[this.props.index - 1]) return;
        let client = this.props.clientsData[this.props.index - 1];
        this.showConfigDialog(client, "");
    }

    runnerAction(){
        if(!this.props.clientsData || !this.props.clientsData[this.props.index - 1]) return;
        let client = this.props.clientsData[this.props.index - 1];
        this.showConfigDialog(client, "runner");
    }

    showConfigDialog(client, paramType) {
        if (!client) return;

        // Setting the params
        let params = {
            id: client.Machine
        }
        this.props.showIndicator();
        getPosConfig(params).then(data => {
            this.props.toggleDlg({
                title: `${client.PosType}${client.Machine} `,
                content: <DlgContent data={data.Config.Config}/>
            })
        }).catch(error => {
            console.log('getPosConfig', error);
            this.props.showMessage({
                type: 'error',
                msg: error.message
            })
        }).finally()
        {
            this.props.hideIndicator();
        }
    }

    exportLogs(){
        if(!this.props.clientsData) return;
        const ip = this.props.clientsData[this.props.index - 1].Ip
        if(!ip || ip === '')return;
        window.open(`http://${ip}:8080/ExportLogs`, '_blank')
    }

    restartClient(){
        if(!this.props.clientsData) return;
        const ip = this.props.clientsData[this.props.index - 1].Ip
        if(!ip || ip === '')return;
        const params = {
            ip: ip,
        }
        this.props.showIndicator();
        restartClient(params).then(data => {
            this.props.hideIndicator();
            this.props.showMessage({
                type: 'success',
                msg: 'Client Restart Success!'
            })
        }).catch(error => {
            console.log('restartClient', error);
            this.props.showMessage({
                type: 'error',
                msg: error.msg
            })
        })
    }

    pcRestart(){
        if(!this.props.clientsData) return;
        const ip = this.props.clientsData[this.props.index - 1].Ip
        if(!ip || ip === '')return;
        const params = {
            ip: ip,
        }
        this.props.showIndicator();
        forcePcRestart(params).then(data => {
            this.props.hideIndicator();
            this.props.showMessage({
                type: 'success',
                msg: 'Pc Restart Success.'
            })
        }).catch(error => {
            console.log('forcePcRestart', error);
            this.props.showMessage({
                type: 'error',
                msg: error.msg
            })
        })
    }

    printerAction(){
        if(!this.props.clientsData) return;
        const ip = this.props.clientsData[this.props.index - 1].Ip
        if(!ip || ip === '')return;
        window.open(`http://${ip}:8080/LastReceipt`, '_blank')
    }
    
    couchDBAction(){
        if(!this.props.clientsData) return;
        const ip = this.props.clientsData[this.props.index - 1].Ip
        if(!ip || ip === '')return;
        window.open(`http://${ip}:5984/_utils`, '_blank')
    }
    
    codAction(){
        if(!this.props.clientsData) return;
        const ip = this.props.clientsData[this.props.index - 1].Ip
        if(!ip || ip === '')return;
        window.open(`http://${ip}:8080/LiveView`, '_blank')
    }

    ipAction(){
        if(!this.props.clientsData) return;
        const ip = this.props.clientsData[this.props.index - 1].Ip
        if(!ip || ip === '')return;
        if(this.props.logDisplayProperties){
            window.open(`http://${ip}:8080/ClientLog?filename=${this.props.logDisplayProperties.FileName}
                    &time=${this.props.logDisplayProperties.DateFormat}&rows=1000`, '_blank')
        }
    }

    render() {
        const generateContent = () => {
            switch(this.props.actionType.toLowerCase()){
                case Constants.DATA_KEYS.POS_TYPE:
                    return <LinkCellContent data={this.props.data}/>
                case Constants.DATA_KEYS.IP:
                    return <LinkCellContent data={this.props.data}/>
                case Constants.DATA_KEYS.STATUS:
                    return <LinkCellContent data={this.props.data}/>
                case Constants.DATA_KEYS.NETWORK:
                    return <LinkCellContent data={this.props.data}/>
                case Constants.DATA_KEYS.PRINTER:
                    return <LinkCellContent data={this.props.data} mainKey={'Status'} displayKeys={['Status', 'Error']}/>
                case Constants.DATA_KEYS.VX:
                    return <LinkCellContent data={this.props.data}/>
                case Constants.DATA_KEYS.SCANNER:
                    return <LinkCellContent data={this.props.data}/>
                case Constants.DATA_KEYS.FINGERPRINT:
                    return <LinkCellContent data={this.props.data}/>
                case Constants.DATA_KEYS.COUCHDB:
                    return <LinkCellContent data={this.props.data}/>
                case Constants.DATA_KEYS.CLINET_STATE:
                    return <LinkCellContent data={this.props.data}/>
                case Constants.DATA_KEYS.COD:
                    return <LinkCellContent data={this.props.data}/>
                case Constants.DATA_KEYS.RUNNER:
                    return <LinkCellContent data={this.props.data}/>
                case Constants.DATA_KEYS.DRAWER:
                    return <LinkCellContent data={this.props.data}/>
                case Constants.DATA_KEYS.VERSION:
                    return <LinkCellContent data={this.props.data}/>
                case Constants.DATA_KEYS.TESTING_UNIT:
                    return <LinkCellContent data={this.props.data}/>
                case Constants.DATA_KEYS.TERMINALID:
                    return <LinkCellContent data={this.props.data}/>
                case Constants.DATA_KEYS.FREE_SPACE:
                    return <LinkCellContent data={this.props.data}/>
                case Constants.DATA_KEYS.CPU_USAGE:
                    return <LinkCellContent data={this.props.data}/>
                case Constants.DATA_KEYS.TOTAL_MEMORY:
                    return <LinkCellContent data={this.props.data}/>
                case Constants.DATA_KEYS.USED_MEMORY:
                    return <LinkCellContent data={this.props.data}/>
                case Constants.DATA_KEYS.EXPORT_LOGS:
                    return <LinkCellContent data={this.props.data}/>
                case Constants.DATA_KEYS.RESTART_CLIENT:
                    return <LinkCellContent data={this.props.data}/>
                case Constants.DATA_KEYS.PC_RESTART:
                    return <LinkCellContent data={this.props.data}/>
                case Constants.DATA_KEYS.VIEW_CONFIG:
                    return <LinkCellContent data={this.props.data}/>
                default:
                    return '';
            }
        }
        return (
            <td className="pointer link-cell" onClick={this.action}>
                {generateContent()}
            </td>
        )
    }
}

const mapStateToProps = ({monitor}) => {
    const { clientsData, logDisplayProperties } = monitor;
    return { clientsData, logDisplayProperties}
};

export default withRouter(connect(mapStateToProps, {
    showMessage,
    hideMessage,
    showIndicator,
    hideIndicator,
    toggleDlg,
})(LinkCell));
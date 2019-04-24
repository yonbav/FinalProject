import React, { Component } from 'react'
import {Constants} from '../../Common';

class KeyCell extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        if (this.props.title.toLowerCase() === Constants.DATA_KEYS.MACHINE){
            return <th>{this.props.title}</th>;
        }

        const generateText = () => {
            switch(this.props.title.toLowerCase()){
                case Constants.DATA_KEYS.POS_TYPE:
                    return this.props.title;
                case Constants.DATA_KEYS.IP:
                    return this.props.title;
                case Constants.DATA_KEYS.STATUS:
                    return <div>{this.props.title}<br/><small>(Open/Close)</small></div>;
                case Constants.DATA_KEYS.NETWORK:
                    return <div>{this.props.title}<br/><small>(OnLine/OffLine)</small></div>;
                case Constants.DATA_KEYS.PRINTER:
                    return this.props.title;
                case Constants.DATA_KEYS.VX:
                    return this.props.title;
                case Constants.DATA_KEYS.SCANNER:
                    return <div>{this.props.title}<br/><small>Last Scan Number</small><br/><small>Time</small></div>;
                case Constants.DATA_KEYS.FINGERPRINT:
                    return this.props.title;
                case Constants.DATA_KEYS.COUCHDB:
                    return this.props.title;
                case Constants.DATA_KEYS.CLINET_STATE:
                    return <div>{this.props.title}<br/><small>[LastOrder]</small></div>;
                case Constants.DATA_KEYS.COD:
                    return this.props.title;
                case Constants.DATA_KEYS.RUNNER:
                    return this.props.title;
                case Constants.DATA_KEYS.DRAWER:
                    return this.props.title;
                case Constants.DATA_KEYS.VERSION:
                    return this.props.title;
                case Constants.DATA_KEYS.TESTING_UNIT:
                    return <div>{this.props.title}<br/><small>result</small></div>;
                case Constants.DATA_KEYS.TERMINALID:
                    return this.props.title;
                case Constants.DATA_KEYS.FREE_SPACE:
                    return <div>{this.props.title}<br/><small>(GB)</small></div>;
                case Constants.DATA_KEYS.CPU_USAGE:
                    return <div>{this.props.title}<br/><small>(%)</small></div>;
                case Constants.DATA_KEYS.TOTAL_MEMORY:
                    return <div>{this.props.title}<br/><small>(GB)</small></div>;
                case Constants.DATA_KEYS.USED_MEMORY:
                    return <div>{this.props.title}<br/><small>(GB)</small></div>;
                default:
                    return '';
            }
        }
        
        return <td>{generateText()}</td>;
    }
}
export default KeyCell;

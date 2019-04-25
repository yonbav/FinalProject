import React, { Component } from 'react'
import {Constants} from '../../Common';
import TextCellContent from './TextCellContent'

class TextCell extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }
    
    render() {
        const generateContent = () => {
            switch(this.props.dataKey.toLowerCase()){
                case Constants.DATA_KEYS.POS_TYPE:
                    return <TextCellContent data={this.props.data}/>
                case Constants.DATA_KEYS.IP:
                    return <TextCellContent data={this.props.data}/>
                case Constants.DATA_KEYS.STATUS:
                    return <TextCellContent data={this.props.data}/>
                case Constants.DATA_KEYS.NETWORK:
                    return <TextCellContent data={this.props.data}/>
                case Constants.DATA_KEYS.PRINTER:
                    return <TextCellContent data={this.props.data}/>
                case Constants.DATA_KEYS.VX:
                    return <TextCellContent data={this.props.data}/>
                case Constants.DATA_KEYS.SCANNER:
                    return <TextCellContent data={this.props.data} mainKey={'Status'} displayKeys={['Id', 'Time']}/>
                case Constants.DATA_KEYS.FINGERPRINT:
                    return <TextCellContent data={this.props.data} mainKey={'Version'} displayKeys={['LastClock']}/>
                case Constants.DATA_KEYS.COUCHDB:
                    return <TextCellContent data={this.props.data}/>
                case Constants.DATA_KEYS.CLINET_STATE:
                    return <TextCellContent data={this.props.data} mainKey={'Status'} displayKeys={['LastOrder']}/>
                case Constants.DATA_KEYS.COD:
                    return <TextCellContent data={this.props.data}/>
                case Constants.DATA_KEYS.RUNNER:
                    return <TextCellContent data={this.props.data}/>
                case Constants.DATA_KEYS.DRAWER:
                    return <TextCellContent data={this.props.data} mainKey={'Client'} displayKeys={['LastOpen']}/>
                case Constants.DATA_KEYS.VERSION:
                    return <TextCellContent data={this.props.data} mainKey={'Number'} displayKeys={['LastUpdate']}/>
                case Constants.DATA_KEYS.TESTING_UNIT:
                    return <TextCellContent data={this.props.data} mainKey={'Result'} displayKeys={['TestTime']}/>
                case Constants.DATA_KEYS.TERMINALID:
                    return <TextCellContent data={this.props.data}/>
                case Constants.DATA_KEYS.FREE_SPACE:
                    return <TextCellContent data={this.props.data}/>
                case Constants.DATA_KEYS.CPU_USAGE:
                    return <TextCellContent data={this.props.data}/>
                case Constants.DATA_KEYS.TOTAL_MEMORY:
                    return <TextCellContent data={this.props.data}/>
                case Constants.DATA_KEYS.USED_MEMORY:
                    return <TextCellContent data={this.props.data}/>
                default:
                    return '';
            }
        }
        return <td><div>{generateContent()}</div></td>;
    }
}
export default TextCell;

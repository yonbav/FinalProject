import React, { Component } from 'react';
import TextCell from './TextCell';
import LinkCell from './LinkCell';
import KeyCell from './KeyCell';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Constants} from '../../Common';

class Body extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }
    
    render() {
        const generateROW = () => {
            if(this.props.monitorData.length === 0){
                return <tr></tr>;
            }
            //login check
            let bodyData = this.props.monitorData.filter((element, index) => {
                if (!this.props.authUser && Constants.ADMIN_LINK_KEYS.indexOf(element[0]) > -1){
                    return false;
                }
                return true;
            })
            console.log(bodyData);
            // generate row
            return bodyData.slice(1, bodyData.length).map((element, index) => {
                return (
                    <tr key={index}>{generateCell(element)}</tr>
                )
            });
        }

        const generateCell = (data) => {
            return data.map((element, index) => {
                if (index === 0){
                    return <KeyCell title={element} key={index}/>
                }else{
                    if (Constants.LINK_KEYS.indexOf(data[0].toLowerCase()) > -1){
                        return <LinkCell data={element} actionType={data[0]} index={index} key={index}/>
                    }else{
                        return <TextCell data={element} dataKey={data[0]} key={index}/>
                    }
                }
            })
        }

        return (
            <tbody>
                {generateROW()}
            </tbody>
        )
    }
}
const mapStateToProps = ({user}) => {
    const { authUser } = user;
    return { authUser}
};

export default withRouter(connect(mapStateToProps, {})(Body));

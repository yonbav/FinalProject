import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class HeadCell extends Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.action = this.action.bind(this);
    }

    action(){
        if(!this.props.clientsData) return;
        const ip = this.props.clientsData[this.props.index - 1].Ip
        if(!ip || ip === '')return;
        window.open(`http://${ip}:8080`, '_blank')
    }

    render() {
        return(
            <th className="pointer link-cell">
                <div onClick={this.action}>{this.props.title}</div>
            </th>
        );
    }
}

const mapStateToProps = ({user, monitor}) => {
    const { clientsData} = monitor;
    return { clientsData}
};

export default withRouter(connect(mapStateToProps, {})(HeadCell));

import React, { Component } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader,} from 'reactstrap';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import {
    toggleDlg,
} from '../../store/actions'

class Dialog extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    
    render() {
        return (
            <Modal isOpen={this.props.isOpenDlg} toggle={this.toggleDlg} className={this.props.className}>
                <ModalHeader toggle={this.props.toggleDlg}>{this.props.dlgContent.title}</ModalHeader>
                <ModalBody>
                    {this.props.dlgContent.content}
                </ModalBody>
                <ModalFooter>
                    <Button color="info" className="btn btn-info btn-sm" onClick={this.props.toggleDlg}
                        style={{width: '150px'}}>Close</Button>{' '}
                </ModalFooter>
            </Modal>
        )
    }
}

const mapStateToProps = ({ui}) => {
    const {
        isOpenDlg,
        dlgContent
    } = ui
    return { isOpenDlg, dlgContent}
};

export default withRouter(connect(mapStateToProps, {
    toggleDlg,
})(Dialog));


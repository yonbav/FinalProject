import React, { Component } from 'react';
import uploadIcon from '../../images/upload-icon.png';
import XLSX from 'xlsx';
import {addUser} from '../../store/api'
import { showMessage, showFullLoader, hideFullLoader } from '../../store/actions';
import { connect } from 'react-redux';

class LoadUsersExcel extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.onFileChanged = this.onFileChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addnewUser = this.addnewUser.bind(this);
    }

    componentDidMount() {
        document.getElementById("loadUsersExcel").scrollIntoView();
    }

    onFileChanged(event) {
        var currentFile = event.target.files[0];

        if (!currentFile) {
            alert("Failed to upload file");
            return;
        }

        this.setState({ usersExcelFile: currentFile });
    }

    addnewUser(newUser) {
        addUser(newUser, this.props.loggedUser.token)
        .then(res => {
            // If failed to add the user
            if (res.status < 200 || res.status >= 300) {
                this.props.showMessage({
                    type: 'error',
                    msg: 'Failed to add user. ' + newUser.id
                })
                return;
            }

            this.props.addUserSuccess(newUser);
        })
        .catch(error => {
            this.props.showMessage({
                type: 'error',
                msg: 'Failed to add users.' + newUser.id
            })
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        if (!this.state.usersExcelFile) {
            this.props.showNewMessage({
                type: 'error',
                msg: 'Please select file.'
            });
            return
        }

        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = (e) => {
            try {
                this.props.showLoader();
                var newUsersList = this.convertResultToJson(e.target.result, rABS);
                newUsersList.forEach((newUser) => {
                    this.props.addnewUser(newUser);
                })
                this.props.showNewMessage({
                    type: 'success',
                    msg: 'Excel file was successfully uploaded.'
                })
            }
            catch (error) {
                this.props.showNewMessage({
                    type: 'error',
                    msg: 'Failed to upload the excel file.'
                });
            }
            finally {
                this.props.hideLoader();
            }
        };
        if (rABS) reader.readAsBinaryString(this.state.usersExcelFile); else reader.readAsArrayBuffer(this.state.usersExcelFile);
    }

    convertResultToJson(result, rABS) {
        const bstr = result;
        const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const rawData = XLSX.utils.sheet_to_json(ws, { header: 1 });

        let jsonData = []

        const headers = rawData[0];

        for (let i = 1; i < rawData.length; i++) {
            let newObject = {};
            for (let j = 0; j < headers.length; j++) {
                newObject[headers[j]] = rawData[i][j];
            }
            jsonData = [...jsonData, newObject]
        }

        return jsonData;
    }

    render() {
        return (
            <div id='loadUsersExcel' 
                 className="form-backgorund">
                <form  className="input-form" onSubmit={(e) => this.handleSubmit(e)}>                
                    <div className="form-title">Load User's Excel</div>                    
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label">Upload user's excel: </label>
                        <input placeholder={this.state.usersExcelFile ? this.state.usersExcelFile.name : "choose file"} className="col-sm-5" disabled />
                        <label className="col-sm-1 file-upload-button input-file-image" style={{ padding: "0px" }} htmlFor="fileUpload">
                            <img className="upload-image" alt="upload" src={uploadIcon} />
                        </label>
                        <input type="file" accept={".xlsx, .xlsb, .xlsm, .xls, .xml, .csv"} onChange={(e) => this.onFileChanged(e)} className="col-sm-0 input-file-not-visible" id="fileUpload" />
                    </div>
                    <div className="submit-button-div">
                        <button type="submit" className="submit-button btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>);
    }
}

const mapStateToProps = (state, ownProps) => {
    const { loggedUser } = state.users;
    return { loggedUser }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showLoader: () => { dispatch(showFullLoader()) },
        hideLoader: () => { dispatch(hideFullLoader()) },
        showNewMessage: (message) => { dispatch(showMessage(message)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadUsersExcel);
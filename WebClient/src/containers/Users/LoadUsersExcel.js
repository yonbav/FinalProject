import React, { Component } from 'react';
import uploadIcon from '../../images/upload-icon.png';
import XLSX from 'xlsx';
import {addUser} from '../../store/api'
import { showMessage, showFullLoader, hideFullLoader, addUserSuccess } from '../../store/actions';
import { connect } from 'react-redux';

class LoadUsersExcel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersListFromFile: [],
            usersExcelFile: {}
        };

        this.onFileChanged = this.onFileChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addAllUsers = this.addAllUsers.bind(this);
    }

    componentDidMount() {
        document.getElementById("loadUsersExcel").scrollIntoView();
    }

    onFileChanged(event) { 
        // Getting the current file.
        var currentFile = event.target.files[0];
        if (!currentFile) {
            this.props.showMessage({type: 'error', msg: 'Failed to upload the excel file.'});
            return;
        }

        this.setState({usersExcelFile:currentFile})

        // Loading the file's data
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = (e) => {
            try {
                this.props.showFullLoader();
                let allUsers = this.convertResultToJson(e.target.result, rABS);
                this.setState({ usersListFromFile: allUsers });
            }
            catch (error) {
                this.props.showMessage({type: 'error', msg: 'Failed to upload the excel file.'});
            }
            finally {
                this.props.hideFullLoader();
            }
        };
        if (rABS) reader.readAsBinaryString(currentFile); else reader.readAsArrayBuffer(currentFile);
    }

    convertResultToJson(result, rABS) {
        const bstr = result;
        const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', dateNF: 'mm/dd/yyyy' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const rawData = XLSX.utils.sheet_to_json(ws, { header: 1, raw:false });

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

    addAllUsers(usersList) {
        let counter=0;
        this.props.showFullLoader()
        usersList.forEach(newUser => {
            addUser(newUser, this.props.loggedUser.token).then(res => {
                // If failed to add the user
                if (res.status < 200 || res.status >= 300) {
                    this.props.showMessage({ type: 'error', msg: `Failed to add user ${newUser.id}` });
                }
                else {
                    this.props.addUserSuccess(newUser);
                    this.props.showMessage({ type: 'success', msg: `user ${newUser.id} was added` })
                }
            }).catch(error => {
                    this.props.showMessage({ type: 'error', msg: `Failed to add users ${newUser.id}` })
                }).finally(() => {
                    counter++;
                    if (counter === usersList.length)
                    {
                        this.props.hideFullLoader()
                        this.props.showMessage({ type: 'success', msg: 'Finish adding all users.' })
                    }
                })
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        if (!this.state.usersListFromFile || this.state.usersListFromFile.length === 0) {
            this.props.showMessage({type: 'error', msg: 'Invalid file, please upload another file.'});
            return;
        }

        this.addAllUsers(this.state.usersListFromFile);
    }

    render() {
        return (
            <div id='loadUsersExcel' 
                 className="form-backgorund">
                <form  className="input-form" onSubmit={(e) => this.handleSubmit(e)}>                
                    <div className="form-title">Load User's Excel</div>                    
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label">Upload user's excel: </label>
                        <input placeholder={this.state.usersExcelFile.name ? this.state.usersExcelFile.name : "choose file"} className="col-sm-5" disabled />
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
        showFullLoader: () => { dispatch(showFullLoader()) },
        hideFullLoader: () => { dispatch(hideFullLoader()) },
        showMessage: (message) => { dispatch(showMessage(message)) },
        addUserSuccess: (newUser) => {dispatch(addUserSuccess(newUser))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadUsersExcel);
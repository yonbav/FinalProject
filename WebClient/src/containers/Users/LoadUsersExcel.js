import React, {Component} from 'react';
import uploadIcon from '../../images/upload-icon.png';

class LoadUsersExcel extends Component {
    constructor(props) {
        super(props);
        this.state = {usersExcelFile:{}};

        this.onFileChanged = this.onFileChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {
        document.getElementById("loadUsersExcel").scrollIntoView();
    }

    onFileChanged(event) {
        var currentFile = event.target.files[0];

        if (!currentFile)
        {
            alert("Failed to upload file");
            return;
        }

        this.setState({usersExcelFile:currentFile}); 
    }

    handleSubmit(e) {
        e.preventDefault();
        let result = JSON.stringify(this.state.usersExcelFile.name);
        alert("Submit\n=======\n File: " + result);
    }

    render() {
        return (
            <div id='loadUsersExcel' 
                 className="form-backgorund">
                <form  className="input-form" onSubmit={(e) => this.handleSubmit(e)}>                
                    <div className="form-title">Load User's Excel</div>                    
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label">Upload user's excel: </label>
                        <input placeholder={this.state.usersExcelFile ? this.state.usersExcelFile.name : "choose file"} className="col-sm-5" disabled/>
                        <label className="col-sm-1 file-upload-button input-file-image" style={{padding:"0px"}} htmlFor="fileUpload">
                            <img className="upload-image" alt="upload" src={uploadIcon}/>
                        </label>
                        <input type="file" onChange={(e) => this.onFileChanged(e)} className="col-sm-0 input-file-not-visible" id="fileUpload"/>
                    </div>   
                    <div className="submit-button-div">                 
                        <button type="submit" className="submit-button btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>);
    }
}

export default LoadUsersExcel
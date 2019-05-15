import React, { Component } from 'react';
import uploadIcon from '../../images/upload-icon.png';

class ImportantInfoView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: this.props.info ? this.props.info : {},
        };
        
        this.onFileChanged = this.onFileChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    componentDidMount() {
        document.getElementById("importantInfoForm").scrollIntoView();
    }

    onFileChanged(event) {
        var currentFile = event.target.files[0];

        if (!currentFile)
        {
            alert("Failed to upload file");
            return;
        }

        let newInfo = this.state.info
        newInfo.InfoImage = currentFile;
        newInfo.image = currentFile.name;

        this.setState({info:newInfo}); 
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.id;

        let newInfo = this.state.info
        newInfo[name] = value;

        this.setState({
            info: newInfo
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.submitAction(this.state.info);
    }

    render() {
        return (
            <div id='importantInfoForm' 
                 className="form-backgorund">
                <form  className="input-form" onSubmit={(e) => this.handleSubmit(e)}>                
                    <div className="form-title">{this.props.Title}</div>
                    <div className="form-group row">
                        <label htmlFor="title" className="col-sm-3 col-form-label">Title: </label>
                        <input type="text" className="form-control col-sm-8" onChange={this.handleInputChange} id="title" value={this.state.info.title} disabled></input>
                    </div>   
                    <div className="form-group row">
                        <label htmlFor="displayName" className="col-sm-3 col-form-label">Display Name: </label>
                        <input type="text" className="form-control col-sm-8" onChange={this.handleInputChange} id="displayName" value={this.state.info.displayName} placeholder="Enter name"></input>
                    </div>   
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label">File Upload:</label>
                        <input placeholder={this.state.info.image ? this.state.info.image : "choose file"} className="col-sm-5" disabled/>
                        <label className="col-sm-1 file-upload-button input-file-image" style={{padding:"0px"}} htmlFor="fileUpload">
                            <img className="upload-image" alt="upload" src={uploadIcon}/>
                        </label>
                        <input type="file"  accept={".pdf"} onChange={(e) => this.onFileChanged(e)} className="col-sm-0 input-file-not-visible" id="fileUpload"/>
                    </div>   
                    <div className="submit-button-div">                 
                        <button type="submit" className="submit-button btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>);
    }
}

export default ImportantInfoView;
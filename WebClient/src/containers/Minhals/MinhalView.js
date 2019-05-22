import React, { Component } from 'react';
import uploadIcon from '../../images/upload-icon.png';

class MinhalView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minhal: this.props.minhal ? this.props.minhal : {},
        };
        
        this.onFileChanged = this.onFileChanged.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {
        document.getElementById("MinhalForm").scrollIntoView();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.id;

        let newMinhal = this.state.minhal
        newMinhal[name] = value;

        this.setState({
            minhal: newMinhal
        });
    }

    onFileChanged(event) {
        var currentFile = event.target.files[0];

        if (!currentFile)
        {
            alert("Failed to upload file");
            return;
        }

        let newMinhal = this.state.minhal
        newMinhal.InfoImage = currentFile;
        newMinhal.image = currentFile.name;

        this.setState({minhal:newMinhal}); 
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.submitAction(this.state.minhal);
    }

    render() {
        return (
            <div id='MinhalForm' 
                 className="form-backgorund">
                <form  className="input-form" onSubmit={(e) => this.handleSubmit(e)}>                
                    <div className="form-title">{this.props.Title}</div>
                    <div className="form-group row">
                        <label htmlFor="title" className="col-sm-4 col-form-label">Title: </label>
                        <input type="text" className="form-control col-sm-6" onChange={this.handleInputChange} id="title" value={this.state.minhal ? this.state.minhal.title : {}} placeholder="Enter text"></input>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label">File Upload:</label>
                        <input placeholder={this.state.minhal.image ? this.state.minhal.image : "choose file"} className="col-sm-5" disabled/>
                        <label className="col-sm-1 file-upload-button input-file-image" style={{padding:"0px"}} htmlFor="fileUpload">
                            <img className="upload-image" alt="upload" src={uploadIcon}/>
                        </label>
                        <input type="file" accept={".pdf"} onChange={(e) => this.onFileChanged(e)} className="col-sm-0 input-file-not-visible" id="fileUpload"/>
                    </div>   
                    <div className="submit-button-div">                 
                        <button type="submit" className="submit-button btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>);
    }
}

export default MinhalView;
import React, { Component } from 'react';
import {Constants, EnumFunctions} from '../../Common';
import uploadIcon from '../../images/upload-icon.png';

class MinhalView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minhal: this.props.minhal ? this.props.minhal : {type:Constants.ADMINISTRATIONS.MINHAL},
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
        const name = target.name;

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
        let chooseType = undefined;
        if (this.props.allowTypeChoose)
        { 
            chooseType = <div className="form-group row">
                            <label htmlFor="type" className="col-sm-4 col-form-label">type: </label>
                            <div className="input-form-radio custom-control custom-radio">
                                <input type="radio" name="type" checked={this.state.minhal.type === Constants.ADMINISTRATIONS.GUIDANCE} id="minhal" onChange={this.handleInputChange} value={Constants.ADMINISTRATIONS.GUIDANCE} className="custom-control-input" />
                                <label className="custom-control-label" htmlFor="minhal">{EnumFunctions.AdministrationEnumToString(Constants.ADMINISTRATIONS.GUIDANCE)}</label>
                            </div>
                            <div className="input-form-radio custom-control custom-radio">
                                <input type="radio" name="type" id="guidance" checked={this.state.minhal.type === Constants.ADMINISTRATIONS.MINHAL} onChange={this.handleInputChange} value={Constants.ADMINISTRATIONS.MINHAL} className="custom-control-input"  />
                                <label className="custom-control-label" htmlFor="guidance">{EnumFunctions.AdministrationEnumToString(Constants.ADMINISTRATIONS.MINHAL)}</label>
                            </div>
                        </div>
        }

        return (
            <div id='MinhalForm' 
                 className="form-backgorund">
                <form  className="input-form" onSubmit={(e) => this.handleSubmit(e)}>                
                    <div className="form-title">{this.props.Title}</div>
                    <div className="form-group row">
                        <label htmlFor="title" className="col-sm-4 col-form-label">Title: </label>
                        <input type="text" className="form-control col-sm-6" onChange={this.handleInputChange} id="title" name="title" value={this.state.minhal.title ? this.state.minhal.title : ""} placeholder="Enter text"></input>
                    </div>
                    {chooseType}
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
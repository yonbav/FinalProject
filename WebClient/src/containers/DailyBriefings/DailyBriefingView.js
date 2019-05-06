import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';
import uploadIcon from '../../images/upload-icon.png';
import moment from 'moment';

class DailyBriefingView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            briefing: this.props.briefing ? this.props.briefing : {},
        };
        
        this.onFileChanged = this.onFileChanged.bind(this);
        this.onDateChanged = this.onDateChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {
        document.getElementById("dailyBreifingForm").scrollIntoView();
    }

    onFileChanged(event) {
        var currentFile = event.target.files[0];

        if (!currentFile)
        {
            alert("Failed to upload file");
            return;
        }

        let newBriefing = this.state.briefing
        newBriefing.DailyBriefImage = currentFile;
        newBriefing.image = currentFile.name;

        this.setState({briefing:newBriefing}); 
    }

    onDateChanged(newDate) {
        let newBriefing = this.state.briefing
        newBriefing.date =  newDate
        newBriefing.title = moment(newDate).format("D.M")
        this.setState({
            briefing: newBriefing,
        });
        
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.submitAction(this.state.briefing);
    }

    render() {
        return (
            <div id='dailyBreifingForm' 
                 className="form-backgorund">
                <form  className="input-form" onSubmit={(e) => this.handleSubmit(e)}>                
                    <div className="form-title">{this.props.Title}</div>
                    <div className="form-group row">
                        <label htmlFor="datePicker" className="col-sm-4 col-form-label">Date: </label>
                        <div style={{ padding:"0px"}} className="col-sm-6">
                            <DayPickerInput id="datePicker"
                                className="form-date-picker"
                                formatDate={formatDate}
                                parseDate={parseDate}
                                value={this.state.briefing.title}
                                placeholder="DD/MM/YYYY"
                                format="DD/MM/YYYY"
                                onDayChange={(date) => this.onDateChanged(date)}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label">File Upload:</label>
                        <input placeholder={this.state.briefing.image ? this.state.briefing.image : "choose file"} className="col-sm-5" disabled/>
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

export default DailyBriefingView;
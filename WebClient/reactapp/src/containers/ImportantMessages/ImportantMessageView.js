import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';

class ImportantMessageView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageTitle: this.props.messageTitle,
            content: this.props.content,
            date: this.props.date,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    componentDidMount() {
        document.getElementById("ImportantMessageForm").scrollIntoView();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.id;

        this.setState({
        [name]: value
        });
    }

    handleSubmit() {
        alert("Submit\n=======\n title: " + this.state.messageTitle + "\ncontent: " + this.state.content + "\nDate: " + this.state.date)
    }

    render() {
        return (
            <div id='ImportantMessageForm' className="form-backgorund">
                <form className="input-form" onSubmit={() => this.handleSubmit()}>                             
                <div className="form-title">{this.props.formTitle}</div>
                    <div className="form-group row">
                        <label htmlFor="messageTitle" className="col-sm-3 col-form-label">Title: </label>
                        <input type="text" className="form-control col-sm-8" onChange={this.handleInputChange} id="messageTitle" value={this.state.messageTitle} placeholder="Enter text"></input>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="content" className="col-sm-3 col-form-label">Content: </label>
                        <textarea className="form-control col-sm-8" id="content" onChange={this.handleInputChange} value={this.state.content} placeholder="Enter text" rows="5"></textarea>
                    </div>   
                    <div className="form-group row">
                        <label htmlFor="date" className="col-sm-3 col-form-label">Date: </label>
                        <div style={{ padding:"0px"}} className="col-sm-8">
                            <DayPickerInput id="datePicker"
                                formatDate={formatDate}
                                parseDate={parseDate}
                                value={this.state.date}
                                placeholder="DD/MM/YYYY"
                                format="DD/MM/YYYY"
                                onDayChange={(newDate) => {
                                    this.setState({
                                        date: newDate,
                                    });
                                }}
                            />
                        </div>
                    </div>
                    <div className="submit-button-div">                 
                        <button type="submit" className="submit-button btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>);
    }
}

export default ImportantMessageView;
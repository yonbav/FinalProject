import React, { Component } from 'react';

class ImportantMessageView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: this.props.message ? this.props.message : {} 
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

        let newMessage = this.state.message
        newMessage[name] = value;

        this.setState({
            message: newMessage
        });
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.submitAction(this.state.message);
    }

    render() {
        return (
            <div id='ImportantMessageForm' className="form-backgorund">
                <form className="input-form" onSubmit={(e) => this.handleSubmit(e)}>                             
                <div className="form-title">{this.props.formTitle}</div>
                    <div className="form-group row">
                        <label htmlFor="title" className="col-sm-3 col-form-label">Title: </label>
                        <input type="text" className="form-control col-sm-8" onChange={this.handleInputChange} id="title" value={this.state.message ? this.state.message.title : {}} placeholder="Enter text"></input>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="link" className="col-sm-3 col-form-label">Link: </label>
                        <input type="link" className="form-control col-sm-8" onChange={this.handleInputChange} id="link" value={this.state.message ? this.state.message.link : {}} placeholder="Enter link"></input>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="contect" className="col-sm-3 col-form-label">Content: </label>
                        <textarea className="form-control col-sm-8" id="contect" onChange={this.handleInputChange} value={this.state.message ? this.state.message.contect : {}} placeholder="Enter text" rows="5"></textarea>
                    </div>   
                    <div className="submit-button-div">                 
                        <button type="submit" className="submit-button btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>);
    }
}

export default ImportantMessageView;
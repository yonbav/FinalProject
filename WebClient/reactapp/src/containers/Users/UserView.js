import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';

class UserView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user ? this.props.user : {}
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

        let newUser = this.state.user
        newUser[name] = value;

        this.setState({
            user: newUser
        });
    }

    handleSubmit() {
        var jsonResult = JSON.stringify(this.state.user);
        alert("Submit\n=======\nuser: " + jsonResult    );
    }

    render() {
        return (
            <div id='ImportantMessageForm' className="form-backgorund">
                <form className="input-form" onSubmit={() => this.handleSubmit()}>                             
                <div className="form-title">{this.props.formTitle}</div>
                    <div className="form-group row">
                        <label htmlFor="firstname" className="col-sm-3 col-form-label">First Name: </label>
                        <input type="text" className="form-control col-sm-8" onChange={this.handleInputChange} id="firstname" value={this.state.user.firstname} placeholder="Enter first name"></input>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="lastname" className="col-sm-3 col-form-label">Last Name: </label>
                        <input type="text" className="form-control col-sm-8" onChange={this.handleInputChange} id="lastname" value={this.state.user.lastname} placeholder="Enter last name"></input>
                    </div>   
                    <div className="form-group row">
                        <label htmlFor="id" className="col-sm-3 col-form-label">ID: </label>
                        <input type="text" className="form-control col-sm-8" onChange={this.handleInputChange} id="id" value={this.state.user.id} placeholder="000111000"></input>
                    </div>   
                    <div className="form-group row">
                        <label htmlFor="password" className="col-sm-3 col-form-label">Password: </label>
                        <input type="text" className="form-control col-sm-8" onChange={this.handleInputChange} id="password" value={this.state.user.password} placeholder="Enter password"></input>
                    </div>                       
                    <div className="form-group row">
                        <label htmlFor="birthday" className="col-sm-3 col-form-label">Birthday: </label>
                        <div id="birthday" style={{ padding:"0px"}} className="col-sm-8">
                            <DayPickerInput id="datePicker"
                                formatDate={formatDate}
                                parseDate={parseDate}
                                value={this.state.user.birthday}
                                placeholder="DD/MM/YYYY"
                                format="DD/MM/YYYY"
                                onDayChange={(newBirthday) => {
                                    let newUser = this.state.user
                                    newUser.birthday = newBirthday;                            
                                    this.setState({
                                        user: newUser
                                    });
                                }}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="authorization" className="col-sm-3 col-form-label">authorization: </label>
                        <input type="text" className="form-control col-sm-8" onChange={this.handleInputChange} id="authorization" value={this.state.user.authorization} placeholder="Enter authorization"></input>
                    </div>   
                    <div className="form-group row">
                        <label htmlFor="gender" className="col-sm-3 col-form-label">Gender: </label>
                        <input type="text" className="form-control col-sm-8" onChange={this.handleInputChange} id="gender" value={this.state.user.gender} placeholder="Enter gender"></input>
                    </div>   
                    <div className="form-group row">
                        <label htmlFor="phone_number" className="col-sm-3 col-form-label">Phone: </label>
                        <input type="phone" className="form-control col-sm-8" onChange={this.handleInputChange} id="phone_number" value={this.state.user.phone_number} placeholder="Enter phone number"></input>
                    </div>   
                    <div className="form-group row">
                        <label htmlFor="branch" className="col-sm-3 col-form-label">Branch: </label>
                        <input type="text" className="form-control col-sm-8" onChange={this.handleInputChange} id="branch" value={this.state.user.branch} placeholder="Enter branch"></input>
                    </div>   
                    <div className="submit-button-div">                 
                        <button type="submit" className="submit-button btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>);
    }
}

export default UserView;
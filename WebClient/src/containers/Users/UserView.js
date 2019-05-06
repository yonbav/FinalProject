import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';
import {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';

class UserView extends Component {
    constructor(props) {
        super(props);
        this.state = { user: this.props.user ? this.props.user : {} };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDateChanged = this.onDateChanged.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }    

    componentDidMount() {
        document.getElementById("ImportantMessageForm").scrollIntoView();
    }

    onDateChanged(newDate) {
        let newUser = this.state.user
        newUser.birthday = moment(newDate).format("DD/MM/YYYY");                            
        this.setState({
            user: newUser
        });   
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let newUser = this.state.user
        newUser[name] = value;

        this.setState({
            user: newUser
        });
    }

    handleSubmit(e) {
        e.preventDefault(); 
        this.props.submitAction(this.state.user);
    }

    render() {
        return (
            <div id='ImportantMessageForm' className="form-backgorund">
                <form className="input-form needs-validation" noValidate onSubmit={(e) => this.handleSubmit(e)}>                             
                <div className="form-title">{this.props.formTitle}</div>
                    <div className="form-group row">
                        <label htmlFor="firstname" className="col-sm-3 col-form-label">First Name: </label>
                        <input type="text" className="form-control col-sm-8" onChange={this.handleInputChange} name="firstname" id="firstname" value={this.state.user.firstname} placeholder="Enter first name"></input>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="lastname" className="col-sm-3 col-form-label">Last Name: </label>
                        <input type="text" className="form-control col-sm-8" onChange={this.handleInputChange} name="lastname" id="lastname" value={this.state.user.lastname} placeholder="Enter last name"></input>

                    </div>
                    <div className="form-group row">
                        <label htmlFor="id" className="col-sm-3 col-form-label">ID: </label>
                        <input type="text" className="form-control col-sm-8" onChange={this.handleInputChange} name="id" id="id" value={this.state.user.id} placeholder="000111000"></input>
                    </div>   
                    <div className="form-group row">
                        <label htmlFor="birthday" className="col-sm-3 col-form-label">Birthday: </label>
                        <div id="birthday" name="birthday" style={{ padding:"0px"}} className="col-sm-8">
                            <DayPickerInput id="datePicker"
                                className="form-date-picker"
                                formatDate={formatDate}
                                parseDate={parseDate}
                                value={this.state.user.birthday}
                                placeholder="DD/MM/YYYY"
                                format="DD/MM/YYYY"
                                onDayChange={(date) => this.onDateChanged(date)}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="authorization" className="col-sm-3 col-form-label">authorization: </label>
                        <div className="input-form-radio custom-control custom-radio">
                            <input type="radio" name="authorization" checked={this.state.user.authorization === "1"} id="user" onChange={this.handleInputChange} value={1} className="custom-control-input" />
                            <label className="custom-control-label" htmlFor="user">User</label>
                        </div>
                        <div className="input-form-radio custom-control custom-radio">
                            <input type="radio" name="authorization" id="manager" checked={this.state.user.authorization === "3"} onChange={this.handleInputChange}  value={3} className="custom-control-input"  />
                            <label className="custom-control-label" htmlFor="manager">Manager</label>
                        </div>
                        <div className="input-form-radio custom-control custom-radio">
                            <input type="radio" name="authorization" id="supervizer" checked={this.state.user.authorization === "5"} onChange={this.handleInputChange} value={5} className="custom-control-input"  />
                            <label className="custom-control-label" htmlFor="supervizer">Supervizer</label>
                        </div>
                    </div>
                    {
                        this.props.isShowPassword ? 
                    (<div className="form-group row">
                        <label htmlFor="password" className="col-sm-3 col-form-label">Password: </label>
                        <input type="text" className="form-control col-sm-8" onChange={this.handleInputChange} name="password" id="password" value={this.state.user.password} placeholder="Enter password"></input>
                    </div>) : <div/>
                    }
                    <div className="form-group row">
                        <label htmlFor="phone_number" className="col-sm-3 col-form-label">Phone: </label>
                        <input type="phone" className="form-control col-sm-8" onChange={this.handleInputChange} name="phone_number" id="phone_number" value={this.state.user.phone_number} placeholder="Enter phone number"></input>
                    </div>                       
                    <div className="form-group row">
                        <label htmlFor="gender" className="col-sm-3 col-form-label">Gender: </label>
                        <div className="input-form-radio custom-control custom-radio">
                            <input type="radio" name="gender" id="female" checked={this.state.user.gender === "female"} onChange={this.handleInputChange} value="female" className="custom-control-input" />
                            <label className="custom-control-label" htmlFor="female">Female</label>
                        </div>
                        <div className="input-form-radio custom-control custom-radio">
                            <input type="radio" name="gender" id="male" checked={this.state.user.gender === "male"} onChange={this.handleInputChange} value="male" className="custom-control-input"  />
                            <label className="custom-control-label" htmlFor="male">Male</label>
                        </div>
                    </div>   
                    <div className="form-group row">
                        <label htmlFor="branch" className="col-sm-3 col-form-label">Branch: </label>
                        <input type="text" className="form-control col-sm-8" onChange={this.handleInputChange} name="branch" id="branch" value={this.state.user.branch} placeholder="Enter branch"></input>
                    </div>   
                    <div className="submit-button-div">                 
                        <button type="submit" className="submit-button btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>);
    }
}

export default withRouter(UserView);
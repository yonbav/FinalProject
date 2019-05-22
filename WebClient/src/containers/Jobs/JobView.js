import React, { Component } from 'react';

class JobView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            job: this.props.job ? this.props.job : {} 
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    componentDidMount() {
        document.getElementById("JobForm").scrollIntoView();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.id;

        let newJob = this.state.job
        newJob[name] = value;

        this.setState({
            job: newJob
        });
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.submitAction(this.state.job);
    }

    render() {
        return (
            <div id='JobForm' className="form-backgorund">
                <form className="input-form" onSubmit={(e) => this.handleSubmit(e)}>                             
                <div className="form-title">{this.props.formTitle}</div>
                    <div className="form-group row">
                        <label htmlFor="title" className="col-sm-3 col-form-label">Title: </label>
                        <input type="text" className="form-control col-sm-8" onChange={this.handleInputChange} id="title" value={this.state.job ? this.state.job.title : {}} placeholder="Enter text"></input>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="number" className="col-sm-3 col-form-label">Salary: </label>
                        <input type="number" className="form-control col-sm-8" id="number" onChange={this.handleInputChange} value={this.state.job ? this.state.job.number : {}} placeholder="Enter Salary"></input>
                    </div>   
                    <div className="submit-button-div">                 
                        <button type="submit" className="submit-button btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>);
    }
}

export default JobView;
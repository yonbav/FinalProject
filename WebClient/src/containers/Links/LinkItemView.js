import React, {Component} from 'react';

class LinkItemView extends Component {
    constructor(props) {
        super(props);
        this.state = {linkItem: this.props.linkItem ? this.props.linkItem : {}};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    componentDidMount() {
        document.getElementById("LinkView").scrollIntoView();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.id;

        let newLinkItem = this.state.linkItem
        newLinkItem[name] = value;

        this.setState({
            linkItem: newLinkItem
        });
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.submitAction(this.state.linkItem);
    }

    render() {
        return (
            <div id='LinkView' className="form-backgorund">
                <form className="input-form" onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="form-title">{this.props.formTitle}</div>
                    <div className="form-group row">
                        <label htmlFor="title" className="col-sm-3 col-form-label">Title: </label>
                        <input type="text" className="form-control col-sm-8" onChange={this.handleInputChange} id="title" value={this.state.linkItem ? this.state.linkItem.title : {}} placeholder="Enter title"></input>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="url" className="col-sm-3 col-form-label">Link: </label>
                        <input type="url" className="form-control col-sm-8" onChange={this.handleInputChange} id="url" value={this.state.linkItem ? this.state.linkItem.url : {}} placeholder="Enter link"></input>
                    </div>
                    <div className="submit-button-div">
                        <button type="submit" className="submit-button btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>);
    }
}

export default LinkItemView
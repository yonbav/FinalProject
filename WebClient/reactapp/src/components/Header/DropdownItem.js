import React, { Component } from 'react';

class DropDownItem extends Component {
    constructor(props)
    {
        super(props);
        this.state = {};
    }

    render() {
        return(
            <div className="dropdown">
                <button type="button" className="btn-header btn-warning dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.props.MainLabel}
                </button>

                <ul className="dropdown-menu dropdown-menu-right">
                    <li className="dropdown-item" href={this.props.href_1}>{this.props.Label_1}</li>
                    <div className="dropdown-divider"></div>
                    <li className="dropdown-item" href={this.props.href_2}>{this.props.Label_2}</li>
                    <div className="dropdown-divider"></div>
                    <li className="dropdown-item" href={this.props.href_3}>{this.props.Label_3}</li>
                </ul>
            </div>
      )
    }    
}

export default DropDownItem
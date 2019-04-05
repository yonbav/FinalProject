import React, { Component } from 'react';

class DropDownItem extends Component {
    constructor(props)
    {
        super(props);
        this.state = {};
    }

    render() {
        return(
            <div class="dropdown">
                <button type="button" class="btn-header btn-warning dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.props.MainLabel}
                </button>

                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <a class="dropdown-item" href={this.props.href_1}>{this.props.Label_1}</a>
                    <a class="dropdown-item" href={this.props.href_2}>{this.props.Label_2}</a>
                    <a class="dropdown-item" href={this.props.href_3}>{this.props.Label_3}</a>
                </div>
            </div>
      )
    }    
}

export default DropDownItem
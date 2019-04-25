import React, { Component } from 'react';
import { Link } from "react-router-dom";

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

                <div className="dropdown-menu dropdown-menu-right">
                    {this.props.Label_1 ?  <Link className="dropdown-item" to={{pathname: this.props.Link_1}}>{this.props.Label_1}</Link> : null}
                    {this.props.Label_1 ? <div className="dropdown-divider"></div>: null}
                    {this.props.Label_2 ?  <Link className="dropdown-item" to={{pathname: this.props.Link_2}}>{this.props.Label_2}</Link> : null}
                    {this.props.Label_2 ?  <div className="dropdown-divider"></div> : null}
                    {this.props.Label_3 ?  <Link className="dropdown-item" to={{pathname: this.props.Link_3}}>{this.props.Label_3}</Link> : null}
                    {this.props.Label_3 ?  <div className="dropdown-divider"></div> : null}
                </div>
            </div>
      )
    }    
}

export default DropDownItem
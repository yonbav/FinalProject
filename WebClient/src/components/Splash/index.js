import React from 'react'
import CircularProgress from '../CircularProgress'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { Component } from 'react'

class Splash extends Component {
    render() {
        return (
            <div>
                {
                    this.props.fullLoader && this.props.fullLoader.flag && 
                    <div style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 100}}>
                        <div className="splash-loader">
                            <CircularProgress/>
                            <small style={
                                {
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: 'translate(-50%, 30px)',
                                }
                            }>{this.props.fullLoader.text}</small>
                        </div>
                    </div>
                }                
            </div>
        )
    }
}
const mapStateToProps = ({ui}) => {
    const { fullLoader} = ui;
    return {fullLoader}
};
export default withRouter(connect(mapStateToProps, {})(Splash));
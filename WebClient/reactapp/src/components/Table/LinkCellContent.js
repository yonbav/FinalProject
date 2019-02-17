import React, { Component } from 'react'
import { getTextStyle } from '../../Utils/MyStyleUtil'


class TextCellContent extends Component {
    constructor(props) {
        super(props)
        this.state = {textStyle:'black'}
    }

    componentWillUpdate() {
        this.setState((prevState, prop) => {
            let newStyle = getTextStyle(this.props.data, this.props.mainKey);
            if (prevState.textStyle === newStyle)
                return;

            return ({ textStyle: newStyle })
        });
    }

    render() {
        const generateContent = () => {
            if (typeof this.props.data === 'object'){
                const keys = Object.keys(this.props.data);
                return keys.map((key, index) => {
                    if (key === this.props.mainKey){
                        return  <div key={index}>
                                    { (this.props.data[key] === null ||  this.props.data[key] === "") ? '-' : this.props.data[key]}<br/>
                                </div>
                    }else if(this.props.displayKeys.indexOf(key) > -1){
                        if (this.props.data[key] !== ""){
                            return  <small key={index}>{this.props.data[key]}<br/></small>
                        }else{
                            return '';
                        }                        
                    }else{
                        return ''
                    }
                })
            }else{
                return this.props.data === "" ? '-' : this.props.data;
            }
        }
        return <div className={this.state.textStyle}>
                    {generateContent()}
                </div>
    }
}

export default TextCellContent;

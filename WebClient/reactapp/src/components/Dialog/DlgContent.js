import React, { Component } from 'react'

class DlgContent extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const generateContent = () => {
            console.log("Opening configuration form.");
            const keys = Object.keys(this.props.data);
            return keys.map((key) => {
                return (
                    <div>
                        <p className="mb-0">{key}</p>
                        <p className="mb-3 font-10">{this.props.data[key]}</p>
                    </div>
                )
            })
        }

        const generateEmptyContent = () => {
            console.log("Configuration is undefined opening empty form.");
            return (
                <div>
                    <p className="mt-1">"No configuration defined"</p>
                </div>
            )
        }

        let isConfigurationEmpty = this.props.data === undefined || Object.keys(this.props.data).length === 0

        return <div className="text-center">{ isConfigurationEmpty ? generateEmptyContent() : generateContent() }</div>
    }
}

export default DlgContent;

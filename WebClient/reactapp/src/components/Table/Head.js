import React, { Component } from 'react';
import HeadCell from './HeadCell';
import KeyCell from './KeyCell';

class Head extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }
    
    render() {

        const generateHeadCell = () => {
            if(this.props.monitorData.length === 0){
                return <th></th>;
            }
            return this.props.monitorData[0].map((element, index) => {
                if (index === 0){
                    return <KeyCell title={element} key={index}/>
                }
                return <HeadCell title={element} index={index} key={index} />
            });
        }

        return (
            <thead>
                <tr>
                    {generateHeadCell()}
                </tr>
            </thead>
        )
    }
}

export default Head;

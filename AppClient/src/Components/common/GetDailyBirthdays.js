import React ,{Component} from 'react';
import {Text} from 'react-native';



export default class GetDailyBirthdays extends Component{
    constructor() {
        super();
        this.state = {
            index: 0,
            Birthday:""
        }
    }

    componentDidMount() {
        if(initialArr.length ==0)
            this.setState({
                Birthday: "אין ימי הולדת היום."
            });
        else {
            setInterval(() => {

                this.setState({
                    Birthday: initialArr[this.state.index % (initialArr.length)].text
                });

                this.state.index++;
            }, 1500)
        }
    }
    componentWillUnmount() {
        clearInterval();
        this.setState({
            index: 0
        });    }
    render() {
        return(
                <Text style={styles.labelStyle}>
                    {this.state.Birthday} {"\n"}
                    {this.state.Birthday}{"\n"}
                    {this.state.Birthday}{"\n"}
                    {this.state.Birthday}

                </Text>
        );
    }
};
const styles = {
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1,
        color: '#000',
    }
};
const initialArr =[{
    id:1,
    text: "7.9",
},
    {
        id:2,
        text: "6.9",
    },
    {
        id:3,
        text: "5.9",
    },
    {
        id:4,
        text: "4.9",
    }
];


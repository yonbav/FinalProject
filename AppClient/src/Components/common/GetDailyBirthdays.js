import React ,{Component} from 'react';
import {Text,View , TouchableOpacity, Image, ActivityIndicator,Alert} from 'react-native';



export default class GetDailyBirthdays extends Component{
    constructor() {
        super();
        this.state = {
            Birthday:""
        }
    }

    componentDidMount() {
        setInterval( () => {
            this.setState( ({
                Birthday:  initialArr.map(b => {
                    return  b.text;
                })
                })
            )
        })
    }
    render() {
        return(
                <Text style={styles.labelStyle}>
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


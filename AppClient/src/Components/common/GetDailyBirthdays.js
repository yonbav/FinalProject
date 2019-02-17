import React ,{Component} from 'react';
import {Text} from 'react-native';
import axios from 'axios';



export default class GetDailyBirthdays extends Component{
    constructor() {
        super();
        this.state = {
            index: 0,
            Firstname:"",
            Lastname:"",
            Branch:"",

        };
        this.componentDidMount = this.componentDidMount.bind(this);

    }
    componentDidMount() {
        var x = {};
        axios.get('http://192.168.1.32:3000/getBD').then(function (res) {
             x = res.data;
        });
            if(x === null)
                this.setState({
                    Firstname: "אין ימי הולדת היום."
                });
            else {
                setInterval(() => {
                    var y = this.state.index % (x.length);
                    this.setState({
                        Firstname: x[y].firstname,
                        Lastname: x[y].lastname,
                        Branch: "("+x[y].branch+")"
                    });

                    this.state.index++;
                }, 1500)
            }}






    componentWillUnmount() {
        this.setState({
            index: 0
        });
    }
    render() {
        return(
                <Text style={styles.labelStyle} >
                    {this.state.Firstname} {this.state.Lastname} {this.state.Branch}
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


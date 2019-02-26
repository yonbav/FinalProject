import React ,{Component} from 'react';
import {Text} from 'react-native';
import axios from 'axios';



export default class GetDailyBirthdays extends Component{
    constructor() {
        super();
        this.state = {
            data: [],
            Firstname: "",
            Lastname: "",
            Branch: "",
            index: 0

        };
        this.GetData = this.GetData.bind(this)

    }
    GetData() {
        axios.get('http://192.168.1.40:3000/getBD')
            .then(result => {
                if(result.data.length === 0)
                this.setState({
                    Firstname: "אין ימי הולדת היום."
                });
            else {
                    this.setState({
                        Firstname: result.data[0].firstname,
                        Lastname: result.data[0].lastname,
                        Branch: "("+result.data[0].branch+")"
                    });
                setInterval(() => {
                    var y = this.state.index % (result.data.length);
                    this.setState({
                        Firstname: result.data[y].firstname,
                        Lastname: result.data[y].lastname,
                        Branch: "("+result.data[y].branch+")"
                    });

                    this.state.index++;
                }, 1500)
            }})

    }
    componentDidMount() {
        this.GetData();
    }
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


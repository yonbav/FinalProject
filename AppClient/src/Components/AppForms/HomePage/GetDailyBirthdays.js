import React ,{Component} from 'react';
import {ActivityIndicator, Text} from 'react-native';
import axios from 'axios';



class GetDailyBirthdays extends Component{
    constructor() {
        super();
        this.state = {
            data: [],
            Firstname: "",
            Lastname: "",
            Branch: "",
            index: 0,
            myInterval: null,
            loading: false
        };
        this.GetData = this.GetData.bind(this)

    }
    GetData() {
                axios.get('http://185.56.74.46:3000/getBD', { headers: { token: this.props.user.token } })
                    .then(result => {
                        if (result.data.length === 0)
                            this.setState({
                                Firstname: "אין ימי הולדת היום.",
                                loading: true
                            });
                        else {
                            this.setState({
                                Firstname: result.data[0].firstname,
                                Lastname: result.data[0].lastname,
                                Branch: "(" + result.data[0].branch + ")",
                                loading: true
                            });
                            this.state.myInterval = setInterval(() => {
                                var y = this.state.index % (result.data.length);
                                this.setState({
                                    Firstname: result.data[y].firstname,
                                    Lastname: result.data[y].lastname,
                                    Branch: "(" + result.data[y].branch + ")"
                                });

                                this.state.index++;
                            }, 1500)
                        }
        })

    }
     componentDidMount() {
         this.GetData();
    }
    componentWillUnmount() {
        clearInterval(this.state.myInterval);
    }

    render() {
        if(this.state.loading) {
            return (
                <Text style={styles.labelStyle}>
                    {this.state.Firstname} {this.state.Lastname} {this.state.Branch}
                </Text>
            );
        }
        else{
            return (
                <ActivityIndicator size="large" color="#000" />
            );
        }
    }
};

const styles = {
    labelStyle: {
        alignSelf: 'center',
        color:'#000',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10

    }
};
export default GetDailyBirthdays;

import React ,{Component} from 'react';
import {Text} from 'react-native';
import axios from 'axios';
import {connect} from "react-redux";
import {loginuser} from "../../actions/actions";
import Actions from "../../../reducers/reducers";



class GetDailyBirthdays extends Component{
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
        axios.post("http://192.168.1.32:3000/Auth/CheckToken",{
            id: this.props.user.id,
            token: this.props.user.token,
        }).then((res)=> {
            if(res.data.success === true) {
                axios.get('http://192.168.1.32:3000/getBD')
                    .then(result => {
                        if (result.data.length === 0)
                            this.setState({
                                Firstname: "אין ימי הולדת היום."
                            });
                        else {
                            this.setState({
                                Firstname: result.data[0].firstname,
                                Lastname: result.data[0].lastname,
                                Branch: "(" + result.data[0].branch + ")"
                            });
                            setInterval(() => {
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
            else{Actions.auth()}
        })

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
const mapStateToProps =  state =>{
    return {
        user: state.auth.user
    };
};
const styles = {
    labelStyle: {
        alignSelf: 'center',
        color:'#fff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10

    }
};
export default connect(mapStateToProps,{loginuser})(GetDailyBirthdays);



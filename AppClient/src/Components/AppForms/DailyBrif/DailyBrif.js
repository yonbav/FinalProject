import React,{Component} from 'react'
import {Keyboard, Text, TouchableOpacity, View} from 'react-native';
import {Actions} from "react-native-router-flux";
import Header from "../../common/Header";
import axios from "axios";

class DailyBrif extends Component {

    constructor() {
        super();
        this.state = {
            data: [],

        };
        this.GetData = this.GetData.bind(this);
        this.renderButtons = this.renderButtons.bind(this);

    }

    GetData() {
        axios.get('http://192.168.1.32:3000/daily/')
            .then(result => {
                this.setState({
                    data: result.data
                });
            })

    }
    componentDidMount() {
        this.GetData();
        Keyboard.dismiss();
    }

    renderButtons() {
        return this.state.data.map((item) => {
            if(item ===this.state.data[0]) {
                return (
                    <View key={item._id} style={styles.containerStyle}>

                        <TouchableOpacity key={item._id} style={[styles.buttonStyleBack,{width:350}]} onPress={() =>
                            Actions.pdf({url: "http://192.168.1.32:3000/"+item.image ,
                            title: item.title , user: this.props.user})}>
                            <Text style={styles.buttonStyleText}> {item.title}</Text>
                        </TouchableOpacity>
                    </View>
                );
            }
            else{
                return (
                    <View key={item._id} style={styles.containerStyle}>
                        <TouchableOpacity key={item._id} style={[styles.buttonStyleBack,{width:250}]} onPress={() =>
                            Actions.pdf({url: "http://192.168.1.32:3000/"+item.image ,
                                title: item.title , user: this.props.user})}>
                            <Text style={styles.buttonStyleText}> {item.title}</Text>
                        </TouchableOpacity>
                    </View>
                );
            }

        });

    }

    render() {
        return (
            <View style={styles.BackStyle}>
                <View>
                <Header name="תדריך יומי"/>
                </View>
                {this.renderButtons()}
            </View>

        );
    }
}
const styles = {
    BackStyle: {
        paddingTop:100,
        backgroundColor: "#ffc68e",
        paddingBottom: 800
    },
    buttonStyleBack:{
        margin:5,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width:250,
        borderWidth: 1,
        borderRadius:30,
        backgroundColor: "#fff",
        borderColor:'#FF7802',

    },
    buttonStyleText:{
        alignSelf: 'center',
        color:'#050002',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    containerStyle:{
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#ffc68e',
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor: '#ffc68e',
        position: 'relative',
        margin: 10,

    },
    containerStyle2:{
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#ffc68e',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ffc68e',
        position: 'relative',
        margin: 10,
        paddingLeft:20,
        paddingRight: 20

    }
}

export default DailyBrif;

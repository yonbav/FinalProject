import React,{Component} from 'react'
import { Text, View} from 'react-native';
import Header from "../../common/Header";
import axios from "axios";

class Jobs extends Component {
    constructor() {
        super();
        this.state = {
            num: 0,
            data: []
        };
        this.getResponse = this.getResponse.bind(this)

    }
    getResponse(result){
        this.setState({
            data: result
        });
    }
    GetData() {
        axios.get('http://192.168.1.34:3000/jobs/')
            .then(result => {
                this.setState({
                    data: result.data
                });
            })

    }
    componentDidMount() {
        this.GetData();
    }
    renderButtons() {
        return this.state.data.map((item) => {
                return (
                    <View key={item._id} style={styles.buttonStyleBack}>
                        <Text style={styles.buttonStyleText}>{item.title} {item.number}
                        </Text>
                    </View>
                );
            });

    }

    render() {
        return (
            <View style={styles.BackStyle}>

                <View>
                    <Header name="חבר מביא חבר"/>
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
        paddingBottom: 800,
    },
    buttonStyleBack:{
        margin:5,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width:400,
        borderWidth: 1,
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
};

export default Jobs;
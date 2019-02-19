import React ,{Component} from 'react';
import {Text, View , ScrollView,Dimensions,StatusBar} from 'react-native';
import axios from 'axios';
import Header from "../../common/Header";
import { SearchBar } from 'react-native-elements';

const {width, height} = Dimensions.get('window');
const metrics = {
    screenWidth: width < height ? width : height,
    screenHeight: width < height ? height : width,
};
export default class Birthdays extends Component{
    constructor() {
        super();
        this.state = {
            data: [],
            search: '',
            screenHeight: 0

        };
        this.GetData = this.GetData.bind(this);
        this.renderButtons = this.renderButtons.bind(this);

    }

    updateSearch = search => {
        this.setState({ search });
    };
    GetData() {
        axios.get('http://192.168.1.32:3000/getBirthdays')
            .then(result => {
                this.setState({
                        data: result.data
                    })
                })

    }
    componentDidMount() {
        this.GetData();
    }
    renderButtons() {
        if(this.state.search === '') {
            return this.state.data.map((item) => {
                return (
                    <View key={item._id} style={styles.buttonStyleBack}>
                        <Text style={styles.buttonStyleText}>{item.firstname} {item.lastname} {item.birthday}
                        </Text>
                    </View>
                );

            });
        }
        else
        {
            const newData = this.state.data.filter(item=>
                item.firstname.includes(this.state.search)
            );
            return newData.map((item) => {
                return (
                    <View key={item._id} style={styles.buttonStyleBack}>
                        <Text style={styles.buttonStyleText}>{item.firstname} {item.lastname} {item.birthday}
                        </Text>
                    </View>
                );

            });
        }

    }

    render() {
        return (
                <ScrollView  contentContainerStyle={{height: metrics.screenHeight + StatusBar.currentHeight}}>

            <View style={styles.BackStyle}>
                <View>
                    <Header name="ימי הולדת"/>
                </View>
                <SearchBar
                    placeholder="כתוב כאן.."
                    onChangeText={this.updateSearch}
                    lightTheme
                    value={this.state.search}
                />
                {this.renderButtons()}
            </View>
            </ScrollView>

        );
    }

};
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


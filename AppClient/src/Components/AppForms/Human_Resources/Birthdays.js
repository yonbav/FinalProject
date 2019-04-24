import React ,{Component} from 'react';
import {Text, View , ScrollView,Dimensions,StatusBar} from 'react-native';
import axios from 'axios';
import Header from "../../common/Header";
import { SearchBar } from 'react-native-elements';
import CardBirthdayFormat from "../../common/CardBirthdayFormat";

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
        axios.get('http://192.168.1.34:3000/getBirthdays')
            .then(result => {
                this.setState({
                        data: result.data.filter(item=>
                            item.firstname = item.firstname +' ' + item.lastname
                        ),
                    });
            })

    }
    componentDidMount() {
        this.GetData();
    }
    renderButtons() {
        if(this.state.search === '') {
            return this.state.data.map((item) => {
                return (
                    <CardBirthdayFormat key={item._id} name={item.firstname} other={item.birthday}/>
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
                    <CardBirthdayFormat key={item._id} name={item.firstname} other={item.birthday}/>
                );

            });
        }

    }

    render() {
        return (
            <ScrollView style={{flex:1, backgroundColor: "#ffc68e",}}>
            <View style={styles.BackStyle}>
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
        backgroundColor: "#ffc68e",
        flex:1
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

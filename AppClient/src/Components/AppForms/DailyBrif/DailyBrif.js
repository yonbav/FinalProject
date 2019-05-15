import React,{Component} from 'react'
import {
    ActivityIndicator,
    Alert,
    AsyncStorage,
    FlatList,
    Keyboard,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import axios from "axios";
import {connect} from "react-redux";
import MainHeader from "../../common/MainHeader";
import MessageFormat2 from "../Messages/MessageFormat2";
import MessageFormat3 from "../Messages/MessageFormat3";
import SalesFormat from "../HomePage/SalesFormat";
import DailyBirthdayFormat from "../HomePage/DailyBirthdayFormat";

class DailyBrif extends Component {

    constructor() {
        super();
        this.state = {
            data: [],
            loading: false,
            stories: [{id: 1}],
            isFetching:false
        };
        this.GetData = this.GetData.bind(this);
        this.renderButtons = this.renderButtons.bind(this);

    }
    onRefresh(){
        this.setState({isFetching:true})
        {this.GetData()}
        this.setState({isFetching:false})

    }

    async GetData() {
        const value = await AsyncStorage.getItem('id_token');
        axios.get('http://192.168.43.209:3000/daily/',{ headers: { token: value} })
            .then(result => {
                if(result.data.success === false){
                    this.setState({
                        loading: true
                    });
                    Alert.alert(
                        'הודעת אבטחה',
                        'אין הרשאות נא פנה לנציג',
                    )
                }else{
                    this.setState({
                        data: result.data,
                        loading: true
                    });
                }
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
                        <MessageFormat2 key={item._id} url={"http://192.168.43.209:3000/Information/"+item.image} title= {item.title}  user={this.props.user}
                                        navigation={this.props.navigation}/>
                );
            }
            else{
                return (
                    <MessageFormat3 key={item._id} url={"http://192.168.43.209:3000/Information/"+item.image} title= {item.title}  user={this.props.user}
                                    navigation={this.props.navigation}/>
                );
            }

        });

    }
    _renderItem = () => (
        <ScrollView>
            {this.renderButtons()}
        </ScrollView>

    )

    render() {
        if(this.state.loading === true) {
            return (
                <View style={styles.BackStyle}>
                    <MainHeader/>
                    <FlatList
                        onRefresh={() => this.onRefresh()}
                        refreshing={this.state.isFetching}
                        data={this.state.stories}
                        keyExtractor={(item) => item.toString()}
                        renderItem={this._renderItem}
                    />
                </View>

            );
        }
        else{
            return (
            <View style={styles.BackStyle}>
                <MainHeader/>
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#000"/></View>
            </View>);
        }
    }
}
const styles = {
    BackStyle: {
        flex:1,
        backgroundColor: "#ffc68e",
    },
    loading:{
        alignItems: 'center',
        alignSelf: 'center',
        paddingTop: 500
    }
}

const mapStateToProps =  state =>{
    return {
        user: state.auth.user
    };
};
export default connect(mapStateToProps)(DailyBrif);
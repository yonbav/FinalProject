import React,{Component} from 'react'
import {ActivityIndicator, Alert, AsyncStorage, Dimensions, FlatList, Keyboard, ScrollView, View} from 'react-native';
import api from '../../../api.js';
import API_URL from "../../../apiUrl";
import {connect} from "react-redux";
import MainHeader from "../../common/MainHeader";
import MessageFormat2 from "../Messages/MessageFormat2";
import MessageFormat3 from "../Messages/MessageFormat3";
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

        api.get(`${API_URL.GET_ALL_DAILY_BRIEFINGS}`).then(result => {
                if(result.data){
                    this.setState({
                        data: result.data,
                        loading: true
                    });
                }
            }).catch(()=>{
            this.setState({
                loading: true
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
                        <MessageFormat2 key={item._id} url={`${API_URL.SERVER_URL}${API_URL.PDF_FOLDER_NAME}${item.image}`}
                                        title= {item.title}  user={this.props.user}
                                        navigation={this.props.navigation}/>
                );
            }
            else{
                return (
                    <MessageFormat3 key={item._id} url={`${API_URL.SERVER_URL}${API_URL.PDF_FOLDER_NAME}${item.image}`}
                                    title= {item.title}  user={this.props.user}
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
    renderbody =()=>{
        if(this.state.loading === true) {
            return (
                <View>
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
            return (<View>
                <View style={styles.loading}><ActivityIndicator size="large" color="#000"/></View>
            </View>);}
    }

    render() {
        return (
       <View style={styles.BackStyle}>
           {this.renderbody()}
       </View>
        )
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
        paddingTop:  ((Dimensions.get('window').height)/4)*3
    }
}

const mapStateToProps =  state =>{
    return {
        user: state.auth.user
    };
};
export default connect(mapStateToProps)(DailyBrif);
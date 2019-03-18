import React,{Component} from 'react'
import {Text,View,Image,Keyboard, TouchableOpacity,FlatList} from "react-native";
import Applogo from "../../common/Applogo";
import Button from 'react-native-button';
import {Actions} from "react-native-router-flux";
import GetDailyBirthdays from "./GetDailyBirthdays";
import Messeges from "../Messages/Messeges";
import Sales from "./Sales";
import UsernameClick from "./UsernameClick";
import Mail from "./Mail";
import axios from "axios";

class HomePage extends Component{
    constructor() {
        super();
        this.state = {
            num: 0,
            SalesData: [],
            stories: [{id: 1}],
            isFetching:false
        };
        this.getResponse = this.getResponse.bind(this);
        this.getResponse2 = this.getResponse2.bind(this);
    }
    async getResponse(result) {
        await this.setState({
            num: result
        });
    }
    getResponse2(result){
        this.setState({
            SalesData: result
        });
    }
    GetData=()=> {
        axios.post("http://192.168.43.209:3000/Message/unreadCount",{
            id: this.props.user.id
        }).then((res)=> {
            this.setState({num:res.data.docs})
        })
    }
    onRefresh(){
        this.setState({isFetching:true})
        {this.GetData()}
        this.setState({isFetching:false})

    }
    componentDidMount() {
        Keyboard.dismiss();
    }
    mixFunction=()=>{
        Actions.Messages({id: this.props.user.id,messages: this.state.num});
        this.getResponse(0);
    }
    renderManager(){
        if(this.props.user.authorization > 2)
        {
            return(<Button
                onPress={() => {Actions.ManagerTraining()}}
                containerStyle ={styles.buttonStyleBack}
                style={styles.buttonStyleText}>
                הדרכת מנהלים
            </Button>)
        }
    }
    _renderItem = () => (
        <Applogo/>
)
render() {
    return (
    <View style={styles.BackStyle}>
        <Messeges  id ={this.props.user.id} callback={this.getResponse.bind(this)}/>
        <Sales  callback={this.getResponse2.bind(this)}/>
            <View style={{flexDirection: 'row',justifyContent: 'space-between',padding: 5}}>
                <UsernameClick user={this.props.user}/>
                <TouchableOpacity onPress={()=>this.mixFunction()}>
                <Mail num={this.state.num}/>
                </TouchableOpacity>
            </View>
        <FlatList
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
            data={this.state.stories}
            keyExtractor={(item) => item.toString()}
            renderItem={this._renderItem}
        />

        <Text style={styles.labelStyle2}>שלום {this.props.user.firstname},</Text>

        <View style = {styles.containerStyle}>
            <Button
                onPress={() => Actions.DailyBrif({user: this.props.user})}
                containerStyle ={styles.buttonStyleBack}
                style={styles.buttonStyleText}>
                תדריך יומי
            </Button>
            <Button
                onPress={() =>
                    Actions.pdf({url: "http://192.168.43.209:3000/"+this.state.SalesData.image ,
                        title: "מבצעים"})}
                containerStyle ={styles.buttonStyleBack}
                style={styles.buttonStyleText}>
                מבצעים
            </Button>

        </View>
        <View style = {styles.containerStyle}>
            <Button
                onPress={() => Actions.HumRes()}
                containerStyle ={styles.buttonStyleBack}
                style={styles.buttonStyleText}>
                עדכוני מש"א
            </Button>
            <Button
                onPress={() => Actions.Importantinfo()}
                containerStyle ={styles.buttonStyleBack}
                style={styles.buttonStyleText}>
                מידע חשוב
            </Button>

        </View>
        <View style = {styles.containerStyle}>
            <Button
                onPress={() => Actions.EmployeeTraining()}
                containerStyle ={styles.buttonStyleBack}
                style={styles.buttonStyleText}>
                הדרכת עובדים
            </Button>
            {this.renderManager()}
        </View>
        <View style={[styles.buttonStyleBack1,{width:400}]}>
            <GetDailyBirthdays user={this.props.user}/>
        </View>
          </View>

    );
};
}

const styles = {
    BackStyle: {
        backgroundColor: "#ffc68e",
        paddingBottom: 560
    },

    labelStyle2: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#1c000b',
        textAlign: 'left',
        marginTop: 10,
        justifyContent: 'space-between',
        paddingRight: 15
    },
    buttonStyleBack:{
        flex:1,
        backgroundColor: '#fff',
        borderRadius: 30,
        borderWidth: 1,
        borderColor:'#FF7802',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        width:250,

    },
    labelStyle: {
        fontSize: 15,
        paddingLeft: 20,
        flex: 1,
        color: '#000',
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
        justifyContent: 'flex-start',
        backgroundColor: '#ffc68e',
        justifyItems: 'space-between',
        alignItems: 'space-between',
        flexDirection: 'row',
        borderColor: '#ffc68e',
        margin: 10,
        marginTop: 20,
        position: 'relative'


    },
    buttonStyleBack1:{
        margin:5,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width:250,
        borderWidth: 1,
        borderRadius:30,
        backgroundColor: "#373c84",
        borderColor:'#FF7802',

    },
    buttonStyleText1:{
        alignSelf: 'center',
        color:'#fff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
};
export default HomePage;

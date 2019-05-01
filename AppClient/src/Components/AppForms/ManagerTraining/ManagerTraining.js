import React,{Component} from 'react'
import {Text, TouchableOpacity, View,} from 'react-native';
import Button from 'react-native-button';
import RequestPdf from "../RequestPdf";
import {Body, Card, CardItem, Left, Thumbnail} from "native-base";

class ManagerTraining extends Component {

    constructor() {
        super();
        this.state = {
            num: 0,
            Data: []
        };
        this.getResponse = this.getResponse.bind(this)

    }
    findWithAttr(array, attr, value) {
        for(var i = 0; i < array.length; i += 1) {
            if(array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }
    mixFunction=(text,id)=>{
        if(this.state.Data.length !==0) {
            this.props.navigation.navigate('pdf', {
                url: "http://192.168.1.34:3000/" + this.state.Data[id].image,
                title: text
            });
        }
    }

    getResponse(result){
        this.state.Data.push(result);
    }
    render() {
        return (
            <View style={styles.BackStyle}>
                <RequestPdf title ="CheckListPriority" callback={this.getResponse.bind(this)}/>
                <RequestPdf title ="CheckListnewManager" callback={this.getResponse.bind(this)}/>
                <RequestPdf title ="CheckListDailyManager" callback={this.getResponse.bind(this)}/>
                <RequestPdf title ="PriorityTraining" callback={this.getResponse.bind(this)}/>

                <TouchableOpacity onPress={() => this.mixFunction("צ'ק ליסט יום יומי של מנהל הסניף",
                    this.findWithAttr(this.state.Data,'title',"CheckListDailyManager"))} >
                    <Card><CardItem><Left><Thumbnail source={require( "../../../Resources/list.png")} style={{height: 50, width: 50}}/>
                        <Body><Text style={styles.title}>צ'ק ליסט יום יומי של מנהל הסניף</Text></Body>
                    </Left></CardItem></Card></TouchableOpacity>

                <TouchableOpacity onPress={() => this.mixFunction("צ'ק ליסט פריורטי",
                    this.findWithAttr(this.state.Data,'title',"CheckListPriority"))} >
                    <Card><CardItem><Left><Thumbnail source={require( "../../../Resources/list.png")} style={{height: 50, width: 50}}/>
                        <Body><Text style={styles.title}>צ'ק ליסט פריוריטי</Text></Body>
                    </Left></CardItem></Card></TouchableOpacity>

                <TouchableOpacity onPress={() => this.mixFunction(" צ'ק ליסט חניכת מנהל חדש",
                    this.findWithAttr(this.state.Data,'title',"CheckListnewManager"))} >
                    <Card><CardItem><Left><Thumbnail source={require( "../../../Resources/list.png")} style={{height: 50, width: 50}}/>
                        <Body><Text style={styles.title}> צ'ק ליסט חניכת מנהל חדש</Text></Body>
                    </Left></CardItem></Card></TouchableOpacity>
                <TouchableOpacity  onPress={() => this.mixFunction("חוברת הדרכה פריורטי", this.findWithAttr(this.state.Data,'title',"PriorityTraining"))}    >
                    <Card><CardItem><Left><Thumbnail source={require( "../../../Resources/Book.jpg")} style={{height: 50, width: 50}}/>
                        <Body><Text style={styles.title}>חוברת הדרכה פריורטי</Text></Body>
                    </Left></CardItem></Card></TouchableOpacity>
            </View>

        );
    }
}
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

export default ManagerTraining;
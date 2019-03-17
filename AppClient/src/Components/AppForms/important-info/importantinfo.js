import React,{Component} from 'react'
import {Keyboard, Text, TouchableOpacity, View} from 'react-native';
import {Actions} from "react-native-router-flux";
import Header from "../../common/Header";
import RequestPdf from "../RequestPdf";

class importantinfo extends Component {
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

    getResponse(result){
        this.state.Data.push(result);
    }
    mixFunction=(text,id)=>{
        Actions.pdf({url: "http://192.168.1.32:3000/"+this.state.Data[id].image,title: text});
    }

    renderButtons() {

        return initialArr.map((item) => {
                return (
                    <View key={item.id} style={styles.containerStyle}>
                        <TouchableOpacity key={item.id} style={[styles.buttonStyleBack,{width:200}]}
                                          onPress={() => this.mixFunction(item.text,
                                              this.findWithAttr(this.state.Data,'title',item.title))}>
                            <Text style={styles.buttonStyleText}> {item.text}</Text>
                        </TouchableOpacity>
                    </View>
                );

        });

    }

    render() {
        return (
            <View style={styles.BackStyle}>
                <RequestPdf title ="Branches" callback={this.getResponse.bind(this)}/>
                <RequestPdf title ="Mate" callback={this.getResponse.bind(this)}/>
                <RequestPdf title ="Kav" callback={this.getResponse.bind(this)}/>

                <View>
                    <Header name="מידע חשוב"/>
                </View>
                {this.renderButtons()}

            </View>

        );
    }
}
const initialArr =[
    {
        id:0,
        text: "טלפונים ומנהלי סניפים",
        title: "Branches"
    },
    {
        id:1,
        text: "טלפונים מטה",
        title: "Mate"
    },
    {
        id:2,
        text: "קו קופה",
        title: "Kav"
    },

];
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

export default importantinfo;

import React,{Component} from 'react'
import {Image, Keyboard, Text, TouchableOpacity, View,Dimensions} from 'react-native';
import RequestPdf from "../RequestPdf";
import MainHeader from "../../common/MainHeader";
import {Body, Card, CardItem, Left} from "native-base";

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
        this.props.navigation.navigate('pdf',
            {url: "http://192.168.1.34:3000/"+this.state.Data[id].image,title: text});
    }
    renderimage(title){
        if(title === "Branches")
            return(<Image source = {require('../../../Resources/Cell.png')} resizeMode="stretch"  style={styles.image}/>)
        else if(title === "Mate")
            return(<Image source = {require('../../../Resources/Cell.jpg')} resizeMode="stretch" style={styles.image}/>)
        else{
            return(<Image source = {require('../../../Resources/Kupa.png')}  resizeMode="stretch" style={styles.image}/>)
        }
    }

    renderButtons() {

        return initialArr.map((item) => {
                return (
                    <View key={item.id} >
                    <TouchableOpacity onPress={() => this.mixFunction(item.text,
                                          this.findWithAttr(this.state.Data,'title',item.title))}>
                    <Card>
                        <CardItem>
                            <Left>
                                <Body>
                                    <Text style={{alignSelf: 'center',alignContent: 'center',fontWeight:'bold',fontSize:20}}>{item.text} </Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            {this.renderimage(item.title)}
                        </CardItem>

                    </Card>
                    </TouchableOpacity>
                    </View>
                );

        });

    }

    render() {
        return (
            <View style={styles.BackStyle}>
                <MainHeader/>
                <RequestPdf title ="Branches" callback={this.getResponse.bind(this)}/>
                <RequestPdf title ="Mate" callback={this.getResponse.bind(this)}/>
                <RequestPdf title ="Kav" callback={this.getResponse.bind(this)}/>

                {this.renderButtons()}
                <Card>
                    <CardItem>
                            <Body>
                                <Text style={{alignSelf: 'center',alignContent: 'center',fontWeight:'bold',fontSize:20}}>תיקיית מנהלים</Text>
                            </Body>
                    </CardItem>
                </Card>
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
        flex:1,
        backgroundColor: "#ffc68e",
    },
   image:{
       flex: 1,
       width: "100%",
       height: 120,
       }
}

export default importantinfo;
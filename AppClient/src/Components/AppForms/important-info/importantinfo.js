import React,{Component} from 'react'
import {Image, Keyboard, Text, TouchableOpacity, View,Dimensions} from 'react-native';
import RequestPdf from "../RequestPdf";
import MainHeader from "../../common/MainHeader";
import {Body, Card, CardItem, Left, Thumbnail} from "native-base";

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
            {url: "http://192.168.1.34:3000/Information/"+this.state.Data[id].image,title: text});
    }
    renderimage(title){
        if(title === "Branches")
            return(<Thumbnail source={require( "../../../Resources/Cell.png")} style={{height: 50, width: 50}}/>)
        else if(title === "Mate")
            return(<Thumbnail source={require( "../../../Resources/Cell.jpg")} style={{height: 50, width: 50}}/>)
        else{
            return(<Thumbnail source={require( "../../../Resources/Kupa.png")} style={{height: 50, width: 50}}/>)
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
                                    {this.renderimage(item.title)}
                            <Body>
                                <Text style={styles.title}>{item.text}</Text>
                            </Body>
                        </Left></CardItem></Card>
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
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('Minhal')}>
                <Card>
                    <CardItem>
                            <Body>
                                <Text style={{alignSelf: 'center',alignContent: 'center',fontWeight:'bold',fontSize:20}}>תיקיית נהלים</Text>
                            </Body>
                    </CardItem>
                        <CardItem cardBody>
                            <Image source = {require('../../../Resources/Folder.jpg')} resizeMode="stretch" style={{height: 200, width: 20, flex: 1}}/>
                        </CardItem>
                </Card>
                </TouchableOpacity>
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
        flex:1,
        backgroundColor: "#ffc68e",
    },
   image:{
       flex: 1,
       width: "100%",
       height: 120,
       },
    title:{
        alignSelf: 'center',alignContent: 'center',fontWeight:'bold',fontSize:20
    }
}

export default importantinfo;
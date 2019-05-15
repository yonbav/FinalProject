import React,{Component} from 'react'
import {Alert, AsyncStorage, Linking, Text, TouchableOpacity, View} from 'react-native';
import Header from "../../common/Header";
import axios from "axios";
import CardJobFormat from "../../common/CardJobFormat";

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
    async GetData() {
        const value = await AsyncStorage.getItem('id_token');

        axios.get('http://192.168.43.209:3000/jobs/',{ headers: { token: value} })
            .then(result => {
                if(result.data.success === false){
                    Alert.alert(
                        'הודעת אבטחה',
                        'אין הרשאות נא פנה לנציג',
                    )
                }else{
                    this.setState({
                        data: result.data
                    });
                }

            })

    }
    componentDidMount() {
        this.GetData();
    }
    renderButtons() {
        return this.state.data.map((item) => {
                return (
                    <CardJobFormat key={item._id} title={item.title} num={item.number}/>

                );
            });

    }

    render() {
        return (
            <View style={styles.BackStyle}>
                <View>
                    <Text style={{fontSize:30,color:'#ff923d',alignSelf: 'center'}}>החברים שלך שווים כסף!</Text>
                    <Text style={{fontSize:20,color:'#ff923d',alignSelf: 'flex-start'}}>המשרות החמות של השבוע</Text>
                </View>
                {this.renderButtons()}
                <View>
                    <Text style={{fontSize:12,color:'#000',alignSelf: 'flex-start',paddingRight:10}}>- המשרות מיועדות לנשים וגברים כאחד</Text>
                    <Text style={{fontSize:12,color:'#000',alignSelf: 'flex-start',paddingRight:10}}>- קו"ח למשרות אלו ניתן להעביר ישירות למייל  </Text>
                    <TouchableOpacity onPress={() => Linking.openURL('mailto:' + "rozf@kravitz.co.il")}>
                        <Text style={{fontSize:12,color:'#2a2dff',alignSelf: 'flex-start',paddingRight:10}}>rozf@kravitz.co.il  </Text>
                    </TouchableOpacity>
                    <Text style={{fontSize:12,color:'#000',alignSelf: 'flex-start',paddingRight:10}}>  או להעביר ישירות לרוז, הבונוסים ישולמו דרך תלוש השכר לאחר 3 חודשי עבודה</Text>
                    <Text style={{fontSize:12,color:'#000',alignSelf: 'flex-start',paddingRight:10}}>- למידע נוסף בנוגע לנוהל חבר מביא חבר ניתן לפנות לנטלי ואסיף.</Text>

                </View>
            </View>

        );
    }
}
const styles = {
    BackStyle: {
        backgroundColor: "#ffc68e",
        flex:1
    }
};

export default Jobs;
import React,{Component} from 'react'
import {Text,View,Image,Keyboard,BackHandler, TouchableOpacity} from "react-native";
import Applogo from "./common/Applogo";
import Button from 'react-native-button';
import {connect} from "react-redux";
import {loginuser} from "./actions/actions";
import {Actions} from "react-native-router-flux";
import GetDailyBirthdays from "./common/GetDailyBirthdays";


class HomePage extends Component{
    componentDidMount() {
        Keyboard.dismiss();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackAction);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackAction);
    }

    handleBackAction = () => {
            if (Actions.Home()) {
                this.Actions.pop();
                return false;
            }
            return true;
    }

render() {
    return (
          <View style={styles.BackStyle}>
              <View style={styles.userMenu}>
                  <TouchableOpacity  onPress={() => Actions.Profile()}>
                      <Image source = {require('../../src/Resources/usermenu.png')} />
                  </TouchableOpacity >
              </View>
              <Applogo/>

              <Text style={styles.labelStyle2}>
                   שלום {this.props.user.firstname},
              </Text>

              <View style = {styles.containerStyle}>
                  <Button
                      onPress={() => Actions.DailyBrif()}
                      containerStyle ={styles.buttonStyleBack}
                      style={styles.buttonStyleText}>
                      תדריך יומי
                  </Button>
                       <Button
                           containerStyle ={styles.buttonStyleBack}
                           style={styles.buttonStyleText}>
                           מידע חשוב
                       </Button>

              </View>
              <View style = {styles.containerStyle}>
                  <Button
                      containerStyle ={styles.buttonStyleBack}
                      style={styles.buttonStyleText}>
                      עדכוני מש"א
                  </Button>
                  <Button
                      containerStyle ={styles.buttonStyleBack}
                      style={styles.buttonStyleText}>
                      עולם ההטבות
                  </Button>

              </View>
              <View style = {styles.containerStyle}>
                  <Button
                      containerStyle ={styles.buttonStyleBack}
                      style={styles.buttonStyleText}>
                      הדרכת עובדים
                  </Button>
                  <Button
                      containerStyle ={styles.buttonStyleBack}
                      style={styles.buttonStyleText}>
                      הדרכת מנהלים
                  </Button>



              </View>
              <View style={styles.containerStyle}>
                  <Text style={[styles.labelStyle,{fontWeight: 'bold'}]}>
                      הודעות חשובות:
                  </Text>
              </View>
              <View style={styles.containerStyle2}>
                  <Text style={styles.labelStyle}>
                      כאן יופיעו הודעות חשובות
                  </Text>
              </View>
              <View style={styles.containerStyle}>
                  <Text style={[styles.labelStyle,{fontWeight: 'bold'}]}>
                      ימי הולדת:
                  </Text>
              </View>
              <View style={styles.containerStyle2}>
                      <GetDailyBirthdays/>
              </View>



          </View>

    );
};
}
const mapStateToProps =  state =>{
    return {
        user: state.auth.user

    };
};
const styles = {
    BackStyle: {
        backgroundColor: "#ffc68e",
        paddingBottom: 560
    },
    userMenu:{
        alignItems:'flex-start',
        alignSelf: 'flex-start',
        marginBottom: 0,
        paddingTop: 20
    },
    labelStyle2: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#ff8a37',
        textAlign: 'center',
        marginTop: 10,
        justifyContent: 'space-between'
    },
    buttonStyleBack:{
        flex:1,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor:'#FF7802',
        justifyContent: 'center',

    },
    labelStyle: {
        fontSize: 18,
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
        justifyContent: 'space-evenly',
        backgroundColor: '#ffc68e',
        justifyItems: 'space-between',
        flexDirection: 'row',
        borderColor: '#ffc68e',
        margin: 10,
        marginTop: 10,
        position: 'relative'


    },
    containerStyle2:{
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#ffc68e',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        borderColor: '#ffc68e',
        position: 'relative',
        marginLeft: 10,
        marginRight: 10,

    }
};
export default connect(mapStateToProps,{loginuser})(HomePage);

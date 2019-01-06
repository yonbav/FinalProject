import React,{Component} from 'react'
import {Text,View} from "react-native";
import Applogo from "./common/Applogo";
import Button from 'react-native-button';
import CardSection from './common/CardSection'
import {connect} from "react-redux";
import {loginuser} from "./actions/actions";


class HomePage extends Component{
render() {
    return (
          <View style={styles.BackStyle}>
                   <Applogo/>
              <Text style={styles.labelStyle2}>
                    היי

                  <Text style={{margin: 5}}>
                  {this.props.user.name}
                      <Text>
                          ,
                      </Text>
                  </Text>

              </Text>
              <View style = {styles.containerStyle}>

                       <Button
                           containerStyle ={styles.buttonStyleBack}
                           style={styles.buttonStyleText}>
                           מידע חשוב
                       </Button>
                  <Button
                      containerStyle ={styles.buttonStyleBack2}
                      style={styles.buttonStyleText}>
                      תדריך יומי
                  </Button>
              </View>
              <View style = {styles.containerStyle}>

                  <Button
                      containerStyle ={styles.buttonStyleBack}
                      style={styles.buttonStyleText}>
                      עולם ההטבות
                  </Button>
                  <Button
                      containerStyle ={styles.buttonStyleBack2}
                      style={styles.buttonStyleText}>
                      עדכוני מש"א
                  </Button>
              </View>
              <View style = {styles.containerStyle}>

                  <Button
                      containerStyle ={styles.buttonStyleBack}
                      style={styles.buttonStyleText}>
                      הדרכת מנהלים
                  </Button>
                  <Button
                      containerStyle ={styles.buttonStyleBack2}
                      style={styles.buttonStyleText}>
                      הדרכת עובדים
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
                  <Text style={styles.labelStyle}>
                      כאן יופיעו ימי הולדת
                  </Text>
              </View>



          </View>

    );
};
}
const mapStateToProps =  state =>{
    return {
        email: state.auth.email,
        password: state.auth.password,
        error: state.auth.error,
        success: state.auth.success,
        loading: state.auth.loading,
        user: state.auth.user

    };
};
const styles = {
    BackStyle: {
        backgroundColor: "#ffc68e",
        paddingBottom: 560
    },
    labelStyle2: {
        fontWeight: 'bold',
        fontSize: 15,
        fontcolor: 'black',
        textAlign: 'right',
        margin: 5
    },
    buttonStyleBack:{
        flex:1,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor:'#FF7802',
        paddingRight: 5,
        paddingLeft: 15,
        marginRight: 5
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1,
        color: '#000',
    },
    buttonStyleBack2:{
        flex:1,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor:'#FF7802',
       paddingLeft: 20,
        marginLeft: 5


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
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ffc68e',
        position: 'relative',
        margin: 10,
        marginTop: 20

    },
    containerStyle2:{
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#ffc68e',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ffc68e',
        position: 'relative',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10

    }
}
export default connect(mapStateToProps,{loginuser})(HomePage);

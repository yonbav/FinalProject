import React  from 'react';
import { StyleSheet} from 'react-native';

const StyleApp = StyleSheet.create({
                BackStyle1: {
                    paddingTop: 100,
                    backgroundColor: "#ffc68e",
                    paddingBottom: 800
                },
                BackStyle2: {
                    backgroundColor: "#ffc68e",
                    paddingBottom: 560
                },
                buttonStyleBack: {
                    margin: 5,
                    height: 45,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 200,
                    borderWidth: 1,
                    borderRadius: 30,
                    backgroundColor: "#fff",
                    borderColor: '#FF7802',

                },
                buttonStyleText: {
                    alignSelf: 'center',
                    color: '#050002',
                    fontSize: 16,
                    fontWeight: '600',
                    paddingTop: 10,
                    paddingBottom: 10
                },
                containerStyle: {
                    borderBottomWidth: 1,
                    padding: 5,
                    backgroundColor: '#ffc68e',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    borderColor: '#ffc68e',
                    position: 'relative',
                    margin: 10,
                },
            buttonStyleBackHome:{
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
    containerStyleHome:{
        borderBottomWidth: 1,
        padding: 5,
        justifyContent: 'flex-start',
        backgroundColor: '#ffc68e',
        flexDirection: 'row',
        borderColor: '#ffc68e',
        margin: 10,
        marginTop: 20,
        position: 'relative'
    },

    labelStyle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#1c000b',
        textAlign: 'left',
        marginTop: 10,
        justifyContent: 'space-between',
        paddingRight: 15
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
});
export default StyleApp;

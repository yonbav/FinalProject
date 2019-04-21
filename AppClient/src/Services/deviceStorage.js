import { AsyncStorage } from 'react-native';
import axios from "axios";

const deviceStorage = {
    async saveKey(key, valueToSave) {
        try {
            await AsyncStorage.setItem(key, valueToSave);
        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message);
        }
    },

    async loadJWT() {
        try {
            const value = await AsyncStorage.getItem('id_token');
            if(value){
                await  axios.post('http://192.168.1.34:3000/user/token', {
                    token: value
                })
                    .then( result => {
                        if (result.data) {
                            this.setState({
                                data: value,
                                loading: true,
                                user: result.data,
                                signedIn: true
                            });
                        } else {
                            this.setState({
                                data: null,
                                loading: true,
                                user: null
                            });
                        }
                    })
            }
            else {
                this.setState({
                    data: null,
                    loading: true,
                    user:null
                });
            }
        }
        catch (error) {
            this.setState({
                error: "אין חיבור לאינטרנט"
            });
        }
    },

    async deleteJWT() {
        try{
            await AsyncStorage.removeItem('id_token')

        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message);
        }
    }
};

export default deviceStorage;
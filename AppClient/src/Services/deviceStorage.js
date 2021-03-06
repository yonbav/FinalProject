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
                await  axios({
                    method: "post",
                    url: 'http://185.56.74.46:3000/user/token',
                    timeout: 1000 * 5, // Wait for 5 seconds
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: {
                        token: value
                    }
                })
                    .then( result => {
                        if (result.data) {
                            this.setState({
                                data: value,
                                user: result.data,
                                signedIn: true
                            });
                        } else {
                            this.setState({
                                data: null,
                                user: null
                            });
                        }
                    })
            }
            else {
                this.setState({
                    data: null,
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
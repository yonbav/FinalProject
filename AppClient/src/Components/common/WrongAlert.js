

import {Alert} from 'react-native';
import React from 'react';

const WrongAlert = () => {
    return (
        Alert.alert(
            'הודעת אבטחה',
            'אין הרשאות נא פנה לנציג',
        )
    );
};


export default WrongAlert;
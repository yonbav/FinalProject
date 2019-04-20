import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
} from 'react-native';

import ScrollableTabView, { DefaultTabBar} from 'react-native-scrollable-tab-view';
import AllMessages from "./AllMessages";
import UnreadMessages from "./UnreadMessages";




export default class example extends Component {
    getindex(messages) {
        if(messages === 0)  return 1;
        return 0;

    }
    render() {
        const { navigation } = this.props;
        const id = navigation.getParam('id');
        const messages = navigation.getParam('messages');
        return (
            <View style={[styles.container, {paddingTop: 20}]}>
                <ScrollableTabView
                    tabBarActiveTextColor="#53ac49"
                    style={{marginTop: 30}}
                    renderTabBar={() => <DefaultTabBar backgroundColor='ffc68e' />}
                    initialPage={this.getindex(messages)}
                >
                    <ScrollView tabLabel='לא נקראו'>
                    <UnreadMessages id = {id}/>
                    </ScrollView>
                    <ScrollView tabLabel='כל ההודעות'>
                    <AllMessages/>
                    </ScrollView>
                </ScrollableTabView>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        backgroundColor: '#ffc68e',
    },
});

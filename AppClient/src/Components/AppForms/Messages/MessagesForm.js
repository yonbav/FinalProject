import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';
import ScrollableTabView, { DefaultTabBar} from 'react-native-scrollable-tab-view';
import AllMessages from "./AllMessages";
import UnreadMessages from "./UnreadMessages";




export default class example extends Component {
    getindex() {
        if(this.props.messages === 0)  return 1;
        return 0;

    }
    render() {
        return (
            <View style={[styles.container, {paddingTop: 20}]}>
                <ScrollableTabView
                    tabBarActiveTextColor="#53ac49"
                    style={{marginTop: 30}}
                    renderTabBar={() => <DefaultTabBar backgroundColor='ffc68e' />}
                    initialPage={this.getindex()}
                >
                    <ScrollView tabLabel='לא נקראו'>
                    <UnreadMessages id = {this.props.id}/>
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

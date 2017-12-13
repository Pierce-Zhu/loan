import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView
} from 'react-native';

import Button from '../../../components/Button';

import NoCard from './template/NoCard';
import OpenCardTips from './template/OpenCardTips.js';

class BankCard extends Component{
    _jumpToBindCard = ()=> {
        console.log('跳转值绑定银行卡');
    }

    render(){
        return(
            <View style={styles.container}>
                <ScrollView style={styles.scrollview}>
                    <NoCard />
                    <OpenCardTips />

                    <Button 
                        title='绑定银行卡'
                        titleColor='#fff'
                        titleSize={16}
                        marginTop={15}
                        borderRadius={5}
                        onPress={this._jumpToBindCard}
                        marginHorizontal={10}
                        backgroundColor='#00cafb'
                    />
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Loan.styles.backgroundColor
    },
    scrollview:{
        backgroundColor:'#fff'
    }
})

export default BankCard;
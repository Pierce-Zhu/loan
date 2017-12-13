import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import NoRecord from './template/NoRecord';
import Button from '../../components/Button';

class RePay extends Component{
    
    render(){
        //没有还款记录
        if(1===1){
            return(
                <View style={styles.container}>
                    <NoRecord 
                        title='您暂时还没有还款记录哦!'
                        source={require('./img/repay_inrecord.png')} 
                    />
                </View>
            )
        }
        //2.有还款记录
        return(
            <View style={styles.container}>
                <Button 
                    title='还款'
                    titleColor='#fff'
                    backgroundColor='#00cafb'
                    width={100}
                    height={50}
                    borderRadius={5}
                    onPress={this._onRePay}
                />
            </View>
        )
    }
    _onRePay = ()=> {
        console.log('跳转还款');
        global.router.open('repayDetail')(this);
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Loan.styles.backgroundColor,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default RePay;
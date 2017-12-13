import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import Button from '../../../components/Button';

class RepayDetail extends Component{

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text>显示xx银行卡</Text>
                </View>

                <Button 
                    title='确认'
                    titleColor='#fff'
                    backgroundColor='#00cafb'
                    width={100}
                    height={50}
                    borderRadius={5}
                    onPress={this._onSure}
                />
            </View>
        )
    }

    _onSure = ()=> {
        console.log('确认还款');
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: global.Loan.styles.backgroundColor,
        alignItems:'center',
        justifyContent:'center'
    },
    card:{
        width: global.Loan.styles.width - 30,
        height:(global.Loan.styles.width - 30)*0.56,
        borderWidth:1,
        borderColor:'#00cafb',
        marginBottom:20,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default RepayDetail
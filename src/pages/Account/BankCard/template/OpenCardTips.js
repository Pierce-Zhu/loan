import React from 'react';

import {
    Text,
    View,
    Image,
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        paddingLeft:20,
        paddingRight:10,
        width:Loan.styles.width,
    },
    icon:{
        width:12,
        height:12,
        marginRight:5,
    },
    tips:{
        color:'#999',
        fontSize:12,
    }
})

const OpenCardTips = ()=>{
    return(
        <View style={styles.container}>
            <Image 
                source={require('../img/open_blank.png')}
                style={styles.icon}
                resizeMode='contain'
            />
            <Text style={styles.tips}>为了您的账户安全,仅支持绑定一张银行卡进入充值和提现。如果有疑问,请联系xxxx</Text>
        </View>
    )
}

export default OpenCardTips;
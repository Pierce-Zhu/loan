import React from 'react';

import {
    Text,
    View,
    Image,
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#f3f3f0',
        borderRadius:5,
        height:150,
        margin:10,
        alignItems:'center',
        justifyContent:'center'
    },
    bankIconContainer:{
        width:80,
        height:80,
        borderRadius:40,
        padding:5,
        backgroundColor:'#fff',
        marginBottom:10,
    },
    bankIcon:{
        width:75,
        height:75,
    },
    tips:{
        fontSize:12,
        color:'#999'
    }
})

const NoCard = ()=>{
    return(
        <View style={styles.container}>
            <View style={styles.bankIconContainer}>
                <Image
                    source={require('../img/bank_card.png')}
                    style={styles.bankIcon}
                    resizeMode='contain'
                />
            </View>
            <Text style={styles.tips}>您尚未绑定银行卡,请开通账户绑定</Text>
        </View>
    )
}

export default NoCard;
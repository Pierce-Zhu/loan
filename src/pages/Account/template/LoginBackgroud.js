import React from 'react';

import {
    Text,
    View,
    Image,
    StyleSheet
} from 'react-native';

import Settings from '../../../components/Settings';

const styles = StyleSheet.create({
    tipsContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:15,
        backgroundColor:'#00cafb',
        height:80,
        width:Loan.styles.width,
    },
    font:{
        fontSize:20,
        color:'#fff',
        backgroundColor:'transparent'
    }
})

const LoginBackgroud = ({ user,onLogin, onSet })=>{
    return(
        <View style={styles.tipsContainer}>
            {
                user.mobile ?
                <Text style={styles.font}>{user.mobile},您好</Text>:
                <Text onPress={onLogin} style={styles.font}>点击登录</Text>
            }
            <Settings onPress={user.mobile ? onSet:onLogin} />
        </View>
    )
}

export default LoginBackgroud;
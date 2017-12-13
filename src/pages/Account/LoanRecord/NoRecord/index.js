import React from 'react';

import {
    Text,
    View,
    Image,
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    icon:{
        width:240,
        height:100,
        marginBottom:10,
    },
})

const NoRecord = ()=>{
    return(
        <View style={styles.container}>
            <Image 
                source={require('../img/nocontent_icon.png')}
                style={styles.icon}
                resizeMode='contain'
            />
            <Text>您暂时还没有借款记录哦!</Text>
        </View>
    )
}

export default NoRecord;
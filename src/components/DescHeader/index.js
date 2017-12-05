import React from 'react';

import {
    Text,
    View,
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    container:{
        height:120,
        backgroundColor:'#00cafb',
        alignItems:'center',
        justifyContent:'center',
    },
    title:{
        fontSize:24,
        fontWeight:'bold',
        color:'#fff',
        marginBottom:5,
    },
    desc:{
        fontSize:12,
        color:'#fff'
    },
    unit:{
        fontSize:10,
        color:'#fff'
    }
})

const DescHeader = ({money})=>{
    return(
        <View style={styles.container}>
            <Text style={styles.title}>{money}<Text style={styles.unit}>元</Text> </Text>
            <Text style={styles.desc}>借款本金</Text>
        </View>
    )
}

export default DescHeader;
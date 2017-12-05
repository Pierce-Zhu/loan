import React from 'react';

import {
    Text,
    View,
    Dimensions,
    StyleSheet
} from 'react-native';

const { width, height } = Dimensions.get('window');

const getHorizontalLine = (rest)=>{
    const { marginLeft,width=width ,marginRight,backgroundColor='#fff',color='#e6e6e6' } = rest;
    const container = {
        height: StyleSheet.hairlineWidth,
        width,
        backgroundColor,
        justifyContent:'center'
    }
    const line = {
        flex:1,
        marginLeft,
        marginRight,
        backgroundColor: color,
    }

    return(
        <View style={container}>
            <View style={line}></View>
        </View>
    )
}


const Line = ({ type='horizontal',...rest})=>{
    if(type==='horizontal'){
        return getHorizontalLine(rest);
    }

    return(
        <View></View>
    )
}
export default Line;
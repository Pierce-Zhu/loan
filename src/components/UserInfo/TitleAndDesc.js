import React from 'react';

import {
    Text,
    View,
    StyleSheet
} from 'react-native';

import Line from '../Line';

const TitleAndDesc = ({...props})=>{
    const { 
        title, 
        desc,
        paddingLeft =10,
        titleColor,
        descColor,
    } = props;

    const container = {
        height: 54,
    } 
    const contentStyle = {
        height: 50,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft
    }
    const titleStyle = {
        width: 80,
        color: titleColor
    }
    const descStyle = {
        color: descColor
    }

    return(
        <View style={container}>
            <View style={contentStyle}>
                <Text style={titleStyle}>{title}</Text>
                <Text style={descStyle}>{desc}</Text>
            </View>
            <Line />
        </View>
    )
}

export default TitleAndDesc;
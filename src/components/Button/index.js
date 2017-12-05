import React from 'react';

import {
    Text,
    TouchableOpacity
} from 'react-native';

const Button = ({ title, onPress, ...rest})=>{
    const { titleColor,titleSize } = rest;

    const {
        backgroundColor='#fff',
        borderRadius,
        borderColor,
        borderWidth,
        height=50,
        width,
        paddingBottom,
        marginLeft,
        marginRight,
        marginHorizontal,
        marginTop,
        marginBottom,
        style
    } = rest;

    const container = {
        backgroundColor,
        justifyContent:'center',
        alignItems:'center',
        borderRadius,
        borderColor,
        height,
        width,
        paddingBottom,
        marginLeft,
        marginRight,
        marginHorizontal,
        marginTop,
        marginBottom,
    }
    const btnTitle = {
        color:titleColor,
        fontSize:titleSize
    }

    return(
        <TouchableOpacity style={[container,style]} onPress={onPress}><Text style={btnTitle}>{title}</Text></TouchableOpacity>
    )
}

export default Button;
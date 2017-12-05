import React from 'react';

import {
    Text,
    View,
    StyleSheet,
    TextInput
} from 'react-native';

import Line from '../Line';

const TitleInput = ({ titleWidth=80,...rest})=>{
    const { 
        title, 
        paddingLeft =10,
        onChangeText ,
        placeholder,
        titleColor,
        keyboardType,
        backgroundColor,
        name
    } = rest;

    const container = {
        backgroundColor
    }

    const contentStyle = {
        height: 50,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft
    }
    const titleStyle = {
        width: titleWidth,
        color: titleColor
    }

    const _onChangeText = text=>{
        onChangeText(text,name);
    }

    return(
        <View style={[styles.container,container]}>
            <View style={contentStyle}>
                <Text style={titleStyle}>{title}</Text>
                <TextInput 
                    style={styles.input}
                    placeholder={placeholder}
                    onChangeText={_onChangeText}
                    keyboardType={keyboardType}
                    underlineColorAndroid="transparent"
                />
            </View>
            <Line />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height: 50,
    },
    input:{
        flex:1,
        height:50,
    }
})

export default TitleInput;
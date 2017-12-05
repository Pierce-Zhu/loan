import React from 'react';

import {
    Text,
    View,
    StyleSheet
} from 'react-native';

import Line from '../Line';

const styles = StyleSheet.create({
    container:{
        height:50,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:10
    },
})

const Tips = ({...props})=>{
    const { 
        title,
        titleColor,
        desc,
        descColor,
        backgroundColor='#fff',
        style,  
    } = props;

    const container = {
        backgroundColor
    }
    const titleStyle = {
        color:titleColor,
    }
    const descStyle = {
        color:descColor,
        fontSize:12
    }

    return(
        <View style={[container,style]}>
            <View style={styles.container}>
                <Text style={titleStyle}>{title}</Text>
                <Text style={descStyle}>{desc}</Text>
            </View>
            <Line />
        </View>
    )
}

export default Tips;
import React from 'react';

import {
    Text,
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    container:{
        textAlign: 'center',
        fontSize: 10,
        marginBottom: 1.5,
        backgroundColor: 'transparent'
    }
})

const TabBarLabel = ({ title, focused ,tintColor })=>{
   
    return(
        <Text style={[styles.container,{color:tintColor}]}>{title}</Text>
    )
}

export default TabBarLabel;
'use strict';

import React ,{ PropTypes }from 'react';

import {
    StyleSheet,
    View,
    ActivityIndicator
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        width:80,
        height:80,
        borderRadius:5,
        backgroundColor:'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center'
    },
})

const RNLoading = ({ ...props })=>{
    const {  
        color='#fff',
        size
    } = props; 

    return(
        <View style = { styles.container }>
            <ActivityIndicator 
                color = { color }
                size = { size }
            />
        </View>
    )
}


export default RNLoading;
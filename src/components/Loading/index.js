import React from 'react';

import {
    StyleSheet,
    View,
    ActivityIndicator
} from 'react-native';

const Loading = ({ ...props })=>{
    const {  
        color,
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default Loading;
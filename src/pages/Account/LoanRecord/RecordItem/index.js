import React from 'react';

import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        marginHorizontal:15,
        marginTop:10,
        borderRadius:5,
        height:180,
        alignItems:'center',
        justifyContent:'center',
    }
})

const RecordItem = ({ onPress ,...rest})=>{

    return(
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text>借款记录</Text>
        </TouchableOpacity>
    )
}

export default RecordItem;
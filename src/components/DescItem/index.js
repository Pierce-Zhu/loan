import React from 'react';

import {
    Text,
    View,
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        backgroundColor:'#fff',
        alignItems:'center',
        paddingHorizontal:15,
        height:50,
    },
    title:{
        width:150,
        fontSize:16,
        color:'#333',
    },
    value:{
        flex:1,
        fontSize:16,
        color:'#999',
        textAlign:'right',
    },
    desc:{
        fontSize:12,
        color:'#999'
    }
})

const DescItem = ({ config })=>{
    return(
        <View style={styles.container}>
            <Text style={styles.title}>{config.title+' '}<Text style={styles.desc}>{config.desc && config.desc}</Text></Text>
            <Text style={styles.value}>{config.value}</Text>
        </View>
    )
}

export default DescItem;
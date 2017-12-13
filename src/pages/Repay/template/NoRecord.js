import React from 'react';

import {
    Text,
    View,
    Image
} from 'react-native';

const NoRecord = ({ source ,title})=>{
    const container = {
        paddingHorizontal:15,
        paddingVertical:15,
        alignItems:'center'
    }
    const images = {
        width:70,
        height:90,
        marginBottom:10,
    }
    const font = {
        textAlign:'center',
        fontSize:16,
        color:'#333'
    }

    return(
        <View style={container}>
            <Image 
                source={source}
                style={images}
                resizeMode='contain'
            />
            <Text style={font}>{title}</Text>
        </View>
    )
}

export default NoRecord;
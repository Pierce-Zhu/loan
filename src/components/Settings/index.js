import React from 'react';

import {
    Image,
    TouchableOpacity
} from 'react-native';


const Settings = ({ onPress ,size=26})=>{
    const img = {
        width:size,
        height:size,
    }

    return(
        <TouchableOpacity onPress={onPress} >
            <Image 
                source={require('./img/set.png')}
                style={img}
                resizeMode='contain'
            />
        </TouchableOpacity>
    )
}

export default Settings;
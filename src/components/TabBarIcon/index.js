import React from 'react';

import {
    Image,
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    inActiveIcon:{
        width: 26,
        height: 26,
    },
    activeIcon:{
        width: 34,
        height: 34,
    }
})

const TabBarIcon = ({ source, focused ,tintColor})=>{

    return(
        <Image
            source={source}
            style={[ focused ? styles.activeIcon:styles.inActiveIcon, {tintColor: tintColor}]}
        />
    )
}

export default TabBarIcon;
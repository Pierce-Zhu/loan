'use strict';

import React ,{ PropTypes }from 'react';

import {
    Text,
    View
} from 'react-native';

const IndexSwiperDot = ({...props})=>{
    const {
        backgroundColor,
        width = 8,
    } = props;

    const container = {
        backgroundColor,
        width,
        height: width,
        borderRadius: width/2,
        marginRight: 3,
    }
    return(
        <View style={container}></View>
    )
}

export default IndexSwiperDot;
'use strict';

import React ,{ PropTypes }from 'react';

import {
    Text,
    View,
    Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

import SwiperDot from './SwiperDot.js';

const SwiperDotContainer = ({...props})=>{
    const {
        activeIndex,
        activeDotBackgroundColor='#fff',
        inActiveDotBackgroundColor='rgba(0,0,0,0.3)',
        config,
        backgroundColor
    } = props;

    const container = {
        backgroundColor,
        position:'absolute',
        height:20,
        width:width,
        bottom:0,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    }

    return(
        <View style={container}>
            {
                config.map((item, index)=>{

                    return(
                        <SwiperDot 
                            key={'SwiperDot'+index} 
                            width={6}
                            backgroundColor={activeIndex === index? activeDotBackgroundColor : inActiveDotBackgroundColor}
                        />
                    )
                })
            }
        </View>
    )
}
export default SwiperDotContainer;
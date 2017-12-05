import React from 'react';

import {
    Text,
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native';

import Line from '../../components/Line';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    icon:{
        width:26,
        height:26,
    },
    title:{
        marginLeft:10,
        marginRight:5
    },
    desc:{
        flex:1,
        textAlign:'right',
        color:'#7a7a7a',
    },
    tips:{
        color:'#7a7a7a',
        fontSize:12
    }
})


const RowItem = ({ onPress , config,showLine ,source ,...rest})=>{
    const { 
        height=50,
        lineHeight,
        lineMarginLeft,
        lineMarginRight, 
    } = rest;
    const container = {
        height,
        width: width,
        backgroundColor:'#fff',
        justifyContent:'flex-end'
    }

    const contextStyle = {
        flexDirection:'row',
        alignItems:'center',
        marginBottom:5,
        marginLeft:15,
    }
    const _onPress = ()=> onPress(config);

    return(
        <TouchableOpacity onPress={_onPress} style={container}>
            <View style={contextStyle}>
                <Image 
                    source={config.source}
                    style={styles.icon}
                />
                <Text style={styles.title}>{config.title}</Text>
                {
                    config.tips && <Text style={styles.tips}>{config.tips}</Text>
                }
                <Text style={styles.desc}>{config.desc}</Text>
                <Image 
                    source={require('./img/arrow_right.png')}
                    style={styles.icon}
                />
            </View>
            { 
                showLine && 
                <Line 
                    height={lineHeight}
                    marginLeft={lineMarginLeft}
                    marginRight={lineMarginRight}
                /> 
            }
        </TouchableOpacity>
    )
}

export default RowItem;
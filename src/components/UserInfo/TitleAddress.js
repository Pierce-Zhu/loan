import React from 'react';

import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity
} from 'react-native';

import Line from '../Line';

const TitleAddress = ({...props})=>{
    const { 
        title, 
        name,
        detailTitle,
        paddingLeft =10,
        onChangeText ,
        titlePlaceholder,
        address,
        detailPlaceholder,
        titleColor,
        keyboardType,
        onPress
    } = props;

    const contentStyle = {
        height: 50,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft
    }
    const titleStyle = {
        width: 80,
        color: titleColor
    }

    const _onPress = ()=> {
        onPress(name);
    }
    const _onChangeText = text=>{
        onChangeText(text,name);
    }

    return(
        <View style={styles.container}>
            <View style={styles.selectContainer}>
                <View style={styles.contentStyle}>
                    <Text style={titleStyle}>{title}</Text>
                    <TouchableOpacity onPress={_onPress} style={styles.btnSelect}>
                        {/* <Text style={styles.titleStyle} numberOfLines={1}>{titlePlaceholder}</Text> */}
                        <TextInput 
                            style={styles.titleStyle}
                            placeholder={titlePlaceholder}
                            value={address}
                            editable={false}
                            numberOfLines={1}
                            underlineColorAndroid="transparent"
                        />
                        <Image 
                            source={require('./img/arrow_down.png')}
                            style={styles.icon}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                </View>
                <Line />
            </View>
            <View style={styles.selectContainer}>
                <TextInput 
                    style={styles.detailInput}
                    placeholder={detailPlaceholder}
                    onChangeText={_onChangeText}
                    keyboardType={keyboardType}
                    underlineColorAndroid="transparent"
                />
                <Line />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{},

    contentStyle:{
        height: 50,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,
    },
    btnSelect:{
        flex:1,
        height:50,
        flexDirection:'row',
        alignItems:'center'
    },
    titleStyle:{
        flex:1,
        fontSize:18
    },
    input:{
        flex:1,
        height:50,
    },
    detailInput:{
        paddingLeft:90,
        paddingRight:10,
        height:50,
    },
    selectContainer:{
        height:50
    },
    icon:{
        width:24,
        height:24,
    },
})

export default TitleAddress;
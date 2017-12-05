import React from 'react';

import {
    Text,
    View,
    Image,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        height:50,
        borderWidth:0.5,
        borderRadius:5,
        borderColor:'#e6e6e6'
    },
    input:{
        flex:1,
        height:48,
        paddingLeft:15,
    },
    separator:{
        width:1,
        backgroundColor:'#e6e6e6'
    },
    icon:{
        width:26,
        height:26
    },
    btn:{
        justifyContent:'center',
        paddingHorizontal:10
    }
})

const InputItem = ({ onPress ,keyboardType ,onChangeText, placeholder, ...rest})=>{
    const { 
        name, 
        source, 
        showLineAndBtn, 
        btnTitle, 
        btnComponent,
        marginTop, 
        marginHorizontal 
    } = rest;
    const container = {
        marginTop,
        marginHorizontal,
    }

    const _onChangeText = text => {
        onChangeText(text, name);
    }

    return(
        <View style={[styles.container,container]}>
            <TextInput 
                style={styles.input}
                placeholder={placeholder}
                onChangeText={_onChangeText}
                keyboardType={keyboardType}
                underlineColorAndroid='transparent'
            />
            {
                showLineAndBtn && <View style={styles.separator}></View>
            }
            {
                showLineAndBtn && !btnComponent &&
                    <TouchableOpacity style={styles.btn} onPress={onPress}>
                        {
                            source&& 
                            <Image 
                                source={source}
                                style={styles.icon}
                                resizeMode='contain'
                            />
                        }
                        {
                            !source&&
                            <Text>{btnTitle}</Text>
                        }
                    </TouchableOpacity> 
            }
            {
                showLineAndBtn && btnComponent 
            }
        </View>
    )
}

export default InputItem;
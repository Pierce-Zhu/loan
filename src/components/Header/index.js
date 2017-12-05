import React from 'react';

import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Platform,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    btn:{
        flex:1,
        paddingTop:10,
        justifyContent:'center'
    },
    title:{
        fontSize:16,
        fontWeight:'bold',
        paddingTop:10,
    },
    titleContainer:{
        flex:2,
        justifyContent:'center',
        paddingTop:10,
    }
})

const Header = ({ backPress , forwardPress, title ,...props})=>{
    const { 
        titleColor='#fff',
        width=width,
        backgroundColor='#00cafb',
        backTitleColor='#fff',
        forwardTitleColor='#fff',
    } = props;

    const containerStyle = {
        height: Platform.OS ==='ios' ? 65 : 56,
        backgroundColor,
        flexDirection:'row',
        paddingHorizontal:10
    }
    const titleStyle = {
        color:titleColor,
        textAlign:'center'
    }

    const backTitle ={
        color: backTitleColor,
    }
    const forwardTitle ={
        color: forwardTitleColor,
        textAlign:'right',
    }

    return(
        <View style={containerStyle}>
            <TouchableOpacity style={styles.btn} onPress={backPress}>
                { backPress && <Text style={[styles.title, backTitle]}>返回</Text> }
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                <Text style={[styles.title, titleStyle]}>{title}</Text>
            </View>
            <TouchableOpacity style={styles.btn} onPress={forwardPress}>
                { forwardPress && <Text style={[styles.title, forwardTitle]}>前进</Text> }
            </TouchableOpacity>
        </View>
    )
}

export default Header;
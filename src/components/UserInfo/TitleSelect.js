import React ,{ PureComponent }from 'react';

import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import Line from '../Line';

class TitleSelect extends PureComponent{
    render(){
        const { 
            title, 
            defaultValue,
            paddingLeft =10,
            titleColor,
            descColor,
            onPress,
            name
        } = this.props;


        const titleStyle = {
            width: 80,
            color: titleColor
        }
        const descStyle = {
            flex:1,
            color: descColor,
        }
        const contentStyle = {
            paddingLeft
        }

        const _onPress = ()=>{
            onPress(name);
        }
    
        return(
            <View style={styles.container}>
                <View style={[styles.contentStyle, contentStyle]}>
                    <Text style={titleStyle}>{title}</Text>
                    <TouchableOpacity onPress={_onPress} style={styles.btnSelect}>
                        <Text style={descStyle}>{defaultValue}</Text>
                        <Image 
                            source={require('./img/arrow_down.png')}
                            style={styles.icon}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                </View>
                <Line />
            </View>
        )    
    }
}
const styles = StyleSheet.create({
    container:{
        height: 54,
    },
    icon:{
        width:24,
        height:24,
    },
    btnSelect:{
        flex:1,
        height:50,
        paddingRight:10,
        flexDirection:'row',
        alignItems:'center'
    },
    contentStyle:{
        height: 50,
        flexDirection:'row',
        alignItems:'center',
    }
})

export default TitleSelect;

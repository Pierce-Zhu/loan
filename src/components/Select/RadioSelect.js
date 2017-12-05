import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback
} from 'react-native';

import Option from './Option.js';

class RadioSelect extends Component{

    render(){
        console.log('RadioSelect.js------>',this.props);
        const { defaultValue, width=280, height, style, children, onPress } = this.props;
        const container = {
            width,
            height,
            backgroundColor:'#fff',
            borderColor: '#BDBDC1',
        }

        return(
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={[styles.container,container]}>
                    {this.props.children && this.props.children}
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        borderWidth: 2 / window.scale
    }
})

export default RadioSelect;
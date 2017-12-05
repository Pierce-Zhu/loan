import React from 'react';

import {
    Text,
    View,
    StyleSheet,
    Image,
    Dimensions,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      padding: 15,
      height: 64,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      borderWidth: 1 / window.scale,
      borderColor:'#e6e6e6',
    },
    img:{
        width:26,
        height:26,
        tintColor:'#00cafb'
    }
});
const Option = ({...props})=>{
    const { style ,currentSelect ,value, textStyle ,onPress,...rest} = props;

    const _onPress = ()=>{
        onPress(value);
    }

    return (
      <TouchableWithoutFeedback onPress={_onPress}>
        <View style={[ styles.container, style ]}>
            <Text style={ textStyle }>{value}</Text>
            <Image 
                source={ currentSelect === value ? require('./img/radio_select.png') : require('./img/radio_unSelect.png')}
                style={styles.img}
                resizeMode='contain'
            />
        </View>
      </TouchableWithoutFeedback>
    );
}

export default Option;
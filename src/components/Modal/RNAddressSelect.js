import React ,{ PureComponent }from 'react';

import {
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Picker,
    Dimensions
} from 'react-native';

import Address from '../Address';


class RNAddressSelect extends PureComponent{
    render(){
        console.log('RNAddressSelect render');
        return(
            <View style={styles.container}>
                <TouchableWithoutFeedback  onPress={this._onClose}>
                    <View style={styles.closeContainer}></View>
                </TouchableWithoutFeedback>
                
                <Address onChooseAddress={this._onChooseAddress} onClose={this._onClose}/>
            </View>
        )
    }

    _onClose = ()=>{
        this.props.onClose();
    }
    _onChooseAddress = rs=> {
        console.log('地址-------->',rs);
        this.props.onClose(rs);
    }
}

const styles = StyleSheet.create({
    container:{
        width: Loan.styles.width,
        height: Loan.styles.height,
        backgroundColor:'transparent'
    },
    closeContainer:{
        flex:1,
        backgroundColor:'transparent'
    },

})

export default RNAddressSelect;
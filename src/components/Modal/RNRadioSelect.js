import React ,{ PureComponent }from 'react';

import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

import { RadioSelect } from '../Select';
import Option from '../Select/Option';

const styles = StyleSheet.create({
    container:{
        width: width,
        height: height,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    selectContianer:{
        width:250,
        height:320,
        backgroundColor:'#fff',
    }
})

class RNRadioSelect extends PureComponent{
    state = {
        currentSelect:this.props.passProps.defaultValue
    }

    render(){
        const { config } = this.props.passProps; 

        return(
            <TouchableOpacity style={styles.container} onPress={this._onClose} activeOpacity={1}>
                <RadioSelect 
                    width={250}
                    onSelect={this._onSelect}
                >
                {
                    config.map((item, index)=>
                        <Option 
                            key={'sex_select'+index} 
                            value={item}
                            onPress={this._onSelect}
                            currentSelect={this.state.currentSelect}
                        />
                    )
                }
                </RadioSelect>
            </TouchableOpacity>
        )
    }
    _onClose = ()=> {
        this.props.onClose();
    }

    _onSelect = cb=> {
        this.props.onClose(cb);
        // this.setState({ currentSelect:cb },
        //     ()=>{
        //         this.props.onClose(cb);
        //     }
        // )
    }
}

export default RNRadioSelect;
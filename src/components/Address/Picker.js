import React ,{ PureComponent } from 'react';

import {
    Text,
    View,
    Picker,
    StyleSheet
} from 'react-native';

class Address extends PureComponent{
    
    render(){
        const { config, style } = this.props;

        return(
            <Picker
                style={styles.container}
                selectedValue={this.props.currentSelect}
                onValueChange={this.props.onValueChange} 
            >
            {
                config && config.map((item, index)=><Picker.Item key={'address'+index} label={item.label} value={item.value} />)
            }
            </Picker>
        )
    }  
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})

export default Address;
import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';

import Button from '../Button';
import Picker from './Picker';

import Province from './Province';
import City from './City';
import Block from './Block';

import CityMap from './CityMap';

const window = Dimensions.get('window');

class Address extends PureComponent{
    state = {
        province:'0',
        city:'01',
        block:'011'
    }

    _onChangeProvince = province =>{
        console.log('省========>',province);
        this.setState({ 
            province:province,
            city:province+'1', 
            block:province+'11', 
        })
    }
    _onChangeCity = city =>{
        console.log('市========>',city);
        this.setState({ 
            city:city,
            block:city+'1' 
        })
    }
    _onChangeBlock = block =>{
        console.log('区========>',block);
        this.setState({ block })
    }
    _onSure = ()=> {
        console.log('确定');
        this.props.onChooseAddress(CityMap[this.state.block]);
    }
    _onCancel = ()=> {
        console.log('取消');
        this.props.onClose();
    }
    render(){
        const { province, city ,block } = this.state;

        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>省</Text>
                    <Text style={styles.title}>市</Text>
                    <Text style={styles.title}>区</Text>
                </View>
                <View style={styles.pickerContainer}>
                    <Picker currentSelect={province} config={Province} onValueChange={this._onChangeProvince} />
                    <Picker currentSelect={city} config={City[province]} onValueChange={this._onChangeCity} />
                    <Picker currentSelect={block} config={Block[city]} onValueChange={this._onChangeBlock} />
                </View>
                <View style={styles.btnGroups}>
                    <Button title='确定' titleColor='#fff' backgroundColor='#00cafb' style={styles.btn} onPress={this._onSure} />
                    <Button title='取消' style={styles.btn} onPress={this._onCancel} />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        height:250,
    },
    header:{
        height:50,
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth: 1/window.scale,
        borderColor:'#00cafb'
    },
    title:{
        flex:1,
        color:'#00cafb',
        fontSize:16,
        fontWeight:'bold',
        textAlign:'center',
    },
    pickerContainer:{
        flexDirection:'row',
        height:150,
        alignItems:'center'
    },
    btnGroups:{
        height:50,
        borderTopWidth:1/window.scale,
        borderColor:'#00cafb',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    btn:{
        flex:1,
    },
})

export default Address
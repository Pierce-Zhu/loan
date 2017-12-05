import React from 'react';

import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import Line from '../Line';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        borderRadius:5,
        width: width-60,
        alignItems:'center',
        justifyContent: 'center',
    },
    box:{
        backgroundColor: '#fff',
        width: width*3/4,
        // height: 0.68*(PPZ.device.width - 60) ,
        borderRadius: 10,
        marginHorizontal: 20,
        overflow: 'hidden'
    },
    titleContainer:{
        paddingTop: 15,
        marginBottom:5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00cafb'
    },
    contentContainer:{
        paddingVertical: 20,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tips:{
        color:'#999',
        fontSize:16
    },
    btnContainer:{
        paddingVertical:15,
        flexDirection:'row',
        borderTopWidth:StyleSheet.hairlineWidth,
        borderColor:'#dedede',
    },
    btn:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#dedede',
    },
    btnFont:{
        color:'#00cafb'
    },
})
const RNAlert = (props)=>{
    // console.log('alert------------>',props.passProps);

    const { title='提示' ,tips='', buttons, component } = props.passProps;
    const _onClose = ()=> {
        global.modal.close();
    }
    const line = ( (width*3/4) /2  )* 3/4;

    return(
        <View style={styles.container}>
            {/*模态框title*/}
            <View style = { styles.titleContainer }>
                <Text style = { styles.title }>{title}</Text>
            </View>
            <Line width={(width-60)-2*line} />
            {/*模态框内容*/}
            {
                component ? 
                component :
                <View style = { styles.contentContainer }>
                    <Text style = { styles.tips }>{tips}</Text>
                </View>
            }
            {/*模态框按钮*/}
            <View style = { styles.btnContainer} >
                {
                    buttons && buttons.map((it,i)=>
                        <TouchableOpacity 
                            key = { 'alert_' + i }
                            onPress = {it.cb}
                            style = {[
                                styles.btn,
                                {
                                    borderRightWidth:buttons === (i+1) ? 0:StyleSheet.hairlineWidth,
                                }
                            ]}>
                            <Text style = { styles.btnFont }>{it.title}</Text>
                        </TouchableOpacity>    
                    )
                }
                {
                    !buttons &&
                    <TouchableOpacity 
                        onPress = {_onClose}
                        style = {styles.btn}>
                        <Text style = { styles.btnFont }>确定</Text>
                    </TouchableOpacity>   
                }
            </View>
        </View>
    )
}


export default RNAlert;
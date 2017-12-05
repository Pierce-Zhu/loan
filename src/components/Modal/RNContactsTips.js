import React from 'react';

import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Image,
    Dimensions
} from 'react-native';

import Button from '../../components/Button';
import Header from '../Header';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container:{
        width:width,
        height:height
    },
    scrollview:{
        flex:1,
    },

    title:{
        color:'#fff',
        fontSize:14
    },
    img:{
        width:width,
        height:height
    }
})

const RNContactsTips = ()=>{

    const _close = ()=>{
        global.modal.close();
    }

    return(
        <View style={styles.container}>
            <Header title='提示' titleColor='#fff'/>
            <ScrollView style={styles.scrollview}>
                
                <Image 
                    source={require('./img/contacts_1.png')}
                    style={styles.img}
                    resizeMode='stretch'
                />
                <Image 
                    source={require('./img/contacts_2.png')}
                    style={styles.img}
                    resizeMode='stretch'
                />
                <Image 
                    source={require('./img/contacts_3.png')}
                    style={styles.img}
                    resizeMode='stretch'
                />
                
            </ScrollView>
            <Button 
                title='关闭'
                titleColor='#fff'
                backgroundColor='#00cafb'
                height={50}
                onPress={_close}
            />
        </View>
    )
}

export default RNContactsTips;
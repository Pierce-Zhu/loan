import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    DeviceEventEmitter,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../../redux/actions/login.js';

import InputItem from '../../../components/InputItem';
import Button from '../../../components/Button';
import Header from '../../../components/Header';

import ValidateUtil from '../../../util/ValidateUtil';

class Login extends Component{

    params={
        mobile:'',
        passwd:'',
    }

    render(){
        return(
            <View style={styles.container}>
                <Header title='登录' backPress={this._goBack} />
                <ScrollView>
                <KeyboardAvoidingView  behavior = 'padding' style={{ flex: 1 }} >
                    <View style={styles.logoContainer}>
                        <Image 
                            source={require('../img/login_logo.png')}
                            style={styles.logo}
                            resizeMode='contain'
                        />
                    </View>
                    <InputItem 
                        name='mobile'
                        marginHorizontal={15}
                        onChangeText={this._onChangeText}
                        placeholder='请输入手机号码'
                        keyboardType='numeric'
                    />
                    <InputItem 
                        name='passwd'
                        marginTop={10}
                        marginHorizontal={15}
                        placeholder='请输入密码'
                        onChangeText={this._onChangeText}
                        showLineAndBtn={true}
                        source={require('./img/login_info.png')}
                        onPress={()=>{console.log('测')}}
                    />

                    <Button 
                        title='登录'
                        titleColor='#fff'
                        titleSize={16}
                        marginTop={15}
                        borderRadius={25}
                        marginHorizontal={30}
                        backgroundColor='#00cafb'
                        onPress={this._onLogin}
                    />
                    <View style={styles.tipsContainer}>
                        <Text style={styles.tips}>
                            还没有注册账号？<Text style={styles.registerText} onPress={this._onRegister}>立即注册</Text>
                        </Text>
                    </View>
                </KeyboardAvoidingView>
                </ScrollView>
            </View>
        )
    }
    _onChangeText = (text ,name)=> {
        // console.log('注册输入框--------->',text,name);
        this.params[name]= text;
    }
    
    _onRegister = ()=>{
        global.router.open('register')(this);
    }

    _goBack = ()=>{
        global.router.back()(this);
    }

    _onValidate = params=> {
        console.log('登录表单参数---------->',params);

        return new Promise(async (resovle, reject)=>{
            try {
                await ValidateUtil.match(params.mobile,'mobile','手机号格式不正确');
                await ValidateUtil.match(params.passwd, 'password', '密码格式不正确');
                resovle();
            } catch (error) {
                global.modal.openHalfTrans('RNAlert',{ tips:error });
            }
        });
    }

    _onLogin = async ()=>{
        const { actions } = this.props;
        try {
            await this._onValidate(this.params);

            await actions.login(this.params);
            global.router.back()(this);
            DeviceEventEmitter.emit('user',{type:'reload'});
        } catch (error) {
            global.modal.openHalfTrans('RNAlert',{ tips:error });
        }
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    logoContainer:{
        height:150,
        alignItems:'center',
        marginBottom:10,
    },
    logo:{
        width:150,
        height:150,
    },
    tipsContainer:{
        marginTop:15,
        height:40,
        alignItems:'center',
    },
    tips:{
        fontSize:14,
        color:'#e6e6e6',
    },
    registerText:{
        fontSize:16,
        color:'#00cafb'
    }
})

const mapStateToProps = state=> state.userState

const mapDispatchToProps = (dispatch)=>{
    return {
        actions: bindActionCreators(loginActions, dispatch)
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
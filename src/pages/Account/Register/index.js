import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    AdSupportIOS,
    DeviceEventEmitter,
    KeyboardAvoidingView
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as registerActions from '../../../redux/actions/register';

import InputItem from '../../../components/InputItem';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import SMSCode from '../../../components/SMSCode';

import ValidateUtil from '../../../util/ValidateUtil';

class Register extends Component{
    //注册参数
    params={
        user:{
            mobile:'',//手机号
            channel:'',//渠道(流量渠道)
            // register_ip:'',//注册IP放在node取
        },
        devices_info:{}
    };

    render(){

        return(
            <View style={styles.container}>
                <Header title='注册' backPress={this._goBack} />
                <KeyboardAvoidingView  behavior = 'padding' style={{ flex: 1 }} >
                    <ScrollView style={styles.scrollview}>
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
                            onChangeText={this._onChangeInput}
                            placeholder='请输入手机号码'
                            keyboardType='numeric'
                        />
                        <InputItem 
                            name='smscode'
                            marginTop={10}
                            marginHorizontal={15}
                            onChangeText={this._onChangeInput}
                            showLineAndBtn={true}
                            btnComponent={<SMSCode countTime={30} sendSMS={this._onSendSMS} inActiveTitle='发送验证码'/>}
                            placeholder='请输入手机验证码'
                        />
                        <InputItem 
                            name='password'
                            marginTop={10}
                            marginHorizontal={15}
                            onChangeText={this._onChangeInput}
                            placeholder='请输入6-20位密码'
                        />
                        <InputItem 
                            name='rpassword'
                            marginTop={10}
                            marginHorizontal={15}
                            onChangeText={this._onChangeInput}
                            placeholder='请再次输入密码'
                        />

                        <Button 
                            title='立即注册'
                            titleColor='#fff'
                            titleSize={16}
                            marginTop={15}
                            borderRadius={25}
                            marginHorizontal={30}
                            backgroundColor='#00cafb'
                            onPress={this._onRegister}
                        />
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        )
    }
    _onSendSMS=()=>{
        console.log('发送短信');
    }
    _goBack = ()=>{
        global.router.back()(this);
    }
    _onChangeInput = (text ,name)=> {
        // console.log('注册输入框--------->',text,name);
        this.params.user[name]= text;
    }
    //验证表单
    _onValidate = params=> {
        console.log('注册表单------------>',params);

        return new Promise(async (resovle, reject)=>{
            try {
                await ValidateUtil.match(params.mobile,'mobile','手机号格式不正确');
                if(params.smscode !=='123456'){
                    global.modal.openHalfTrans('RNAlert',{tips:'短信验证码不正确'});
                    return;
                }
                await ValidateUtil.expect(params.password ,params.rpassword,'两次密码不一致');
                await ValidateUtil.match(params.password, 'password', '密码格式不正确');
                //mock 短信

                resovle();
            } catch (error) {
                global.modal.openHalfTrans('RNAlert',{ tips:error });
            }
        });
    }

    _onDeviceIDSuccess = async deviceID => {
        const { actions } = this.props;
        this.params.devices_info.device_num = deviceID;

        try {
            await this._onValidate(this.params.user);

            delete this.params.user.rpassword;
            await actions.register(this.params);
            //注册完成后返回
            global.router.back('register')(this);
            DeviceEventEmitter.emit('user',{type:'reload'});
        } catch (error) {
            global.modal.openHalfTrans('RNAlert',{ tips:error });
        }
        
    };
    _onDeviceIDFailure = (e) => {
        console.log('获取idfa失败');
    };

    _onRegister = ()=> {
        this.params.devices_info=global.Loan.device;
        //如果是ios 覆盖device_num
        if(this.params.devices_info.platform === 'ios'){
            AdSupportIOS.getAdvertisingId(
                this._onDeviceIDSuccess,
                this._onDeviceIDFailure
            );
        }
    }
}

const styles = StyleSheet.create({
    container:{
        width: global.Loan.styles.width,
        height: global.Loan.styles.height,
        backgroundColor:'#fff'
    },
    scrollview:{
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
})

const mapStateToProps = (state)=> {
    return {
        userInfo: state.userState
    };
}

const mapDispatchToProps = (dispatch)=> {
    return {
        actions: bindActionCreators(registerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
//注册参数
// params:{
//     user:{
//         mobile://手机号
//         passwd://登陆密码，md5加密
//         channel://渠道(流量渠道)
//         register_ip://注册IP 在node端去取
//     },
//     devices_info:{//设备采集信息，具体字段查看设备采集信息文档
//         userId: String, //用户ID
//         mobile: String, //手机号
//         device_num: String, //手机设备号（iOS是IDFA，Andr是IMEI）
//         device_info: String, //手机型号
//         platform: String, //手机平台  设备类型(IOS/Android/Wap)
//         app_location: {}, //手机GPS信息
//         installed_apps: String, //手机内的应用安装列表
//         installed_apps_version: String, //安装应用的版本号
//         call_log:[], //手机通话记录
//         tele_num: String, //运营商号 运营商编号（国家码+运营商码）
//         tele_name: String, //数据服务商名字 移动/联通/电信/Wifi
//         imei: String, //手机imei(Android)
//         imsi: String, //手机imsi(Android)
//         seria_no: String, //手机序列号
//         android_id: String, //手机androidId(android)
//         udid: String, //安卓ID(UDID)
//         mac: String, //手机mac地址(android/ios)
//         idfa: String, //手机广告标识符idfa(ios)
//         idfv: String, //idfv(ios)
//         ios_plat: String, //手机平台(iOS)
//         ios_ver: String, //手机版本(iOS)
//         uuid: String, //UUID(iOS)
//         is_root: String, //设备状态 Android是否root/iOS是否越狱
//         dns: String, //DNS
//         mem_size: String, //手机内存
//         storage_size: String, //手机存储空间
//         ava_storage_size: String, //手机可用存储空间
//         phone_brand: String, //手机品牌
//         android_ver: String, //操作系统版本
//         device_model: String //（安卓）厂商/（苹果）型号
//     }
// }
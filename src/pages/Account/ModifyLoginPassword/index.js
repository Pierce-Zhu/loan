import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    DeviceEventEmitter
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modifyLoginPasswordActions from '../../../redux/actions/modifyLoginPassword';

import InputItem from '../../../components/InputItem';
import Button from '../../../components/Button';
import ValidateUtil from '../../../util/ValidateUtil';

class ModifyLoginPassword extends Component{
    params = {
        newPasswd:'',
        rnewPasswd:''
    }
    render(){
        return(
            <View style={styles.container}>
                <ScrollView>
                    <InputItem 
                        name='newPasswd'
                        marginTop={10}
                        marginHorizontal={15}
                        placeholder='请输入密码'
                        onChangeText={this._onChangeText}
                    />
                    <InputItem 
                        name='rnewPasswd'
                        marginTop={10}
                        marginHorizontal={15}
                        placeholder='请再次输入密码'
                        onChangeText={this._onChangeText}
                    />
                    <Button 
                        title='修改登录密码'
                        titleColor='#fff'
                        titleSize={16}
                        marginTop={15}
                        marginHorizontal={30}
                        backgroundColor='#00cafb'
                        onPress={this._onModifyLoginPassword}
                    />
                </ScrollView>
            </View>
        )
    }
    _onChangeText = (text ,name)=> {
        // console.log('修改登录密码--------->',text,name);
        this.params[name]= text;
    }
    _onValidate = params=> {
        console.log('登录表单参数---------->',params);

        return new Promise(async (resovle, reject)=>{
            try {
                await ValidateUtil.expect(params.newPasswd ,params.rnewPasswd,'两次密码不一致');
                await ValidateUtil.match(params.newPasswd, 'password', '密码格式不正确');
                resovle();
            } catch (error) {
                global.modal.openHalfTrans('RNAlert',{ tips:error });
            }
        });
    }
    _onModifyLoginPassword = async ()=>{
        const { actions, user } = this.props;
        
        try {
            await this._onValidate(this.params);
            this.params['mobile']= user.mobile;
            
            await actions.modifyLoginPassword(this.params);
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
    }
})


const mapStateToProps = state=> state.userState

const mapDispatchToProps = (dispatch)=>{
    return {
        actions: bindActionCreators(modifyLoginPasswordActions, dispatch)
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ModifyLoginPassword);
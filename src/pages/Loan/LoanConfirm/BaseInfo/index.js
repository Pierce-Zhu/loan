import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    DeviceEventEmitter
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseInfoActions from '../../../../redux/actions/baseInfo';

import Button from '../../../../components/Button';
import Tips from '../../../../components/Tips';

import TitleAndDesc from '../../../../components/UserInfo/TitleAndDesc';
import TitleSelect from '../../../../components/UserInfo/TitleSelect';

import TitleInput from '../../../../components/UserInfo/TitleInput';
import TitleAdress from '../../../../components/UserInfo/TitleAddress';


class BaseInfo extends Component {
    state = {
        reload:false
    }
    sex = { defaultValue:'请选择',config:['请选择','男','女'] };
    education = { defaultValue:'小学',config:['小学','初中','高中','大专','本科','硕士','博士','无'] };
    config = {
        '男':0,
        '女':1,
        '无':0,
        '小学':1,
        '初中':2,
        '高中':3,
        '大专':4,
        '本科':5,
        '硕士':6,
        '博士':7,
    }

    parmas={};

    render() {
        console.log('user------------>',this.props);
        const { user } = this.props;

        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollview}>
                    <KeyboardAvoidingView  behavior = 'padding' style={{ flex: 1 }} >
                    <TitleAndDesc title='姓名' desc={user.name||'张三'}/>
                    <TitleAndDesc title='身份证' desc={user.ic||'110101199901010117'} />
                    <TitleSelect 
                        name='sex'
                        title='性别' 
                        defaultValue={this.sex.defaultValue} 
                        config={this.sex} 
                        onPress={this._onSelect}
                    />
                    <TitleSelect 
                        name='education' 
                        title='学历' 
                        defaultValue={this.education.defaultValue} 
                        config={this.education} 
                        onPress={this._onSelect}
                    />
                    <TitleAdress 
                        name='liveAddress' 
                        title='居住地址'
                        titlePlaceholder={'请填写省市区'}
                        address={this.parmas.liveAddress}
                        detailPlaceholder='请填写街道地址'
                        onPress={this._onSelectAddress}
                        onChangeText={this._onChangeAddress}
                    />
                    <TitleInput 
                        name='company'
                        title='公司名称' 
                        placeholder='请填写公司名称' 
                        onChangeText={this._onChangeText}
                    />
                    <TitleAdress 
                        name='jobAddress' 
                        title='工作地址'
                        titlePlaceholder={'请填写省市区'}
                        address={this.parmas.jobAddress}
                        detailPlaceholder='请填写街道地址'
                        onPress={this._onSelectAddress}
                        onChangeText={this._onChangeAddress}
                    />
                    <TitleInput 
                        name='income'
                        title='月收入(元)' 
                        placeholder='请输入薪资收入(只能是数字)' 
                        onChangeText={this._onChangeText}
                        keyboardType='numeric'
                    />
                    <Tips 
                        title='联系人信息'
                        titleColor='#000'
                        desc='(最联系的亲属/朋友)'
                        descColor='#7a7a7a'
                        backgroundColor='#e6e6e6'
                    />

                    <TitleInput 
                        name='linkName'
                        title='联系人姓名' 
                        titleWidth={100}
                        placeholder='请填写联系人真实姓名' 
                        onChangeText={this._onChangeText}
                    />
                    <TitleInput 
                        name='linkPhone'
                        title='联系人手机号码' 
                        titleWidth={120}
                        placeholder='请填写真实手机号码' 
                        onChangeText={this._onChangeText}
                        keyboardType='numeric'
                    />

                    <Button 
                        title='提交资料'
                        titleColor='#fff'
                        backgroundColor='#00cafb'
                        marginTop={20}
                        marginHorizontal={15}
                        borderRadius={5}
                        onPress={this._onSubmit}
                    />
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        )
    }

    _onChangeText = (text,name)=>{
        // console.log('_onChangeText------>',text,name);
        this.parmas[name] = text;
    }
    _onSelectAddress = async address=> {
        const res = await global.modal.openHalfTrans('RNAddressSelect');
        console.log('选择地址----->',res);
        this.parmas[address]=res;
        this.setState({reload:!this.state.reload});
    }
    _onChangeAddress = (text,name)=>{
        this.parmas[name+'detail'] = text;
    }

    _onSelect = async name=> {
        const res = await global.modal.openHalfTrans('RNRadioSelect',this[name]);
        if(res){
            this[name].defaultValue = res;
            this.setState({ reload :!this.state.reload });
        }
    }
    _onSubmit = async ()=> {
        const { user, actions } = this.props;
        console.log('user--------------------->',user);
        this.parmas['sex'] = this.config[this.sex.defaultValue];
        this.parmas['education'] = this.config[this.education.defaultValue];
        this.parmas['name'] = user.name||'张三';
        this.parmas['idNo'] = user.ic='110101199901010117'
        this.parmas['userId'] = user.id;

        console.log('提交资料--------->',this.parmas);
        try {
            await actions.submitBaseInfo(this.parmas);
            global.router.back()(this);
            DeviceEventEmitter.emit('user',{type:'reload'});
        } catch (error) {
            global.modal.openHalfTrans('RNAlert',{ tips:error });
        }
    }
}

const styles = StyleSheet.create({
    container:{
        width: global.Loan.styles.width,
        height: global.Loan.styles.height - global.Loan.styles.navBarHeight,
        backgroundColor: global.Loan.styles.backgroundColor
    },
    scrollview:{
        flex:1,
        backgroundColor:'#fff'
    }
})

const mapStateToProps = state => state.userState;
const mapDispatchToProps = dispatch => {
    return {
        actions:bindActionCreators(baseInfoActions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BaseInfo);
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    DeviceEventEmitter
} from 'react-native';

import { connect } from 'react-redux';

import Avatar from '../../components/Avatar';
import RowItem from '../../components/RowItem';
import LoginBackgroud from './template/LoginBackgroud';

import Linking from '../../components/Linking';

class Account extends Component{
    state={
        reload:false
    }
    _onLogin = ()=> {
        global.router.open('login')(this);
    }
    _onSet = ()=>{
        global.router.open('settings')(this);
    }

    _config = [
        { source:require('./img/accout_recharge_icon.png'),title:'银行卡',desc:'未绑定',route:'bankCard' },
        { source:require('./img/accout_recharge_icon.png'),title:'借款记录',desc:'',route:'loanRecord' },
        { source:require('./img/accout_recharge_icon.png'),title:'借款申请',desc:'',route:'queryLoan' },
        { source:require('./img/accout_recharge_icon.png'),title:'系统消息',desc:'',route:'messages' },
    ]

    _contact = [
        { source:require('./img/accout_recharge_icon.png'),title:'联系我们',desc:'4001868862',route:'contactUs' },
        // { source:require('./img/accout_recharge_icon.png'),title:'官方网站',desc:'yjyh.flyclouds.com.cn',route:'webview' },
        // { source:require('./img/accout_recharge_icon.png'),title:'检测更新',desc:'v1.41',route:'deposit' },
    ]

    _onPress = cb=> {
        console.log('item跳转--------->',cb);
        if(cb.route ==='webview' ){
            global.router.open(cb.route,{title:'活动',uri:'http://www.baidu.com'})(this);

            return;
        }
        if(cb.route ==='contactUs'){
            Linking(cb.desc);

            return;
        }
        const { user } = this.props;
        if(!user.mobile){
            global.router.open('login')(this);
            return
        }

        global.router.open(cb.route)(this);
    }

    _onRefresh = callback=> {
        if(callback.type==='reload'){
            this.setState({reload:!this.state.reload});
        }
    }

    componentDidMount(){
        this.subscription = DeviceEventEmitter.addListener('user',this._onRefresh);
    }
    componentWillUnmount(){
        this.subscription.remove();
    }

    render(){
        console.log('用户中心--------------->',this.props);
        const { user } = this.props;
        return(
            <View style={styles.container}>
                <Avatar onLogin={this._onLogin} user={user} />
                <LoginBackgroud user={user} onLogin={this._onLogin} onSet={this._onSet}/>
                <View style={styles.content}>
                {
                    this._config.map((item,index)=>{
                        return(
                            <RowItem 
                                key={'account_item'+index}
                                showLine={ index === (this._config.length-1)? false:true }
                                lineMarginLeft={15}
                                config={item}
                                onPress={this._onPress}
                            />
                        )
                    })
                }
                </View>
                <View style={styles.contact}>
                {
                    this._contact.map((item,index)=>{
                        return(
                            <RowItem 
                                key={'account_contact'+index}
                                showLine={ index === (this._contact.length-1)? false:true }
                                lineMarginLeft={15}
                                config={item}
                                onPress={this._onPress}
                            />
                        )
                    })
                }
                </View>
            </View>
        )
    }
}


const mapStateToProps = state=> state.userState

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: Loan.styles.backgroundColor,
    },
    content:{
        paddingTop:30,
        backgroundColor:'#fff'
    },
    contact:{
        marginTop:10,
        backgroundColor:'#fff'
    }
})

export default connect(mapStateToProps)(Account);
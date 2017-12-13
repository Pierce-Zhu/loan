import React, { Component } from 'react';
import {
    StyleSheet, 
    TouchableOpacity,
    View,
    Text,
    Image,
    ScrollView,
    InteractionManager,
    DeviceEventEmitter
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../../redux/actions/user';

import contacts from 'react-native-contacts';

import RowItem from '../../../components/RowItem';
import Button from '../../../components/Button';

class LoanConfirm extends Component {
    state = {
        reload:false,
    }

    componentDidMount(){
        const { actions } = this.props;
        contacts.checkPermission((err, permission) => {
            actions.contactsAuth(permission);
        });
        this.subscription = DeviceEventEmitter.addListener('user',this._onRefresh);
    }
    componentWillUnmount(){
        this.subscription.remove();
    }

    render(){
        const config = [
            { id:'info',source:require('./img/info.png'),title:'基本信息(必填)',desc:this.props.isUploadBaseInfo,route:'baseInfo' },
            { id:'operator',source:require('./img/info.png'),title:'运营商授权',desc:this.props.hasOperatorAuth,route:'operator' },
            { id:'idcard',source:require('./img/info.png'),title:'身份认证',desc:this.props.hasIDAuth,route:'authentication' },
            { id:'contacts',source:require('./img/info.png'),title:'通讯录授权',desc: this.props.hasContactsAuth,route:'contacts' },
        ]

        console.log('loanconfirm--------->',this.props);

        return(
            <View style = {styles.container} >
                <View style = {styles.content}>
                {
                    config.map((elem, index) => {
                        return(
                            <RowItem 
                                key = {'keyItem' + index}
                                config = {elem}
                                showLine={ index === (config.length-1)? false:true }
                                lineMarginLeft={15}
                                onPress = {this._onPress}
                            />    
                        )
                    })
                }
                </View>
                <View style = {[styles.content,styles.contentPadding]}>
                    <Text style = {styles.textStyle}>点击提交资料即代表您同意 <Text style={styles.xy} onPress={this._jumpToXy}>《借款协议》</Text> </Text>
                    <Button 
                        title="提交申请"
                        titleColor='#fff'
                        marginTop = {10}
                        borderRadius = {20}
                        height = {40}
                        backgroundColor = '#00cafb'
                        marginBottom = {50}
                        width = {global.Loan.styles.width*2/3} 
                        onPress = {this._onSubmit}
                    />
                </View>
            </View>
        )
    }
    _onRefresh = callback=> {
        if(callback.type==='reload'){
            //1.改变config配置
            
            this.setState({reload:!this.state.reload});
        }
    }

    _onPress = cb => {
        const that = this;
        //通讯录授权
        if(cb.route ==='contacts'){
            if(this.props.hasContactsAuth ==='未授权'){//1.
                const { actions } = this.props;
                contacts.requestPermission( (err, permission) => {
                    actions.contactsAuth(permission);
                })
                return;
            }
            if(this.props.hasContactsAuth ==='拒绝授权'){//2.
                global.modal.open('RNContactsTips',{title:'显示提示框提示用户去设置手动授权'});
                return;
            }
            //已授权 获取设备通讯录信息
            contacts.getAll((err, contacts)=>{
                //发送到服务端 待完成
                that['contacts'] = contacts;
            });
            return;
        }
        global.router.open(cb.route)(this);
    }

    _onSubmit = async ()=>{
        const { actions,user, navigation } = this.props;
        const { params } = navigation.state.params;
        
        if(user.authFlag ==='1111'){
            await actions.loan(params);

            return;    
        }
        global.modal.openHalfTrans('RNAlert',{tips:'请先完成认证'});
        
    }
    _jumpToXy = ()=> {
        global.router.open('loanXy')(this);
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: Loan.styles.backgroundColor,
    },
    content:{
        marginTop:10,
        backgroundColor:'#fff',
        alignItems: 'center',
    },
    contentPadding:{
        paddingTop:60,
    },
    textStyle: {
        marginBottom:10,
        color:'#7a7a7a'
    },
    xy:{
        color:'#00cafb'
    }
})

const mapStateToProps = state => state.userState;
const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(userActions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoanConfirm);
import React, { Component } from 'react';
import {
    StyleSheet, 
    TouchableOpacity,
    View,
    Text,
    Image,
    ScrollView,
    InteractionManager
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../redux/actions/user';

import LoanItem from './template/LoanItem';
import Button from '../../components/Button'


class Loan extends Component{

    amountConfig = [
        {id: 'fst', source1: require('./img/bg_500_down.png'), source2: require('./img/bg_500_normal.png'), amount: 500,unit:'元'},
        {id: 'sec', source1: require('./img/bg_1000_down.png'), source2: require('./img/bg_1000_normal.png'), amount: 1000,unit:'元'},
    ]

    daysConfig = [
        {id: 'thd', source1: require('./img/bg_seven_down.png'), source2: require('./img/bg_seven_normal.png'), amount: 7,unit:'天'},
        {id: 'fou', source1: require('./img/bg_fourteen_down.png'), source2: require('./img/bg_fourteen_normal.png'), amount: 14,unit:'天'},
    ]

    _getLoan = async ()=>{
        const { user,actions } = this.props;
        //1.判断有没有登录
        if(!user.mobile){
            global.router.open('login')(this);
            return;
        }
        //2.已登录
        const params ={
            amount:this.refs.loadMoney.state.amount,
            day:this.refs.loanDay.state.amount,
        }
        console.log('param--------->',params);
        
        //3.未绑卡
        // if(!user.cardNo){
        //     global.router.open('bankCard')(this);
        //     return;
        // }
        //4.未完成认证或者已认证修改权限
        if(user.authFlag !=='1111'){
            global.router.open('loanConfirm',params)(this);
            return;
        }
        //5.完成各种认证
        if(user.authFlag ==='1111'){
            params['userId'] = user.id;
            await actions.loan(params);

            return;
        }
        
    }

    render(){
        console.log('this.props.-------->',this.props);
        return(
            <View style={styles.container}>
                <ScrollView style={styles.scroll}>
                    <Image 
                        source = {require('./img/loan_banner_01.png')}
                        style = {styles.imgStyle}
                    />
                    <View style={styles.content}>
                        <LoanItem
                            ref='loadMoney'
                            titleText = '借款金额'
                            data = {this.amountConfig}
                        />
                        <LoanItem 
                            ref='loanDay'
                            titleText = '借款期限'
                            data = {this.daysConfig}
                        />
                        <Button 
                            title="申请借款" 
                            titleColor='#fff'
                            titleSize={16}
                            marginTop = {40}
                            borderRadius = {20}
                            backgroundColor = '#00cafb'
                            marginLeft = {global.Loan.styles.width/6}
                            width = {global.Loan.styles.width*2/3} 
                            onPress={this._getLoan}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        width: global.Loan.styles.width,
        height: global.Loan.styles.height,
        backgroundColor: global.Loan.styles.backgroundColor,
    },
    imgStyle: {
        height: 175,
        width: global.Loan.styles.width,
    },
    scroll:{
        flex:1,
    },
    btn:{
        backgroundColor:'green',
        height:50,
        alignItems: 'center',
    },
    content:{
        flex:1,
        marginTop:10,
        paddingBottom:40,
        backgroundColor:'#fff'
    }
})

const mapStateToProps = state => state.userState
const mapDispatchToProps = dispatch=> {
    return {
        actions:bindActionCreators(userActions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Loan);
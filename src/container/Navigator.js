import React from 'react';
import { View } from 'react-native';
import { StackNavigator,NavigationActions } from 'react-navigation';

import Splash from './Splash.js';
import Welcome from './Welcome.js';
import Dashboard from './Dashboard.js';

//Account
import Login from '../pages/Account/Login';
import Register from '../pages/Account/Register';
import BankCard from '../pages/Account/BankCard';
import LoanRecord from '../pages/Account/LoanRecord';
import Messages from '../pages/Account/Messages';
import LoanRecordDetail from '../pages/Account/LoanRecordDetail';
import Settings from '../pages/Account/Settings';
import ModifyLoginPassword from '../pages/Account/ModifyLoginPassword';
import QueryLoan from '../pages/Account/QueryLoan';

//Loan
import LoanConfirm from '../pages/Loan/LoanConfirm';  //认证资料
import BaseInfo from '../pages/Loan/LoanConfirm/BaseInfo'; //基本信息认证
import Operator from '../pages/Loan/LoanConfirm/Operator';  //运营商授权
import Authentication from '../pages/Loan/LoanConfirm/Authentication';  //身份认证
import LoanXy from '../pages/Loan/LoanConfirm/LoanXy';//认证协议

//repay
import RepayDetail from '../pages/Repay/RepayDetail';//还款详情

//webview
import RNWebview from '../components/Webview';//webview

//test测试页面
import Experiment from '../pages/Experiment';


const CardNavigator = StackNavigator({
    splash: { 
        screen: Splash,
        navigationOptions:()=>({
            header:null
        })
    },
    welcome:{ 
        screen: Welcome,
        navigationOptions:()=>({
            header:null
        })
    },
    dashboard: { screen: Dashboard },
    //Loan
    baseInfo:{ screen:BaseInfo,navigationOptions:()=>({ title:'基本资料' })},
    loanConfirm:{ screen:LoanConfirm,navigationOptions:()=>({ title:'认证资料' })},
    operator:{screen:Operator, navigationOptions:()=>({title: '运营商授权'})},
    authentication:{screen:Authentication, navigationOptions:()=>({title: '身份认证'})},
    loanXy:{ screen:LoanXy,navigationOptions:()=>({ title:'借款协议' })},
    //repay
    repayDetail:{ screen:RepayDetail,navigationOptions:()=>({ title:'还款详情' })},
    
    //Account
    messages:{ screen:Messages,navigationOptions:()=>({ title:'系统消息' })},
    bankCard:{ screen:BankCard,navigationOptions:()=>({ title:'我的银行卡' })},
    loanRecord:{ screen:LoanRecord,navigationOptions:()=>({ title:'借款记录' })},
    loanRecordDetail:{ screen:LoanRecordDetail,navigationOptions:()=>({ title:'借款详情' })},
    settings:{ screen:Settings,navigationOptions:()=>({ title:'设置' })},
    modifyLoginPassword:{ screen:ModifyLoginPassword,navigationOptions:()=>({ title:'修改登录密码' })},
    queryLoan:{ screen:QueryLoan,navigationOptions:()=>({ title:'借款申请' })},
    
    webview:{ screen: RNWebview },
    experiment:{ screen:Experiment,navigationOptions:()=>({ title:'测试' })},
},{
    navigationOptions: {
        headerStyle: { 
            backgroundColor: '#00cafb',
            shadowOpacity:0,
            shadowOffset:{ 
                height:0,
            },
            elevation:0,
        },
        headerRight: <View />,
        headerTitleStyle:{alignSelf: 'center'},
        headerBackTitle: null,
        headerTintColor: '#fff',
        showIcon: true,
    },
})

const Navigator = StackNavigator({
    CardNavigator:{ screen: CardNavigator },
    login:{ screen: Login,navigationOptions:()=>({ title:'登录' })},
    register:{ screen: Register,navigationOptions:()=>({ title:'注册' })},
    
},{
    // headerMode: 'screen',
    mode: 'modal',
    headerMode: 'none',
    navigationOptions: {
        gesturesEnabled: false,
    },
});

const routerHistory = {};
class RNRouter {
    static getNavigation = (that)=> {
        const { navigation } =that.props;
        return navigation;
    }
    static pushRouteHistory = (routerName,navigation)=>{
        const route = {
            key: navigation.state.key,
            name: routerName,
        }
        routerHistory[routerName]=route;
    }
    static getRouteKey = (routerName)=>{
        return routerHistory[routerName].key;
    };
    static init = ()=> {
        console.log('初始化路由');
    }
    static open = (routeName, params={}, subRouterName)=> (that)=> {
        const navigation = RNRouter.getNavigation(that);
        
        RNRouter.pushRouteHistory(routeName, navigation);
        navigation.navigate(routeName,params);
    }
    static back = (routeName)=> (that)=> {
        const navigation = RNRouter.getNavigation(that);
        
        const key = routeName ? RNRouter.getRouteKey(routeName) : routeName;
        navigation.goBack(key);
    }
    static reset = (routeName ,key)=> (that)=> {
        const navigation = RNRouter.getNavigation(that);
        const action = NavigationActions.reset({ 
            index:0, 
            actions: [ NavigationActions.navigate({ routeName })] 
        });
        routerHistory={};
        navigation.dispatch(action);
    }
}

export default Navigator;
export {
    RNRouter
};
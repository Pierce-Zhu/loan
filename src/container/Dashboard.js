import React from 'react';
import { Image, Text} from 'react-native';
import { TabNavigator, TabBarBottom, StackNavigator} from 'react-navigation';

//页面
import Loan from '../pages/Loan';
import Repay from '../pages/Repay';
import Account from '../pages/Account';

//tabBar 组件
import TabBarLabel from '../components/TabBarLabel';
import TabBarIcon from '../components/TabBarIcon';


const Dashboard = TabNavigator({
        Loan: {
            screen: Loan,
            navigationOptions:() => ({
                headerTitleStyle:{alignSelf: 'center'},
                headerTitle:'跟我贷',
                tabBarLabel:({ focused, tintColor })=>(
                    !focused && 
                    <TabBarLabel 
                        title='借款'
                        tintColor={tintColor}
                    />
                ),
                tabBarIcon: ({ focused ,tintColor }) => (
                    <TabBarIcon
                        source={require('./img/tab_loan_normal.png')}
                        focused={focused}
                        tintColor={tintColor}
                    />
                ),
            })
        },
        Repay: {
            screen: Repay,
            navigationOptions:() => ({
                headerTitleStyle:{alignSelf: 'center'},
                headerTitle:'还款',
                headerStyle:{ backgroundColor:'#4b5cc4',},
                headerTitleStyle:{ color:'#fff' },
                tabBarLabel:({ focused, tintColor })=>(
                    !focused && 
                    <TabBarLabel 
                        title='还款'
                        focused={focused}
                        tintColor={tintColor}
                    />
                ),
                tabBarIcon: ({ focused ,tintColor }) => (
                    <TabBarIcon
                        source={require('./img/tab_repay_normal.png')}
                        focused={focused}
                        tintColor={tintColor}
                    />
                ),
            })
        },
        Account: {
            headerTitleStyle:{alignSelf: 'center'},
            screen: Account,
            navigationOptions:() => ({
                headerTitleStyle:{textAlign:'center'},
                headerStyle:{ backgroundColor:'#00cafb' },
                tabBarLabel:({ focused, tintColor })=>(
                    !focused && 
                    <TabBarLabel 
                        title='我'
                        tintColor={tintColor}
                    />
                ),
                tabBarIcon: ({ focused ,tintColor }) => (
                    <TabBarIcon
                        source={require('./img/tab_account_normal.png')}
                        focused={focused}
                        tintColor={tintColor}
                    />
                ),
            })
        },
    }, {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: false,
        lazy: true,
        tabBarOptions: {
            activeTintColor: '#00c3fb',
            inactiveTintColor: '#979797',
            style: { backgroundColor: '#ffffff' },
        },
})


export default Dashboard;
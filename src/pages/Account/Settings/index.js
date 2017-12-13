import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    DeviceEventEmitter
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as logoutActions from '../../../redux/actions/logout';

import RowItem from '../../../components/RowItem';
import Button from '../../../components/Button';


class Settings extends PureComponent{
    
    _config = { source:require('./img/mima.png'),title:'修改登录密码',route:'modifyLoginPassword' }

    render(){
        return(
            <View style={styles.contaienr}>
                <RowItem 
                    lineMarginLeft={15}
                    config={this._config}
                    onPress={this._onPress}
                />

                <Button 
                    title='退出当前账号'
                    titleColor='#fff'
                    marginTop={20}
                    borderRadius={5}
                    marginHorizontal={30}
                    backgroundColor='#00cafb'
                    width={global.Loan.styles.width-60}
                    onPress={this._onLogout}
                />
            </View>
        )
    }

    _onPress = item=> {
        global.router.open(item.route)(this);
    }

    _onLogout = async ()=> {
        console.log('注销------');
        const { actions } = this.props;
        await actions.logout();
        global.router.back()(this);
        DeviceEventEmitter.emit('user',{type:'reload'});
    }
}

const styles = StyleSheet.create({
    contaienr:{
        flex:1,
        backgroundColor:global.Loan.styles.backgroundColor
    }
})

const mapStateToProps = state=> state.userState
const mapDispatchToProps = (dispatch)=> {
    return {
        actions:bindActionCreators(logoutActions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Settings);
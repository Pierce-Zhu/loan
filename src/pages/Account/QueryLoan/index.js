import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as queryLoanActions from '../../../redux/actions/queryLoan'; 
import * as confirmLoanActions from '../../../redux/actions/confirmLoan';

import Button from '../../../components/Button';


class QueryLoan extends Component{

    render(){
        return(
            <View style={styles.container}>
                <Button 
                    title='查询借款申请'
                    titleColor='#fff'
                    backgroundColor='#00cafb'
                    marginTop={20}
                    marginHorizontal={30}
                    width={global.Loan.styles.width-60}
                    height={50}
                    onPress={this._onQueryLoan}
                />
                <Button 
                    title='确认借款'
                    titleColor='#fff'
                    backgroundColor='#00cafb'
                    marginTop={20}
                    marginHorizontal={30}
                    width={global.Loan.styles.width-60}
                    height={50}
                    onPress={this._onConfirmLoan}
                />
            </View>
        )
    }

    _onQueryLoan = ()=> {
        const { QueryLoanActions,user } = this.props;
        const params = {
            userId:user.id,
            // state:1
        }
        QueryLoanActions.queryLoan(params);
    }
    _onConfirmLoan = ()=>{
        // console.log('确认借款--------->',this.props)
        const { ConfirmLoanActions,user } = this.props;
        const params = {
            appid:'111',
            flag:0
        }
        ConfirmLoanActions.confirmLoan(params);
        
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: global.Loan.styles.backgroundColor
    }
})

const mapStateToProps = state=> {
    return {
        user:state.userState.user,
        borrowApp:state.borrowAppState.borrowApp
    }
}
const mapDispatchToProps = dispatch => {
    return {
        ConfirmLoanActions: bindActionCreators(confirmLoanActions,dispatch),
        QueryLoanActions: bindActionCreators(queryLoanActions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(QueryLoan)
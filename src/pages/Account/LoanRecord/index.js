import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as QueryLoanRecordActions from '../../../redux/actions/queryLoanRecord';

import NoRecord from './NoRecord';
import RecordItem from './RecordItem';

import Loading from '../../../components/Loading';

class LoanRecord extends Component{

    _onPress = ()=> {
        global.router.open('loanRecordDetail')(this);
    }

    componentDidMount(){
        const { actions, user } = this.props;
        const params = {
            userId:user.id,
            // state
        }
        actions.queryLoanRecord(params);
    }

    render(){
        console.log('借款记录------------->',this.props);
        const { borrow } = this.props;

        if(borrow.isLoading){
            return <Loading />
        }

        //没有记录
        if(borrow.value){
            return(
                <View style={styles.container}>
                    <NoRecord />
                </View>
            )
        }
        
        //有记录
        return(
            <View style={styles.container}>
                <ScrollView style={styles.scrollview}>
                    <RecordItem onPress={this._onPress} />
                    <RecordItem onPress={this._onPress} />
                    <RecordItem onPress={this._onPress} />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width: Loan.styles.width,
        height: Loan.styles.height,
        backgroundColor:Loan.styles.backgroundColor,
    },
    scrollview:{
        flex:1,
    }
})

const mapStateToProps = state=> {
    return {
        user:state.userState.user,
        borrow:state.borrowState
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        actions: bindActionCreators(QueryLoanRecordActions,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(LoanRecord)
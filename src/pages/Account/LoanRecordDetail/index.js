import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import DescHeader from '../../../components/DescHeader';
import DescItem from '../../../components/DescItem';

class LoanRecordDetail extends Component{

    _config = [
        {title:'本金',value:'500.00'},
        {title:'借款期限',value:'至2017-09-18'},
        {title:'还款方式',value:'一次性还款'},
        {title:'借款状态',value:'借款中'},
        {title:'利息',desc:'(7日)',value:'0.97'},
        {title:'快速信审费',value:'40.00'},
        {title:'融资管理费',value:'40.00'},
    ]

    render(){

        return(
            <View style={styles.container}>
                <DescHeader money={'500.00'}/>
                {
                    this._config.map((item,index)=>
                        <DescItem 
                            key={'item'+index}
                            config={item}
                        />
                    )
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})

export default LoanRecordDetail;
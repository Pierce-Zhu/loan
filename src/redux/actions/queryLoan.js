import * as TYPES from '../constants/actionsType';

import IApi from '../../api/IApi';

const queryLoanStart = ()=>{
    global.modal.openHalfTrans('RNLoading');
}
const queryLoanSuccess = userInfo=> {
    global.modal.close();
    return {
        type:TYPES.QUERY_LOAN_SUCCESS,
        userInfo
    }
}
const queryLoanFailure = detail=> {
    global.modal.openHalfTrans('RNAlert',{ tips:detail });
}

export const queryLoan = params => {
    console.log('查询借款申请参数------------>',params);
    return dispatch => {
        return new Promise(async (resovle, reject)=>{
            try {
                queryLoanStart();
    
                const res =  await IApi.queryLoan(params);
                console.log('查询借款申请结果---->',res);
    
                if(res.code===0){
                    dispatch(queryLoanSuccess(res.value));
                    resovle();
                } else {
                    queryLoanFailure(res.detail);
                }
            } catch (error) {
                global.modal.openHalfTrans('RNAlert',{ tips:error });     
            }

        });
    }
}
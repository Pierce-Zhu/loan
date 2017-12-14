import * as TYPES from '../constants/actionsType';

import IApi from '../../api/IApi';

const queryLoanRecordStart = ()=>{
    return {
        type:TYPES.QUERY_LOAN_RECORD_REQUEST
    }
}
const queryLoanRecordSuccess = value=> {
    return {
        type:TYPES.QUERY_LOAN_RECORD_SUCCESS,
        value
    }
}
const queryLoanRecordFailure = detail=> {
    global.modal.openHalfTrans('RNAlert',{ tips:detail });
    return {
        type:TYPES.QUERY_LOAN_RECORD_FAILURE
    }
}

export const queryLoanRecord = params => {
    console.log('查询借款记录参数------------>',params);
    return dispatch => {
        return new Promise(async (resovle, reject)=>{
            try {
                dispatch(queryLoanRecordStart());
                const res =  await IApi.queryLoanRecord(params);
                console.log('查询借款记录结果---->',res);
                
                if(res.code===0){
                    dispatch(queryLoanRecordSuccess(res.value));
                    resovle();
                } else {
                    dispatch(queryLoanRecordFailure(res.detail));
                }
            } catch (error) {
                global.modal.openHalfTrans('RNAlert',{ tips:error });     
            }

        });
    }
}
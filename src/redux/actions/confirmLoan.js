import * as TYPES from '../constants/actionsType';

import IApi from '../../api/IApi';

//开始
const confirmLoanStart = ()=>{
    global.modal.openHalfTrans('RNLoading');
}

//成功
const confirmLoanSuccess = borrowApp=> {
    global.modal.openHalfTrans('RNAlert',{ tips:'确认借款' });
    return {
        type:TYPES.CONFIRM_LOAN_SUCCESS,
        borrowApp
    }
}

//失败
const confirmLoanFailure = detail=> {
    global.modal.openHalfTrans('RNAlert',{ tips:detail });
}

//确认借款
export const confirmLoan = params=> {

    return dispatch => {
        return new Promise( async (resovle, reject)=> {
            try {
                //1.开始提交
                confirmLoanStart();
                const res =  await IApi.confirmLoan(params);
                console.log('确认借款结果---->',res);
    
                if(res.code===0){
                    dispatch(confirmLoanSuccess(res.value));
                    resovle();
                } else {
                    confirmLoanFailure(res.detail);
                }
            } catch (error) {
                console.log('确认借款失败------->',error);
            }
        });
    }
}
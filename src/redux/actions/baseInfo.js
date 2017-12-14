import * as TYPES from '../constants/actionsType';

import IApi from '../../api/IApi';

//开始
const submitBaseInfoStart = ()=>{
    global.modal.openHalfTrans('RNLoading');
}

//成功
const submitBaseInfoSuccess = user=> {
    global.modal.openHalfTrans('RNAlert',{ tips:'添加基本资料成功' });
    return {
        type:TYPES.CONFIRM_BASEINFO_SUCCESS,
        user
    }
}

//失败
const submitBaseInfoFailure = detail=> {
    global.modal.openHalfTrans('RNAlert',{ tips:detail });
}

//提交基本资料
export const submitBaseInfo = params=> {
    params['liveAddress'] += params['liveAddressdetail'];
    params['jobAddress'] += params['jobAddressdetail'];
    
    delete params.liveAddressdetail;
    delete params.jobAddressdetail;

    return dispatch => {
        return new Promise( async (resovle, reject)=> {
            try {
                //1.开始提交
                submitBaseInfoStart();
                const res =  await IApi.submitBaseInfo(params);
                console.log('认证结果---->',res);
    
                if(res.code===0){
                    dispatch(submitBaseInfoSuccess(res.value));
                    resovle();
                } else {
                    submitBaseInfoFailure(res.detail);
                }
            } catch (error) {
                console.log('认证失败------->',error);
            }
        });
    }
}
import * as TYPES from '../constants/actionsType.js';

import IApi from '../../api/IApi.js';

//开始
const registerStart = ()=> {
    global.modal.openTrans('RNLoading');
}
//成功
const registerSuccess = user=> {
    global.modal.openHalfTrans('RNAlert',{ tips:'注册成功' });
    return{
        type: TYPES.REGISTER_SUCCESS,
        user,
    }
}
//失败
const registerFailure = detail=> {
    global.modal.openHalfTrans('RNAlert',{ tips:detail });
}

//注册操作
export const register = params=> {
    return dispatch => {
        return new Promise( async (resovle, reject)=> {
            try {
                //1.开始注册
                registerStart();
                const res =  await IApi.register(params);
                console.log('注册完成---->',res);
    
                if(res.code===0){
                    dispatch(registerSuccess(res.value));
                    resovle();
                } else {
                    registerFailure(res.detail);
                }
            } catch (error) {
                console.log('注册异常------->',error);
            }
        });
    }

}
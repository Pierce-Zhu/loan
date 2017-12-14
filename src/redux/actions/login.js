import * as TYPES from '../constants/actionsType.js';

import IApi from '../../api/IApi.js';

//开始
const loginStart = ()=> {
    global.modal.openHalfTrans('RNLoading');
}
//成功
const loginSuccess = user=> {
    global.modal.close();
    return{
        type: TYPES.LOGIN_SUCCESS,
        user,
    }
}
//失败
const loginFailure = detail=> {
    global.modal.openHalfTrans('RNAlert',{ tips:detail });
}

//登录操作
export const login = params=> {
    return dispatch => {
        return new Promise( async (resovle, reject)=> {
            try {
                //1.开始登录
                loginStart();
                const res =  await IApi.login(params);
                console.log('登录---->',res);
    
                if(res.code===0){
                    dispatch(loginSuccess(res.value));
                    resovle();
                } else {
                    loginFailure(res.detail);
                }
            } catch (error) {
                console.log('登录异常------->',error);
            }
        });
    }
}
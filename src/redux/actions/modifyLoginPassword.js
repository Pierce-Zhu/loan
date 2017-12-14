import * as TYPES from '../constants/actionsType.js';

import IApi from '../../api/IApi.js';

//开始
const modifyLoginPasswordStart = ()=> {
    global.modal.openTrans('RNLoading');
}
//成功
const modifyLoginPasswordSuccess = user=> {
    global.modal.openHalfTrans('RNAlert',{ tips:'修改成功' });
    return{
        type: TYPES.MODIFY_LOGIN_PASSWORD_SUCCESS,
        user,
    }
}
//失败
const modifyLoginPasswordFailure = detail=> {
    global.modal.openHalfTrans('RNAlert',{ tips:detail });
}

//登录操作
export const modifyLoginPassword = params=> {
    console.log('修改密码参数------------>',params);
    return dispatch => {
        return new Promise( async (resovle, reject)=> {
            try {
                //1.开始登录
                modifyLoginPasswordStart();
                const res =  await IApi.modifyLoginPassword(params);
                console.log('修改登录密码结果---->',res);
    
                if(res.code===0){
                    dispatch(modifyLoginPasswordSuccess(res.value));
                    resovle();
                } else {
                    modifyLoginPasswordFailure(res.detail);
                }
            } catch (error) {
                console.log('修改登录密码异常------->',error);
            }
        });
    }
}
import * as TYPES from '../constants/actionsType';

import IApi from '../../api/IApi';
import { start ,failure } from './common';

const loanSuccess = userInfo=> {
    global.modal.openHalfTrans('RNAlert',{ tips:'借款申请成功' });
    return {
        type:TYPES.LOAN_SUCCESS,
        userInfo
    }
}

//借款
export const loan = params => {
    console.log('借款参数------------>',params);
    return dispatch => {
        return new Promise(async (resovle, reject)=>{
            try {
                start();
    
                const res =  await IApi.loan(params);
                console.log('借款结果---->',res);
    
                if(res.code===0){
                    dispatch(loanSuccess(res.value));
                    resovle();
                } else {
                    failure(res.detail);
                }
                
            } catch (error) {
                global.modal.openHalfTrans('RNAlert',{ tips:error });     
            }
        });
    }
}
//上传通讯录
export const uploadPhonelist = params=> {
    return dispatch => {
        return new Promise((resolve, reject)=>{
            dispatch();
        })
    }
}
//通讯录授权
export const contactsAuth = permission=>{
    const __type = {
        'undefined':TYPES.CONTACTS_AUTH_UNDEFINED,
        'authorized':TYPES.CONTACTS_AUTH_SUCCESS,
        'denied':TYPES.CONTACTS_AUTH_DENIED,
    }
    return {
        type:__type[permission]
    }
}

//拍摄身份证
export const getIDCard = (side,data)=> {
    const __type = {
        'front':TYPES.FRONT_ID_CARD,
        'back':TYPES.BACK_ID_CARD,
    }
    return {
        type:__type[side],
        data
    }
} 

//上传身份证
export const uploadIDCard = params=>{
    return dispatch=>{
        return new Promise(async (resolve,reject)=>{
            try {
                start()

                const res = await IApi.uploadIDCard(params);
                console.log('上传身份证结果---------->',res);
                if(res.code===0){
                    resolve();
                } else {
                    global.modal.openHalfTrans('RNAlert',{ tips:res.detail });
                }
            } catch (error) {
                console.log('上传身份证异常----------->',error);
                reject(error);
            }
        })
    }
}

export const uploadLivenessSuccess = ()=>{
    return {
        type:TYPES.LIVENESS_SUCCESS
    }
}

//上传活体照片
export const uploadLiveness = params =>{
    return dispatch=>{
        return new Promise(async (resolve,reject)=>{
            try {
                start()

                const res = await IApi.uploadLiveness(params);
                console.log('上传活体照片结果---------->',res);
                if(res.code===0){
                    // dispatch(uploadLivenessSuccess());
                    resolve();
                } else {
                    global.modal.openHalfTrans('RNAlert',{ tips:res.detail });
                }
            } catch (error) {
                reject(error);
                console.log('上传活体照片异常----------->',error);
            }
        })
    }
}
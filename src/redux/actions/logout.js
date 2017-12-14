import * as TYPES from '../constants/actionsType.js';

// import IApi from '../../api/IApi.js';

//开始
const logoutStart = userInfo=> {
    global.modal.openHalfTrans('RNLoading');
}
//成功
const logoutSuccess = userInfo=> {
    global.modal.close();
    return{
        type: TYPES.logout_SUCCESS,
        userInfo,
    }
}
//失败
const logoutFailure = detail=> {
    global.modal.openHalfTrans('RNAlert',{ tips:detail });
}

//登录操作
export const logout = params=> {
    return dispatch => {
        return new Promise( async (resovle, reject)=> {
            try {
                //1.开始登录
                logoutStart();
                // const res =  await IApi.logout(params);
                // console.log('登录---->',res);
    
                // if(res.code===0){
                //     dispatch(logoutSuccess(res.value));
                //     resovle();
                // } else {
                //     dispatch(logoutFailure(res.detail));
                // }
                resovle();
            } catch (error) {
                console.log('登录异常------->',error);
            }
        });
    }
}
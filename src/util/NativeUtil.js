import { NativeModules,Platform } from 'react-native';

// console.log('原生模块------------->',NativeModules);
const { FacePPManager } = NativeModules;//face++

//身份证质量检测
//默认 正面身份证 params:back反面
const checkIDCard = (side='back')=> {
    return new Promise(async (resovle, reject)=>{
        try {
            if(Platform.OS === 'android'){
                const authIDCard = await FacePPManager.authIDCard();//安卓授权
            }
            const res = await FacePPManager.checkIDCard(side);//跳转检测页面
            console.log('正面身份证结果----->',res);
            res.imageData = 'data:image/png;base64,'+ res.imageData;    
            resovle(res);
        } catch (error) {
            console.log('身份证识别异常--------------->',error);
            reject(error);
        }
    });
}
//活体检测
const checkLiveness = ()=> {
    return new Promise(async (resovle, reject)=>{
        try {
            if(Platform.OS === 'android'){
                const authLiveness = await FacePPManager.authLiveness();//安卓授权
            }
            const res = await FacePPManager.checkLiveness();//跳转检测页面    
            res.imageData = 'data:image/png;base64,'+ res.imageData;    

            resovle(res);
        } catch (error) {
            console.log('活体检测异常---------------->',error);
            reject(error);
        }
    })
}

export const faceppModule = {
    checkIDCard,
    checkLiveness,
}
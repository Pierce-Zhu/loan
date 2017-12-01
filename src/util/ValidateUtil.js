'use strict';

const regexp = {
    email: /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/,
    mobile: /^1(4[0-9]|3[0-9]|5[0-35-9]|7[06-8]|8[0-9])\d{8}$/,
    imgCode:/^\d{4}$/,
    mobileCode:/^\d{6}$/,
    referrals:/^1(4[0-9]|3[0-9]|5[0-35-9]|7[06-8]|8[0-9])\d{8}$/,
    password: /^\S{6,18}$/,
    empty: /^[\s\t\r\n]*$/,
    company:/^\S{6,32}$/,
    comm:!/^[\+]?([1-9]\d*|0)(\.\d{1,2})?$/
}

class ValidateUtil {
    /**
     * 
     * 
     * @static 匹配
     * @param {any} str 验证参数
     * @param {any} reg 正则
     * @param {any} tips 异常提示
     * @returns 
     * 
     * @memberOf ValidateUtil
     */
    static match(str ,reg ,tips) {
        return new Promise((resolve ,reject )=>{
            if( str.match(regexp[reg]) ){
                resolve(true);
                return;
            }
            reject(tips);
        });
    }
    /**
     * 
     * 
     * @static 非匹配
     * @param {any} str 验证参数
     * @param {any} reg 正则表达式
     * @param {any} tips 异常提示
     * 
     * @memberOf ValidateUtil
     */
    static notMatch(str ,reg , tips) {
        return new Promise((resolve ,reject)=>{
            if(str.match(regexp[reg])){
                reject(tips);
            }
            resolve(true);
        });
    }
    /**
     * 
     * 
     * @static 期望相同
     * @param {any} str 比较参数
     * @param {any} targe 目标参数
     * @param {any} tips 异常提示
     * 
     * @memberOf ValidateUtil
     */
    static expect(str ,targe ,tips) {
        return new Promise((resolve ,reject)=>{

            if(str === targe){
                resolve(true);
                return;
            }
            reject(tips);
        });
    }
    /**
     * 
     * 
     * @static 不期望相同
     * @param {any} str 比较参数
     * @param {any} targe 目标参数
     * @param {any} tips 异常提示
     * 
     * @memberOf ValidateUtil
     */
    static notExpect(str ,targe ,tips) {
        return new Promise((resolve ,reject)=>{

            if(str === targe){
                reject(tips);
                return;
            }
            resolve(true);
        });
    }
}

export default ValidateUtil;
import querystring from 'qs';

class ApiUtil {
    static get(url, params, headers){
        return ApiUtil.request('GET', ApiUtil.urlFormat(url,params), undefined,headers);
    };
    static post(url, params, headers){
        headers={
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        return ApiUtil.request('POST',ApiUtil.urlFormat(url) , params,headers);
    };
    static urlFormat(url,params) {
        typeof params === 'string' ? (url += params + '?' ) : '';
        typeof params === 'object' ? (url += '?' + querystring.stringify(params) +'&') : '';
        typeof params === 'undefined' ? url += '?': '';

        url +=  'platform=' + global.Loan.device.platform +
                '&channel=' + global.Loan.cache.channel;
        return url;
    }
    static request(method ,url ,body,headers = {}){
        body = body ? JSON.stringify(body) : undefined ;
        const reqInfo = { method, headers, body };

        return new Promise( async (resolve,reject)=>{
            try {
                const data = await fetch( Loan.host + url, reqInfo);            
                
                if(data.ok){
                    const data2Json = await data.json();
                    resolve(data2Json);
                } else {
                    console.log('网络请求失败');
                }
            } catch (error) {
                console.log('request---error-->',error);
                global.modal.openHalfTrans('RNAlert',{tips:'网络异常'});         
            }
        });

    }
    static async uploadAvatar(url, source){
        let formData = new FormData(); 
        formData.append("avatar",source);   
        const reqInfo = {
            method:'POST',
            headers:{
                'Content-Type':'multipart/form-data;charset=utf-8',  
            },
            body:formData,
        }
        console.log('reqInfo----->',reqInfo);
        const res = await fetch( Loan.host + url, reqInfo);        
        
        // console.log('uploadAvatar-------------->',res2Json);
        if(res.ok){
            const res2Json = await res.json();
            // console.log('uploadAvatar-------------->',res2Json);
            return res2Json;
        } else {
            console.log('上传失败,请检查网络');
        }
    }
    static async uploadImages(url,data){
        console.log('url---uploadImages---------->',url);
        console.log('data---uploadImages---------->',data);

        let formData = new FormData(); 
        
        const keys =  Object.keys(data).forEach((item)=>{
            formData.append(item,data[item]);
        });

        const reqInfo = {
            method:'POST',
            headers:{
                'Content-Type':'multipart/form-data;charset=utf-8',  
            },
            body:formData,
        }
        const res = await fetch( Loan.host + url, reqInfo);
        if(res.ok){
            const res2Json = await res.json();
            // console.log('uploadAvatar-------------->',res2Json);
            return res2Json;
        } else {
            console.log('上传失败,请检查网络');
        }
    }
}

global.Loan.api = ApiUtil;
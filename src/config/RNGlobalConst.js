import DeviceInfo from 'react-native-device-info';
import {  Platform, Dimensions, PixelRatio ,StyleSheet } from 'react-native';


let { width, height } = Dimensions.get('window');

global.Loan = {}
global.Loan.device = {
    platform : Platform.OS,//设备系统
    version : DeviceInfo.getVersion(),//当前app版本
    readableVersion : DeviceInfo.getReadableVersion(),//这个是全版本
    brand : DeviceInfo.getBrand(),//设备品牌
    device_info : DeviceInfo.getModel(),//设备型号
    // bundleId : DeviceInfo.getBundleId(),//bundleid
    device_num : DeviceInfo.getUniqueID(),//设备id
};
console.log('设备信息----------->',global.Loan.device);
console.log('DeviceInfo----------->',DeviceInfo);

global.Loan.styles = {
    backgroundColor : '#f3f3f0',//默认背景
    borderColor : '#dedede',//默认边框颜色
    onePx : StyleSheet.hairlineWidth,//一像素
    width: width,
    height: height,
    pixelRatio: PixelRatio.get(),//设备像素密度比
    viewHeight: height - (Loan.device.platform ==='ios' ? 64 : 56),
    tabBarHeight: Loan.device.platform ==='ios' ? 50 : 58,
    navBarHeight: Loan.device.platform ==='ios' ? 65 : 56,
    // statusBarHeight: 20,//状态栏高度
    // statusbar : 20,//状态栏高度 沉浸式
    // navHeight : 45,//导航高度,·
    // tabbarHeight : 48,//底部菜单栏
    // IOSStatusbarColor : 'light-content',//ios状态栏背景色light-content default
    // AndroidStatusbarColor : 'rgba(255, 255, 255, 0)',//android状态栏背景色
    // isTranslucent:true
}

global.Loan.appState = 'start';//app运行状态
global.Loan.netInfoState = '';//网络状态
global.Loan.UMENG_KEY = (Platform.OS === 'android') ? '5704ba0167e58edb7b00287d' : '5716d173e0f55ac44a0005d4';

global.Loan.version; //app初始化版本配置
// version数据结构 {
//     moblieHost:''//mobile
//     homeProduct:''//首页数据
//     serverTime:'',//服务器时间
//     homeSlide:'',//首页轮播图,
//     weakpwd:'',//弱密码
// }
global.Loan.token = {} //token值
global.Loan.webview = {} //webview
global.Loan.store = {} //用户信息缓存
global.Loan.cache = {
    canOpenNetModal:false
}; //缓存 
// cache数据结构 {
//     channel:''//app渠道
//     defaultLoginMobile:''//上次登录账号
//     homeProduct:''//首页数据
//     productIndex:''//产品主页数据
//     serverTime:'',//服务器时间
//     homeSlide:'',//首页轮播图,
//     weakpwd:'',//弱密码
//     canOpenNetModal:false
// }

// /*************** uat 环境地址   ************/
// const HTTP_TYPE = 'https://';
// const HOST = HTTP_TYPE+'auat.paipaizhu.com';
// /*****************************************/

// /*************** sit 环境地址   ************/
// const HOST = 'http://atest.paipaizhu.com';
// /*****************************************/

// /*************** 本地 环境地址   ************/
// const HOST = 'http://127.0.0.1:3700';
// const HOST = 'http://192.168.1.39:3700';
// /*****************************************/

// /*************** zl 环境地址   ************/
// const HOST = 'http://192.168.1.9:3700';
const HOST = 'http://192.168.31.85:3700';
// /*****************************************/
global.Loan.host = HOST;
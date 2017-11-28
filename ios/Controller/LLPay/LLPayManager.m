
//
//  LLPayManager.m
//  hyj
//
//  Created by l z on 2017/10/20.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "LLPayManager.h"

#import "LLOrder.h"
#import "LLPayUtil.h"


@implementation LLPayManager

RCT_EXPORT_MODULE();

/*
 正式环境 认证支付 或 分期付 测试商户号  201408071000001543
 MD5 key  201408071000001543test_20140812
 
 正式环境 快捷支付测试商户号  201408071000001546
 MD5 key  201408071000001546_test_20140815
 */

//******************** 👇👇👇配置区域👇👇👇 ********************

/*! TODO: 修改两个参数成商户自己的配置 */
static NSString *kLLOidPartner = @"201408071000001543";//@"201408071000001546";                 // 商户号
static NSString *kLLPartnerKey = @"201408071000001543test_20140812";//@"201408071000001546_test_20140815";   // 密钥
static NSString *signType = @"MD5"; //签名方式

/*! 接入什么支付产品就改成那个支付产品的LLPayType，如快捷支付就是LLPayTypeQuick */

static LLPayType payType = LLPayTypeInstalments;
//
static NSString *userId = @"<#请填入信息#>";
//
///*！ 若是签约、认证、实名快捷、分期付等请填入以下内容 */
static NSString *cardNumber = @"<#请填入信息#>";  //卡号
static NSString *acctName = @"<#请填入信息#>";    //姓名
static NSString *idNumber = @"<#请填入信息#>";    //身份证号

//******************** 👆👆👆配置区域👆👆👆 ********************



//1.分期付  签约/绑卡银行卡
//1.1 rn端从服务端 拿到的签名signedOrder
//1.2 签名通过该bindBankCard方法 传给原生
//1.3 打开签约页面
RCT_EXPORT_METHOD(bindBankCard:(NSMutableDictionary *)bankCardInfo
                  signedOrder:(NSDictionary *)signedOrder
                      resolve:(RCTPromiseResolveBlock)resolve
                       reject:(RCTPromiseRejectBlock)reject)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    LLPayUtil *payUtil = [[LLPayUtil alloc] init];
    LLPaySdk *llpaySdk = [[LLPaySdk alloc] init];
    
    payUtil.signKeyArray = @[
         @"acct_name",
         @"card_no",
         @"id_no",
         @"oid_partner",
         @"risk_item",
         @"sign_type",
         @"user_id"
    ];
    BOOL isInstalmentsPay = payType == LLPayTypeInstalments;
    
    if (isInstalmentsPay) { //如果是分期付，那么repayment_plan/repayment_no/sms_param需要参与签名
      payUtil.signKeyArray = @[
         @"acct_name",
         @"card_no",
         @"id_no",
         @"oid_partner",
         @"risk_item",
         @"sign_type",
         @"user_id",
         @"repayment_plan",
         @"repayment_no",
         @"sms_param"
     ];
    };
//    [LLPaySdk sharedSdk].sdkDelegate = self;
    [[UINavigationBar appearance] setBarStyle:UIBarStyleBlack];
    
    UINavigationController *controller = (UINavigationController *)[[[UIApplication sharedApplication]keyWindow]rootViewController];
    
    [llpaySdk presentLLPaySDKInViewController:controller
                                  withPayType:payType
                                andTraderInfo:signedOrder];
    
    
  });
}

//2.解约/解绑银行卡
RCT_EXPORT_METHOD(unbind:(NSString *)userId
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  
}
//3.借款
RCT_EXPORT_METHOD(loan:(NSMutableDictionary *)orderInfo
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  LLOrder *order = [[LLOrder alloc] initWithLLPayType:payType];
  NSString *timeStamp = [LLOrder timeStamp];
  order.oid_partner = kLLOidPartner;
  order.sign_type = signType;
  order.busi_partner = @"101001";
  order.no_order = [NSString stringWithFormat:@"LL%@",timeStamp];
  order.dt_order = timeStamp;
  order.money_order = @"0.01";
  order.notify_url = @"https://yintong.com.cn";
  order.acct_name = acctName;
  order.card_no = cardNumber;
  order.id_no = idNumber;
  order.risk_item = [LLOrder llJsonStringOfObj:@{@"user_info_dt_register" : @"20131030122130"}];
  order.user_id = userId;
  order.name_goods = @"商品名";
  
  if (payType == LLPayTypeInstalments) {
    order.repayment_plan = [LLOrder llJsonStringOfObj:@{@"repaymentPlan":@[@{@"date" : @"2017-05-03", @"amount" : @"0.01"},@{@"date" : @"2017-06-03", @"amount" : @"0.02"}]}];
    order.repayment_no = [NSString stringWithFormat:@"%@%@", @"FenQi", timeStamp];
    order.sms_param = [LLOrder llJsonStringOfObj:@{@"contract_type" : @"短信显示的商户名",
                                                    @"contact_way" : @"400-018-8888"}];
  }
}
//4.还款
RCT_EXPORT_METHOD(repay:(NSMutableDictionary *)orderInfo
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  LLOrder *order = [[LLOrder alloc] initWithLLPayType:payType];
  NSString *timeStamp = [LLOrder timeStamp];
  order.oid_partner = kLLOidPartner;
  order.sign_type = signType;
  order.busi_partner = @"101001";
  order.no_order = [NSString stringWithFormat:@"LL%@",timeStamp];
  order.dt_order = timeStamp;
  order.money_order = @"0.01";
  order.notify_url = @"https://yintong.com.cn";
  order.acct_name = acctName;
  order.card_no = cardNumber;
  order.id_no = idNumber;
  order.risk_item = [LLOrder llJsonStringOfObj:@{@"user_info_dt_register" : @"20131030122130"}];
  order.user_id = userId;
  order.name_goods = @"商品名";
  
  if (payType == LLPayTypeInstalments) {
    order.repayment_plan = [LLOrder llJsonStringOfObj:@{@"repaymentPlan":@[@{@"date" : @"2017-05-03", @"amount" : @"0.01"},@{@"date" : @"2017-06-03", @"amount" : @"0.02"}]}];
    order.repayment_no = [NSString stringWithFormat:@"%@%@", @"FenQi", timeStamp];
    order.sms_param = [LLOrder llJsonStringOfObj:@{@"contract_type" : @"短信显示的商户名",
                                                   @"contact_way" : @"400-018-8888"}];
  }
}

#pragma - mark 支付结果 LLPaySdkDelegate
// 订单支付结果返回，主要是异常和成功的不同状态
// TODO: 开发人员需要根据实际业务调整逻辑
- (void)paymentEnd:(LLPayResult)resultCode withResultDic:(NSDictionary *)dic {
  
  dispatch_async(dispatch_get_main_queue(), ^{
  
    NSString *msg = @"异常";
    switch (resultCode) {
      case kLLPayResultSuccess: {
        msg = @"成功";
      } break;
      case kLLPayResultFail: {
        msg = @"失败";
      } break;
      case kLLPayResultCancel: {
        msg = @"取消";
      } break;
      case kLLPayResultInitError: {
        msg = @"sdk初始化异常";
      } break;
      case kLLPayResultInitParamError: {
        msg = dic[@"ret_msg"];
      } break;
      default:
        break;
    }
    
    NSString *showMsg =
    [msg stringByAppendingString:[LLPayUtil jsonStringOfObj:dic]];
    
    UINavigationController *controller = (UINavigationController *)[[[UIApplication sharedApplication]keyWindow]rootViewController];
    UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"交易结果"
                                                                   message:showMsg
                                                            preferredStyle:UIAlertControllerStyleAlert];

    [alert addAction:[UIAlertAction actionWithTitle:@"确认"
                                              style:UIAlertActionStyleDefault
                                            handler:nil]];
    [controller presentViewController:alert animated:YES completion:nil];
    
  });
}

@end

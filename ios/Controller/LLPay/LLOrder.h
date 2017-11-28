//
//  LLOrder.h
//  DemoPay
//
//  Created by linyf on 2016/11/28.
//  Copyright © 2016年 LianLianPay. All rights reserved.
//

#import <Foundation/Foundation.h>

/// LLOrder版本.
static const NSString * const llOrderVersion = @"1.0";

@interface LLOrder : NSObject

/// 使用LLPayType进行初始化.
- (instancetype)initWithLLPayType: (NSUInteger)payType;

/// 使用ApplePay MerchantID进行初始化.
- (instancetype)initWithApplePayMerchantID: (NSString *)merchantID;

/// 支付订单（不包含sign值）.
- (NSDictionary *)tradeInfoForPayment;

/// 签约订单（不包含sign值）.
- (NSDictionary *)tradeInfoForSign;

/// 字典转Json字符串，risk_item等可用.
+ (NSString*)llJsonStringOfObj:(NSDictionary *)dic;

/// 时间戳.
+ (NSString *)timeStamp;

#pragma mark - ******************** 基本参数 ********************

/// 商户编号.
@property (nonatomic, strong) NSString *oid_partner;

/// 签名方式.
@property (nonatomic, strong) NSString *sign_type;

/// 签名,生成订单后请到后台签名，并将签名值加入到订单字典中.
@property (nonatomic, strong) NSString *sign;

#pragma mark - ******************** 订单参数 ********************

#pragma mark =================== 必传参数 ===================

/// 商户业务类型, 虚拟商品销售：101001，实物商品销售：109001.
@property (nonatomic, strong) NSString *busi_partner;

/// 商户唯一订单号.
@property (nonatomic, strong) NSString *no_order;

/// 商户订单时间,格式：YYYYMMDDH24MISS  14位数字，精确到秒.
@property (nonatomic, strong) NSString *dt_order;

/// 交易金额.
@property (nonatomic, strong) NSString *money_order;

/// 服务器异步通知地址.
@property (nonatomic, strong) NSString *notify_url;

/// 风险控制参数.
@property (nonatomic, strong) NSString *risk_item;

/// 商户用户唯一编号.
@property (nonatomic, strong) NSString *user_id;


#pragma mark =================== 可选参数 ===================

/// 商品名称.
@property (nonatomic, strong) NSString *name_goods;

/// 订单描述.
@property (nonatomic, strong) NSString *info_order;

/// 订单有效时间.
@property (nonatomic, strong) NSString *valid_order;

#pragma mark - ******************** 各产品其余参数 ********************

/// 签约协议号.
@property (nonatomic, strong) NSString *no_agree;

/// 证件类型,默认为 0:身份证.
@property (nonatomic, strong) NSString *id_type;

/// 证件号码.
@property (nonatomic, strong) NSString *id_no;

/// 银行账号姓名.
@property (nonatomic, strong) NSString *acct_name;

/// 银行卡号,银行卡号前置，卡号可以在商户的页面输入.
@property (nonatomic, strong) NSString *card_no;

/// 平台来源标示,该参数可实现多个商户号之间用户数据共享，该标识填写主商户号即可.
@property (nonatomic, strong) NSString *platform;

/*! 分帐信息数据
 分帐商户号 1^分账业务类型 1^分帐金额 1^分账说明 1|分帐商户号 2^分账业务类 型 2^分帐金额 2^分账说明 2|分帐商户号 3^分账业务类型 3^分帐金额 3^分账说明 3

 1. 分账商户号:为注册登记在连连支付系统的商户编号(18 位数字)
 2. 分账业务类型:可与主收款业务类型busi_partner 一致
 3. 分帐金额:元为单位，保留两位数字 4、 分账说明:不能超过 100 个汉字，不能有^和|符号 分账方只支持除主收款方外的 3 个分账方.
 */
@property (nonatomic, strong) NSString *shareing_data;

/*! 修改标记
 0-可以修改，默认为 0
 1-不允许修改
 与 id_type,id_no,acct_name 配合使用
 如果该用户在商户系统已经实名认证过了， 则在绑定银行卡的输入信息不能修改，否则 可以修改.
 */
@property (nonatomic, strong) NSString *flag_modify;//快捷等

/// 支付方式 （必传）,**仅游易付**: M, 游易付预授权申请: F,其他支付方式不需要传入.
@property (nonatomic, strong) NSString *pay_type;

#pragma mark - ******************** 分期付（可选）参数 ********************

/// 分期计划编号.
@property (nonatomic, strong) NSString *repayment_no;

/// 分期计划.
/// 字典格式: (转化为JsonString即可)
/// @{@"repaymentPlan" : @[@{@"date" : @"2017-05-03", @"amount" : @"0.01"},@{@"date" : @"2017-06-03", @"amount" : @"0.02"}]}
@property (nonatomic, strong) NSString *repayment_plan;

/// 短信模板.
/// 字典格式: (转化为JsonString即可)
/// @{@"contract_type" : @"短信显示的商户名",@"contact_way" : @"400-018-8888"}
@property (nonatomic, strong) NSString *sms_param;

#pragma mark - ******************** ApplePay参数 ********************

/// 苹果开发者网站申请的merchantID.
@property (nonatomic, strong) NSString *ap_merchant_id NS_AVAILABLE_IOS(9_2);

/// 送货方式等，详见Pay送货信息配置指南.
@property (nonatomic, strong) NSString *llAPPayNeedShipping;

@end

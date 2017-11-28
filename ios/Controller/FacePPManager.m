//
//  FacePPManager.m
//  hyj
//
//  Created by l z on 2017/9/22.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "FacePPManager.h"

#import <MGBaseKit/MGBaseKit.h>
#import <MGIDCard/MGIDCard.h>
#import <MGLivenessDetection/MGLivenessDetection.h>

@implementation FacePPManager

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

//1.身份证
RCT_EXPORT_METHOD(checkIDCard:(NSString *)font resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    RCTLogInfo(@"开始检测身份证");
    //授权身份证验证
    [MGLicenseManager licenseForNetWokrFinish:^(bool License) {
      if (License) {
        RCTLogInfo(@"授权成功");
      }else{
        [[[UIAlertView alloc] initWithTitle:@"提示" message:@"SDK授权失败，请检查" delegate:self cancelButtonTitle:@"完成" otherButtonTitles:nil, nil] show];
      }
    }];
    
    BOOL idcard = [MGIDCardManager getLicense];
    if (!idcard) {
      [[[UIAlertView alloc] initWithTitle:@"提示" message:@"SDK授权失败，请检查" delegate:self cancelButtonTitle:@"完成" otherButtonTitles:nil, nil] show];
      return;
    }
    RCTLogInfo(@"idcard--------->%@",idcard?@"YES":@"NO");
    
    MGIDCardManager *cardManager = [[MGIDCardManager alloc] init];
    UINavigationController *controller = (UINavigationController *)[[[UIApplication sharedApplication]keyWindow]rootViewController];

    // 摄像头方向 MGIDCardScreenOrientationLandscapeLeft  MGIDCardScreenOrientationPortrait
    [cardManager setScreenOrientation:  MGIDCardScreenOrientationLandscapeLeft];

    //正反面身份证 IDCARD_SIDE_FRONT IDCARD_SIDE_BACK
    [cardManager IDCardStartDetection:controller
                           IdCardSide:[font isEqualToString:@"front"] ? IDCARD_SIDE_FRONT : IDCARD_SIDE_BACK
                               finish:^(MGIDCardModel *model) {
                                 RCTLogInfo(@"检测成功-----O(∩_∩)O~~-----");
                                 
                                 UIImage *image = [model croppedImageOfIDCard];

                                 NSData *data = UIImageJPEGRepresentation(image, 0.2f);
                                 NSString *imageResult = [data base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];

                                 MGIDCardAttr attr = model.result.attr;
  //                               brightness : 身份证的平均亮度，是一个0~255的数值。 70~230的亮度均是合格的。
  //                               corner_points : 身份证的4个角。顺序依此为：左上、右上、右下、左下。 四个点的位置要求在ROI范围内。
  //                               has_specular_highlight : 是否有亮斑 合格的身份证不该有亮斑
  //                               low_quality : 身份证上文字是否清晰的参考值。数值在0~1之间，并且越大越好。 大于检测配置器选项中 clear 的值
  //                               portrait_points : 身份证的平均亮度，是一个0~255的数值。
  //                               side : 身份证的正反面。
  //                               has_shadow : 身份证图像中是否有明显阴影。 无阴影时为合格。
                                 resolve(@{@"brightness": [NSString stringWithFormat:@"%f",attr.brightness],
                                           @"side": [font isEqualToString:@"font"] ? @"font":@"back",
                                           @"has_shadow": attr.has_shadow ? @YES :@NO,
                                           @"imageData":imageResult
                                           });

                               }
                                 errr:^(MGIDCardError errorType) {
                                   RCTLogInfo(@"检测异常-----/(ㄒoㄒ)/~~------->");
                                 }];
  });
};

//2.活体检测
RCT_EXPORT_METHOD(checkLiveness:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
  
  dispatch_async(dispatch_get_main_queue(), ^{
    RCTLogInfo(@"开始活体检测");
    //授权身份证验证
    [MGLicenseManager licenseForNetWokrFinish:^(bool License) {
      if (License) {
        RCTLogInfo(@"授权成功");
      }else{
        [[[UIAlertView alloc] initWithTitle:@"提示" message:@"SDK授权失败，请检查" delegate:self cancelButtonTitle:@"完成" otherButtonTitles:nil, nil] show];
      }
    }];
    
    MGLiveManager *liveManager = [[MGLiveManager alloc] init];
    UINavigationController *controller = (UINavigationController *)[[[UIApplication sharedApplication]keyWindow]rootViewController];
    
    liveManager.actionCount = 3;
    liveManager.actionTimeOut = 5;
    liveManager.randomAction = YES;
    
    [liveManager startFaceDecetionViewController: controller
                                          finish:^(FaceIDData *finishDic, UIViewController *viewController) {
                                            RCTLogInfo(@"活体检测完成");
                                            NSData *resultData = [[finishDic images] valueForKey:@"image_best"];
                                            NSString *imageResult = [resultData base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];
                                            
                                            [viewController dismissViewControllerAnimated:YES completion:nil];
                                            resolve(@{@"imageData":imageResult});
                                          }
                                           error:^(MGLivenessDetectionFailedType errorType, UIViewController *viewController) {
                                             RCTLogInfo(@"活体检测异常或失败");
                                             [viewController dismissViewControllerAnimated:YES completion:nil];
                                             
                                             reject(@"-1",@"检测失败",nil);
                                           }];
  });
  
}


@end

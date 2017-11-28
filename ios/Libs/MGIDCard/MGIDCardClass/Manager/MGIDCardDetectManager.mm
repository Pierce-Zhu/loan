
//
//  CardCheckManger.m
//  OCRSDK_Test
//
//  Created by 张英堂 on 15/8/6.
//  Copyright (c) 2015年 megvii. All rights reserved.
//

#import "MGIDCardDetectManager.h"
#import <MGBaseKit/MGBaseKit.h>
#import "MGIDCardBundle.h"

#define kIDCardScale (19.0 / 16.0 - 1.0 - 0.05)

@interface MGIDCardDetectManager ()

/**
 *  屏幕方向，默认横屏
 */
@property (nonatomic, assign) MGIDCardScreenOrientation screenOrientation;
@property (nonatomic, strong) MGIDCardQualityAssessment *mgCardQA;
/** 检测完成开关 */
@property (nonatomic, assign) BOOL detectFinish;

@end

@implementation MGIDCardDetectManager

#pragma mark - Init and Dealloc
-(void)dealloc {
    self.delegate = nil;
    self.mgCardQA = nil;
    MGLog(@"%s dealloc", __func__);
}

- (instancetype)init {
    self = [super init];
    if (self) {
        
        self.screenOrientation = MGIDCardScreenOrientationLandscapeLeft;
        self.IDCardScaleRect = MGIDCardScaleZero();
        
        NSString *modelPath = [MGIDCardBundle IDCardPathForResource:IDCardModelName ofType:IDCardModelType];
        NSData *modelData = [NSData dataWithContentsOfFile:modelPath options:NSDataReadingMappedIfSafe error:nil];
        if (!modelData) {
            [NSException raise:@"资源读取失败!" format:@"无法读取MGIDCardModel.model，请检查资源文件！"];
        }
        
        self.mgCardQA = [MGIDCardQualityAssessment assessmentOfOptions:@{MGIDCardQualityAssessmentModelRawData:modelData}];
        
        [self reset];
    }
    return self;
}

+ (instancetype)idCardCheckWithDelegate:(id<MGIDCardDetectDelegate>)delegate
                               cardSide:(MGIDCardSide)side
                      screenOrientation:(MGIDCardScreenOrientation)screenOrientation {
    MGIDCardDetectManager *checkManager = [MGIDCardDetectManager new];
    checkManager.screenOrientation = screenOrientation;
    checkManager.delegate = delegate;
    checkManager.IDCardSide = side;
    
    return checkManager;
}

+ (instancetype)idCardManagerWithCardSide:(MGIDCardSide)side
                        screenOrientation:(MGIDCardScreenOrientation)screenOrientation {
    MGIDCardDetectManager *checkManager = [MGIDCardDetectManager new];
    checkManager.screenOrientation = screenOrientation;
    checkManager.IDCardSide = side;
    
    return checkManager;
}

#pragma mark - Detect Image
- (void)detectWithImage:(UIImage *)image {
#pragma clang diagnostic push
#pragma clang diagnostic ignored"-Wdeprecated-declarations"
    [self checkWithImage:image];
#pragma clang diagnostic pop
    
}

- (void)checkWithImage:(UIImage *)image {
    @autoreleasepool {
        @synchronized(self) {
            if (self.detectFinish == NO) {
                CGRect tempRect = [self droppedCardImgRect:image.size];
                /* 1.2.0以及上版本需要对检测框进行扩大处理 */
                CGRect checkRect = [self expandFaceRect:tempRect imageSize:image.size scale:kIDCardScale];
                MGIDCardQualityResult *result = [self.mgCardQA getQualityWithImage:image
                                                                              side:self.IDCardSide
                                                                               ROI:checkRect];
                dispatch_async(dispatch_get_main_queue(), ^{
                    if (_delegate && [_delegate respondsToSelector:@selector(cardCheck:finish:)]) {
                        [self.delegate cardCheck:self finish:result];
                    }
                });
            }
        }
    }
}

#pragma mark - Operation
- (void)reset {
    self.detectFinish = NO;
}

- (void)stopDetect {
    self.detectFinish = YES;
}

#pragma mark - Header Api
- (BOOL)isQualifiedWithInbound:(CGFloat)inBoundF isCard:(CGFloat)isCardF {
    return inBoundF >= self.mgCardQA.inBound && isCardF >= self.mgCardQA.isIDCard;
}

#pragma mark - Dropped
//获取 在图片的尺寸上 裁剪 框的大小
- (CGRect)droppedCardImgRect:(CGSize)imageSize{
    if (MGIDCardScaleIsZero(self.IDCardScaleRect)) {
        [NSException raise:@"MGIDCardDetectManager 设置错误!" format:@"请设置 MGIDCardDetectManager 类的 IDCardScaleRect 属性!"];
    }
    
    CGRect tempRect = CGRectZero;
    if (MGIDCardScreenOrientationLandscapeLeft == self.screenOrientation) {
        tempRect = CGRectMake((imageSize.width-imageSize.height * (1 - self.IDCardScaleRect.y * 2) * self.IDCardScaleRect.WHScale) * self.IDCardScaleRect.x,
                              imageSize.height * self.IDCardScaleRect.y,
                              imageSize.height * (1-self.IDCardScaleRect.y * 2) * self.IDCardScaleRect.WHScale,
                              imageSize.height * (1-self.IDCardScaleRect.y * 2));
    } else {
        tempRect = CGRectMake(imageSize.width * self.IDCardScaleRect.x,
                              imageSize.height * self.IDCardScaleRect.y,
                              imageSize.width * (1 - self.IDCardScaleRect.x * 2),
                              imageSize.width * (1 - self.IDCardScaleRect.x * 2) / self.IDCardScaleRect.WHScale);
    }
    return tempRect;
}

- (NSString *)getErrorShowString:(MGIDCardFailedType)errorType {
    NSString *string = nil;
    
    switch (errorType) {
        case QUALITY_FAILED_TYPE_NOIDCARD: {
            string = [MGIDCardBundle MGIDBundleString:@"card_error_not_found"];
        }
            break;
        case QUALITY_FAILED_TYPE_WRONGSIDE: {
            if (self.IDCardSide == IDCARD_SIDE_FRONT) {
                string = [MGIDCardBundle MGIDBundleString:@"card_error_flip_protrait"];
            } else {
                string =[MGIDCardBundle MGIDBundleString:@"card_error_flip_national_emblem"];
            }
        }
            break;
        case QUALITY_FAILED_TYPE_TILT: {
            string = [MGIDCardBundle MGIDBundleString:@"card_error_true_up"];
        }
            break;
        case QUALITY_FAILED_TYPE_SIZETOOSMALL: {
            string = [MGIDCardBundle MGIDBundleString:@"card_error_size_too_small"];
        }
            break;
        case QUALITY_FAILED_TYPE_SIZETOOLARGE: {
            string = [MGIDCardBundle MGIDBundleString:@"card_error_size_too_large"];
        }
            break;
        case QUALITY_FAILED_TYPE_SPECULARHIGHLIGHT: {
            string = [MGIDCardBundle MGIDBundleString:@"card_error_highlight"];
        }
            break;
        case QUALITY_FAILED_TYPE_OUTSIDETHEROI: {
            string = [MGIDCardBundle MGIDBundleString:@"card_error_alignment"];
        }
            break;
        case QUALITY_FAILED_TYPE_SHADOW: {
            string = [MGIDCardBundle MGIDBundleString:@"card_error_shadow"];
        }
            break;
        case QUALITY_FAILED_TYPE_BLUR: {
            string = [MGIDCardBundle MGIDBundleString:@"card_error_blur"];
        }
            break;
        case QUALITY_FAILED_TYPE_FAKE: {
            string = [MGIDCardBundle MGIDBundleString:@"card_error_title11"];
        }
            break;
        case QUALITY_FAILED_TYPE_BRIGHTNESSTOOLOW: {
            string = [MGIDCardBundle MGIDBundleString:@"card_error_title12"];
        }
            break;
        case QUALITY_FAILED_TYPE_BRIGHTNESSTOOHIGH: {
            string = [MGIDCardBundle MGIDBundleString:@"card_error_title13"];
        }
            break;
        default: {
            string = @"";
        }
            break;
    }
    return string;
}

#pragma mark - CutoutRect
-(CGRect)expandFaceWithImageSize:(CGSize)size {
    CGRect tempRect = [self droppedCardImgRect:size];
    CGRect checkRect = [self expandFaceRect:tempRect
                                  imageSize:size
                                      scale:kIDCardScale];
    return checkRect;
}

#pragma mark - 扩大裁剪框
-(CGRect)expandFaceRect:(CGRect)rect imageSize:(CGSize)size scale:(CGFloat)scale {
    if (scale <= 0) {
        return  CGRectZero;
    }
    CGRect tempRect = CGRectZero;
    
    CGFloat left = rect.origin.x;
    CGFloat top = rect.origin.y;
    CGFloat right = size.width - rect.origin.x - rect.size.width;
    CGFloat bottom = size.height - rect.origin.y - rect.size.height;
    
    CGFloat minWidth = (left > right ? right :left);
    CGFloat minHeight = (top > bottom ? bottom :top);
    
    CGFloat maxSW = (rect.size.width * scale > minWidth ? minWidth/rect.size.width :scale);
    CGFloat maxSH = (rect.size.height * scale > minHeight ? minHeight/rect.size.height :scale);
    
    CGFloat sScale = maxSW > maxSH ? maxSH : maxSW;
    
    CGFloat scaleWidth = rect.size.width * sScale * 1.0;
    CGFloat scaleHeight = rect.size.height * sScale * 1.0;
    
    tempRect.origin.x = rect.origin.x - scaleWidth;
    tempRect.origin.y = rect.origin.y - scaleHeight;
    tempRect.size.width = rect.size.width + scaleWidth * 2;
    tempRect.size.height = rect.size.height + scaleHeight * 2;
    
    return tempRect;
}

@end

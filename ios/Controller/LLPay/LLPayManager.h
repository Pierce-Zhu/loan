//
//  LLPayManager.h
//  hyj
//
//  Created by l z on 2017/10/20.
//  Copyright © 2017年 Facebook. All rights reserved.
//
#import "LLPaySdk.h"
#import <Foundation/Foundation.h>

#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>

@interface LLPayManager : NSObject <RCTBridgeModule,LLPaySdkDelegate>

@end

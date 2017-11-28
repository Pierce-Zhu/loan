package com.hyj;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.imagepicker.ImagePickerPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

//原生接口
import com.hyj.RCTFacepp.FacePPPackage;//人脸识别
import com.hyj.RCTChannel.RCTChannelPackage;//获取android渠道
import com.hyj.RCTUpdate.RCTUpdatePackage;//app安装更新

import java.util.Arrays;
import java.util.List;


public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new ImagePickerPackage(),
          new ReactNativeContacts(),
          new RNDeviceInfo(),
          
          new FacePPPackage(),
          new RCTChannelPackage(),
          new RCTUpdatePackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }


}

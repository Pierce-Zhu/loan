package com.hyj.RCTChannel;

import android.app.Activity;

import java.io.File;
import java.io.FileOutputStream;
import java.io.FileInputStream;
import java.io.BufferedInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.IOException;
import java.net.URL;
import java.net.URLConnection;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;


import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;

import android.widget.Toast;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.net.Uri;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import java.util.Map;

public class RCTChannelManage extends ReactContextBaseJavaModule {


    private ReactApplicationContext context;
//    private PackageManager pm;


    public RCTChannelManage(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context=reactContext;
//        pm = context.getPackageManager();

    }

    @Override
    public String getName() {
        return "RCTChannelManage";
    }


    @ReactMethod
	public void getChannel(Callback callback) {
	    String channelInfo = null;
	    try {
	        ApplicationInfo ai = context.getPackageManager().getApplicationInfo(context.getPackageName(), PackageManager.GET_META_DATA);
            channelInfo = ai.metaData.getString("UMENG_CHANNEL");
	        if (channelInfo == null) {
                channelInfo = String.valueOf(ai.metaData.getInt("UMENG_CHANNEL"));
	        }
	    } catch (PackageManager.NameNotFoundException e) {
	        e.printStackTrace();
	    }
	    
	    callback.invoke(channelInfo);
	}



  @ReactMethod
  public void pathForBundle(String bundleNamed, Callback callback) {
    // TODO: Not sure what equilivent would be?
  }

}

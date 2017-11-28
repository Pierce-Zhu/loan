package com.hyj.RCTUpdate;

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

public class RCTUpdateManage extends ReactContextBaseJavaModule {


    private ReactApplicationContext context;

    public RCTUpdateManage(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context=reactContext;
    }

    @Override
    public String getName() {
        return "RCTUpdateManage";
    }


    @ReactMethod
    public void openFile(String _file) {
                File file =new File(_file);
                 // TODO Auto-generated method stub
                Log.e("OpenFile", file.getName());
                Intent intent = new Intent();
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                intent.setAction(android.content.Intent.ACTION_VIEW);
                intent.setDataAndType(Uri.fromFile(file),
                             "application/vnd.android.package-archive");

                context.startActivity(intent);
     }



  @ReactMethod
  public void pathForBundle(String bundleNamed, Callback callback) {
    // TODO: Not sure what equilivent would be?
  }

}

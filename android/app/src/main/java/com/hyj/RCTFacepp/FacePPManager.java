package com.hyj.RCTFacepp;


import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;

import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.util.Base64;
import android.util.Log;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import com.megvii.idcardlib.IDCardScanActivity;
import com.megvii.licensemanager.Manager;

import com.megvii.idcardquality.IDCardQualityLicenseManager;
import com.megvii.livenessdetection.LivenessLicenseManager;
import com.megvii.livenesslib.LivenessActivity;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Map;
import java.util.UUID;

import static android.app.Activity.RESULT_OK;
import static android.content.ContentValues.TAG;
import static android.os.Build.VERSION_CODES.M;


/**
 * Created by lz on 2017/9/27.
 */

public class FacePPManager extends ReactContextBaseJavaModule {
    @Override
    public String getName() {
        return "FacePPManager";
    }

    private static final int IDCARD_REQUEST = 192538;
    private static final int LIVENESS_REQUEST = 192539;

    public static final int EXTERNAL_STORAGE_REQ_CAMERA_CODE = 10;

    private Promise mPromise;

    public FacePPManager(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(new RNFacePPActivityEventListener());
    }

    //监听活动结果
    private class RNFacePPActivityEventListener extends BaseActivityEventListener {
        @Override
        public void onActivityResult(Activity activity, final int requestCode, final int resultCode, final Intent data) {
            //身份证检测
            Log.w("提示","resultCode---1--->" + resultCode);
            Log.w("提示","data---3--->" + data);

            if(requestCode == IDCARD_REQUEST && resultCode == RESULT_OK){

                Log.w("提示","身份证检测成功----->"+data.getByteArrayExtra("idcardImg"));

                idcardResult(data);
                return;
            }
            //活体检测
            if(requestCode == LIVENESS_REQUEST && resultCode == RESULT_OK){
                Log.w("提示","活体检测完成----->");
                livingResult(data);

                return;
            }
        }
    }

    //处理身份证结果
    private void idcardResult(Intent data) {
        if (mPromise != null) {
            WritableMap map = Arguments.createMap();

            byte[] idcardImgData = data.getByteArrayExtra("idcardImg");

            map.putInt("side",data.getIntExtra("side", 0));
            map.putString("imageData", Base64.encodeToString(idcardImgData,Base64.DEFAULT));//身份证图
            if(data.getIntExtra("side", 0) == 0){
                byte[] portraitImgData = data.getByteArrayExtra("portraitImg");
                map.putString("portraitImg",Base64.encodeToString(portraitImgData,Base64.DEFAULT));//肖像图
            }
            Log.w("结果","---->" + map);

            mPromise.resolve(map);
            mPromise = null;//
        }
    }
    //处理活体检测结果
    private void livingResult(Intent data) {
        if (mPromise != null) {
            WritableMap map = Arguments.createMap();

            Bundle bundle = data.getExtras();
            String resultOBJ = data.getExtras().getString("result");

            try{
                JSONObject result = new JSONObject(resultOBJ);
                int resID = result.getInt("resultcode");
                String delta = bundle.getString("delta");
                boolean isSuccess = result.getString("result").equals("验证成功");
                if(isSuccess){

                    Map<String, byte[]> images = (Map<String, byte[]>) bundle.getSerializable("images");
                    if (images.containsKey("image_best")) {
                        byte[] bestImg = images.get("image_best");
                        if (bestImg != null && bestImg.length > 0) {
                            map.putString("image_best", Base64.encodeToString(bestImg,Base64.DEFAULT));
                        }
                    }
                    if (images.containsKey("image_env")) {
                        byte[] envImg = images.get("image_env");
                        if (envImg != null && envImg.length > 0) {
                            map.putString("image_env",Base64.encodeToString(envImg,Base64.DEFAULT));
                        }
                    }
                    mPromise.resolve(map);
                    mPromise = null;//
                } else {
                    mPromise.reject("-1","检测失败");
                }
            } catch (JSONException e){
                e.printStackTrace();
                mPromise.reject("-1","检测失败");
            }
        }
    }

    //拍照身份证 默认正面照
    private void enterIDCardPage(String side){
        Log.w("提示","身份证当前正反面状态--------->" + side);
        final Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            Log.w("提示","当前activity为空");
            return;
        }
        final Intent intent = new Intent(currentActivity, IDCardScanActivity.class);
        intent.putExtra("side", side.equals("front")? 0 : 1);
        intent.putExtra("isvertical", false);

        try {
            currentActivity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    currentActivity.startActivityForResult(intent,IDCARD_REQUEST);
                }
            });
        } catch (Exception e) {
            mPromise.reject("-1","身份证异常");
            mPromise = null;//
        }
    }
    //拍照活体
    private void enterLivenessPage() {
        final Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            Log.w("提示","当前activity为空");
            return;
        }
        final Intent intent = new Intent(currentActivity, LivenessActivity.class);

        try {
            currentActivity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    currentActivity.startActivityForResult(intent, LIVENESS_REQUEST);
                }
            });
        }catch (Exception e){
            mPromise.reject("-1","活体检测异常");
            mPromise = null;//
        }
    }
    //开启的activity
    private void enterPage(String side){
        if(side == "live"){
            enterLivenessPage();
        } else {
            enterIDCardPage(side);
        }
    }
    //请求设备运行时权限
    private void requestCameraPerm(String side) {

        if (android.os.Build.VERSION.SDK_INT >= M) {
            if (ContextCompat.checkSelfPermission(getCurrentActivity(),
                    Manifest.permission.CAMERA)
                    != PackageManager.PERMISSION_GRANTED) {
                //进行权限请求
                ActivityCompat.requestPermissions(getCurrentActivity(),
                        new String[]{Manifest.permission.CAMERA},
                        EXTERNAL_STORAGE_REQ_CAMERA_CODE);
            } else {
                enterPage(side);
            }
        } else {
            enterPage(side);
        }
    }
    //////////////////////////////////////////////////////////////////////////////////
    /////////////////////////导出给rn//////////////////////////////////////////////////
    //身份证检测
    @ReactMethod
    public void checkIDCard(final String font , Promise promise){
        mPromise = promise;
        requestCameraPerm(font);
    }
    //活体检测
    @ReactMethod
    public void checkLiveness(Promise promise) {
        mPromise = promise;
        requestCameraPerm("live");
    }
    //身份证faceId授权
    @ReactMethod
    public void authIDCard(final Promise promise){
        new Thread(new Runnable() {
            @Override
            public void run() {
                Manager manager = new Manager(getCurrentActivity());
                IDCardQualityLicenseManager idCardLicenseManager = new IDCardQualityLicenseManager(getCurrentActivity());
                manager.registerLicenseManager(idCardLicenseManager);

                String uuid = UUID.randomUUID().toString();
                manager.takeLicenseFromNetwork(uuid);
                if (idCardLicenseManager.checkCachedLicense() > 0){
                    WritableMap map = Arguments.createMap();
                    map.putString("code","0");
                    map.putString("detail","授权成功");

                    promise.resolve(map);
                } else {
                    promise.reject("-1","联网授权失败！请检查网络或找服务商");
                }
            }
        }).start();
    }
    //活体检测faceId授权
    @ReactMethod
    private void authLiveness(final  Promise promise) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                Manager manager = new Manager(getCurrentActivity());
                LivenessLicenseManager licenseManager = new LivenessLicenseManager(getCurrentActivity());
                manager.registerLicenseManager(licenseManager);

                String uuid = UUID.randomUUID().toString();
                manager.takeLicenseFromNetwork(uuid);
                if (licenseManager.checkCachedLicense() > 0){
                    WritableMap map = Arguments.createMap();
                    map.putString("detail","授权成功");
                    map.putString("code","0");

                    promise.resolve(map);
                }else {
                    promise.reject("-1","联网授权失败！请检查网络或找服务商");
                }
            }
        }).start();
    }
}

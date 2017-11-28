# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# If your project uses WebView with JS, uncomment the following
# and specify the fully qualified class name to the JavaScript interface
# class:
# -keepclassmembers class fqcn.of.javascript.interface.for.webview {
#    public *;
# }

# Disabling obfuscation is useful if you collect stack traces from production crashes
# (unless you are using a system that supports de-obfuscate the stack traces).
# -dontobfuscate

# Just Android Stuff
-dontwarn org.apache.http.**
-dontnote org.apache.http.**
-dontwarn android.net.http.**
-dontnote android.net.http.**

# React Native

# Keep our interfaces so they can be used by other ProGuard rules.
# See http://sourceforge.net/p/proguard/bugs/466/
-keep,allowobfuscation,includedescriptorclasses @interface com.facebook.proguard.annotations.DoNotStrip
-keep,allowobfuscation,includedescriptorclasses @interface com.facebook.proguard.annotations.KeepGettersAndSetters
-keep,allowobfuscation,includedescriptorclasses @interface com.facebook.common.internal.DoNotStrip

# SoLoader
-keep class com.facebook.soloader.** { *; }
-keepclassmembers class com.facebook.soloader.SoLoader {
     static <fields>;
}

# Do not strip any method/class that is annotated with @DoNotStrip
-keep,includedescriptorclasses @com.facebook.proguard.annotations.DoNotStrip class *
-keep,includedescriptorclasses @com.facebook.common.internal.DoNotStrip class *
-keepclassmembers,includedescriptorclasses class * {
    @com.facebook.proguard.annotations.DoNotStrip *;
    @com.facebook.common.internal.DoNotStrip *;
}

-keepclassmembers,includedescriptorclasses @com.facebook.proguard.annotations.KeepGettersAndSetters class * {
  void set*(***);
  *** get*();
}

-keep,includedescriptorclasses class * { native <methods>; }
-keep,includedescriptorclasses class * { @com.facebook.react.uimanager.UIProp <fields>; }
-keep,includedescriptorclasses class * { @com.facebook.react.uimanager.annotations.ReactProp <methods>; }
-keep,includedescriptorclasses class * { @com.facebook.react.uimanager.annotations.ReactPropGroup <methods>; }
-keep,includedescriptorclasses class com.facebook.react.uimanager.UIProp { *; }

-keep,includedescriptorclasses class * extends com.facebook.react.bridge.JavaScriptModule { *; }
-keep,includedescriptorclasses class * extends com.facebook.react.bridge.NativeModule { *; }
-keep,includedescriptorclasses class com.facebook.react.bridge.CatalystInstanceImpl { *; }
-keep,includedescriptorclasses class com.facebook.react.bridge.JavaScriptExecutor { *; }
-keep,includedescriptorclasses class com.facebook.react.bridge.queue.NativeRunnable { *; }
-keep,includedescriptorclasses class com.facebook.react.bridge.ExecutorToken { *; }
-keep,includedescriptorclasses class com.facebook.react.bridge.ReadableType { *; }

-dontwarn com.facebook.react.**
-dontnote com.facebook.**

# TextLayoutBuilder uses a non-public Android constructor within StaticLayout.
# See libs/proxy/src/main/java/com/facebook/fbui/textlayoutbuilder/proxy for details.
-dontwarn android.text.StaticLayout

# GIF Support

-keep,includedescriptorclasses class com.facebook.imagepipeline.animated.factory.AnimatedFactoryImpl {
  public AnimatedFactoryImpl(com.facebook.imagepipeline.bitmaps.PlatformBitmapFactory, com.facebook.imagepipeline.core.ExecutorSupplier);
}

# okhttp/okio

-keepattributes Signature
-keepattributes *Annotation*
-keep,includedescriptorclasses class okhttp3.** { *; }
-keep,includedescriptorclasses interface okhttp3.** { *; }
-dontwarn okhttp3.**
-dontnote okhttp3.**

-dontwarn javax.annotation.Nullable
-dontwarn javax.annotation.ParametersAreNonnullByDefault

-keep,includedescriptorclasses class sun.misc.Unsafe { *; }
-dontwarn java.nio.file.*
-dontwarn org.codehaus.mojo.animal_sniffer.IgnoreJRERequirement
-dontwarn okio.**
-dontnote okio.**

# Adjust

-keep,includedescriptorclasses public class com.adjust.sdk.** { *; }
-keep,includedescriptorclasses class com.google.android.gms.common.ConnectionResult {
    int SUCCESS;
}
-keep,includedescriptorclasses class com.google.android.gms.ads.identifier.AdvertisingIdClient {
    com.google.android.gms.ads.identifier.AdvertisingIdClient$Info getAdvertisingIdInfo(android.content.Context);
}
-keep,includedescriptorclasses class com.google.android.gms.ads.identifier.AdvertisingIdClient$Info {
    java.lang.String getId();
    boolean isLimitAdTrackingEnabled();
}
# -keep,includedescriptorclasses class dalvik.system.VMRuntime {
#     java.lang.String getRuntime();
# }
# -keep class android.os.Build {
#     java.lang.String[] SUPPORTED_ABIS;
#     java.lang.String CPU_ABI;
# }
# -keep class android.content.res.Configuration {
#     android.os.LocaledList getLocales();
#     java.util.Locale locale;
# }
# -keep,includedescriptorclasses class android.os.LocaledList {
#     java.util.Locale get(int);
# }

# Firebase

-keepattributes EnclosingMethod
-keepattributes InnerClasses

# React-native-config

-keep,includedescriptorclasses class com.thriller.BuildConfig { *; }

# IAB V3

-keep,includedescriptorclasses class com.android.vending.billing.**

# React native deps ignore
-dontwarn io.invertase.firebase.**
-dontwarn com.idehub.Billing.**
-dontwarn com.google.firebase.**
-dontwarn com.google.android.**
-dontnote com.google.**
-dontnote me.leolin.shortcutbadger.**
-dontnote com.brentvatne.**
-dontnote com.yqritc.**
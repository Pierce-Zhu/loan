#rm -rf ./android/app/build/*
#rm -rf ./android/app/my-release-key.keystore
cd ./android/app
# && keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
../gradlew assembleRelease --stacktrace
#../gradlew installRelease --info
pwd
echo 'adb install './android/app/build/outputs/apk/app-release.apk
# adb install ./build/outputs/apk/app-release.apk
#adb install ./android/app/build/outputs/apk/app-release.apk

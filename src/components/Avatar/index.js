import React ,{ Component }from 'react';

import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

const options = {
  title: '选择头像',
  cancelButtonTitle:'取消',
  takePhotoButtonTitle:'拍照',
  chooseFromLibraryButtonTitle:'选择相册',
  quality:0.75,
  allowsEditing:true,
  noData:false,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};


class Avatar extends Component{
    state = {
        source:require('./img/account_user_normal.png')
    }

    _photoChoose = ()=> {
        // Loan.api.post('/account/upload',{mobile:'xxxxx'});
        // Loan.api.post('/login',{mobile:'xxxxx'});

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
                return;
            }
            let source = 'data:image/jpeg;base64,' + response.data;

            this.setState({
                source: source
            },()=>{
                console.log('上传图片');
                Loan.api.uploadAvatar('/account/upload',source);
                // Loan.api.post('/account/upload',{files:imgArr});
            })
        });
    }

    render(){
        const { onLogin ,user} = this.props;
        const source = typeof this.state.source ==='number' ? this.state.source :{ uri:this.state.source };

        return(
            <TouchableOpacity style={styles.container} onPress={user.mobile ? this._photoChoose:onLogin}>
                <Image 
                    source={source}
                    style={styles.avatarStyle}
                    resizeMode='cover'
                />
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        position:'absolute',
        top:40,
        left:25,
        width:80,
        height:80,
        borderRadius:80/2,
        backgroundColor:'#fff',
        borderColor:'#e6e6e6',
        borderWidth:StyleSheet.hairlineWidth,
        alignItems:'center',
        justifyContent:'center',
        zIndex:99,
    },
    avatarStyle:{
        width:80-5,
        height:80-5,
        borderRadius:(80-5)/2,
        backgroundColor:'transparent',
        overflow:'hidden',
    }
})

export default Avatar;
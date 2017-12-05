import {
    Linking
} from 'react-native';

const RNLinking = async (url,tips)=>{
    const __url = 'tel:'+url;
    
    Linking.canOpenURL(__url).then(supported => {
        if (!supported) {
            console.log('Can\'t handle url: ' + __url);
        } else {
            return Linking.openURL(__url);
        }
    }).catch(err => console.error('An error occurred', err));
}

export default RNLinking;
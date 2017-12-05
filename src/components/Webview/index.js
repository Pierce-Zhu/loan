import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    WebView,
    ActivityIndicator
} from 'react-native';

class RNWebview extends Component{
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
    });  

    _onMessage = e=> {
        const data = JSON.parse(e.nativeEvent.data && e.nativeEvent.data);
        console.log('webview 回调--------->',data);
        
    }
    _onNavigationStateChange = e=> {
        console.log('webview url监听 -------->',e);
    }
    render(){
        console.log('webview props-------->',this.props.navigation);
        const { uri,html } = this.props.navigation.state.params;
        
        let source;
        if(uri){
            source = uri + ( uri.includes('?') ? '&terminal=app' : '?terminal=app' );
            source = { uri:source };
        }
        if(html){
            source = { html: html };
        }
        return(
            <WebView 
                ref = { _this =>{ global['__webview__'] = _this } }
                style={styles.container}
                source = {source}
                automaticallyAdjustContentInsets = { false }
                onMessage = { this._onMessage }
                onNavigationStateChange = { this._onNavigationStateChange }
                renderLoading = { this._onRenderLoading }
                mixedContentMode='always'
            />
        )
    }
    _onRenderLoading = ()=> {
        return (
            <View style={ styles.loading }>
                <ActivityIndicator 
                    color = '#00cafb'
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#f3f3f0'
    }
})
export default RNWebview
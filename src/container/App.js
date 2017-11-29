import React,{ Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    StatusBar
} from 'react-native';

import Navigator from './Navigator.js';
import Modal from '../components/Modal';

// import { getCurrentRouteName } from '../src/util/RouterUtil.js'

if (!__DEV__) {
    global.console = {
        info: () => {},
        log: () => {},
        warn: () => {},
        error: () => {},
    };
} 

class App extends Component {

    render(){
        return(
            <View style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                    translucent={true}
                    backgroundColor='transparent'
                />
                <Navigator />
                <Modal ref={ view => { global.modal = view} } />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})

export default App
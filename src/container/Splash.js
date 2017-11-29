import React, { Component } from 'react';
import {
    StyleSheet,
    Image
} from 'react-native';

class Splash extends Component{
    componentDidMount(){
        this.timer = setTimeout(()=>{
            global.router.reset('welcome')(this);
        },1500);
    }
    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
    }

    render(){
        return(
            <Image 
                style={styles.container}
                source={require('./img/app_splash.png')}
            />
        )
    }
}
const styles = StyleSheet.create({
    container:{
        width:Loan.styles.width,
        height:Loan.styles.height,
    }
})

export default Splash
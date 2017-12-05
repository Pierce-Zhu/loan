import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

class SMSCode extends PureComponent{
    canclick = true;
    state = {
        start:false,
        countTime:this.props.countTime
    }
    //点击发送
    _onPress = async ()=>{
        //1.请求网络发送短信
        this.props.sendSMS && this.props.sendSMS();
        if(this.canclick){
            this.canclick = false;
            this.setState({
                start:true
            },this._onCountDown)
        }
    }
    //计时 
    _onCountDown = ()=>{
        this.interval = setInterval( ()=>{
            //1.开始
            if( this.state.countTime <= this.props.countTime && this.state.countTime > 0){
                this.setState({
                    countTime:this.state.countTime -1
                })
                return;
            }
            //2.到0
            if(this.state.countTime === 0){
                this.canclick = true;
                this.interval && clearInterval(this.interval);
                this.setState({
                    start:false,
                    countTime:this.props.countTime
                })
                return;
            }
        },1000 );
    }

    render(){
        const { 
            height = 50,
            width = 100,
            activeBackgroudColor = '#b6b6b6',
            inActiveBackgroudColor = '#00cafb',
            inActiveColor = '#fff',
            activeColor = '#00cafb',
            borderRadius
        } = this.props;

        const baseContainer = {
            height,
            width,
            justifyContent:'center',
            alignItems:'center',
            borderRadius
        }

        const inactiveContainer = {
            backgroundColor:inActiveBackgroudColor,

        }
        const activeContainer = {
            backgroundColor:activeBackgroudColor,
        }

        const activeTitle = {
            color:activeColor
        }
        const inActiveTitle = {
            color:inActiveColor
        }
        return(
            <TouchableOpacity 
                disabled = { this.state.start? true:false }
                style = {[ baseContainer ,this.state.start?  activeContainer : inactiveContainer ]}
                onPress = { this._onPress }>
                {
                    this.state.start
                    ?   <Text style = {[ styles.title , activeTitle]}>{this.state.countTime}s</Text>
                    :   <Text style = {[ styles.title , inActiveTitle]}>{this.props.inActiveTitle}</Text>
                }
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    title:{
        fontSize:12,
    },
})
export default SMSCode;
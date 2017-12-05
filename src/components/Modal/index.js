import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal
} from 'react-native';

import * as Modals from './ModalConfig.js';

class RNModal extends Component{
    state = {
        modalVisible:false,
        transparent:true,
        backgroundColor:'0',
        animationType:'fade',
        component:null,
    }
    passProps;

    componentWillReceiveProps(nextProps){
        console.log('modal nextProps----------->',nextProps);
    }

    render(){
        const Com = this.state.component;
        const transparent = {
            '0':'#f5fcff',
            '0.5':'rgba(0, 0, 0, 0.5)',
            '1':'rgba(0, 0, 0, 0)'
        }
        const modalBackgroundStyle = {
            backgroundColor: transparent[this.state.backgroundColor] ,
        };
        
        if(this.state.animationType==='slide'){
            if(this.state.modalVisible ===false){
                return null;
            }
            return(
                <View style={[styles.slideContainer,modalBackgroundStyle]}>
                    <Modal 
                        animationType={this.state.animationType}
                        transparent={this.state.transparent}
                        visible={this.state.modalVisible}
                        onShow={() => console.log('显示模态框------------>')}
                        onRequestClose={() => console.log('关闭模态框------------>')}
                    >
                        {Com && <Com passProps={this.passProps} />}
                    </Modal>
                </View>
            )
        }

        return(
            <Modal 
                animationType={this.state.animationType}
                transparent={this.state.transparent}
                visible={this.state.modalVisible}
                onRequestClose={() => console.log('关闭模态框------------>')}
            >
                <View style={[styles.container,modalBackgroundStyle]}>
                    {Com && <Com passProps={this.passProps} callback={this._callback} onClose={this.close}/>}
                </View>
            </Modal>
        )
    }

    //1.打开非透明模态框
    open = (name , props, animationType='fade')=> {
        if(Modals[name]){
            this.passProps = props;
            this.setState({
                modalVisible: true,
                component: Modals[name],
                animationType: animationType,
                backgroundColor:'0',
            });
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
            })
        }
        global.modal.open('RNAlert',{title:'不存在该模态框请检查ModalConfig'});
    }

    //2.打开半透明模态框
    openHalfTrans = (name , props, animationType='fade')=> {
        if(Modals[name]){
            this.passProps = props;
            this.setState({
                modalVisible: true,
                component: Modals[name],
                animationType: animationType,
                backgroundColor:'0.5',
            });
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
            })
        }
        global.modal.open('RNAlert',{title:'不存在该模态框请检查ModalConfig'});
    }
    //3.打开全透明模态框
    openTrans = (name , props, animationType='fade')=> {
        if(Modals[name]){
            this.passProps = props;
            this.setState({
                modalVisible: true,
                component: Modals[name],
                animationType: animationType,
                backgroundColor:'1',
            });
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
            })
        }
        global.modal.open('RNAlert',{title:'不存在该模态框请检查ModalConfig'});
    }

    //4.关闭模态框 并返回模态框参数
    close = cb=> {
        this.setState({
            modalVisible:false
        },()=>{
            cb ? this.resolve(cb) : this.resolve();
        });

        // return new Promise((resolve, reject)=>{
        //     this.setState({
        //         modalVisible:false
        //     },()=>{ 
        //         cb && 
        //         resolve();
        //     })
        // });
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    },
    slideContainer:{
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
        justifyContent: 'center',
        alignItems:'center'
    }
})

export default RNModal;

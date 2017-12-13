import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../../../redux/actions/user';

import Button from '../../../../components/Button';

import { faceppModule } from '../../../../util/NativeUtil.js';
import Tools from '../../../../util/ToolsUtil';

class Authentication extends Component{
    render(){
        console.log('auth-----render----->',this.props);
        return(
            <View style={styles.container}>
                <ScrollView>
                    <TouchableOpacity onPress={this._onOpenCamareFront} style={styles.btn}>
                        <Image 
                            source={this.props.frontIDCard ? {uri:this.props.frontIDCard}:require('./img/sfz_front.png')}
                            style={styles.img}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._onOpenCamareBack} style={styles.btn}>
                        <Image 
                            source={this.props.backIDCard ? {uri:this.props.backIDCard}:require('./img/sfz_back.png')}
                            style={styles.img}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>

                    <Button 
                        title='上传并识别'
                        titleColor='#fff'
                        backgroundColor='#00cafb'
                        onPress={this._onUpload}
                        borderRadius={5}
                        height={50}
                        marginTop={20}
                        marginHorizontal={15}
                    />
                </ScrollView>
            </View>
        )
    }
    _onOpenCamareFront = async ()=>{
        const { actions } = this.props;
        const res = await faceppModule.checkIDCard('front');
        actions.getIDCard('front',res.imageData);
    }
    _onOpenCamareBack = async ()=> {
        const { actions } = this.props;
        const res = await faceppModule.checkIDCard();
        actions.getIDCard('back',res.imageData);
    }
    
    _onUpload = async ()=> {
        //1.上传图片
        console.log('上传图片');

        const { actions, user ,frontIDCard ,backIDCard}  = this.props;
        if(frontIDCard && backIDCard){
            const params ={
                userid:user.id,
                // portraitImg:this.props.portraitImg,//肖像图
                id_front_image:this.props.frontIDCard,//身份证正面照
                id_back_image:this.props.backIDCard//身份证背面照
            }
            try {
                await actions.uploadIDCard(params);
                global.modal.openHalfTrans('RNAlert',{ 
                    tips:'上传成功',
                    buttons:[
                        {title:'确定',cb:this._onLiveness}
                    ] 
                });
            } catch (error) {
                global.modal.openHalfTrans('RNAlert',{ 
                    tips:'上传异常,重新上传',
                    buttons:[
                        {title:'取消',cb:global.modal.close},
                        {title:'确定',cb:this._onUpload},
                    ] 
                });      
            }

            return;
        }
        global.modal.openHalfTrans('RNAlert',{tips:'请先点击识别身份证'});
    }
    //2.开启活体检测
    _onLiveness = async ()=> {
        const { actions, user }  = this.props;
        try {
            await global.modal.close();
            await Tools.delay(200);
            const res = await faceppModule.checkLiveness();
            //3.上传活体检测
            console.log('活体检测的值------------->',res);
            const params = {
                userid:user.id,
                image:res.imageData
            }
            await actions.uploadLiveness(params);
            global.modal.openHalfTrans('RNAlert',{tips:'上传成功'});
            global.router.back()(this);
            actions.uploadLivenessSuccess();
        } catch (error) {
            console.log('活体检测的异常需要重新检测------------->',error);
            global.modal.openHalfTrans('RNAlert',{ 
                tips:'检测异常,重新检测',
                buttons:[
                    {title:'取消',cb:global.modal.close},
                    {title:'确定',cb:this._onLiveness},
                ] 
            });
            
        }
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Loan.styles.backgroundColor
    },
    btn:{
       marginTop:10,
       marginHorizontal:15,
       justifyContent:'center',
       borderWidth:1,
       borderRadius:5,
       borderColor:'#00cafb',
    },
    img:{
        height:250,
        width:Loan.styles.width-30
    }
})

const mapStateToProps = state => state.userState
const mapDispatchToProps = dispatch=> {
    return {
        actions:bindActionCreators(userActions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Authentication)
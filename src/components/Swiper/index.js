'use strict';

import React ,{ Component }from 'react';

import {
    View,
    ScrollView,
    TouchableWithoutFeedback,
    Image,
    Dimensions,
    StyleSheet,
} from 'react-native';

import SwiperDotContainer from './SwiperDotContainer.js';

const window = Dimensions.get('window');

class IndexSwiper extends Component {
    state ={
        activeIndex:0,
        scrollEnabled:true
    }
    static defaultProps = {
        loop:false,
        height:175,
        width: window.width,
        config:[],
        onPress:()=>{},
        autoPlay:false,
        delay:4500,
        lastAnimated:false,
        showPagination:true
    }

    componentDidMount(){
        this.props.autoPlay && this._startTimer();
    }

    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
        this.interval && clearInterval(this.interval);
    }

    render(){
        const {
            height,
            width,
            config,
            onPress,
            autoPlay,
            showPagination
        } = this.props;

        const container ={
            height,
            width,
        }
        const swiperContainer = {
            flex:1,
        }
        
        return(
            <View style={container}>
                <ScrollView 
                    ref='swiper'
                    style={swiperContainer} 
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false} 
                    onScroll={this._onScroll}
                    scrollEventThrottle={16}
                    pagingEnabled={true}
                    scrollEnabled={this.state.scrollEnabled}
                    onScrollBeginDrag={ this._onScrollBeginDrag }
                    onScrollEndDrag={ this._onScrollEndDrag }
                >
                    {
                        config.map((it,i)=>{
                            
                            const _onPress = ()=>{
                                onPress(it);
                            } 

                            const source = (typeof it.source) ==='string' && it.source.includes('http') ? {uri:it.source} : it.source;

                            return(
                                <TouchableWithoutFeedback 
                                    key = { 'lbt_' + i }
                                    disabled = { (it.url && it.url !='') ? false:true } 
                                    onPress = { _onPress }
                                >

                                    <Image 
                                        resizeMode='stretch'
                                        style = { container } 
                                        source = {source} 
                                    />
                                    
                                </TouchableWithoutFeedback>
                            )
                        })
                    }
                </ScrollView>
                {
                    showPagination && <SwiperDotContainer config={config} activeIndex={this.state.activeIndex}/>
                }
            </View>
        )
    }
    _startTimer = ()=>{
        const { width , config, delay, lastAnimated} = this.props;
        const swiper = this.refs.swiper;  

        this.interval = setInterval(()=>{
            const length = config.length; 
            let activeIndex = 0;
            if(this.state.activeIndex +1 >= length){
                activeIndex = 0;
            } else {
                activeIndex = this.state.activeIndex+1;  
            }
            const offsetX = width * activeIndex;
            this.setState({ activePage:activeIndex });
            
            let animated = lastAnimated;
            if(offsetX !==0 ){
                animated=true;
            }

            swiper.scrollResponderScrollTo({x:offsetX, y:0, animated:animated});  
        },delay);
    }
    /**开始拖拽 */  
    _onScrollBeginDrag = ()=> {  
        // console.log("开始拖拽");  
        this.interval && clearTimeout(this.interval);  
    }
    /**停止拖拽 */  
    _onScrollEndDrag = ()=> {  
        // console.log("停止拖拽");  
        this.interval && this._startTimer();  
    }

    _onScroll = e=>{
        const { loop,config,width } = this.props;

        const offsetX = e.nativeEvent.contentOffset.x;
        const activeIndex = Math.floor(offsetX/width);

        const length = this.props.config.length;

        if((offsetX > width*(length-1)) && loop){
            this.refs.swiper.scrollTo({x: 0 , animated:false });

            this.setState({
                activeIndex: 0,
            })

            return;
        }
        if(offsetX < 0 && loop){
            this.refs.swiper.scrollToEnd({animated:false });

            this.setState({
                activeIndex: config.length-1,
            })

            return;
        }

        if(activeIndex!==this.state.activeIndex){
            this.setState({
                activeIndex: activeIndex
            })
        }
    }
}

const styles = StyleSheet.create({
    lbt:{
        position:'absolute',
    }
})

export default IndexSwiper;
import React, { Component } from 'react';
import {
    InteractionManager
} from 'react-native';

import Swiper from '../components/Swiper';

class Welcome extends Component{
    state = {
        loading:false
    }

    componentDidMount(){
        InteractionManager.runAfterInteractions(()=>{
            this.setState({loading:true})
        })
    }

    _onlbt = cb=> {
        // console.log('cb------------>',cb);
        const { url } = cb;
        if(url && !url.includes('http') ){
            global.router.reset('dashboard')(this);
        }
    }
    // _config = [
    //     { source:'http://7xvvpv.com1.z0.glb.clouddn.com/start1.jpg', },
    //     { source:'http://7xvvpv.com1.z0.glb.clouddn.com/start2.jpg', },
    //     { source:'http://7xvvpv.com1.z0.glb.clouddn.com/start3.jpg',url:'dashboard' },
    // ];
    _config = [
        { source:require('./img/guide01.jpg'), },
        { source:require('./img/guide02.jpg'), },
        { source:require('./img/guide03.jpg'),url:'dashboard' },
    ];

    render(){
        if(!this.state.loading){
            return null;
        }
        return(
            <Swiper 
                onPress={ this._onlbt }
                height={Loan.styles.height}
                config={this._config}
                showPagination={false}
            />
        )
    }
}


export default Welcome
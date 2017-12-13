import React ,{ Component }from 'react';
import {
	View,
	Text,
} from 'react-native';

import BoxItem from './BoxItem';

class LoanItem extends Component{
	state ={
		selected: this.props.data[0].id,
		amount: this.props.data[0].amount
	}


	_onChangeTab = (id,amount)=> {
		console.log('id-----------------',id);
		this.setState({
			selected:id,
			amount:amount
		})
	}

	render(){
		const { data,titleText } = this.props;


		return(
			<View style={styles.container}>
				<View style={styles.title}>
					<Text style = {styles.titleText}>
						{titleText}
					</Text>
				</View>
				<View style={styles.bodyItem}>
				{
					data.map((item,index)=>
						<BoxItem 
							key={'item'+index}
							selected = {this.state.selected} 
							data = {item}
							onPress={this._onChangeTab}
						/>
					)
				}	
				</View>
			</View>			
		)
	}
}

const styles = {
	container: {
		paddingLeft:10,
		paddingRight:10,
		paddingTop:30,
	},
	title: {
		height: 30,
		borderLeftWidth: 5,
		borderColor: 'blue',
		justifyContent: 'center',  //垂直居中
	},
	titleText: {
		paddingLeft: 10,
	},
	bodyItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',  //交叉轴等距排列
		height: 60,
		paddingTop:10,
	}
}

export default LoanItem;
import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	StyleSheet,
} from 'react-native';

const BoxItem = ({...props})=> {
	const {
		data,
		selected,
		onPress
	} = props;

	const _onPress = ()=>{
		onPress(data.id,data.amount);
	}

	return (
		<TouchableOpacity 
			style={[styles.container,(selected === data.id) ? styles.activeColor : styles.defaultColor]} 
			onPress = {_onPress} >
			<Image 
				source = {(selected === data.id) ? data.source1 : data.source2} 
				style = {styles.img} 
			/>
			<View style={styles.text}>
				<Text style={styles.bigText}>{data.amount}</Text>
				<Text>{data.unit}</Text>
			</View>
		</TouchableOpacity>
	)

}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-around', 
		alignItems: 'center',
		height: 60,
		width: (global.Loan.styles.width-40)/2,
		borderWidth: 0.5,
		borderRadius: 8,
	},
	activeColor:{
		borderColor: '#00cafb',
	},
	defaultColor:{
		borderColor: '#ddd',
	},

	img: {
		height: 35,
		width: 60,
	},
	text: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	bigText: {
		fontSize: 24,
	}
})

export default BoxItem;
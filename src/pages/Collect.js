/**
 * Created by luzhuang on 2017/5/21.
 */
import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	Dimensions,
	TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
	icon: {
	},
	container: {
		flex: 1,
		padding: 10,
		backgroundColor: '#ffffff',
		height: height,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	empty: {
		alignItems: 'flex-start',
		justifyContent: 'flex-end',
	}
});

export default class Collect extends Component{
	static navigationOptions = {
		title: '收藏',
		headerStyle: {backgroundColor:'#ffffff',height:50},
		tabBarIcon: ({ tintColor, focused }) => (
			focused
				?
			<Icon name="ios-book" size={22} color={tintColor} />
				:
			<Icon name="ios-book-outline" size={22} color={tintColor} />
		),
	};
	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity>
					<Text style={styles.empty}>暂无收藏</Text>
				</TouchableOpacity>
			</View>
		)
	}
}
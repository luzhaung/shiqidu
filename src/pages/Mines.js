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
	Alert,
	ActivityIndicator,
	Platform,
	ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR} from '../def/Color';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ebebeb',
		height: height,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	icon: {
		/*height: 25,*/
	},
	button: {
		backgroundColor: PRIMARY_COLOR,
		width: width - 20,
		height: 42,
		alignItems: 'center',
		justifyContent: 'center',
	},
	loginNoticle: {
		marginTop: 10,
		paddingHorizontal: 10,
		width: width,
		flexDirection: 'row',
		backgroundColor: '#fff',
		height: 50,
	},
	toLogin: {
		justifyContent: 'center',
		marginLeft: 5,
	},
	toLoginText: {
		color: '#666'
	},
	myRelation: {
		marginTop: 10,
		flexDirection: 'row',
		backgroundColor: '#fff',
		height: 30,
	},
	myFollow: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRightWidth: 1,
		borderRightColor: '#dfdfdf'
	},
	myFans: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	FollowText: {
		fontSize: 14,
	},
	myNotify: {
		flexDirection: 'row',
		height: 40,
		backgroundColor: '#fff',
		marginTop: 10,
	},
	points: {
		flexDirection: 'row',
		height: 40,
		backgroundColor: '#fff',
		marginTop: 2,
	},
	create: {
		flexDirection: 'row',
		height: 40,
		backgroundColor: '#fff',
		marginTop: 2,
	},
	myNotifyIco: {
		marginTop: 4,
		marginLeft: 10,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	myNotifyText: {
		marginLeft: 10,
		justifyContent: 'center',
	},
	myNotifyRight: {
		justifyContent: 'center',
		right: 10,
		position: 'absolute',
		marginTop: 10,
	},
	tags: {
		flexDirection: 'row',
		height: 40,
		backgroundColor: '#fff',
		marginTop: 10,
	},
	setting: {
		flexDirection: 'row',
		height: 40,
		backgroundColor: '#fff',
		marginTop: 10,
	},
	reback: {
		flexDirection: 'row',
		height: 40,
		backgroundColor: '#fff',
		marginTop: 2,
	},
	articles: {
		flexDirection: 'row',
		height: 40,
		backgroundColor: '#fff',
		marginTop: 2,
	},
	comments: {
		flexDirection: 'row',
		height: 40,
		backgroundColor: '#fff',
		marginTop: 2,
	}
});

export default class Mines extends Component{
	static navigationOptions = {
		title: '我的',
		headerStyle: {backgroundColor:'#ffffff',height:50},
		tabBarIcon: ({ tintColor, focused }) => (
			focused
				?
			<Icon name="ios-contact" size={22} color={tintColor} style={styles.icon} />
				:
			<Icon name="ios-contact-outline" size={22} color={tintColor} style={styles.icon} />
		),
	};

	state = {
		loading: false,
	};

	onPress (){
		this.setState({loading:true});
		setTimeout((()=>{
			this.setState({loading:false});
			Alert.alert('hello','除非你有一个很好的理由');
		}).bind(this),3000);
	}
	render() {
		const {loading} = this.state;

		let buttonBorderRadius = 0;
		if (Platform.OS === 'ios'){
			buttonBorderRadius = 5;
		}
		return (
			<View style={styles.container}>
				{
					loading
					?
					<View style={[styles.button,{borderRadius: buttonBorderRadius}]}>
					<ActivityIndicator/>
					</View>
					:
						<ScrollView>
							<TouchableOpacity style={styles.loginNoticle}>
							<Icon name="md-contact" size={50} color={'#999'} />
								<View style={styles.toLogin}>
									<Text style={styles.toLoginText}>立即登录/注册</Text>
								</View>
							</TouchableOpacity>

							<View style={styles.myRelation}>
								<TouchableOpacity style={styles.myFollow}>
									<Text style={styles.FollowText}>我的关注</Text>
								</TouchableOpacity>
								<TouchableOpacity style={styles.myFans}>
									<Text style={styles.FollowText}>我的粉丝</Text>
								</TouchableOpacity>
							</View>

							<TouchableOpacity style={styles.myNotify}>
								<View style={styles.myNotifyIco}>
									<Icon name="ios-create" size={14} color={'#555'} />
								</View>
								<View style={styles.myNotifyText}>
									<Text style={{fontSize:14}}>新建主题</Text>
								</View>
								<View style={styles.myNotifyRight}>
									<Icon name="ios-arrow-forward" size={20} color={'#999'} />
								</View>
							</TouchableOpacity>

							<TouchableOpacity style={styles.create}>
								<View style={styles.myNotifyIco}>
									<Icon name="ios-notifications" size={14} color={'#555'} />
								</View>
								<View style={styles.myNotifyText}>
									<Text style={{fontSize:14}}>我的消息</Text>
								</View>
								<View style={styles.myNotifyRight}>
									<Icon name="ios-arrow-forward" size={20} color={'#999'} />
								</View>
							</TouchableOpacity>

							<TouchableOpacity style={styles.points}>
								<View style={styles.myNotifyIco}>
									<Icon name="logo-yen" size={14} color={'#555'} />
								</View>
								<View style={styles.myNotifyText}>
									<Text style={{fontSize:14}}>我的积分</Text>
								</View>
								<View style={styles.myNotifyRight}>
									<Icon name="ios-arrow-forward" size={20} color={'#999'} />
								</View>
							</TouchableOpacity>

							<TouchableOpacity style={styles.tags}>
								<View style={styles.myNotifyIco}>
									<Icon name="ios-pricetags" size={14} color={'#555'} />
								</View>
								<View style={styles.myNotifyText}>
									<Text style={{fontSize:14}}>所有Tag</Text>
								</View>
								<View style={styles.myNotifyRight}>
									<Icon name="ios-arrow-forward" size={20} color={'#999'} />
								</View>
							</TouchableOpacity>
							<TouchableOpacity style={styles.articles}>
								<View style={styles.myNotifyIco}>
									<Icon name="ios-paper" size={14} color={'#555'} />
								</View>
								<View style={styles.myNotifyText}>
									<Text style={{fontSize:14}}>我的文章</Text>
								</View>
								<View style={styles.myNotifyRight}>
									<Icon name="ios-arrow-forward" size={20} color={'#999'} />
								</View>
							</TouchableOpacity>
							<TouchableOpacity style={styles.comments}>
								<View style={styles.myNotifyIco}>
									<Icon name="ios-redo" size={14} color={'#555'} />
								</View>
								<View style={styles.myNotifyText}>
									<Text style={{fontSize:14}}>我的评论</Text>
								</View>
								<View style={styles.myNotifyRight}>
									<Icon name="ios-arrow-forward" size={20} color={'#999'} />
								</View>
							</TouchableOpacity>

							<TouchableOpacity style={styles.setting}>
								<View style={styles.myNotifyIco}>
									<Icon name="ios-cog" size={14} color={'#555'} />
								</View>
								<View style={styles.myNotifyText}>
									<Text style={{fontSize:14}}>设置</Text>
								</View>
								<View style={styles.myNotifyRight}>
									<Icon name="ios-arrow-forward" size={20} color={'#999'} />
								</View>
							</TouchableOpacity>

							<TouchableOpacity style={styles.reback}>
								<View style={styles.myNotifyIco}>
									<Icon name="ios-bug" size={14} color={'#555'} />
								</View>
								<View style={styles.myNotifyText}>
									<Text style={{fontSize:14}}>反馈</Text>
								</View>
								<View style={styles.myNotifyRight}>
									<Icon name="ios-arrow-forward" size={20} color={'#999'} />
								</View>
							</TouchableOpacity>
							<TouchableOpacity style={styles.points}>
								<View style={styles.myNotifyIco}>
									<Icon name="ios-bulb" size={14} color={'#555'} />
								</View>
								<View style={styles.myNotifyText}>
									<Text style={{fontSize:14}}> 关于</Text>
								</View>
								<View style={styles.myNotifyRight}>
									<Icon name="ios-arrow-forward" size={20} color={'#999'} />
								</View>
							</TouchableOpacity>

					{/*<TouchableOpacity
						onPress={this.onPress.bind(this)}
						style={[styles.button, {borderRadius: buttonBorderRadius}]}
					>
						<Text style={{color: '#fff'}}>立即登录</Text>
					</TouchableOpacity>*/}
						</ScrollView>
				}
			</View>
		)
	}
}
/**
 * Created by luzhuang on 2017/5/26.
 */
import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	FlatList,
	ActivityIndicator,
	Alert,
	ScrollView,
	Dimensions,
	AsyncStorage,
	Button,
	TouchableOpacity,
	Platform
} from 'react-native';

import HTMLView from 'react-native-htmlview';
import Markdown from 'react-native-simple-markdown'
import Icon from 'react-native-vector-icons/FontAwesome';
import {DetailUrl} from '../def/Api';
import {PRIMARY_COLOR} from '../def/Color';
import { AppColors, AppSizes, AppFonts } from '../style';
import Item from '../component/Comment';

const containerWidth = AppSizes.screen.width - AppSizes.padding * 2;

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
	row: {
		paddingTop: 10,
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 50,
		backgroundColor: '#fff',
	},
	loading: {
		marginTop: 100,
	},
	icon: {
		height:10,
		width:10,
		fontSize: 10,
		marginLeft: 5,
		alignSelf: 'center',
		color: 'gray'
	},
	contents: {
		paddingTop: 80,
		paddingBottom: 10,
	},
	arHeader: {
		height: 30,
		backgroundColor: '#fff',
		flexDirection: 'row',
	},
	arHeaderBottom: {
		backgroundColor: '#fff',
		flexDirection: 'row',
		marginBottom: 10,
	},
	avatar: {
		width: 20,
		height:20,
		borderRadius: 10,
		alignSelf: 'center',
	},
	username: {
		fontSize:12,
		fontWeight: '500',
		marginLeft: 5,
		alignSelf: 'center',
	},
	addTime: {
		fontSize: 10,
		alignSelf: 'center',
		color: 'gray'
	},
	click: {
		fontSize: 10,
		marginLeft: 2,
		alignSelf: 'center',
		justifyContent: 'flex-end',
		color: 'gray'
	},
	commentNum: {
		fontSize: 10,
		marginLeft: 2,
		alignSelf: 'center',
		color: 'gray'
	},
	tagName: {
		fontSize: 10,
		marginLeft: 2,
		alignSelf: 'center',
		color: 'gray'
	},
	button: {
		backgroundColor: '#5bc0de',
		width: 60,
		height: 25,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		position: 'absolute',
		right: 0,
	},
	comments: {
		marginTop: 20,
		backgroundColor: '#fff'
	}
});


const StackOptions = ({navigation}) => {
	let {state,goBack} = navigation;
	// 用来判断是否隐藏或显示header
	const visible= state.params.isVisible;
	let header;
	if (visible === true){
		header = null;
	}
	const headerStyle = {backgroundColor:'#ffffff',height:50};
	const headerTitle = state.params.title;
	const headerTitleStyle = {fontSize:16,color:'#000',fontWeight:'500'};
	const headerBackTitle = false;

	return {headerStyle,headerTitle,headerTitleStyle,headerBackTitle,header}
};

export default class Detail extends Component{
	static navigationOptions = ({navigation}) => StackOptions({navigation});
	/*(navigation)=>({
	 title: '详情页',
	 headerStyle: {backgroundColor:'#ffffff',height:50},
	 headerRight: '',
	 });*/
	state = {
		datas: {},
		ready: false,
		html_data: {},
		author_info: {},
		addTime: '0000-00-00',
		click: 0,
		commentNum: 0,
		tag_cn_name: '',
		comments: {},
		loading: false,
	};

	async componentDidMount(){
		const {state : { params: { id } }} = this.props.navigation;
		let textData, jsonData;
		//AsyncStorage.setItem(id, '');
		textData = await AsyncStorage.getItem(id);
		if (!textData){
			const rawData = await fetch(`${DetailUrl}?id=${id}`);
			textData = await rawData.text();
		}/*else{
		 Alert.alert('', '数据来自本地!');
		 }*/

		// 反序列化
		jsonData = JSON.parse(textData);
		// 序列化，这里只能存字符串
		AsyncStorage.setItem(jsonData.data.id, textData);

		if (jsonData.status === -1){
			this.setState({
				ready: true,
			});
			Alert.alert(jsonData.info);
		}else{
			//console.log(jsonData.data.contents);
			this.setState({
				datas: jsonData.data.contents_md,
				html_data: jsonData.data.contents,
				author_info: jsonData.data.author_info,
				addTime: jsonData.data.addTime,
				click: jsonData.data.click,
				commentNum: jsonData.data.comment_num ? jsonData.data.comment_num : 0,
				tag_cn_name: jsonData.data.tag_cn_name,
				comments: jsonData.data.comments,
				ready: true,
			})
		}
	}

	onPress (){
		this.setState({loading:true});
		setTimeout((()=>{
			this.setState({loading:false});
			Alert.alert('提示','功能开发中...');
		}).bind(this),1000);
	}

	render() {
		const {loading} = this.state;

		let buttonBorderRadius = 0;
		if (Platform.OS === 'ios'){
			buttonBorderRadius = 5;
		}
		const { params,goBack } = this.props.navigation.state;
		const { datas, ready, html_data, author_info,addTime,click,commentNum,tag_cn_name,comments } = this.state;
		return (
			<ScrollView style={styles.row}>
				<View>
					<View style={styles.arHeader}>
						<Image source={{uri: 'https://www.shiqidu.com'+author_info.avatar_src_50}} style={styles.avatar} />
						<Text numberOfLines={1} style={styles.username}>{author_info.username}</Text>
						<TouchableOpacity
							onPress={this.onPress.bind(this)}
							style={[styles.button, {borderRadius: buttonBorderRadius}]}
						>
							{
								loading
									?
									<ActivityIndicator/>
									:
									<Text style={{color: '#fff',fontSize: 12,}}>关注Ta</Text>
							}
						</TouchableOpacity>
					</View>
					<View style={styles.arHeaderBottom}>
						<Text numberOfLines={1} style={styles.addTime}>{addTime} ·</Text>
						<Text numberOfLines={1} style={styles.click}>{click}浏览 ·</Text>
						<Text numberOfLines={1} style={styles.commentNum}>{commentNum}评论 ·</Text>
						<Icon name="tags" size={10} color={'gray'} style={styles.icon} />
						<Text numberOfLines={1} style={styles.tagName}>{tag_cn_name}</Text>
					</View>
				</View>
				{
					this.contents()
				}
				<View style={styles.comments}>
					<FlatList
						keyExtractor={item => item.id}
						data={comments}
						renderItem={
							({item}) => <Item
								username={item.comm_username}
								avatar={'https://www.shiqidu.com'+item.comm_avatar_src}
								post_time={item.timeDiff}
								contents={item.contents}
								up={item.up}
								flow_number={item.flow_number}
							/>
						}
					/>
				</View>
			</ScrollView>
		)
	}

	contents = ()=>{
		const { datas, ready, html_data, author_info } = this.state;

		return ready ? <ScrollView>

			{/*<HTMLView
				value={html_data}
				stylesheet={htmlStyles}
			/>*/}
			{/*<Markdown blacklist={['codeBlock','list']}>
				{datas}
			 </Markdown>*/}
			<Markdown
				styles={markdownStyles}
			  rules={markdownRules}
        blacklist={['list']}>
				{datas}
      </Markdown>
		</ScrollView> : <ActivityIndicator size="large" style={styles.loading} />;
	}
}

const markdownRules = {
	inlineCode: {
		react(node, output, state) {
			 state.withinText = true;
			return (
				<Text style={markdownStyles.inlineCode} key={state.key}>{node.content}</Text>
			)
		}
	},
	text: {
		react(node, output, state) {
			return (
				<Text style={markdownStyles.text} key={state.key}>{`${node.content}`}</Text>
			)
		}
	},

};

const markdownStyles = StyleSheet.create({
	// 链接
	link: {
		fontWeight: 'bold',
		color: '#1a0dab',
		textDecorationLine: 'underline'
	},
	mailTo: {
		fontWeight: 'bold',
		color: AppColors.textTitle,
		textDecorationLine: 'underline'
	},
	del: {
		textDecorationLine:'line-through'
	},
	// 段落
	text: {
		color: AppColors.textTitle,
		fontSize: AppFonts.base.size,
		fontFamily: AppFonts.base.family,
		lineHeight: Platform.OS === 'ios' ? AppFonts.h3.lineHeight : AppFonts.h2.lineHeight
	},
	// 粗体
	strong: {
		fontWeight: '800',
		marginTop: 0,
		marginBottom: 10
	},
	// 引用
	blockQuoteSection: {
		padding: 10,
		paddingTop: 5,
		marginTop: 10,
		marginBottom: 10,
		flexDirection: 'row',
		backgroundColor: AppColors.textPrimary
	},
	blockQuoteSectionBar: {
		height: 10,
		backgroundColor: AppColors.textMuted
	},
	// 行内代码块
	inlineCode: {
		height: 50,
		margin: 3,
		padding: 3,
		fontFamily: 'Courier',
		fontWeight: '200',
		color: AppColors.brand.black
	},
	// 图片
	image: {
		flex: 1,
		width: containerWidth,
		height: Platform.OS === 'ios' ? 166 : (containerWidth) * 2,
		resizeMode: 'contain',
		marginBottom: 0
	},
	heading1: {
		...AppFonts.h1,
		color: AppColors.textTitle,
		fontWeight: '800',
		marginTop: 10,
		marginBottom: 10
	},
	heading2: {
		...AppFonts.h2,
		color: AppColors.textTitle,
		fontWeight: '800',
		marginTop: 10,
		marginBottom: 10
	},
	heading3: {
		...AppFonts.h3,
		color: AppColors.textTitle,
		fontWeight: '600',
		marginTop: 10,
		marginBottom: 10
	},
	heading4: {
		...AppFonts.h4,
		color: AppColors.textTitle,
		fontWeight: '800',
		marginTop: 10,
		marginBottom: 10
	},
	heading5: {
		...AppFonts.h5,
		color: AppColors.textTitle,
		fontWeight: '800',
		marginTop: 10,
		marginBottom: 10
	}
});
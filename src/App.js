/**
 * Created by luzhuang on 2017/5/26.
 */
import React, { Component } from 'react';
import {
	StackNavigator,
	TabNavigator,
} from 'react-navigation';

import List from './pages/List';
import Detail from './pages/Detail';
import Collect from './pages/Collect';
import Mines from './pages/Mines';

const Mytab = TabNavigator({
	List: {screen: List},
	Collect: {screen: Collect},
	Mines: {screen: Mines},
},{
	tabBarPosition: 'bottom',
	tabBarOptions: {
		activeTintColor: '#000',
		inactiveTintColor: '#666',
		translucent: true,
		labelStyle: {
			/*fontSize: 18,
			 marginBottom: 13,*/
		},
		style: {
			backgroundColor: '#fafafa',
		},
	}

});

const shiqidu = StackNavigator({
	Mytab: {screen: Mytab},
	Detail: {screen: Detail},
}, {
	headerMode: 'screen',
	translucent: true,
	style: {
		backgroundColor: '#ffffff',
	}
});

export default shiqidu;
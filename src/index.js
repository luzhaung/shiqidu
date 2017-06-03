/**
 * Created by luzhuang on 2017/5/26.
 */
import { AppRegistry } from 'react-native';
import shiqidu from './App';

if (!__DEV__) {
	global.console = {
		info: () => {},
		warn: () => {},
		error: () => {},
		log: () => {},
	};
}

AppRegistry.registerComponent('shiqidu', () => shiqidu);
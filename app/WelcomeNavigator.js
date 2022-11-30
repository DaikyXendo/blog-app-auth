import TabNavigator from './TabNavigator'
import Welcome from './components/Welcome'
import { useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator()

const WelcomeNavigator = () => {
	return (
		<Stack.Navigator initialRouteName='HomeScreen'>
			<Stack.Screen
				options={{ headerShown: false }}
				name='Welcome'
				component={Welcome}
			/>
			<Stack.Screen
				options={{ headerShown: false }}
				name='TabNavigator'
				component={TabNavigator}
			/>
		</Stack.Navigator>
	)
}

export default WelcomeNavigator

import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
const Stack = createNativeStackNavigator()
import Home from './components/Home'
import Welcome from './components/Welcome'
import PostDetails from './components/PostDetails'

const isLogin = false

const AppNavigator = () => {
	const navigation = useNavigation()
	return (
		<Stack.Navigator initialRouteName='HomeScreen'>
			<Stack.Screen
				options={{ headerShown: false }}
				name='Home'
				component={Home}
			/>

			<Stack.Screen
				options={{
					title: '',
					headerTransparent: true,
					headerShadowVisible: false,
					headerLeft: (props) => (
						<TouchableWithoutFeedback
							{...props}
							onPress={() => navigation.navigate('Home')}
						>
							<View
								style={{
									height: 40,
									width: 40,
									justifyContent: 'center',
									alignItems: 'center',
									borderRadius: 20,
									backgroundColor: 'rgba(0,0,0,0.5)',
								}}
							>
								<Icon
									name='arrow-left'
									size={30}
									color='white'
								/>
							</View>
						</TouchableWithoutFeedback>
					),
				}}
				name='PostDetails'
				component={PostDetails}
			/>
		</Stack.Navigator>
	)
}

export default AppNavigator

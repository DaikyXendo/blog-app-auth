import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import AppForm from './components/AppForm'
import { useLogin } from './context/LoginProvider'
import TabNavigator from './TabNavigator'

const Stack = createStackNavigator()

const MainNavigator = () => {
	const { isLoggedIn } = useLogin()
	return isLoggedIn ? <TabNavigator /> : <AppForm />
}
export default MainNavigator

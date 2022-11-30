import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import AppForm from './components/AppForm'
import { useLogin } from './context/LoginProvider'
import WelcomeNavigator from './WelcomeNavigator'

const Stack = createStackNavigator()

const MainNavigator = () => {
	const { isLoggedIn } = useLogin()
	return isLoggedIn ? <WelcomeNavigator /> : <AppForm />
}
export default MainNavigator

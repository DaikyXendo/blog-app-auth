import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const Home = () => {
	return (
		<View style={styles.container}>
			<Text>RenIOT</Text>
			<Text>Temperature is :</Text>
			<Text>Battery is :</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default Home

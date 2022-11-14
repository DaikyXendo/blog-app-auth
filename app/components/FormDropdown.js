import React from 'react'
import SelectDropdown from 'react-native-select-dropdown'

import { View, StyleSheet, Text, TextInput } from 'react-native'

const FormDropdown = (props) => {
	const { label, error } = props
	return (
		<>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					marginBottom: 5,
				}}
			>
				<Text style={{ fontWeight: 'bold' }}>{label}</Text>
				{error ? (
					<Text style={{ color: 'red', fontSize: 16 }}>{error}</Text>
				) : null}
			</View>
			<SelectDropdown
				{...props}
				data={['Male', 'Female']}
				defaultValue='Male'
				buttonStyle={styles.dropDown}
			/>
		</>
	)
}

const styles = StyleSheet.create({
	dropDown: {
		borderWidth: 1,
		borderColor: '#1b1b33',
		height: 40,
		width: '100%',
		borderRadius: 8,
		fontSize: 16,
		paddingLeft: 10,
		marginBottom: 20,
	},
})

export default FormDropdown

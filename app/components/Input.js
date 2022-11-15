import { TextInput, Text, StyleSheet } from 'react-native'

const Input = ({ text }) => {
	return (
		<>
			<Text style={styles.text}>{text + ':'}</Text>
			<TextInput style={styles.textInput} />
		</>
	)
}

const styles = StyleSheet.create({
	text: {
		fontSize: 20,
		paddingTop: 5,
		paddingBottom: 2,
	},
	textInput: {
		fontSize: 20,
		paddingLeft: 10,
		height: '6%',
		borderColor: 'gray',
		borderWidth: 2,
		borderRadius: 5,
		backgroundColor: '#f5f3f0',
	},
})

export default Input

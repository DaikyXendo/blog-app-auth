import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'
import client from '../api/client'
import { useLogin } from '../context/LoginProvider'
import { isValidEmail, isValidObjField, updateError } from '../utils/methods'
import FormContainer from './FormContainer'
import FormInput from './FormInput'
import FormSubmitButton from './FormSubmitButton'

const SetTemp = () => {
	const [userInfo, setUserInfo] = useState({
		setTemp: '',
	})

	const [error, setError] = useState('')

	const { email, password } = userInfo

	const handleOnChangeText = (value, fieldName) => {
		setUserInfo({ ...userInfo, [fieldName]: value })
	}

	const isValidForm = () => {
		if (!isValidObjField(userInfo))
			return updateError('Required all fields!', setError)

		return true
	}

	const submitForm = async () => {
		if (isValidForm()) {
			try {
				const res = await client.post('/setTemp', { ...userInfo })
				console.log(res.data)
			} catch (error) {
				console.log(error)
			}
		}
	}

	return (
		<FormContainer>
			{error ? (
				<Text
					style={{ color: 'red', fontSize: 18, textAlign: 'center' }}
				>
					{error}
				</Text>
			) : null}
			<FormInput
				value={setTemp}
				onChangeText={(value) => handleOnChangeText(value, 'email')}
				label='Set Temperature'
				placeholder='10'
			/>
			<FormSubmitButton onPress={submitForm} title='Login' />
		</FormContainer>
	)
}

const styles = StyleSheet.create({})

export default SetTemp

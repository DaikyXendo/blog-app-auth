import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'

import {
	isValidEmail,
	isValidObjField,
	updateError,
	isValidPhoneNumber,
	isValidDateOfBirth,
} from '../utils/methods'
import FormContainer from './FormContainer'
import FormInput from './FormInput'
import FormDropdown from './FormDropdown'
import FormSubmitButton from './FormSubmitButton'
import { StackActions } from '@react-navigation/native'
import { useLogin } from '../context/LoginProvider'

import { Formik } from 'formik'
import * as Yup from 'yup'

import client from '../api/client'

const phoneRegx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
const dateOfBirthRegx =
	/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/

const genderRegx = /(?=(Nam|Nữ|nam|nữ))/

const validationSchema = Yup.object({
	fullname: Yup.string()
		.trim()
		.min(3, 'Tên không hợp lệ!')
		.required('Bạn cần điền tên!'),
	phoneNumber: Yup.string()
		.matches(phoneRegx, 'Số điện thoại không hợp lệ!')
		.required('Bạn cần điền số điện thoại!'),
	email: Yup.string()
		.email('Email không hợp lệ!')
		.required('Bạn cần điền email!'),
	password: Yup.string()
		.trim()
		.min(8, 'Mật khẩu quá ngắn!')
		.required('Bạn cần điền mật khẩu!'),
	confirmPassword: Yup.string().equals(
		[Yup.ref('password'), null],
		'Mật khẩu không khớp!'
	),
	address: Yup.string()
		.trim()
		.min(3, 'Địa chỉ không hợp lệ!')
		.required('Bạn cần điền địa chỉ của bạn!'),
	gender: Yup.string()
		.matches(genderRegx, 'Giới tính không hợp lệ!')
		.required('Bạn cần điền giới tính của bạn!'),
	dateOfBirth: Yup.string()
		.matches(dateOfBirthRegx, 'Ngày tháng năm sinh không hợp lệ!')
		.required('Bạn cần điền ngày tháng năm sinh!'),
	presenter: Yup.string()
		.trim()
		.min(3, 'Họ tên người giới thiệu quá ngắn!')
		.required('Bạn cần điền họ tên người giới thiệu!'),
	presenterPhoneNumber: Yup.string()
		.matches(phoneRegx, 'Số điện thoại không hợp lệ!')
		.required('Bạn cần điền số điện thoại!'),
})

const SignupForm = ({ navigation }) => {
	const { setIsLoggedIn, setProfile } = useLogin()

	const userInfo = {
		fullname: '',
		phoneNumber: '',
		email: '',
		password: '',
		confirmPassword: '',
		address: '',
		gender: '',
		dateOfBirth: '',
		presenter: '',
		presenterPhoneNumber: '',
	}

	const [error, setError] = useState('')

	const {
		fullname,
		phoneNumber,
		email,
		password,
		confirmPassword,
		address,
		gender,
		dateOfBirth,
		presenter,
		presenterPhoneNumber,
	} = userInfo

	const handleOnChangeText = (value, fieldName) => {
		setUserInfo({ ...userInfo, [fieldName]: value })
	}

	const isValidForm = () => {
		// we will accept only if all of the fields have value
		if (!isValidObjField(userInfo))
			return updateError('Required all fields!', setError)

		// if valid name with 3 or more characters
		if (!fullname.trim() || fullname.length < 3)
			return updateError('Invalid name!', setError)

		// only valid phoneNumber id is allowed
		if (!isValidPhoneNumber(phoneNumber))
			return updateError('Invalid phone number!', setError)

		// only valid email id is allowed
		if (!isValidEmail(email)) return updateError('Invalid email!', setError)

		// password must have 8 or more characters
		if (!password.trim() || password.length < 8)
			return updateError('Password is less then 8 characters!', setError)

		// password and confirm password must be the same
		if (password !== confirmPassword)
			return updateError('Password does not match!', setError)

		// if valid address with 3 or more characters
		if (!address.trim() || address.length < 3)
			return updateError('Invalid address!', setError)

		// only valid email id is allowed
		if (!isValidDateOfBirth(dateOfBirth))
			return updateError('Invalid date of birth!', setError)

		// if valid presenter with 3 or more characters
		if (!presenter.trim() || presenter.length < 3)
			return updateError('Invalid presenter!', setError)

		return true
	}

	const sumbitForm = () => {
		if (isValidForm()) {
			// submit form
			console.log(userInfo)
		}
	}

	const signUp = async (values, formikActions) => {
		const res = await client.post('/create-user', {
			...values,
		})

		if (res.data.success) {
			const signInRes = await client.post('/sign-in', {
				email: values.email,
				password: values.password,
			})
			if (signInRes.data.success) {
				// setProfile(res.data.user)
				setIsLoggedIn(true)
				// navigation.dispatch(StackActions.replace('Home'), {})
			}
		}

		formikActions.resetForm()
		formikActions.setSubmitting(false)
	}

	return (
		<FormContainer>
			<Formik
				initialValues={userInfo}
				validationSchema={validationSchema}
				onSubmit={signUp}
			>
				{({
					values,
					errors,
					touched,
					isSubmitting,
					handleChange,
					handleBlur,
					handleSubmit,
				}) => {
					const {
						fullname,
						phoneNumber,
						email,
						password,
						confirmPassword,
						address,
						gender,
						dateOfBirth,
						presenter,
						presenterPhoneNumber,
					} = values
					return (
						<>
							<FormInput
								value={fullname}
								error={touched.fullname && errors.fullname}
								onChangeText={handleChange('fullname')}
								onBlur={handleBlur('fullname')}
								label='Họ và tên'
								placeholder='Nguyễn Văn A'
							/>
							<FormInput
								value={phoneNumber}
								error={
									touched.phoneNumber && errors.phoneNumber
								}
								onChangeText={handleChange('phoneNumber')}
								onBlur={handleBlur('phoneNumber')}
								autoCapitalize='none'
								label='Số điện thoại'
								placeholder=''
							/>
							<FormInput
								value={email}
								error={touched.email && errors.email}
								onChangeText={handleChange('email')}
								onBlur={handleBlur('email')}
								autoCapitalize='none'
								label='Email'
								placeholder='example@email.com'
							/>
							<FormInput
								value={password}
								error={touched.password && errors.password}
								onChangeText={handleChange('password')}
								onBlur={handleBlur('password')}
								autoCapitalize='none'
								secureTextEntry
								label='Mật khẩu'
								placeholder='********'
							/>
							<FormInput
								value={confirmPassword}
								error={
									touched.confirmPassword &&
									errors.confirmPassword
								}
								onChangeText={handleChange('confirmPassword')}
								onBlur={handleBlur('confirmPassword')}
								autoCapitalize='none'
								secureTextEntry
								label='Xác nhận mật khẩu'
								placeholder='********'
							/>
							<FormInput
								value={address}
								error={touched.address && errors.address}
								onChangeText={handleChange('address')}
								onBlur={handleBlur('address')}
								label='Địa chỉ'
								placeholder=''
							/>
							<FormInput
								value={gender}
								error={touched.gender && errors.gender}
								onChangeText={handleChange('gender')}
								onBlur={handleBlur('gender')}
								label='Giới tính'
								placeholder=''
							/>
							<FormInput
								value={dateOfBirth}
								error={
									touched.dateOfBirth && errors.dateOfBirth
								}
								onChangeText={handleChange('dateOfBirth')}
								label='Ngày tháng năm sinh'
							/>
							<FormInput
								value={presenter}
								error={touched.presenter && errors.presenter}
								onChangeText={handleChange('presenter')}
								onBlur={handleBlur('presenter')}
								label='Người giới thiệu'
								placeholder=''
							/>
							<FormSubmitButton
								submitting={isSubmitting}
								onPress={handleSubmit}
								title='Đăng ký'
							/>
							<FormInput
								value={presenterPhoneNumber}
								error={
									touched.presenterPhoneNumber &&
									errors.presenterPhoneNumber
								}
								onChangeText={handleChange(
									'presenterPhoneNumber'
								)}
								onBlur={handleBlur('presenterPhoneNumber')}
								autoCapitalize='none'
								label='Số điện thoại người giới thiệu'
								placeholder=''
							/>
						</>
					)
				}}
			</Formik>
		</FormContainer>
	)
}

const styles = StyleSheet.create({})

export default SignupForm

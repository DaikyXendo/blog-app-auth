import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

const FormSubmitButton = ({ title, submitting, onPress }) => {
    const backgroundColor = submitting ? '#6cd667' : '#0a8708'

    return (
        <TouchableOpacity
            onPress={!submitting ? onPress : null}
            style={[styles.container, { backgroundColor }]}
        >
            <Text style={{ fontSize: 18, color: '#fff' }}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 45,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 45,
    },
})

export default FormSubmitButton

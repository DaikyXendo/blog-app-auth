import React from 'react'
import { View } from 'react-native'

export default function Seprator({
    width = '100%',
    height = 2,
    backgroundColor = '#c9c9c9',
    style,
}) {
    return (
        <View
            style={[
                { width, height, backgroundColor, alignSelf: 'center' },
                style,
            ]}
        />
    )
}

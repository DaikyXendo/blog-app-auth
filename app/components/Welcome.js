import React, { useRef } from 'react'
import {
    View,
    StyleSheet,
    Text,
    Animated,
    Dimensions,
    Image,
} from 'react-native'
import FormSelectorBtn from './FormSelectorBtn'

const Welcome = ({ route, navigation }) => {
    console.log(')))', route.navigate)
    const { width } = Dimensions.get('window')
    const animation = useRef(new Animated.Value(0)).current

    const loginColorInterpolate = animation.interpolate({
        inputRange: [0, width],
        outputRange: ['#0a8708', '#6cd667'],
    })

    return (
        <View style={styles.container}>
            <Text
                style={{
                    textAlign: 'center',
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: '#0a8708',
                    paddingTop: 50,
                }}
            >
                Chào mừng bạn đến với
            </Text>
            <Text
                style={{
                    textAlign: 'center',
                    fontSize: 32,
                    fontWeight: 'bold',
                    color: '#0a8708',
                    paddingTop: 20,
                }}
            >
                BÁC SĨ BÊN BẠN
            </Text>
            <Image
                style={styles.logo}
                source={require('../../assets/logo.jpg')}
            />
            <FormSelectorBtn
                style={styles.button}
                backgroundColor={loginColorInterpolate}
                title='Tiếp tục'
                onPress={() => navigation.navigate('TabNavigator')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#fff',
    },
    button: {
        position: 'absolute',
        bottom: '15%',
        width: '80%',
        borderRadius: 5,
    },
    logo: {
        width: 250,
        height: 250,
        marginTop: 20,
    },
})

export default Welcome

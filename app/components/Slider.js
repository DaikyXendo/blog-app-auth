import React, { useEffect, useRef, useState } from 'react'
import {
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native'

let currentSlideIndex = 0
const width = Dimensions.get('window').width - 20
let intervalId

const Slider = ({ data, title, onSlidePress }) => {
    const [dataToRender, setDataToRender] = useState([])
    const [visibleSlideIndex, setVisibleSlideIndex] = useState(0)
    const [activeSlideIndex, setActiveSlideIndex] = useState(0)

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        currentSlideIndex = viewableItems[0]?.index || 0
        setVisibleSlideIndex(currentSlideIndex)
    })

    const viewabilityConfig = useRef({
        viewAreaCoveragePercentThreshold: 50,
    })

    const flatList = useRef()

    const handleScrollTo = (index) => {
        try {
            flatList.current.scrollToIndex({ animated: false, index })
        } catch (error) {
            flatList.current.scrollToIndex({ animated: false, index: 0 })
        }
    }

    const startSlider = () => {
        if (currentSlideIndex <= dataToRender.length - 2) {
            intervalId = setInterval(() => {
                try {
                    flatList.current.scrollToIndex({
                        animated: true,
                        index: currentSlideIndex + 1,
                    })
                } catch (error) {
                    flatList.current.scrollToIndex({
                        animated: false,
                        index: 0,
                    })
                }
            }, 4000)
        } else {
            pauseSlider()
        }
    }

    const pauseSlider = () => {
        clearInterval(intervalId)
    }

    useEffect(() => {
        if (dataToRender.length && flatList.current) {
            startSlider()
        }
        return () => {
            pauseSlider()
        }
    }, [dataToRender.length])

    useEffect(() => {
        const newData = [[...data].pop(), ...data, [...data].shift()]
        setDataToRender([...newData])
    }, [data.length])

    useEffect(() => {
        const length = dataToRender.length

        //reset slide to first
        if (visibleSlideIndex === dataToRender.length - 1 && length)
            handleScrollTo(1)

        //reset slide to last
        if (visibleSlideIndex === 0 && length) handleScrollTo(length - 2)

        const lastSlide = currentSlideIndex === length - 1
        const firstSlide = currentSlideIndex === 0

        if (lastSlide && length) setActiveSlideIndex(0)
        else if (firstSlide && length) setActiveSlideIndex(length - 2)
        else setActiveSlideIndex(currentSlideIndex - 1)
    }, [visibleSlideIndex])

    const renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback onPress={() => onSlidePress(item)}>
                <View>
                    <Image
                        source={{ uri: item.thumbnail }}
                        style={{ width, height: width / 1.7, borderRadius: 7 }}
                    />
                    <View style={{ width }}>
                        <Text
                            numberOfLines={2}
                            style={{
                                fontWeight: '700',
                                color: '#383838',
                                fontSize: 22,
                            }}
                        >
                            {item.title}
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.sliderHead}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.sliderIndicatorContainer}>
                        <SlideIndicators
                            data={data}
                            activeSlideIndex={activeSlideIndex}
                        />
                    </View>
                </View>
                <FlatList
                    ref={flatList}
                    data={dataToRender}
                    keyExtractor={(item, index) => item.id + index}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    onScrollBeginDrag={pauseSlider}
                    onScrollEndDrag={startSlider}
                    initialScrollIndex={1}
                    onViewableItemsChanged={onViewableItemsChanged.current}
                    viewabilityConfig={viewabilityConfig.current}
                    getItemLayout={(_, index) => ({
                        length: width,
                        offset: width * index,
                        index,
                    })}
                    renderItem={renderItem}
                />
            </View>
        </ScrollView>
    )
}

const SlideIndicators = ({ data, activeSlideIndex }) =>
    data.map((item, index) => {
        return (
            <View
                key={item.id}
                style={[
                    styles.slides,
                    {
                        backgroundColor:
                            activeSlideIndex === index
                                ? '#383838'
                                : 'transparent',
                    },
                ]}
            />
        )
    })

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        width,
    },
    sliderHead: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    title: { fontWeight: '700', color: '#383838', fontSize: 22 },
    sliderIndicatorContainer: { flexDirection: 'row', alignItems: 'center' },
    slides: {
        width: 12,
        height: 12,
        borderRadius: 6,
        borderWidth: 2,
        marginLeft: 5,
    },
})
export default Slider

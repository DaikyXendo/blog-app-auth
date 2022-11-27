import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { getFeaturedPosts, getLatestPosts, getSinglePosts } from '../api/post'
import PostListItem from '../components/PostListItem'
import Slider from '../components/Slider'
import Seprator from './Seprator'

let pageNo = 0
const limit = 5
export default function Home({ navigation }) {
    const [featuredPosts, setFeaturedPosts] = useState()
    const [latestPosts, setLatestPosts] = useState()
    const [reachedToEnd, setReachedToEnd] = useState(false)
    const [busy, setBusy] = useState(false)

    const fetchFeaturedPosts = async () => {
        const { error, post } = await getFeaturedPosts()

        if (error) {
            console.log(error)
            return
        }

        setFeaturedPosts(post)
    }

    const fetchLatestdPosts = async () => {
        const { error, posts } = await getLatestPosts(pageNo, limit)

        if (error) {
            console.log(error)
            return
        }

        setLatestPosts(posts)
    }

    const fetchMorePosts = async () => {
        if (reachedToEnd || busy) return
        pageNo += 1
        setBusy(true)
        const { posts, postCount } = await getLatestPosts(pageNo, limit)

        setBusy(false)

        if (postCount === latestPosts.length) return setReachedToEnd(true)
        setLatestPosts([...latestPosts, ...posts])
    }

    useEffect(() => {
        fetchFeaturedPosts()
        fetchLatestdPosts()
        return () => {
            pageNo = 0
            setReachedToEnd(false)
        }
    }, [])

    const ListHeaderComponent = useCallback(() => {
        return (
            <View>
                {featuredPosts ? (
                    <Slider
                        onSlidePress={fetchSinglePost}
                        data={featuredPosts}
                        title='Tin hàng đầu'
                    />
                ) : null}
                <View style={{ marginTop: 50 }}>
                    <Seprator />
                    <Text
                        style={{
                            fontWeight: '700',
                            color: '#383838',
                            fontSize: 22,
                            marginTop: 10,
                        }}
                    >
                        Bài viết liên quan{' '}
                    </Text>
                </View>
            </View>
        )
    }, [featuredPosts])

    const fetchSinglePost = async (postInfo) => {
        const slug = postInfo.slug || postInfo
        const { error, post } = await getSinglePosts(slug)
        if (error) console.log(error)
        navigation.navigate('PostDetails', { post })
    }

    const ItemSeparatorComponent = () => (
        <Seprator width='90%' style={{ marginTop: 15 }} />
    )
    const renderItem = ({ item }) => {
        return (
            <View style={{ marginTop: 15 }}>
                <PostListItem
                    onPresst={() => fetchSinglePost(item.slug)}
                    posts={item}
                />
            </View>
        )
    }

    return (
        <>
            {latestPosts ? (
                <FlatList
                    data={latestPosts}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{
                        paddingHorizontal: 10,
                        paddingBottom: 20,
                    }}
                    ListHeaderComponent={ListHeaderComponent}
                    ItemSeparatorComponent={ItemSeparatorComponent}
                    renderItem={renderItem}
                    onEndReached={async () => await fetchMorePosts()}
                    onEndReachedThreshold={0}
                    ListFooterComponent={() => {
                        return reachedToEnd ? (
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    color: '#383838',
                                    textAlign: 'center',
                                    paddingVertical: 15,
                                }}
                            >
                                Đã hết bài viết!
                            </Text>
                        ) : null
                    }}
                />
            ) : null}
        </>
    )
}

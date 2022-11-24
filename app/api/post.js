import client from './client'

export const getFeaturedPosts = async () => {
	try {
		const { data } = await client('/api/post/featured-posts')
		return data
	} catch (error) {
		const { response } = error
		if (response?.data) {
			return response.data
		}
		return { error: error.message || error }
	}
}
export const getLatestPosts = async (pageNo, limit) => {
	try {
		const { data } = await client(
			`/api/post/posts?pageNo=${pageNo}&limit=${limit}`
		)
		return data
	} catch (error) {
		const { response } = error
		if (response?.data) {
			return response.data
		}
		return { error: error.message || error }
	}
}
export const getSinglePosts = async (slug) => {
	try {
		const { data } = await client(`/api/post/single/${slug}`)
		return data
	} catch (error) {
		const { response } = error
		if (response?.data) {
			return response.data
		}
		return { error: error.message || error }
	}
}
export const getSimilarPosts = async (id) => {
	try {
		const { data } = await client(`/api/post/related-posts/${id}`)
		return data
	} catch (error) {
		const { response } = error
		if (response?.data) {
			return response.data
		}
		return { error: error.message || error }
	}
}
export const searchPosts = async (query) => {
	try {
		const { data } = await client(`/api/post/search?title=${query}`)
		return data
	} catch (error) {
		const { response } = error
		if (response?.data) {
			return response.data
		}
		return { error: error.message || error }
	}
}

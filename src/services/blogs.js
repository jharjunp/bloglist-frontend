import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const newBlog = async (blog, token) => {
  const response = await axios.post(baseUrl, blog, {headers:{
    'Authorization': `Bearer ${token}`
  }})
  return response.data
}

const updateBlog = async (blog, token) => {
  const newBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }
  const response = await axios.put(baseUrl.concat(`/${blog.id}`), newBlog, {headers:{
    'Authorization': `Bearer ${token}`
  }})
  return response.data
}

const deleteBlog = async (blog, token) => {
  const response = await axios.delete(baseUrl.concat(`/${blog.id}`), {headers:{
    'Authorization': `Bearer ${token}`
  }})
  return response.data
}

export default { getAll, newBlog, updateBlog, deleteBlog }
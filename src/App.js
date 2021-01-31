import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import Error from './components/Error'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const blogFormRef = useRef()
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')

      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))

    setInfoMessage(
      `a new blog ${blogObject.title} by ${blogObject.author} added`
    )
    setTimeout(() => {
      setInfoMessage(null)
    }, 5000)
  }

  const addLikes = async (id) => {
    const blog = blogs.find((n) => n.id === id)
    const changedBlog = { ...blog, user: blog.user.id, likes: blog.likes + 1 }

    try {
      var returnedBlog = await blogService.update(id, changedBlog)

      returnedBlog = { ...returnedBlog, user: blog.user }

      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)))
    } catch (exception) {
      console.log(`An error occurred: ${exception}`)
    }
  }

  const createBlogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <CreateBlogForm createBlog={addBlog} />
    </Togglable>
  )

  const sortedBlogs = blogs.sort((a, b) => {
    return b.likes - a.likes
  })

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Error message={errorMessage} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">
            login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={infoMessage} />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      {createBlogForm()}

      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} addLikes={addLikes} />
      ))}
    </div>
  )
}

export default App

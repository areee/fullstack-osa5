import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLikes, user, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = async (event) => {
    event.preventDefault()

    addLikes(blog.id)
  }

  const removeBlogButton = () => {
    if (blog.user.username === user.username) {
      return (
        <button id="remove-button" onClick={removeSelectedBlog}>
          remove
        </button>
      )
    }
  }

  const removeSelectedBlog = async (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id)
    }
  }

  const buttonText = visible ? 'hide' : 'view'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}
        <button id="show-button" onClick={toggleVisibility}>
          {buttonText}
        </button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {blog.url} <br />
        likes {blog.likes}
        <button id="add-likes-button" onClick={addLike}>
          like
        </button>
        <br />
        {blog.user.name}
        <br />
        {removeBlogButton()}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog

import React from 'react'

const CreateBlogForm = ({
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlAddressChange,
  title,
  author,
  urlAddress,
}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input value={title} onChange={handleTitleChange} />
        </div>
        <div>
          author:
          <input value={author} onChange={handleAuthorChange} />
        </div>
        <div>
          url:
          <input value={urlAddress} onChange={handleUrlAddressChange} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateBlogForm

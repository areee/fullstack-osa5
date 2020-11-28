import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author', () => {
  const blog = {
    title: 'Hienonhieno testiotsikko johonkin supermahtavaan blogiin',
    author: 'Testi T. Testaaja',
  }

  const component = render(<Blog blog={blog} />)

  expect(component.container).toHaveTextContent(
    'Hienonhieno testiotsikko johonkin supermahtavaan blogiin'
  )
})

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'Koe otsikko',
  author: 'Saku Mahtava',
  url: 'www.teopoi.fi',
  likes: 123,
  id: 12334341212,
  user: {
    username: 'Saku Mahtava'
  }
}

const user = {
  username: 'Saku',
  name: 'Saku Mahtava',
  id: '6058b557a72edcf61c6a0fa4'
}

test('renders content', () => {

  const component = render(
    <Blog blog={blog}
      User user={user}/>
  )

  expect(component.container).toHaveTextContent(
    'Koe otsikko'
  )

  expect(component.container).toHaveTextContent(
    'Saku Mahtava'
  )

  const div = component.container.querySelector('.longBlog')
  expect(div).toHaveStyle('display: none')
})

test('clicking the "view" button shows hidden content', async () => {

  const mockHandlerDelete = jest.fn()
  const mockHandlerLike = jest.fn()

  const component = render(
    <Blog blog={blog}
      like={mockHandlerLike}
      deleteBlog={mockHandlerDelete}
      user={user} />
  )
  //component.debug()

  const button = component.getByText('view')
  fireEvent.click(button)

  const div = component.container.querySelector('.longBlog')
  expect(div).not.toHaveStyle('display: none')
})

test('clicking the like button twice calls event handler twice', async () => {

  const mockHandlerDelete = jest.fn()
  const mockHandlerLike = jest.fn()

  const component = render(
    <Blog blog={blog}
      like={mockHandlerLike}
      deleteBlog={mockHandlerDelete}
      user={user} />
  )
  //component.debug()

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandlerLike.mock.calls).toHaveLength(2)
})
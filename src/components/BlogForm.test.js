import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('Callback funtion is called with correct data when submitting blog', async () => {

  const mockHandlerNewBlog = jest.fn()

  const component = render(
    <BlogForm newBlog={mockHandlerNewBlog} />
  )
  //component.debug()

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')

  fireEvent.change(title, { target: { value: 'Testiotsikko' } })
  fireEvent.change(author, { target: { value: 'Testiauthor' } })
  fireEvent.change(url, { target: { value: 'TestiURL' } })

  const button = component.getByText('create')
  fireEvent.click(button)

  expect(mockHandlerNewBlog.mock.calls).toHaveLength(1)

  expect(mockHandlerNewBlog.mock.calls[0][0].title).toBe('Testiotsikko')
  expect(mockHandlerNewBlog.mock.calls[0][0].author).toBe('Testiauthor')
  expect(mockHandlerNewBlog.mock.calls[0][0].url).toBe('TestiURL')
})
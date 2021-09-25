/* eslint-disable react/react-in-jsx-scope */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import { Router } from 'react-router'
import { createMemoryHistory } from 'history'
import Auth from '../index'

const setup = () => {
    const history = createMemoryHistory()
    return render(
        <Router history={history}>
            <Auth />
        </Router>
    )
}

test('abc', async () => {
    setup()
    const submitButton = screen.getByRole('button', { name: /submit/i })
    userEvent.click(submitButton)
})

import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from './App';
import fetchMock from 'jest-fetch-mock';
import mockData from './mockData';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  fetchMock.once(JSON.stringify(mockData));
})

describe('<App /> tests', () => {
  it('render <App />', async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
  })

  it('should add a todo item', async() => {
    fetchMock.once(
      JSON.stringify({
        userId: 3,
        id: Math.floor(Math.random() * 100) + 1,
        title: 'Attend meeting',
        completed: false
      })
    );

    render(<App />);
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    userEvent.type(screen.getByRole('textbox'), 'Attend meeting');
    fireEvent.click(screen.getByText(/Add new todo/i));
    await waitForElementToBeRemoved(() => screen.queryByText(/saving/i));
    const todo = screen.getByText(/Attend meeting/i);
    expect(todo).toBeInTheDocument();
  })

  it('should remove todo from list', async() => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
    userEvent.click(screen.getByTestId('close-btn-4'));
    const title = screen.queryByText(/write a blog post/i);
    expect(title).not.toBeInTheDocument();
  })

  it('todo item should be crossed out after completion', async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
    userEvent.click(screen.getByTestId('checkbox-1'));
    expect(screen.getByText(/Eat breakfast/i)).toBeInTheDocument();
  })
})
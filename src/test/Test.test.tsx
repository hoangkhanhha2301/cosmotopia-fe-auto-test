import { render, screen } from '@testing-library/react';
import Test from './Test';

describe('Hello component', () => {
  it('renders the text correctly', () => {
    render(<Test />);
    expect(screen.getByText('Hello, Jest!')).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '../../../components/core/button';

describe('Button', () => {
  test('Renders component', () => {
    render(<Button />);
    const component = screen.getAllByTestId('button');
    expect(component).not.toBeNull();
  });
});


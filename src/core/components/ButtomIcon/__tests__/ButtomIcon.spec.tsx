import React from 'react';
import { render, screen } from '@testing-library/react';
import ButtomIcon from '../';

test('Shound render ButtomIcon', () => {

    const text = 'logar';

    render(
        <ButtomIcon text={text} />
    )

    const textElement = screen.getByText(text);
    const iconElement = screen.getByTestId('arrow-icon');

    expect(textElement).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
});

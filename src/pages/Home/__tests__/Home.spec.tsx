import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import history from 'core/utils/history';
import Home from '..';

test('Shound render Home', () => {

    render(
        <Router history={history}>
            <Home />
        </Router>
    )

    screen.debug();
    const titleElement = screen.getByText('Conheça o melhor catálogo de produtos');
    const subtitleElement = screen.getByText('Ajudaremos você a encontrar os melhores produtos disponíveis no mercado.');

    expect(titleElement).toBeInTheDocument();
    expect(subtitleElement).toBeInTheDocument();
    expect(screen.getByTestId('main-image')).toBeInTheDocument();
    expect(screen.getByText(/INICIE AGORA A SUA BUSCA/i)).toBeInTheDocument();

});
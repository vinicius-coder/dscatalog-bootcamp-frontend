import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import selectEvent from 'react-select-event';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import history from 'core/utils/history';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { categoriesResponse } from './fixtures';
import Form from '../Form';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        productId: 'create'
    })
}))

const server = setupServer(
    rest.get('http://localhost:8080/categories', (req, res, ctx) => {
        return res(ctx.json(categoriesResponse))
    }),
    rest.post('http://localhost:8080/products', (req, res, ctx) => {
        return res(ctx.status(201))
    })
)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('Should render Form', async () => {

    render(
        <Router history={history}>
            <ToastContainer />
            <Form />
        </Router>
    );

    const submitButtom = screen.getByRole('button', { name: /salvar/i })
    const nameInput = screen.getByTestId('name');
    const priceInput = screen.getByTestId('price');
    const imgUrlInput = screen.getByTestId('imgUrl');
    const descriptionInput = screen.getByTestId('description');
    const categoriesInput = screen.getByLabelText('Categorias');

    userEvent.type(nameInput, 'Computador');
    await selectEvent.select(categoriesInput, ['Computadores', 'Eletrônicos']);
    userEvent.type(priceInput, '5000');
    userEvent.type(imgUrlInput, 'image.jpg');
    userEvent.type(descriptionInput, 'Ótimo computador');

    userEvent.click(submitButtom);

    await waitFor(() => expect(screen.getByText('Produto salvo com sucesso!')).toBeInTheDocument());
    expect(history.location.pathname).toBe('/admin/products');
    expect(screen.getByText(/CADASTRAR UM PRODUTO/i)).toBeInTheDocument();

});


test('Should show errors on Form', async () => {

    render(
        <Router history={history}>
            <Form />
        </Router>
    );

    const submitButtom = screen.getByRole('button', { name: /salvar/i });

    userEvent.click(submitButtom);

    await waitFor(() => expect(screen.getAllByText('Campo obrigatório')).toHaveLength(5));

    const nameInput = screen.getByTestId('name');
    const priceInput = screen.getByTestId('price');
    const imgUrlInput = screen.getByTestId('imgUrl');
    const descriptionInput = screen.getByTestId('description');
    const categoriesInput = screen.getByLabelText('Categorias');

    userEvent.type(nameInput, 'Computador');
    await selectEvent.select(categoriesInput, ['Computadores', 'Eletrônicos']);
    userEvent.type(priceInput, '5000');
    userEvent.type(imgUrlInput, 'image.jpg');
    userEvent.type(descriptionInput, 'Ótimo computador');

    await waitFor(() => expect(screen.queryAllByText('Campo obrigatório')).toHaveLength(0));
});
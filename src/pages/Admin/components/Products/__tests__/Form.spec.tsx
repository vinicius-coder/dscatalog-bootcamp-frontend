import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import selectEvent from 'react-select-event';
import { Router, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import history from 'core/utils/history';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { categoriesResponse, fillFormData, productResponde } from './fixtures';
import Form from '../Form';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn()
}))

const server = setupServer(
    rest.get('http://localhost:8080/categories', (req, res, ctx) => {
        return res(ctx.json(categoriesResponse))
    }),
    rest.post('http://localhost:8080/products', (req, res, ctx) => {
        return res(ctx.status(201))
    }),
    rest.get('http://localhost:8080/products/:productId', (req, res, ctx) => {
        return res(ctx.json(productResponde))
    }),
    rest.put('http://localhost:8080/products/:productId', (req, res, ctx) => {
        return res(ctx.status(200))
    })
)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Create a product', () => {

    beforeEach(() => {
        (useParams as jest.Mock).mockReturnValue({
            productId: 'create'
        })
    })

    test('Should render Form and submit with success', async () => {

        render(
            <Router history={history}>
                <ToastContainer />
                <Form />
            </Router>
        );

        const submitButtom = screen.getByRole('button', { name: /salvar/i })
        const categoriesInput = screen.getByLabelText('Categorias');
        await selectEvent.select(categoriesInput, ['Computadores', 'Eletrônicos']);

        fillFormData();

        userEvent.click(submitButtom);

        await waitFor(() => expect(screen.getByText('Produto salvo com sucesso!')).toBeInTheDocument());
        expect(history.location.pathname).toBe('/admin/products');
        expect(screen.getByText(/CADASTRAR UM PRODUTO/i)).toBeInTheDocument();

    });

    test('Should render Form and submit with error', async () => {

        server.use(
            rest.post('http://localhost:8080/products', (req, res, ctx) => {
                return res(ctx.status(500))
            })
        )

        render(
            <Router history={history}>
                <ToastContainer />
                <Form />
            </Router>
        );

        const submitButtom = screen.getByRole('button', { name: /salvar/i })
        const categoriesInput = screen.getByLabelText('Categorias');
        await selectEvent.select(categoriesInput, ['Computadores', 'Eletrônicos']);

        fillFormData();

        userEvent.click(submitButtom);

        await waitFor(() => expect(screen.getByText('Erro ao salvar o produto!')).toBeInTheDocument());

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
        const categoriesInput = screen.getByLabelText('Categorias');
        await selectEvent.select(categoriesInput, ['Computadores', 'Eletrônicos']);

        fillFormData();

        await waitFor(() => expect(screen.queryAllByText('Campo obrigatório')).toHaveLength(0));
    });
});

describe('Editing a product', () => {

    beforeEach(() => {
        (useParams as jest.Mock).mockReturnValue({
            productId: '3'
        })
    })

    test('Should render Form and submit with success', async () => {

        render(
            <Router history={history}>
                <ToastContainer />
                <Form />
            </Router>
        );

        const submitButton = screen.getByRole('button', { name: /salvar/i });

        await waitFor(() => expect(screen.getByTestId('name')).toHaveValue('Macbook Pro'));
        expect(screen.getByText('Computadores')).toBeInTheDocument();
        expect(screen.getByText('Eletrônicos')).toBeInTheDocument();
        expect(screen.getByTestId('price')).toHaveValue(1250);
        expect(screen.getByTestId('imgUrl')).toHaveValue('imagem.jpg');
        expect(screen.getByTestId('description')).toHaveValue('Lorem ipsum dolor sit amet, consectetur ia deserunt mollit anim id est laborum.');
        expect(screen.getByText(/Editar produto/i)).toBeInTheDocument();

        userEvent.click(submitButton);
        await waitFor(() => expect(screen.getByText('Produto salvo com sucesso!')).toBeInTheDocument());

    });
});
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export const categoriesResponse = {
    "content": [
        {
            "id": 3,
            "name": "Computadores"
        },
        {
            "id": 2,
            "name": "Eletrônicos"
        },
        {
            "id": 1,
            "name": "Livros"
        }
    ]
};

export const productResponde = {
    "id": 3,
    "name": "Macbook Pro",
    "description": "Lorem ipsum dolor sit amet, consectetur ia deserunt mollit anim id est laborum.",
    "price": 1250.0,
    "imgUrl": "imagem.jpg",
    "date": "2020-07-14T10:00:00Z",
    "categories": [
        {
            "id": 2,
            "name": "Computadores"
        },
        {
            "id": 3,
            "name": "Eletrônicos"
        }
    ]
};

export const fillFormData = () => {

    const nameInput = screen.getByTestId('name');
    const priceInput = screen.getByTestId('price');
    const imgUrlInput = screen.getByTestId('imgUrl');
    const descriptionInput = screen.getByTestId('description');

    userEvent.type(nameInput, 'Computador');
    userEvent.type(priceInput, '5000');
    userEvent.type(imgUrlInput, 'image.jpg');
    userEvent.type(descriptionInput, 'Ótimo computador');

}
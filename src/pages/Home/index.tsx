import React from 'react';
import { ReactComponent as MainImage } from 'core/assets/images/main-image.svg';
import ButtomIcon from 'core/components/ButtomIcon';
import { Link } from 'react-router-dom';
import './styles.scss';

const Home = () => (
    <div className="home-container">
        <div className="row home-contend card-base border-radius-20">
            <div className="col-6 home-text">
                <h1 className="text-title" data-testid="main-title">
                    Conheça o melhor <br /> catálogo de produtos
                </h1>
                <p className="text-subtitle">
                    Ajudaremos você a encontrar os melhores <br />produtos disponíveis no mercado.
                </p>
                <Link to="/products">
                    <ButtomIcon text="inicie agora a sua busca"/>
                </Link>
            </div>
            <div className="col-6">
                <MainImage className="main-image" data-testid="main-image" />
            </div>
        </div>
    </div>
);

export default Home;